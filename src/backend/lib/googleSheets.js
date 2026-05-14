export async function appendBioDataRow(record) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return;

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

  await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ row }),
  });
}
