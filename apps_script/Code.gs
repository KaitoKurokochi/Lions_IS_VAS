// Deployed from the "Lions_IS_VAS_Data" Google Sheet's Extensions > Apps Script
// editor (Code.gs there is the source of truth at runtime; this file is a
// version-controlled copy for review/history).
//
// The shared token is never hardcoded here -- set it once via Project
// Settings > Script properties as SHARED_TOKEN. That value must match the
// VAS_TOKEN GitHub Actions secret, which the Pages build injects into the
// frontend (see .github/workflows/pages.yml and script.js).

function doPost(e) {
  const expectedToken = PropertiesService.getScriptProperties().getProperty("SHARED_TOKEN");
  const data = JSON.parse(e.postData.contents);

  if (!expectedToken || data.token !== expectedToken) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: "unauthorized" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(),
    data.name,
    data.date,
    data.atbat,
    data.concentration,
    data.tension,
    data.anxiety,
    data.thinking,
    data.assertiveness,
    data.atbat_eval,
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(
    ContentService.MimeType.JSON
  );
}
