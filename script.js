const defaultVastUrl = "https://droopy-management.com/d.muFNzod/G-NrvUZgGbUS/leamt9WuaZAUqlZkIPRTzY/1gMozhcay/NODSM/tZNdjFUlzFNhzRI/0_N/CtZ/sFaxWW1ypNdyD/0/xS";

function playVideo() {
  const url = document.getElementById("m3u8-url").value.trim();
  const vastUrl = document.getElementById("vast-url")?.value.trim() || defaultVastUrl;

  if (!url) return alert("Please enter a stream URL.");

  jwplayer("videoPlayer").setup({
    file: url,
    width: "100%",
    height: "100%",
    aspectratio: "16:9",
    autostart: true,
    mute: false,
    advertising: {
      client: "vast",
      tag: vastUrl
    }
  });

  if ('wakeLock' in navigator) {
    try {
      navigator.wakeLock.request("screen");
    } catch (err) {
      console.warn("Wake Lock not available:", err);
    }
  }
}

function generateEmbedUrl() {
  const url = document.getElementById("m3u8-url").value.trim();
  const baseUrl = window.location.href.replace(/(index\.html)?(#.*)?$/, "");
  const embedUrl = \`\${baseUrl}player.html?url=\${encodeURIComponent(url)}\`;
  document.getElementById("embed-url").value = embedUrl;
}

function copyLink() {
  const embedUrl = document.getElementById("embed-url").value;
  navigator.clipboard.writeText(embedUrl).then(() => {
    const inputField = document.getElementById("embed-url");
    inputField.classList.add("input-highlight");
    setTimeout(() => inputField.classList.remove("input-highlight"), 300);
  }).catch(err => console.error("Error copying:", err));
}

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const streamUrl = params.get("url");
  if (streamUrl && window.location.pathname.includes("player.html")) {
    jwplayer("videoPlayer").setup({
      file: streamUrl,
      width: "100%",
      height: "100%",
      aspectratio: "16:9",
      autostart: true,
      mute: false,
      advertising: {
        client: "vast",
        tag: defaultVastUrl
      }
    });
  }
});
