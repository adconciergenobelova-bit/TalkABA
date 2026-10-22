<?php
/* POST {action: signup|login, name?, email, password, creds?}. */
require __DIR__ . '/_lib.php';
require_method('POST');
rate_limit('auth', 20, 900);

$in = read_json_body();
$action = clean($in['action'] ?? '', 20);
$email = strtolower(clean($in['email'] ?? '', 254));
$password = (string)($in['password'] ?? '');

if (!valid_email($email) || strlen($password) < 8 || strlen($password) > 128) {
    respond(422, ['error' => 'Enter a valid email and a password of 8–128 characters.']);
}

if ($action === 'signup') {
    $name = clean($in['name'] ?? '', 120);
    $creds = clean($in['creds'] ?? 'Other', 40) ?: 'Other';
    if ($name === '') respond(422, ['error' => 'Please enter your full name.']);

    $created = with_store('users', function (array &$users) use ($email, $password, $name, $creds): bool {
        if (isset($users[$email])) return false;
        $users[$email] = [
            'name' => $name,
            'email' => $email,
            'creds' => $creds,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'createdAt' => date('c')
        ];
        return true;
    });
    if (!$created) respond(409, ['error' => 'That email is already signed up. Please log in instead.']);
    respond(201, ['user' => ['name' => $name, 'email' => $email, 'creds' => $creds]]);
}

if ($action === 'login') {
    $user = with_store('users', function (array &$users) use ($email, $password): ?array {
        $record = $users[$email] ?? null;
        if (!$record || !password_verify($password, $record['password'] ?? '')) return null;
        return ['name' => $record['name'], 'email' => $record['email'], 'creds' => $record['creds'] ?? 'Other'];
    });
    if (!$user) respond(401, ['error' => 'Invalid email or password.']);
    respond(200, ['user' => $user]);
}

respond(400, ['error' => 'Unknown authentication action.']);
