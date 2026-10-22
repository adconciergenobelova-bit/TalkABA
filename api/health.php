<?php
require __DIR__ . '/_lib.php';
respond(200, ['ok' => true, 'php' => PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION]);
