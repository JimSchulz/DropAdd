// StuSelect - onLoad

document.getElementById('pbid-StuSearch').click();

if (document.getElementById('pbid-StuSelect').options.length > 1) {
  document.getElementById('pbid-StuSelect').options[0].text = 'Select a Student';
}
else {
  document.getElementById('pbid-StuSelect').options[0].text = 'No Students Found';
}