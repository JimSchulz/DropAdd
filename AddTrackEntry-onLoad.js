// AddTrackEntry - onLoad

// Remove the "Audit" option.  Need to resolved this later.
// The Audit option causes an error when trying to add a course.

var hideAudit;

function waitForIt() {
  // We pause a moment to allow DB retrieval time for the AddTrackEntry options
  hideAudit = setTimeout(showHide, 100);
}

function showHide() {
  // Remove both he Audit and Drop options
  document.getElementById('pbid-AddTrackEntry').remove(4);
  document.getElementById('pbid-AddTrackEntry').remove(3);
}

waitForIt();