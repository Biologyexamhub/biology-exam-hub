/* =====================================================================
   BIOLOGY EXAM HUB - script.js
   ===================================================================== */

/* YOUR WHATSAPP NUMBER: 91 + 10 digits, no spaces or + sign */
const WHATSAPP = "917889304588";

/* =====================================================================
   ============== ADD NEW QUIZ HERE (OWNER ONLY) ========================
   =====================================================================
   FREE TEST: use "link" (the Start Test button opens it).
   PAID TEST: use "price" and DO NOT write the quiz link here.
              The Buy Now button opens WhatsApp with your number.
              (Optional: add  buy: "https://your-payment-link"  to use a
               payment link instead of WhatsApp.)

   Free example:
      { title: "Test Name", category: "Zoology", questions: 50,
        description: "Short description", link: "https://quiz-link" },

   Paid example:
      { title: "Test Name", category: "Zoology", questions: 50,
        description: "Short description", price: 49 },

   category must be EXACTLY one of:
   NEET Biology | Zoology | Botany | General Biology | Competitive Exams
   Keep the comma at the end of every block.
   ===================================================================== */

const CATEGORIES = ["NEET Biology", "Zoology", "Botany", "General Biology", "Competitive Exams"];

const QUIZZES = [
  /* ---- PASTE NEW QUIZZES BELOW THIS LINE ---- */

  {
    title: "Cell Biology Test 1",
    category: "NEET Biology",
    questions: 30,
    description: "Important conceptual Cell Biology MCQs",
    link: "PASTE-QUIZ-LINK-HERE"
  },
  {
    title: "Plant Kingdom Test 1",
    category: "Botany",
    questions: 50,
    description: "Algae, bryophytes, pteridophytes, gymnosperms and more",
    link: "PASTE-QUIZ-LINK-HERE"
  },
  {
    title: "Human Physiology Test 1",
    category: "Zoology",
    questions: 50,
    description: "Important Human Physiology MCQs with explanations",
    price: 29
  },
  {
    title: "NEET Biology Mock Test 1",
    category: "NEET Biology",
    questions: 90,
    description: "Full-length 90 question NEET Biology mock with timer",
    price: 49
  }

  /* ---- PASTE NEW QUIZZES ABOVE THIS LINE ---- */
];

/* =====================================================================
   ============== END OF OWNER AREA - DO NOT EDIT BELOW =================
   ===================================================================== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function cardHTML(q) {
  const paid = Number(q.price) > 0;
  let btn;
  if (paid) {
    const href = q.buy || "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hi, I want to buy: " + q.title);
    btn = `<a class="btn main" href="${esc(href)}" target="_blank" rel="noopener noreferrer">Buy Now - ₹${esc(q.price)}</a>`;
  } else if (q.link && q.link.indexOf("PASTE-QUIZ-LINK") === -1) {
    btn = `<a class="btn main" href="${esc(q.link)}" target="_blank" rel="noopener noreferrer">Start Test</a>`;
  } else {
    btn = `<span class="btn" aria-disabled="true">Coming soon</span>`;
  }
  const price = paid ? `<b style="color:#c0392b">Paid ₹${esc(q.price)}</b>` : `<b style="color:#1f8a5b">Free</b>`;
  return `<article class="card">
    <span class="tag">${esc(q.category)}</span>
    <h3>${esc(q.title)}</h3>
    <p>${esc(q.description)}</p>
    <div class="meta">${esc(q.questions)} questions · ${price}</div>
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
