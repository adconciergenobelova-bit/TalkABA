<?php
/* POST {name, email, message}. Saved to data/messages.json; set NOTIFY_EMAIL to also get an email (needs working PHP mail()). */
require __DIR__ . '/_lib.php';
require_method('POST');
rate_limit('contact', 5, 3600);
const NOTIFY_EMAIL = ''; // e.g. 'hello@talkaba.academy'

$in = read_json_body();
$name = clean($in['name'] ?? '', 120); $email = strtolower(clean($in['email'] ?? '', 254)); $msg = clean($in['message'] ?? '', 4000);
if ($name === '' || $msg === '' || !valid_email($email)) respond(422, ['error' => 'Please fill in your name, a valid email and a message.']);
with_store('messages', function (array &$m) use ($name, $email, $msg) { $m[] = ['name' => $name, 'email' => $email, 'message' => $msg, 'at' => date('c')]; });
if (NOTIFY_EMAIL !== '') @mail(NOTIFY_EMAIL, 'Talk ABA: message from ' . str_replace(["\r", "\n"], ' ', $name), $msg, 'Reply-To: ' . $email);
respond(200, ['ok' => true]);
