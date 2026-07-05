const byId = (id) => document.getElementById(id);

const languages = {
  en: {
    htmlLang: "en",
    navWork: "Work",
    navPrograms: "Programs",
    navTalk: "Talk",
    navContact: "Contact",
    languageLabel: "Language",
    focusKicker: "Focus",
    strengthsTitle: "Where I create value",
    skillsKicker: "Technical skills",
    skillsTitle: "The working toolkit",
    experienceKicker: "Experience",
    experienceTitle: "Recent work",
    programsKicker: "Selected programs",
    programsTitle: "Network programs and delivery proof",
    askKicker: "Ask Marta",
    askTitle: "Talk with me about the work.",
    askBody: "Ask about fixed network planning, mobile backhaul, microwave, RAN operations, tools, vendors, or target roles.",
    questionLabel: "Question",
    questionPlaceholder: "Ask me about Telefónica planning, Vodafone microwave coordination, RAN integration, languages, tools, or senior role fit...",
    sendButton: "Send",
    sending: "Sending",
    thinking: "Thinking...",
    askButton: "Ask Marta",
    contactButton: "Contact",
    viewProject: "View project",
    credentialsKicker: "Credentials",
    educationKicker: "Education",
    interestsKicker: "Interests",
    footerText: "Available for senior telecom engineering, planning and delivery conversations.",
    unavailable: "Profile content is temporarily unavailable.",
    errorPrefix: "I could not answer that yet."
  },
  de: {
    htmlLang: "de",
    navWork: "Erfahrung",
    navPrograms: "Programme",
    navTalk: "Chat",
    navContact: "Kontakt",
    languageLabel: "Sprache",
    focusKicker: "Fokus",
    strengthsTitle: "Wo ich Mehrwert schaffe",
    skillsKicker: "Technische Kompetenzen",
    skillsTitle: "Das operative Werkzeugset",
    experienceKicker: "Erfahrung",
    experienceTitle: "Aktuelle Arbeit",
    programsKicker: "Ausgewählte Programme",
    programsTitle: "Netzwerkprogramme und Lieferqualität",
    askKicker: "Marta fragen",
    askTitle: "Sprechen Sie mit mir über meine Arbeit.",
    askBody: "Fragen Sie zu Fixed Network Planning, Mobile Backhaul, Microwave, RAN Operations, Tools, Vendoren oder passenden Senior-Rollen.",
    questionLabel: "Frage",
    questionPlaceholder: "Fragen Sie zu Telefónica-Planung, Vodafone-Microwave-Koordination, RAN-Integration, Sprachen, Tools oder Senior-Rollen...",
    sendButton: "Senden",
    sending: "Senden",
    thinking: "Ich denke nach...",
    askButton: "Marta fragen",
    contactButton: "Kontakt",
    viewProject: "Projekt ansehen",
    credentialsKicker: "Zertifikate",
    educationKicker: "Ausbildung",
    interestsKicker: "Interessen",
    footerText: "Verfügbar für Gespräche über Senior Telecom Engineering, Planung und Delivery.",
    unavailable: "Profilinhalte sind vorübergehend nicht verfügbar.",
    errorPrefix: "Ich konnte das noch nicht beantworten."
  },
  fr: {
    htmlLang: "fr",
    navWork: "Expérience",
    navPrograms: "Programmes",
    navTalk: "Échanger",
    navContact: "Contact",
    languageLabel: "Langue",
    focusKicker: "Focus",
    strengthsTitle: "Là où j'apporte de la valeur",
    skillsKicker: "Compétences techniques",
    skillsTitle: "La boîte à outils opérationnelle",
    experienceKicker: "Expérience",
    experienceTitle: "Expérience récente",
    programsKicker: "Programmes sélectionnés",
    programsTitle: "Programmes réseau et qualité de livraison",
    askKicker: "Demander à Marta",
    askTitle: "Parlez-moi de mon travail.",
    askBody: "Posez une question sur la planification réseau fixe, le backhaul mobile, le microwave, les opérations RAN, les outils, les fournisseurs ou les rôles senior adaptés.",
    questionLabel: "Question",
    questionPlaceholder: "Posez une question sur la planification Telefónica, la coordination microwave Vodafone, l'intégration RAN, les langues, les outils ou les rôles senior...",
    sendButton: "Envoyer",
    sending: "Envoi",
    thinking: "Réflexion...",
    askButton: "Demander à Marta",
    contactButton: "Contact",
    viewProject: "Voir le projet",
    credentialsKicker: "Certifications",
    educationKicker: "Formation",
    interestsKicker: "Intérêts",
    footerText: "Disponible pour des échanges sur l'ingénierie télécom senior, la planification et la livraison.",
    unavailable: "Le contenu du profil est temporairement indisponible.",
    errorPrefix: "Je n'ai pas encore pu répondre à cette question."
  },
  ro: {
    htmlLang: "ro",
    navWork: "Experiență",
    navPrograms: "Programe",
    navTalk: "Discuție",
    navContact: "Contact",
    languageLabel: "Limbă",
    focusKicker: "Focus",
    strengthsTitle: "Unde aduc valoare",
    skillsKicker: "Competențe tehnice",
    skillsTitle: "Setul de instrumente tehnice",
    experienceKicker: "Experiență",
    experienceTitle: "Experiență recentă",
    programsKicker: "Programe selectate",
    programsTitle: "Programe de rețea și calitatea livrării",
    askKicker: "Întreab-o pe Marta",
    askTitle: "Vorbește cu mine despre activitatea mea.",
    askBody: "Întreabă despre planificare rețele fixe, mobile backhaul, microwave, operațiuni RAN, instrumente, furnizori sau roluri senior potrivite.",
    questionLabel: "Întrebare",
    questionPlaceholder: "Întreabă despre planificarea Telefónica, coordonarea microwave Vodafone, integrare RAN, limbi, instrumente sau roluri senior...",
    sendButton: "Trimite",
    sending: "Se trimite",
    thinking: "Mă gândesc...",
    askButton: "Întreab-o pe Marta",
    contactButton: "Contact",
    viewProject: "Vezi proiectul",
    credentialsKicker: "Certificări",
    educationKicker: "Educație",
    interestsKicker: "Interese",
    footerText: "Disponibilă pentru discuții despre inginerie telecom senior, planificare și livrare.",
    unavailable: "Conținutul profilului este temporar indisponibil.",
    errorPrefix: "Nu am putut răspunde încă la această întrebare."
  }
};

let currentLanguage = localStorage.getItem("language") || "en";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const listItems = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const loadProfile = async (language = "en") => {
  const response = await fetch(`/content/profile.${language}.json`);
  if (!response.ok) throw new Error("Could not load profile content");
  return response.json();
};

const t = (key) => languages[currentLanguage]?.[key] || languages.en[key] || key;

const applyTranslations = () => {
  const language = languages[currentLanguage] || languages.en;
  document.documentElement.lang = language.htmlLang;
  byId("language-select").value = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  byId("question").placeholder = t("questionPlaceholder");
};

const parseStreamEvent = (eventBlock) => {
  const event = { event: "message", data: "" };

  for (const line of eventBlock.split("\n")) {
    if (line.startsWith("event:")) event.event = line.slice(6).trim();
    if (line.startsWith("data:")) event.data += line.slice(5).trimStart();
  }

  return {
    event: event.event,
    data: event.data ? JSON.parse(event.data) : {}
  };
};

const readEventStream = async (response, onEvent) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

    const events = buffer.split(/\n\n/);
    buffer = events.pop() || "";

    for (const eventBlock of events) {
      if (eventBlock.trim()) onEvent(parseStreamEvent(eventBlock));
    }

    if (done) break;
  }

  if (buffer.trim()) onEvent(parseStreamEvent(buffer));
};

const renderProfile = (profile) => {
  document.title = profile.name;
  byId("hero-role").textContent = `${profile.role} · ${profile.location}`;
  byId("hero-title").textContent = profile.headline;
  byId("hero-summary").textContent = profile.summary;
  byId("portrait").src = profile.portrait;
  byId("portrait").alt = profile.name;
  byId("email-link").href = `mailto:${profile.email}`;
  byId("email-link").textContent = profile.email;

  const phoneLink = byId("phone-link");
  if (profile.phone) {
    phoneLink.hidden = false;
    phoneLink.href = `tel:${profile.phone.replaceAll(/\D/g, "")}`;
    phoneLink.textContent = profile.phone;
  } else {
    phoneLink.hidden = true;
    phoneLink.removeAttribute("href");
    phoneLink.textContent = "";
  }

  byId("hero-links").innerHTML = [
    `<a class="button" href="#interview">${escapeHtml(t("askButton"))}</a>`,
    `<a class="button secondary" href="#contact">${escapeHtml(t("contactButton"))}</a>`,
    ...profile.links.map((link) => (
      `<a class="button secondary" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
    ))
  ].join("");

  byId("strengths").innerHTML = profile.strengths
    .map((strength) => `<div class="strength-item">${escapeHtml(strength)}</div>`)
    .join("");

  byId("skills").innerHTML = profile.skills.map((skillGroup) => `
    <article class="skill-card">
      <h3>${escapeHtml(skillGroup.group)}</h3>
      <p>${skillGroup.items.map(escapeHtml).join(" · ")}</p>
    </article>
  `).join("");

  byId("experience").innerHTML = profile.experience.map((job) => `
    <article class="timeline-item">
      <p class="timeline-meta">${escapeHtml(job.period)} · ${escapeHtml(job.location)}</p>
      <h3>${escapeHtml(job.title)} · ${escapeHtml(job.company)}</h3>
      <ul>${listItems(job.bullets)}</ul>
    </article>
  `).join("");

  byId("project-list").innerHTML = profile.projects.map((project) => `
    <article class="project-card">
      <p class="project-type">${escapeHtml(project.type)}</p>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.description)}</p>
      ${project.period ? `<p class="project-period">${escapeHtml(project.period)}</p>` : ""}
      <div class="tags">${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <ul>${listItems(project.bullets)}</ul>
      ${project.href ? `<a class="project-link" href="${escapeHtml(project.href)}" target="_blank" rel="noreferrer">${escapeHtml(t("viewProject"))}</a>` : ""}
    </article>
  `).join("");

  byId("certifications").innerHTML = listItems(profile.certifications);
  byId("education").innerHTML = profile.education
    .map((item) => `<li><strong>${escapeHtml(item.school)}</strong><br>${escapeHtml(item.details)}</li>`)
    .join("");
  byId("interests").innerHTML = listItems(profile.interests);
};

const setupInterview = () => {
  const form = byId("ask-form");
  const question = byId("question");
  const answer = byId("answer");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const value = question.value.trim();
    if (!value) return;

    button.disabled = true;
    button.textContent = t("sending");
    answer.textContent = t("thinking");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Accept": "text/event-stream",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: value, stream: true, language: currentLanguage })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Request failed");
      }

      if (!response.body || !response.headers.get("Content-Type")?.includes("text/event-stream")) {
        const data = await response.json();
        answer.textContent = data.answer;
        question.value = "";
        return;
      }

      let streamedAnswer = "";

      await readEventStream(response, ({ event, data }) => {
        if (event === "delta") {
          streamedAnswer += data.text || "";
          answer.textContent = streamedAnswer;
        }

        if (event === "error") {
          throw new Error(data.error || "Portfolio chat failed");
        }
      });

      question.value = "";
    } catch (error) {
      answer.textContent = `${t("errorPrefix")} ${error.message}`;
      console.error(error);
    } finally {
      button.disabled = false;
      button.textContent = t("sendButton");
    }
  });
};

const setLanguage = async (language) => {
  currentLanguage = languages[language] ? language : "en";
  localStorage.setItem("language", currentLanguage);
  applyTranslations();

  try {
    renderProfile(await loadProfile(currentLanguage));
  } catch (error) {
    console.error(error);
    byId("hero-summary").textContent = t("unavailable");
  }
};

byId("language-select").addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

setupInterview();
setLanguage(currentLanguage);
