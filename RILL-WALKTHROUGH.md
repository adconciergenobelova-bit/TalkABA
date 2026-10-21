# Rill walkthrough — enroll in a course, pass the CEU quiz, verify the certificate

This walks one clinician through the core Talk ABA Academy demo flow in this Vite + React app: browse the CEU catalog, enroll in *Today's ABA Foundations*, take the final quiz, earn a certificate, and verify its ID. Checkout is a demo — no real charge — and all state lives in `localStorage` (`taa_user`, `taa_cart`, `taa_enroll`), so a hard refresh keeps progress and clearing site data resets it.

Run the app locally with `npm run dev` (Vite, http://localhost:5173) before following the steps.

## Steps

1. Open the app and go to /courses. Expected: 9 course cards with CEU counts and prices, plus category filter chips.
2. Click "Today's ABA Foundations: From Compliance to Compassion". Expected: /courses/todays-aba-foundations shows 3.5 CEUs, $129 with SAVE $30, outcomes and 3 modules.
3. Click "Add to cart". Expected: the cart drawer slides in with the course, 3.5 CEUs and a $129 total.
4. Click "Sign in to enroll". Expected: the sign-in modal opens. Enter name "Test Learner", email test.learner@example.com, credential BCBA, then "Create my free account". The modal closes and the cart badge still shows 1.
5. Reopen the cart and click "Enroll now - start learning". Expected: /dashboard lists the course under Continue learning at 0% complete with 0 CEUs earned.
6. Click "Continue" on the course card. Expected: /learn/todays-aba-foundations with a 0% progress bar, module accordions and a final quiz button.
7. Tick the round checkbox beside any lesson, then click "Take the final CEU quiz". Expected: progress rises above 0% and the quiz opens with "Submit quiz (0/5 answered)".
8. Answer all 5 questions and click "Submit quiz". Expected: 80% or more shows "You passed with X%" and adds 3.5 CEUs; below 80% offers a free retake.
9. Click "View my certificate" and copy the Verification ID. Then open /verify, paste the ID and click Verify. Expected: "Valid certificate" with the course title, 3.5 CEUs and ACE provider OP-24-1107.

## Test data

- Name on certificate: `Test Learner`
- Email: `test.learner@example.com`
- Credential: `BCBA`
- Course: *Today's ABA Foundations: From Compliance to Compassion* (`todays-aba-foundations`) — $129, 3.5 CEUs, 5 quiz questions, 80% to pass
- If you detour through `/checkout` for a team purchase, the card fields are a demo: `4242 4242 4242 4242`, `12/34`, `123` — nothing is charged
- Certificate ID: generated in the browser when a quiz is passed, format `TAA-XXXXXX-XXXX`

## Missing inputs

- **Public app URL** — none was supplied, so the handoff link carries no `&url=` parameter and nothing is invented. This app only runs on localhost from this repository.
- **Test account** — none needed: the sign-in modal creates a local demo profile (no password, no backend). No credentials should be entered anywhere in this flow.
- **Certificate ID** — not known in advance; it is generated on this device when a quiz is passed and can be read on the certificate screen.

## Run it in Rill

[Open your walkthrough in Rill](https://userill.dev/freebuff?utm_source=freebuff&utm_medium=paid&utm_campaign=rill&bfcid=bfc_1.eyJpZCI6ImM1NzM1YjA3LWJmNTMtNDdjZS04OTEzLWZiNjU5YmYwMTVhMCIsImMiOiIxNDQyMTUzOS1kYjNiLTQ1YzEtYjQ5OC1hYTMxOTFmNDkxYzAiLCJrIjoiNDU4ODZlNWEtYzkyZC00ZDUxLTg1ZjgtYzc4YTRmMTY3ZWYwIiwiaWF0IjoxNzkyNTY4NjQ4fQ.hz0sbFyZp2gAucthiUwZHTmTF2miA-DOcbqo9gY3_8U#task=1.%20Open%20the%20app%20and%20go%20to%20%2Fcourses.%20Expected%3A%209%20course%20cards%20with%20CEU%20counts%20and%20prices%2C%20plus%20category%20filter%20chips.%0A2.%20Click%20%22Today%27s%20ABA%20Foundations%3A%20From%20Compliance%20to%20Compassion%22.%20Expected%3A%20%2Fcourses%2Ftodays-aba-foundations%20shows%203.5%20CEUs%2C%20%24129%20with%20SAVE%20%2430%2C%20outcomes%20and%203%20modules.%0A3.%20Click%20%22Add%20to%20cart%22.%20Expected%3A%20the%20cart%20drawer%20slides%20in%20with%20the%20course%2C%203.5%20CEUs%20and%20a%20%24129%20total.%0A4.%20Click%20%22Sign%20in%20to%20enroll%22.%20Expected%3A%20the%20sign-in%20modal%20opens.%20Enter%20name%20%22Test%20Learner%22%2C%20email%20test.learner%40example.com%2C%20credential%20BCBA%2C%20then%20%22Create%20my%20free%20account%22.%20The%20modal%20closes%20and%20the%20cart%20badge%20still%20shows%201.%0A5.%20Reopen%20the%20cart%20and%20click%20%22Enroll%20now%20-%20start%20learning%22.%20Expected%3A%20%2Fdashboard%20lists%20the%20course%20under%20Continue%20learning%20at%200%25%20complete%20with%200%20CEUs%20earned.%0A6.%20Click%20%22Continue%22%20on%20the%20course%20card.%20Expected%3A%20%2Flearn%2Ftodays-aba-foundations%20with%20a%200%25%20progress%20bar%2C%20module%20accordions%20and%20a%20final%20quiz%20button.%0A7.%20Tick%20the%20round%20checkbox%20beside%20any%20lesson%2C%20then%20click%20%22Take%20the%20final%20CEU%20quiz%22.%20Expected%3A%20progress%20rises%20above%200%25%20and%20the%20quiz%20opens%20with%20%22Submit%20quiz%20%280%2F5%20answered%29%22.%0A8.%20Answer%20all%205%20questions%20and%20click%20%22Submit%20quiz%22.%20Expected%3A%2080%25%20or%20more%20shows%20%22You%20passed%20with%20X%25%22%20and%20adds%203.5%20CEUs%3B%20below%2080%25%20offers%20a%20free%20retake.%0A9.%20Click%20%22View%20my%20certificate%22%20and%20copy%20the%20Verification%20ID.%20Then%20open%20%2Fverify%2C%20paste%20the%20ID%20and%20click%20Verify.%20Expected%3A%20%22Valid%20certificate%22%20with%20the%20course%20title%2C%203.5%20CEUs%20and%20ACE%20provider%20OP-24-1107.)

Because this app is localhost-only, a cloud Rill run cannot reach it. To capture the walkthrough by hand, record it yourself at https://userill.dev/record?utm_source=freebuff&utm_medium=paid&utm_campaign=rill, or point your existing browser agent at https://userill.dev/docs/agent-quickstart?utm_source=freebuff&utm_medium=paid&utm_campaign=rill and run these steps on your machine.

Your walkthrough is prepared. No recording has been made yet. In Rill, review the steps, add a public app URL, and choose Sign up to run if you need an account. The walkthrough uses Interact mode. Press Run to start it.
