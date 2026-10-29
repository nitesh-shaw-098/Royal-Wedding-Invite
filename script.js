(() => {
  const cfg = window.WEDDING_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const fullNames = [cfg.groomName, cfg.brideName].filter(n => n && !/Name/.test(n)).join(" & ");
  $("couple-title").textContent = fullNames || "A beautiful beginning";
  $("footer-names").textContent = fullNames || "A family celebration";
  $("event-title").textContent = fullNames ? `${fullNames} — The Wedding` : "The Wedding Celebration";
  $("event-date").textContent = cfg.dateText || "Date to be announced";
  $("event-venue").textContent = [cfg.venueName, cfg.venueAddress].filter(Boolean).join(" · ") || "Venue details to be announced";

  // Live wedding countdown
  const countdownTarget = new Date(
    cfg.dateISO
  ).getTime();

  const countdownDays = $("countdown-days");
  const countdownHours = $("countdown-hours");
  const countdownMinutes = $("countdown-minutes");
  const countdownSeconds = $("countdown-seconds");
  const countdownMessage = $("countdown-message");

  function updateWeddingCountdown() {
    const remaining = countdownTarget - Date.now();

    if (!Number.isFinite(countdownTarget)) {
      $("wedding-countdown").hidden = true;
      return;
    }

    if (remaining <= 0) {
      countdownDays.textContent = "00";
      countdownHours.textContent = "00";
      countdownMinutes.textContent = "00";
      countdownSeconds.textContent = "00";
      countdownMessage.textContent =
        "The celebration day is here! ❤️";
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownDays.textContent = String(days).padStart(2, "0");
    countdownHours.textContent = String(hours).padStart(2, "0");
    countdownMinutes.textContent = String(minutes).padStart(2, "0");
    countdownSeconds.textContent = String(seconds).padStart(2, "0");
  }

  
  console.log("Countdown target:", cfg.dateISO);
  console.log("Countdown elements:", {
    days: $("countdown-days"),
    hours: $("countdown-hours"),
    minutes: $("countdown-minutes"),
    seconds: $("countdown-seconds")
  });

  updateWeddingCountdown();
  window.setInterval(updateWeddingCountdown, 1000);

  if (cfg.googleMapsUrl && /^https:\/\/(www\.)?google\.[^/]+\/maps/.test(cfg.googleMapsUrl)) {
    $("maps-link").href = cfg.googleMapsUrl;
    $("maps-link").hidden = false;
  }

  const list = $("functions-list");
  (cfg.functions || []).forEach((item) => {
    const card = document.createElement("article");
    card.className = "function-card";
    [item.icon || "✦"].forEach(icon => {
      const iconEl = document.createElement("div"); iconEl.className = "function-icon"; iconEl.textContent = icon; card.appendChild(iconEl);
    });
    const title = document.createElement("h3"); title.textContent = item.name || "Wedding Function"; card.appendChild(title);
    [item.date, item.time, item.venue].filter(Boolean).forEach(line => {
      const p = document.createElement("p"); p.textContent = line; card.appendChild(p);
    });
    list.appendChild(card);
  });

  const scene = $("envelope-scene");
  const openButton = $("open-envelope");
  let opened = false;
  openButton.addEventListener("click", () => {
    if (opened) {
      $("invitation-content").scrollIntoView({behavior:"smooth", block:"start"});
      return;
    }
    opened = true;
    scene.classList.add("opened");
    openButton.setAttribute("aria-label", "Invitation opened. Continue to the wedding details");
    $("tap-hint").textContent = "YOUR INVITATION IS OPEN";
    window.setTimeout(() => {
      $("invitation-content").hidden = false;
      $("invitation-content").scrollIntoView({behavior:"smooth", block:"start"});
    }, 750);
  });

  const form = $("rsvp-form");
  const status = $("form-status");
  const frame = $("rsvp-frame");
  if (cfg.appsScriptUrl) {
    form.action = cfg.appsScriptUrl;
    form.addEventListener("submit", () => {
      status.textContent = "Submitting your RSVP…";
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      window.setTimeout(() => {
        status.textContent = "Thank you! If your response was accepted, the family will receive your RSVP. If unsure, contact the host.";
        btn.disabled = false; btn.innerHTML = 'Send my RSVP <span>✦</span>';
        form.reset();
      }, 1800);
    });
  } else {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "RSVP is not connected yet. The organiser must deploy the included Google Apps Script and add its URL in config.js.";
    });
  }

  const inviteText = () => {
    const title = fullNames ? `${fullNames} — Wedding Invitation` : "Our Wedding Invitation";
    return `💌 ${title}\nYou're warmly invited to celebrate with us.\nOpen the royal invitation here: ${window.location.href}`;
  };
  $("share-whatsapp").addEventListener("click", () => {
    window.open("https://wa.me/?text=" + encodeURIComponent(inviteText()), "_blank", "noopener");
  });
  $("copy-link").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      $("copy-link").textContent = "Invitation link copied ✓";
    } catch {
      window.prompt("Copy your invitation link:", window.location.href);
    }
  });
})();
