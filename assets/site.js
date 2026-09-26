"use strict";
document.documentElement.classList.add("js");
document.querySelector("#year").textContent = new Date().getFullYear();
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
menuButton.hidden = false;
function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});
const socialContent = {
  live: [
    "EN DIRECTO",
    "01 / 04",
    "↯",
    "¿Listo para un duelo?",
    "Invita a un amigo y jugad en directo con palabras que los dos habéis practicado. Responde, sigue el marcador y descubre quién se lleva la partida.",
    "Necesitáis conexión, el mismo idioma de aprendizaje y vocabulario en común.",
  ],
  challenge: [
    "A VUESTRO RITMO",
    "02 / 04",
    "↗",
    "Deja el reto sobre la mesa.",
    "Juega tu partida y comparte el enlace. Tu amigo lo recibe, responde a su ritmo y te envía su resultado. No hace falta coincidir para picarse un poco.",
    "Los enlaces de reto se abren en RivalWord. Cada jugador necesita la app y el vocabulario del reto.",
  ],
  local: [
    "CARA A CARA",
    "03 / 04",
    "⇄",
    "El pique se queda en casa.",
    "Dos personas, el mismo iPhone. El modo Cara a cara convierte vuestro vocabulario en una partida compartida, sin que cada uno necesite su propio dispositivo.",
    "Abre Cara a cara desde Batallas dentro de la app.",
  ],
  friends: [
    "TU GENTE",
    "04 / 04",
    "☺",
    "Todo empieza con un código.",
    "Comparte tu código de amigo, envía una solicitud y acepta las invitaciones que recibas. Ten a tus amigos a mano para proponerles el próximo duelo.",
    "Las funciones de amigos usan conexión a internet. Puedes gestionar tus amistades y tu cuenta social en la app.",
  ],
};
const socialIds = [
  "social-kicker",
  "social-number",
  "social-symbol",
  "social-title",
  "social-description",
  "social-note",
];
document.querySelectorAll("[data-social]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-social]")
      .forEach((other) =>
        other.setAttribute("aria-pressed", String(other === button)),
      );
    socialContent[button.dataset.social].forEach((value, index) => {
      document.getElementById(socialIds[index]).textContent = value;
    });
  });
});
const questions = [
  {
    word: "Hallo",
    options: ["Adiós", "Hola", "Gracias", "Mañana"],
    answer: "Hola",
  },
  {
    word: "Danke",
    options: ["Casa", "Agua", "Gracias", "Noche"],
    answer: "Gracias",
  },
  {
    word: "Freund",
    options: ["Viaje", "Libro", "Ciudad", "Amigo"],
    answer: "Amigo",
  },
];
let questionIndex = 0;
let points = 0;
let answered = false;
const quizContent = document.querySelector("#quiz-content");
function showQuestion() {
  answered = false;
  const question = questions[questionIndex];
  quizContent.innerHTML = `<span class="quiz-progress">Pregunta ${questionIndex + 1} de 3 · Alemán</span><h3 class="quiz-word" lang="de" tabindex="-1">${question.word}</h3><div class="quiz-options">${question.options.map((option) => `<button type="button">${option}</button>`).join("")}</div><p id="quiz-feedback" role="status">Elige su significado en español.</p><button class="button quiz-next" type="button" hidden>${questionIndex === 2 ? "Ver resultado" : "Siguiente"} <span aria-hidden="true">→</span></button>`;
  quizContent.querySelector("h3").focus({ preventScroll: true });
  quizContent.querySelectorAll(".quiz-options button").forEach((button) =>
    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const correct = button.textContent === question.answer;
      if (correct) points++;
      quizContent.querySelectorAll(".quiz-options button").forEach((option) => {
        option.disabled = true;
        if (option.textContent === question.answer)
          option.classList.add("correct");
      });
      if (!correct) button.classList.add("wrong");
      document.querySelector("#quiz-feedback").textContent = correct
        ? "¡Exacto! Una palabra más que ya sabes."
        : `La respuesta es «${question.answer}». Ahora ya la sabes.`;
      const next = quizContent.querySelector(".quiz-next");
      next.hidden = false;
      next.focus({ preventScroll: true });
    }),
  );
  quizContent.querySelector(".quiz-next").addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < questions.length) showQuestion();
    else {
      quizContent.innerHTML = `<span class="quiz-icon" aria-hidden="true">✦</span><h3 tabindex="-1">${points} de 3. ¡Bien jugado!</h3><p>${points === 3 ? "Te llevas tres palabras y ganas de otra partida." : "Cada intento cuenta. Vuelve a jugar y comprueba lo que recuerdas."}</p><button class="button" type="button" id="quiz-restart">Volver a jugar <span aria-hidden="true">↻</span></button>`;
      quizContent.querySelector("h3").focus({ preventScroll: true });
      document
        .querySelector("#quiz-restart")
        .addEventListener("click", startQuiz);
    }
  });
}
function startQuiz() {
  questionIndex = 0;
  points = 0;
  showQuestion();
}
document.querySelector("#quiz-start").addEventListener("click", startQuiz);
const flashWords = {
  de: {
    label: "ALEMÁN",
    words: [
      ["Hallo", "Hola"],
      ["Danke", "Gracias"],
      ["Freund", "Amigo"],
    ],
  },
  en: {
    label: "INGLÉS",
    words: [
      ["Hello", "Hola"],
      ["Thank you", "Gracias"],
      ["Friend", "Amigo"],
    ],
  },
  fr: {
    label: "FRANCÉS",
    words: [
      ["Bonjour", "Hola"],
      ["Merci", "Gracias"],
      ["Ami", "Amigo"],
    ],
  },
  bg: {
    label: "BÚLGARO",
    words: [
      ["Здравей", "Hola"],
      ["Благодаря", "Gracias"],
      ["Приятел", "Amigo"],
    ],
  },
  es: {
    label: "ESPAÑOL · TRADUCCIÓN AL INGLÉS",
    words: [
      ["Hola", "Hello"],
      ["Gracias", "Thank you"],
      ["Amigo", "Friend"],
    ],
  },
};
let flashLanguage = "de";
let flashIndex = 0;
const flashcard = document.querySelector(".flashcard");
const flashWord = document.querySelector("#flash-word");
const flashTranslation = document.querySelector("#flash-translation");
const revealButton = document.querySelector(".flash-reveal");
const flashStatus = document.querySelector("#flash-status");
const stamp = document.querySelector(".swipe-stamp");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const ratings = {
  known: {
    label: "Aprendida",
    x: 1,
    y: 0,
    message: "Una palabra más que ya sabes.",
  },
  again: {
    label: "No aprendida",
    x: -1,
    y: 0,
    message: "En la app volverá a aparecer para practicarla.",
  },
  hard: {
    label: "Difícil",
    x: 0,
    y: -1,
    message: "En la app se tendrá en cuenta en tus repasos.",
  },
  "very-hard": {
    label: "Muy difícil",
    x: 0,
    y: 1,
    message: "En la app volverás a practicarla con más frecuencia.",
  },
};
let animation = null;
let startPoint = null;
let tutorialSeen = false;
let revision = 0;
function resetMotion() {
  revision++;
  if (animation) animation.cancel();
  animation = null;
  startPoint = null;
  flashcard.style.transform = "";
  flashcard.dataset.state = "idle";
  delete flashcard.dataset.rating;
}
function renderFlash() {
  document.querySelector("#flash-language").textContent =
    flashWords[flashLanguage].label;
  flashWord.textContent = flashWords[flashLanguage].words[flashIndex][0];
  flashWord.lang = flashLanguage;
  flashTranslation.textContent = "¿Ya sabes qué significa?";
  flashTranslation.lang = "es";
  revealButton.innerHTML =
    'Mostrar traducción <span aria-hidden="true">↗</span>';
}
function showRating(rating) {
  flashcard.dataset.rating = rating;
  stamp.textContent = ratings[rating].label;
}
async function playMotion(frames, duration) {
  animation = flashcard.animate(frames, {
    duration,
    easing: "cubic-bezier(.2,.7,.25,1)",
    fill: "forwards",
  });
  try {
    await animation.finished;
  } catch {
    /* A new gesture or language cancels the old animation. */
  }
}
async function rateFlash(rating) {
  if (
    flashcard.dataset.state === "leaving" ||
    flashcard.dataset.state === "entering"
  )
    return;
  tutorialSeen = true;
  const from = getComputedStyle(flashcard).transform;
  resetMotion();
  const token = revision;
  const choice = ratings[rating];
  showRating(rating);
  flashcard.dataset.state = "leaving";
  if (!reducedMotion.matches) {
    const distance = flashcard.offsetWidth + 100;
    await playMotion(
      [
        { transform: from, opacity: 1 },
        {
          transform: `translate(${choice.x * distance}px, ${choice.y * 430}px) rotate(${choice.x * 22}deg)`,
          opacity: 0,
        },
      ],
      260,
    );
    if (token !== revision) return;
    animation.cancel();
    animation = null;
  }
  const word = flashWords[flashLanguage].words[flashIndex][0];
  flashIndex = (flashIndex + 1) % flashWords[flashLanguage].words.length;
  renderFlash();
  flashStatus.textContent = `«${word}»: ${choice.label}. ${choice.message} Siguiente palabra: ${flashWords[flashLanguage].words[flashIndex][0]}.`;
  delete flashcard.dataset.rating;
  flashcard.dataset.state = "entering";
  if (!reducedMotion.matches) {
    await playMotion(
      [
        { transform: "translateY(12px) scale(.96)", opacity: 0.5 },
        { transform: "none", opacity: 1 },
      ],
      180,
    );
    if (token !== revision) return;
  }
  resetMotion();
}
document.querySelectorAll("[data-language]").forEach((button) =>
  button.addEventListener("click", () => {
    tutorialSeen = true;
    resetMotion();
    flashLanguage = button.dataset.language;
    flashIndex = 0;
    document
      .querySelectorAll("[data-language]")
      .forEach((other) =>
        other.setAttribute("aria-pressed", String(other === button)),
      );
    renderFlash();
    flashStatus.textContent =
      "Desliza: izquierda, No aprendida; derecha, Aprendida.";
  }),
);
revealButton.addEventListener("click", () => {
  if (["leaving", "entering"].includes(flashcard.dataset.state)) return;
  tutorialSeen = true;
  resetMotion();
  flashTranslation.textContent = flashWords[flashLanguage].words[flashIndex][1];
  flashTranslation.lang = flashLanguage === "es" ? "en" : "es";
  revealButton.textContent = "Traducción visible ✓";
});
document
  .querySelectorAll(".flash-actions [data-rating]")
  .forEach((button) =>
    button.addEventListener("click", () => rateFlash(button.dataset.rating)),
  );
function direction(dx, dy) {
  return Math.abs(dx) >= Math.abs(dy)
    ? dx > 0
      ? "known"
      : "again"
    : dy < 0
      ? "hard"
      : "very-hard";
}
flashcard.addEventListener("pointerdown", (event) => {
  if (
    event.target.closest("button") ||
    !event.isPrimary ||
    event.button !== 0 ||
    ["leaving", "entering"].includes(flashcard.dataset.state)
  )
    return;
  tutorialSeen = true;
  resetMotion();
  flashcard.focus({ preventScroll: true });
  flashcard.dataset.state = "dragging";
  startPoint = { x: event.clientX, y: event.clientY, id: event.pointerId };
  flashcard.setPointerCapture(event.pointerId);
});
flashcard.addEventListener("pointermove", (event) => {
  if (!startPoint || event.pointerId !== startPoint.id) return;
  const dx = event.clientX - startPoint.x,
    dy = event.clientY - startPoint.y;
  flashcard.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.max(-20, Math.min(20, dx / 14))}deg)`;
  if (Math.max(Math.abs(dx), Math.abs(dy)) > 18) showRating(direction(dx, dy));
  else delete flashcard.dataset.rating;
});
async function springBack() {
  const from = getComputedStyle(flashcard).transform;
  resetMotion();
  const token = revision;
  if (!reducedMotion.matches) {
    flashcard.dataset.state = "entering";
    await playMotion([{ transform: from }, { transform: "none" }], 220);
    if (token !== revision) return;
  }
  resetMotion();
}
flashcard.addEventListener("pointerup", (event) => {
  if (!startPoint || event.pointerId !== startPoint.id) return;
  const dx = event.clientX - startPoint.x,
    dy = event.clientY - startPoint.y;
  startPoint = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) >= 65) rateFlash(direction(dx, dy));
  else springBack();
});
flashcard.addEventListener("pointercancel", () => {
  if (startPoint) springBack();
});
flashcard.addEventListener("lostpointercapture", () => {
  if (startPoint) springBack();
});
flashcard.addEventListener("keydown", (event) => {
  if (event.target !== flashcard) return;
  const keyRatings = {
    ArrowLeft: "again",
    ArrowRight: "known",
    ArrowUp: "hard",
    ArrowDown: "very-hard",
  };
  if (keyRatings[event.key]) {
    event.preventDefault();
    rateFlash(keyRatings[event.key]);
  }
  if (event.key === "Escape") springBack();
});
async function demonstrateSwipe() {
  if (["leaving", "entering", "dragging"].includes(flashcard.dataset.state))
    return;
  tutorialSeen = true;
  resetMotion();
  flashStatus.textContent =
    "Hacia la derecha: Aprendida. Hacia la izquierda: No aprendida.";
  if (reducedMotion.matches) return;
  const token = revision;
  flashcard.dataset.state = "tutorial";
  for (const [rating, sign] of [
    ["known", 1],
    ["again", -1],
  ]) {
    showRating(rating);
    await playMotion(
      [
        { transform: "none" },
        {
          transform: `translateX(${sign * 75}px) rotate(${sign * 8}deg)`,
          offset: 0.45,
        },
        {
          transform: `translateX(${sign * 75}px) rotate(${sign * 8}deg)`,
          offset: 0.7,
        },
        { transform: "none" },
      ],
      1000,
    );
    if (token !== revision) return;
    animation.cancel();
    animation = null;
  }
  resetMotion();
}
document
  .querySelector(".swipe-tutorial")
  .addEventListener("click", demonstrateSwipe);
const swipeObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !tutorialSeen && !reducedMotion.matches)
        demonstrateSwipe();
      if (!entry.isIntersecting && flashcard.dataset.state === "tutorial")
        resetMotion();
    }
  },
  { threshold: 0.65 },
);
swipeObserver.observe(document.querySelector(".swipe-viewport"));
reducedMotion.addEventListener("change", () => {
  if (flashcard.dataset.state === "tutorial") resetMotion();
});
