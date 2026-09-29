// Deployed from the "Lions_IS_VAS_Data" Google Sheet's Extensions > Apps Script
// editor (Code.gs there is the source of truth at runtime; this file is a
// version-controlled copy for review/history).

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);

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
