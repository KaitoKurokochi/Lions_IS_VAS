const dateInput = document.getElementById("date");
dateInput.valueAsDate = new Date();

const infoDialog = document.getElementById("info-dialog");
document.getElementById("info-link").addEventListener("click", () => {
  infoDialog.showModal();
});
document.getElementById("close-dialog").addEventListener("click", () => {
  infoDialog.close();
});

const form = document.getElementById("vas-form");
const saveStatus = document.getElementById("save-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  console.log("VAS submission (backend not wired yet):", data);

  saveStatus.textContent = "保存しました（バックエンド未接続 — コンソールlog参照）";
});
