/**
 * Free RSVP collector for the wedding invitation website.
 * 1) Create a Google Sheet.
 * 2) In the Sheet, open Extensions > Apps Script and paste this entire file.
 * 3) Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 4) Copy the Web app URL ending in /exec into config.js as appsScriptUrl.
 *
 * Note: anyone with the link can submit RSVP data. Do not collect sensitive data.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('RSVPs') || spreadsheet.insertSheet('RSVPs');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Submitted at', 'Guest name', 'Attendance', 'Guest count', 'Function', 'Message']);
      sheet.setFrozenRows(1);
    }
    const p = (e && e.parameter) || {};
    const safe = (value) => String(value || '').slice(0, 500).replace(/^[=+\-@]/, "'");
    sheet.appendRow([
      new Date(),
      safe(p.guestName),
      safe(p.attendance),
      safe(p.guestCount),
      safe(p.functionChoice),
      safe(p.message)
    ]);
    return HtmlService.createHtmlOutput(
      '<!doctype html><meta name="viewport" content="width=device-width"><p style="font:16px Arial;padding:24px">Thank you. Your RSVP has been received. You can close this window.</p>'
    );
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<!doctype html><meta name="viewport" content="width=device-width"><p style="font:16px Arial;padding:24px">Sorry, your RSVP could not be saved. Please contact the host.</p>'
    );
  } finally {
    lock.releaseLock();
  }
}
