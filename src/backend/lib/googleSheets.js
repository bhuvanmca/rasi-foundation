import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    SCOPES
  );
}

export async function appendBioDataRow(record) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    return;
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    new Date(record.createdAt).toLocaleString('en-IN'),
    record.studentName,
    record.dateOfBirth,
    record.courseApplied,
    record.collegeName,
    record.quota,
    record.fatherName,
    record.community,
    record.address,
    record.studentMobile,
    record.studentEmail,
    record.aadhaarNumber,
    record.fatherMobile,
    record.motherMobile,
    record.plusTwoGroup,
    record.plusTwoExamNumber,
    record.expectedCutOff,
    record.lastSchoolAndPlace,
    record.isGovtSchool ? 'Yes' : 'No',
    record.isFirstGraduate ? 'Yes' : 'No',
    (record.documents || []).join(', '),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}
