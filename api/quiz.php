<?php
/* POST {courseId, answers:[int...], name, email, creds}
   Grades the quiz on the server (answers live in data/quizzes.json, never sent to the browser
   before submission) and issues a certificate ID when the score is 80% or higher. */
require __DIR__ . '/_lib.php';
require_method('POST');
rate_limit('quiz', 40, 600);

$in = read_json_body();
$quizzes = read_store('quizzes');
$courseId = clean($in['courseId'] ?? '', 80);
if (!isset($quizzes[$courseId])) respond(404, ['error' => 'Unknown course']);
$course = $quizzes[$courseId];
$answers = $in['answers'] ?? null;
if (!is_array($answers) || count($answers) !== count($course['questions'])) respond(400, ['error' => 'Please answer every question.']);

$correct = 0; $review = [];
foreach ($course['questions'] as $i => $q) {
    $given = $answers[$i] ?? null;
    $ok = is_int($given) && $given === $q['answer'];
    if ($ok) $correct++;
    $review[] = ['correct' => $ok, 'answer' => $q['answer'], 'explain' => $q['explain']];
}
$score = (int)round($correct / count($course['questions']) * 100);
$passed = $score >= 80;
$certId = null;

if ($passed) {
    $name = clean($in['name'] ?? 'Learner', 120) ?: 'Learner';
    $email = strtolower(clean($in['email'] ?? '', 254));
    $creds = clean($in['creds'] ?? '', 40);
    $certId = with_store('certificates', function (array &$certs) use ($courseId, $course, $name, $email, $creds, $score) {
        // Same person + course => same certificate (retakes don't mint new IDs)
        if ($email !== '') foreach ($certs as $id => $c) if ($c['email'] === $email && $c['courseId'] === $courseId) return $id;
        do { $id = 'TAA-' . random_code(6) . '-' . random_code(4); } while (isset($certs[$id]));
        $certs[$id] = ['courseId' => $courseId, 'title' => $course['title'], 'ceus' => $course['ceus'], 'ceuTypes' => $course['ceuTypes'],
                       'holder' => $name, 'creds' => $creds, 'email' => $email, 'score' => $score, 'date' => date('Y-m-d')];
        return $id;
    });
}
respond(200, ['score' => $score, 'passed' => $passed, 'certId' => $certId, 'review' => $review]);
