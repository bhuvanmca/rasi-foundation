export async function appendBioDataRow(record) {
  const url = process.env.SHEETDB_URL;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        'Date': new Date(record.createdAt).toLocaleString('en-IN'),
        'Student Name': record.studentName,
        'Date of Birth': record.dateOfBirth,
        'Course Applied': record.courseApplied,
        'College': record.collegeName,
        'Quota': record.quota,
        'Father Name': record.fatherName,
        'Community': record.community,
        'Address': record.address,
        'Student Mobile': record.studentMobile,
        'Student Email': record.studentEmail,
        'Aadhaar': record.aadhaarNumber,
        'Father Mobile': record.fatherMobile,
        'Mother Mobile': record.motherMobile,
        '+2 Group': record.plusTwoGroup,
        'Exam Number': record.plusTwoExamNumber,
        'Expected Cut-Off': record.expectedCutOff,
        'Last School': record.lastSchoolAndPlace,
        'Govt School': record.isGovtSchool ? 'Yes' : 'No',
        'First Graduate': record.isFirstGraduate ? 'Yes' : 'No',
        'Documents': (record.documents || []).join(', '),
      }]
    }),
  });
}
