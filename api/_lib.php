<?php
declare(strict_types=1);
/* Shared helpers for the Talk ABA API. Requires PHP 7.4+. No database needed:
   records are stored as JSON files in api/data/ (blocked from the web by .htaccess). */

const DATA_DIR = __DIR__ . '/data';

function respond(int $status, array $body): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function require_method(string $method): void {
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        header('Allow: ' . $method);
        respond(405, ['error' => 'Method not allowed']);
    }
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 65536) respond(413, ['error' => 'Request too large']);
    $data = json_decode($raw, true);
    if (!is_array($data)) respond(400, ['error' => 'Invalid JSON']);
    return $data;
}

function clean(?string $s, int $max = 200): string {
    $s = trim(strip_tags((string)$s));
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $s) ?? '';
    return function_exists('mb_substr') ? mb_substr($s, 0, $max) : substr($s, 0, $max);
}

function valid_email(string $e): bool { return strlen($e) <= 254 && filter_var($e, FILTER_VALIDATE_EMAIL) !== false; }

/* Read-modify-write a JSON file under an exclusive lock. $fn receives the decoded array and returns the new one. */
function with_store(string $name, callable $fn) {
    if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
    $path = DATA_DIR . '/' . $name . '.json';
    $fh = fopen($path, 'c+');
    if (!$fh) respond(500, ['error' => 'Storage unavailable']);
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $data = $raw ? (json_decode($raw, true) ?: []) : [];
    $result = $fn($data);
    ftruncate($fh, 0); rewind($fh);
    fwrite($fh, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    fflush($fh); flock($fh, LOCK_UN); fclose($fh);
    return $result;
}

function read_store(string $name): array {
    $path = DATA_DIR . '/' . $name . '.json';
    if (!is_file($path)) return [];
    return json_decode((string)file_get_contents($path), true) ?: [];
}

/* Very small per-IP rate limit: $max hits per $window seconds per bucket. */
function rate_limit(string $bucket, int $max = 30, int $window = 600): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', $bucket . '|' . $ip);
    $now = time();
    $blocked = with_store('ratelimit', function (array &$d) use ($key, $max, $window, $now): bool {
        foreach ($d as $k => $hits) { $d[$k] = array_values(array_filter($hits, fn($t) => $t > $now - $window)); if (!$d[$k]) unset($d[$k]); }
        $d[$key] = $d[$key] ?? [];
        if (count($d[$key]) >= $max) return true;
        $d[$key][] = $now; return false;
    });
    if ($blocked) { header('Retry-After: ' . $window); respond(429, ['error' => 'Too many requests. Please try again later.']); }
}

const CERT_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function random_code(int $n): string {
    $out = ''; $max = strlen(CERT_CHARS) - 1;
    for ($i = 0; $i < $n; $i++) $out .= CERT_CHARS[random_int(0, $max)];
    return $out;
}
