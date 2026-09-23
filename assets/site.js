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
const flashWord = document.querySelector("#flash-word");
const flashTranslation = document.querySelector("#flash-translation");
const revealButton = document.querySelector(".flash-reveal");
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
document.querySelectorAll("[data-language]").forEach((button) =>
  button.addEventListener("click", () => {
    flashLanguage = button.dataset.language;
    flashIndex = 0;
    document
      .querySelectorAll("[data-language]")
      .forEach((other) =>
        other.setAttribute("aria-pressed", String(other === button)),
      );
    renderFlash();
    document.querySelector("#flash-status").textContent =
      "Nuevo idioma. Prueba la tarjeta.";
  }),
);
revealButton.addEventListener("click", () => {
  flashTranslation.textContent = flashWords[flashLanguage].words[flashIndex][1];
  flashTranslation.lang = flashLanguage === "es" ? "en" : "es";
  revealButton.textContent = "Traducción visible ✓";
});
function rateFlash(rating) {
  const word = flashWords[flashLanguage].words[flashIndex][0];
  flashIndex = (flashIndex + 1) % flashWords[flashLanguage].words.length;
  renderFlash();
  document.querySelector("#flash-status").textContent =
    rating === "known"
      ? `«${word}»: ¡una más que ya sabes!`
      : `«${word}»: márcala para repasar en la app.`;
}
document
  .querySelectorAll("[data-rating]")
  .forEach((button) =>
    button.addEventListener("click", () => rateFlash(button.dataset.rating)),
  );
const flashcard = document.querySelector(".flashcard");
let startPoint = null;
flashcard.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button") || !event.isPrimary || event.button !== 0)
    return;
  startPoint = { x: event.clientX, y: event.clientY, id: event.pointerId };
  flashcard.setPointerCapture(event.pointerId);
});
flashcard.addEventListener("pointerup", (event) => {
  if (!startPoint || startPoint.id !== event.pointerId) return;
  const dx = event.clientX - startPoint.x;
  const dy = event.clientY - startPoint.y;
  startPoint = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
    rateFlash(dx > 0 ? "known" : "again");
});
flashcard.addEventListener("pointercancel", () => {
  startPoint = null;
});
