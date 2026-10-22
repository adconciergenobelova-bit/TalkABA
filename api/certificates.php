<?php
/* GET ?id=TAA-XXXXXX-XXXX  ->  {valid, title, ceus, ceuTypes, holder, date}  (email is never exposed) */
require __DIR__ . '/_lib.php';
require_method('GET');
rate_limit('verify', 60, 600);
$id = strtoupper(clean($_GET['id'] ?? '', 40));
if (!preg_match('/^TAA-[A-Z0-9]{6}-[A-Z0-9]{4}$/', $id)) respond(404, ['valid' => false]);
$c = read_store('certificates')[$id] ?? null;
if (!$c) respond(404, ['valid' => false]);
respond(200, ['valid' => true, 'title' => $c['title'], 'ceus' => $c['ceus'], 'ceuTypes' => $c['ceuTypes'], 'holder' => $c['holder'], 'date' => date('F j, Y', strtotime($c['date']))]);
