# Royal Wedding Invitation Website (Free starter)

A mobile-first static website with a gold envelope-opening animation, your invitation thumbnail, MP4 video, wedding function details, Google Maps button, WhatsApp share button, and RSVP form connected to Google Sheets through Google Apps Script.

## Included
- `index.html`, `styles.css`, `script.js`, `config.js`
- `apps-script.gs` — RSVP backend to paste into Google Apps Script
- `assets/invitation-cover.jpg` — optimised thumbnail
- `assets/wedding-invitation.mp4` — compressed 720x1280 copy of the provided video

## 1. Add your wedding details
Edit `config.js` in a text editor:
- `groomName`, `brideName`
- `dateText` and `dateISO` (dateISO is optional)
- `venueName`, `venueAddress`, `googleMapsUrl`
- function names, dates, times, venues
- `appsScriptUrl` after completing section 2

Do not leave the placeholder names as-is when publishing. Unknown details can remain “to be announced”.

## 2. Connect free RSVP to Google Sheets
1. Create a Google Sheet, e.g. `Wedding RSVPs`.
2. In the sheet, select **Extensions → Apps Script**.
3. Replace the editor content with all of `apps-script.gs` (or open this included file and copy it).
4. Save the project.
5. Select **Deploy → New deployment → Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone**. Google may ask you to authorize it.
7. Click Deploy and copy the Web app URL ending in `/exec`.
8. Paste that URL into `appsScriptUrl` in `config.js`, keeping the quotes.
9. Save and upload the updated `config.js` to your website.
10. Submit one test RSVP. Confirm a new row appears in the Sheet before sending the invite to guests.

**Privacy:** Anyone with the invitation link can submit the RSVP form. Share the Google Sheet only with family members who need to see the responses. Do not put private phone numbers or sensitive information in the public site.

## 3. Publish for free with GitHub Pages
1. Sign in or create an account at https://github.com/.
2. Create a new **Public** repository, e.g. `royal-wedding-invite`.
3. Upload all files and folders from this project. Keep the `assets` folder structure intact.
4. Open the repository **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
6. Wait for the Pages URL to appear. It will look like `https://YOUR-USERNAME.github.io/royal-wedding-invite/`.
7. Open that URL on your phone and test the envelope, video, Maps, WhatsApp sharing and RSVP.
8. Copy the published URL and send it to guests on WhatsApp.

The compressed MP4 is about 720p to load more quickly on phones. Keep the file below GitHub's 100 MB per-file limit; this project includes a compressed copy.

## 4. WhatsApp message
💌 With great joy, we invite you to celebrate our family wedding.

Tap the link to open your royal invitation, watch the video and confirm your attendance:
[PASTE YOUR WEBSITE LINK]

With love,
Our family ❤️

## Troubleshooting
- If the video is missing, check that `assets/wedding-invitation.mp4` uploaded and that the folder/file names match exactly (GitHub Pages paths are case-sensitive).
- If RSVP says it is not connected, set `appsScriptUrl` in `config.js`, upload that updated file, and test again.
- If a Google Apps Script deployment is changed, check its access setting and use the current `/exec` URL.
- WhatsApp previews can take time to refresh and may cache old metadata. The preview image is set to `assets/invitation-cover.jpg`; some messaging apps may still show a cached or generic preview.
- A static site cannot privately restrict each guest link. The RSVP form is public to anyone who has the link.
