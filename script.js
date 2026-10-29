(() => {
  const cfg = window.WEDDING_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const fullNames = [cfg.groomName, cfg.brideName].filter(n => n && !/Name/.test(n)).join(" & ");
  $("couple-title").textContent = fullNames || "A beautiful beginning";
  $("footer-names").textContent = fullNames || "A family celebration";
  $("event-title").textContent = fullNames ? `${fullNames} — The Wedding` : "The Wedding Celebration";
  $("event-date").textContent = cfg.dateText || "Date to be announced";
  $("event-venue").textContent = [cfg.venueName, cfg.venueAddress].filter(Boolean).join(" · ") || "Venue details to be announced";

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
