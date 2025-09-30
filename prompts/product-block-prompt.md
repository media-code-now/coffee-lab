# Product Block Generator Prompt

```
Act as a CRO copywriter. Write a 150-250 word product block for:
Product: {name}
Use case: {who and why}

Requirements:
- Open with a 2-3 sentence hook that frames the problem and solution.
- Include a “Benefits” list with 4 concise bullets focused on outcomes.
- Add a single-line trust signal (e.g., review count, certifications, or client stat).
- Close with a soft CTA that matches the surrounding page context (e.g., “See how it works”, “Compare plans”).
- Return valid HTML only (no inline styles) so it can be dropped into MDX.

Example structure:
<section>
  <h3>…</h3>
  <p>…</p>
  <ul>
    <li>…</li>
    …
  </ul>
  <p><em>Trust signal</em></p>
  <p><strong>CTA copy</strong></p>
</section>
```
