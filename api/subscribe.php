<?php
/* POST {email, source}  -> newsletter + event registrations, saved to data/subscribers.json */
require __DIR__ . '/_lib.php';
require_method('POST');
rate_limit('subscribe', 15, 3600);
$in = read_json_body();
$email = strtolower(clean($in['email'] ?? '', 254)); $source = clean($in['source'] ?? 'newsletter', 120);
if (!valid_email($email)) respond(422, ['error' => 'Please enter a valid email address.']);
with_store('subscribers', function (array &$s) use ($email, $source) {
    foreach ($s as $r) if ($r['email'] === $email && $r['source'] === $source) return;
    $s[] = ['email' => $email, 'source' => $source, 'at' => date('c')];
});
respond(200, ['ok' => true]);
