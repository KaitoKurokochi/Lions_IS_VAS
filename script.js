const dateInput = document.getElementById("date");
dateInput.valueAsDate = new Date();

const infoDialog = document.getElementById("info-dialog");
document.getElementById("info-link").addEventListener("click", () => {
  infoDialog.showModal();
});
document.getElementById("close-dialog").addEventListener("click", () => {
  infoDialog.close();
});

// Both placeholders are replaced at Pages build time from GitHub Actions
// secrets (see .github/workflows/pages.yml) -- never commit real values here.
const APPS_SCRIPT_URL = "__APPS_SCRIPT_URL__";
const VAS_TOKEN = "__VAS_TOKEN__";

const form = document.getElementById("vas-form");
const saveButton = document.getElementById("save-btn");
const saveStatus = document.getElementById("save-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  data.token = VAS_TOKEN;

  saveButton.disabled = true;
  saveStatus.textContent = "送信中...";

  try {
    // text/plain avoids a CORS preflight, which Apps Script web apps don't handle.
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.status === "ok") {
      saveStatus.textContent = "保存しました";
      form.reset();
      dateInput.valueAsDate = new Date();
    } else {
      saveStatus.textContent = "保存に失敗しました。もう一度お試しください。";
    }
  } catch (err) {
    console.error(err);
    saveStatus.textContent = "保存に失敗しました。通信環境をご確認ください。";
  } finally {
    saveButton.disabled = false;
  }
});
