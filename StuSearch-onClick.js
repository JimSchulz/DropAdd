// StuSearch - onClick

var stuLkup = document.StuLookupForm.StuLookup.value;

if (stuLkup.replace(/^\s+/g, '').length == 0) {
  document.StuLookupForm.StuLookup.focus();
  alert("Student Lookup is empty.", {flash: true,type:"error"});
  return;
}

document.getElementById('pbid-StuSelect').options[0].text = 'Loading...';

$StuSelect.$populateSource();