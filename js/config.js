// Settings Isaac changes after deploying. Nothing secret lives here.

// Google Apps Script web app URL that receives leads (see apps-script/Code.gs). Empty = leads are kept
// on the device and exported as CSV from /staff.html.
export const LEAD_URL = '';

// Where the QR codes point. Change once the real address is chosen, then run scripts/make_qr.mjs.
export const PUBLIC_URL = 'https://fitur-booth.pages.dev';

// Shown on screens once known. Leave empty to hide.
export const STAND = '';
