"use strict";

(() => {
  const token = document.currentScript?.dataset.siteToken || "";

  // Aucun appel externe sans configuration, en local ou sur une copie du site.
  if (
    !/^[a-f0-9]{32}$/i.test(token) ||
    window.location.protocol !== "https:" ||
    window.location.hostname !== "wafamiledi.github.io"
  ) {
    return;
  }

  // Respecter les préférences de confidentialité exprimées par le navigateur.
  if (
    navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1"
  ) {
    return;
  }

  if (document.querySelector("script[data-cf-beacon]")) return;

  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.async = true;
  beacon.referrerPolicy = "strict-origin-when-cross-origin";
  // Les liens #contact, #projects… ne sont pas des pages supplémentaires.
  beacon.dataset.cfBeacon = JSON.stringify({ token, spa: false });
  document.head.appendChild(beacon);
})();
