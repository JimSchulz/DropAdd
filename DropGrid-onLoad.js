// DropGrid - onLoad

document.getElementById('pbid-UserButton').click();

var table = document.getElementById("pbid-DropGrid");
var userSource = document.getElementById("pbid-UserSource").value;
var regStatus = '';
var dradType = '';
var dradNo = '';
var override = '';
var trackLabel = '';
var consentReg = '';
var i = 0;
var j = 0;

// Populate Track select labels and values
$Track.$load();
document.getElementById('pbid-UserButton').click();

// Validate student has course data
if (table.rows.length > 1) {
  // When table.rows.length = 1, then ignore because the first time in this gets executed twice, its weird
  if (table.rows.length - 1 < 2) {
    // Student has no course data, hide drop section and end this script
    $BlockCourseDrop.$visible = false;
    return;
  }
}

// Loop through all DropGrid rows
for (i=0; i<table.rows.length-1; i++) {

  regStatus = $DropGrid.$data[i].REGSTATUS;
  dradType = $DropGrid.$data[i].DRADTYPE;
  dradHide = $DropGrid.$data[i].DRADHIDE;
  override = $DropGrid.$data[i].OVERRIDE;  // Registrars can override except when this equals N
  trackLabel = $DropGrid.$data[i].TRACKDESC;
  consentReq = $DropGrid.$data[i].DRADCONSENTREQ;
  
  // Show or Hide the Track Select Lists based on regStatus, dradNo, dradType and override
  if (regStatus == 'RE' || regStatus == 'WL') {
    if (userSource == 'R') {
      // Registrar User
      if (override == 'N') {  // Registrars can not override
        if (dradHide == 'Y' || dradType == 'B') {
          document.getElementById("pbid-Track-" + i).style.display = "none";  // Course Limitation - Hide
        }
        else if (dradType == 'C' || dradType == 'D' || dradType == null) {

          if (dradType == 'D' && dradHide == 'Y') {
            // Remove Drop option
            document.getElementById("pbid-Track-" + i).remove(3);
          }

          if (dradType == 'C' && dradHide == 'Y') {
            // Remove Track Change options
            document.getElementById("pbid-Track-" + i).remove(0);
            document.getElementById("pbid-Track-" + i).remove(1);
            document.getElementById("pbid-Track-" + i).remove(2);
          }

          if (document.getElementById("pbid-Track-" + i).length) {
            document.getElementById("pbid-Track-" + i).style.display = "block";  // Ok to Change - Show
          }
          else {
            document.getElementById("pbid-Track-" + i).style.display = "none";  // No options - Hide
          }
        }
        else {
          document.getElementById("pbid-Track-" + i).style.display = "none";  // None of the above - Hide
        }
      }
      else {
        document.getElementById("pbid-Track-" + i).style.display = "block";  // Registrars can override - Show
      }
    }
    else {
      // Student User
      if (dradHide == 'Y' || dradType == 'B') {
        document.getElementById("pbid-Track-" + i).style.display = "none";  // Course Limitation - Hide
      }
      else if (dradType == 'C' || dradType == null) {
        document.getElementById("pbid-Track-" + i).style.display = "block";  // Ok to Change - Show
      }
      else {
        document.getElementById("pbid-Track-" + i).style.display = "none";  // None of the above - Hide
      }
    }
  }
  else {
    document.getElementById("pbid-Track-" + i).style.display = "none";  // Non-Course Output - Hide
  }

  // Select Grading Track option based on database value
  document.getElementById("pbid-Track-" + i).remove(0);  // Remove first option, it's blank
  for (j=0; j < document.getElementById("pbid-Track-" + i).options.length; j++) {
    if (document.getElementById("pbid-Track-" + i).options[j].text == trackLabel) {
      document.getElementById("pbid-Track-" + i).selectedIndex = j;
      break;
    }
  }

  // Mark checkbox with gold shadow to indicated consent requirement 
  if (consentReq == 'Y') {
      document.getElementById("pbid-Track-container-" + i).style.boxShadow = '0px 0px 3px 2px gold';
  }

}  // Close For Loop

// Students are not allowed to change their Grading Track to Audit
if (userSource == 'S') {  // Student
  for (i=0; i<table.rows.length-1; i++) {  // Loop through all DropGrid rows
    trackLabel = document.getElementById("pbid-Track-" + i);
    if (trackLabel.options[trackLabel.selectedIndex].innerHTML != "Audit") {
      document.getElementById("pbid-Track-" + i).remove(2);  // Remove the Audit option
    }
  }
}

// Temporary Code for initial Summer release
//var term = '';
//for (i=0; i<table.rows.length-1; i++) {  // Loop through all DropGrid rows
//  term = $DropGrid.$data[i].ACADPERIOD;
//  if (term != "201730") {
//    document.getElementById("pbid-Track-" + i).style.display = "none";  // Hide Track select list
//  }
//}

// Assgin table label
document.getElementById("pbid-CourseDropLabel").innerHTML = "Course Drops and Grading Track Changes";

// Show CourseDropForm & DropCourseButtonsForm
$CourseDropForm.$visible = true;
$DropCourseButtonsForm.$visible = true;

document.getElementById('pbid-UserButton').click();