/* =====================================================================
   BIOLOGY EXAM HUB – script.js
   ===================================================================== */

/* =====================================================================
   ============== ADD NEW QUIZ HERE (OWNER ONLY) ========================
   =====================================================================
   HOW TO ADD A QUIZ:
   1. Find the line below that says "PASTE NEW QUIZZES BELOW THIS LINE".
   2. Copy one block like this (from { to },) and paste it right after
      that line:

      {
        title: "Your Test Name",
        category: "Zoology",
        questions: 50,
        description: "Short description of the test",
        link: "https://your-quiz-link-here"
      },

   3. Change the 5 values. KEEP the quotation marks " " and the comma
      at the end of every block.
   4. "category" must be EXACTLY one of:
        NEET Biology | Zoology | Botany | General Biology | Competitive Exams
   5. Save. The test appears automatically on the website.
   ===================================================================== */

const CATEGORIES = ["NEET Biology", "Zoology", "Botany", "General Biology", "Competitive Exams"];

const QUIZZES = [
  /* ---- PASTE NEW QUIZZES BELOW THIS LINE ---- */

  {
    title: "Human Physiology Test 1",
    category: "Zoology",
    questions: 50,
    description: "Important Human Physiology MCQs",
    link: "PASTE-QUIZ-LINK-HERE"
  },
  {
    title: "NEET Biology Mock Test 1",
    category: "NEET Biology",
    questions: 90,
    description: "Full-length NEET style Biology practice paper",
    link: "PASTE-QUIZ-LINK-HERE"
  },
  {
    title: "Plant Kingdom Test",
    category: "Botany",
    questions: 40,
    description: "Algae, bryophytes, pteridophytes and more",
    link: "PASTE-QUIZ-LINK-HERE"
  }

  /* ---- PASTE NEW QUIZZES ABOVE THIS LINE (keep the comma after each block) ---- */
];

/* =====================================================================
   ============== END OF OWNER AREA – DO NOT EDIT BELOW =================
   ===================================================================== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function cardHTML(q) {
  const ready = q.link && q.link.indexOf("PASTE-QUIZ-LINK") === -1;
  const btn = ready
    ? `<a class="btn main" href="${esc(q.link)}" target="_blank" rel="noopener noreferrer">Start Test</a>`
    : `<span class="btn" aria-disabled="true">Coming soon</span>`;
  return `<article class="card">
    <span class="tag">${esc(q.category)}</span>
    <h3>${esc(q.title)}</h3>
    <p>${esc(q.description)}</p>
    <div class="meta">${esc(q.questions)} questions</div>
    ${btn}
  </article>`;
}

if ($("year")) $("year").textContent = new Date().getFullYear();

/* Home page */
if ($("latestTests")) {
  const latest = QUIZZES.slice(0, 6);
  $("latestTests").innerHTML = latest.length ? latest.map(cardHTML).join("") : '<div class="empty">Tests coming soon.</div>';
  $("categories").innerHTML = CATEGORIES.map((c) => {
    const n = QUIZZES.filter((q) => q.category === c).length;
    return `<a class="card cat" href="tests.html?cat=${encodeURIComponent(c)}">${esc(c)}<div class="meta">${n} test${n === 1 ? "" : "s"}</div></a>`;
  }).join("");
}

/* Tests page */
if ($("tests")) {
  const search = $("search"), filter = $("filter");
  filter.innerHTML = '<option value="">All categories</option>' + CATEGORIES.map((c) => `<option>${esc(c)}</option>`).join("");
  const pre = new URLSearchParams(location.search).get("cat");
  if (pre && CATEGORIES.indexOf(pre) > -1) filter.value = pre;

  function render() {
    const t = search.value.trim().toLowerCase(), c = filter.value;
    const list = QUIZZES.filter((q) =>
      (!c || q.category === c) &&
      (!t || (q.title + " " + q.description + " " + q.category).toLowerCase().indexOf(t) > -1)
    );
    $("count").textContent = list.length + " test" + (list.length === 1 ? "" : "s") + " found";
    $("tests").innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="empty">No tests found. Try another word or category.</div>';
  }
  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
              }
