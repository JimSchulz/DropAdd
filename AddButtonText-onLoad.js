// AddButtonText - onLoad

// Assign button label for the AddCourseEntry button

var showHideButton;

function waitForIt() {
  // We pause a moment to allow DB retrieval time for the AddButtonText value
  showHideButton = setTimeout(showHide, 100);
}

function showHide() {
  if (document.getElementById("pbid-AddButtonText").value == '' || document.getElementById("pbid-AddButtonText").value == null) {
    document.getElementById("pbid-AddCourseEntry").style.display = 'none';
    document.getElementById("pbid-AddCourseEntry").innerHTML = ''
  }
  else {
    document.getElementById("pbid-AddCourseEntry").style.display = 'block';
    document.getElementById("pbid-AddCourseEntry").innerHTML = document.getElementById("pbid-AddButtonText").value;
  }
}

waitForIt();