// DropApplyChanges - Button - onClick

// Building 3 Arrays
//   dropIn - Courses to be dropped
//   changesIn - Grading Tracks to be changed
//   dropPasscodeIn - Consent Passcodes as needed for a course drop

var table = document.getElementById("pbid-DropGrid");
var i = 0;
var summerDropFound = 0;
var dropsIn = '';
var changesIn = '';
var dropPasscodeIn = '';
var trackLabel = '';
var trk;
var paws;
var term = '';
var dropConfirmNormalMsg = "Are you sure you want to apply this change? You may be releasing this seat.  If the class is full, rejoining this class might place you on the waiting-list.";
var dropConfirmSummerMsg = 'FINANCIAL RESPONSIBILITY\n\nStudents may drop a summer on-campus course three (3) weeks before the course start date with no tuition penalty. When a student drops after three (3) weeks prior to the start date, or up to the third day of the course, 30% of tuition is charged. When a student drops a course after the third day of the block, 100% of tuition is charged. In the case that the Wild Card is available, one may forfeit the Wild Card in lieu of tuition charges.';
var dropConfirmMsg = '';

// Loop through all DropGrid rows to find any summer course drop
for (i=0; i<table.rows.length-1; i++) {
  trk = document.getElementById("pbid-Track-" + i);
  term = $DropGrid.$data[i].ACADPERIOD;
  if (trk.options[trk.selectedIndex].text == 'Drop' && term.substring(4,6) == '30') {
    summerDropFound = 1;
    break;
  }
}

// Assign the appropreiate drop confirmation message
if (summerDropFound) {
  dropConfirmMsg = dropConfirmNormalMsg + '\n\n' + dropConfirmSummerMsg;
}
else {
  dropConfirmMsg = dropConfirmNormalMsg;
}

// Prompt user to verify changes
if (confirm(dropConfirmMsg) == true) {

  // Process Drops and/or Grading Track Changes

  // Hide the Add and Drop sections and show the ProcessingData section
  $BlockCourseAddEntry.$visible = false;
  $BlockNull03.$visible = false;
  $BlockCourseDrop.$visible = false;
  $ProcessingData.$visible = true;

  // Loop through all DropGrid rows to build the arrays
  for (i=0; i<table.rows.length-1; i++) {

    trackLabel = $DropGrid.$data[i].TRACKDESC;

    trk = document.getElementById("pbid-Track-" + i);

    if (trk.options[trk.selectedIndex].text == "Drop") {

      // Course being dropped

      if ($DropGrid.$data[i].DRADCONSENTREQ == 'Y') {
        // Course being dropped requires consent

        // Prompt user for course consent code and store entry back into DRADCONSENTREQ
        consentCode = prompt("Consent required for CRN " + $DropGrid.$data[i].CRN + ".", $DropGrid.$data[i].CONSENTCODE);

        if (consentCode == null) {
          // Prompt's Cancel button pressed, clear out consent code
          $DropGrid.$data[i].CONSENTCODE = '';
        }
        else {
          // Prompt's OK button pressed.  Save the entered consent code.
          $DropGrid.$data[i].CONSENTCODE = consentCode;
        }
      }
      else {
        $DropGrid.$data[i].CONSENTCODE = '';
      }

      // Assign dropIn and dropPasscodeIn arrays
      dropsIn = dropsIn + $DropGrid.$data[i].ACADPERIOD + $DropGrid.$data[i].CRN + ",";
      if ($DropGrid.$data[i].CONSENTCODE != null && $DropGrid.$data[i].CONSENTCODE != '') {
        dropPasscodeIn = dropPasscodeIn + $DropGrid.$data[i].ACADPERIOD + $DropGrid.$data[i].CRN + $DropGrid.$data[i].CONSENTCODE + ",";
      }
    }
    else {

      // Assign changesIn array
      if (document.getElementById("pbid-Track-" + i).style.display == 'block') {
        if (trk.options[trk.selectedIndex].text != trackLabel) {

          // Grading Track change

          changesIn = changesIn + $DropGrid.$data[i].ACADPERIOD + $DropGrid.$data[i].CRN + trk.options[trk.selectedIndex].value.slice(-1) + ",";
        }
      }
    }      // Close Drop and Track Change if
  }        // Close For Loop

  // Procedure call - Drop Check - This checks course drops
  $dropCheck.$post({
    stu_pidm: $PassPIDM,
    user_source: document.getElementById('pbid-UserSource').value,
    drops_in: dropsIn,
    changes_in: changesIn,
    passcode_in: dropPasscodeIn
  },
  null,
  function(response) {
    // Success!

    document.getElementById("pbid-CourseDropLabel").innerHTML = "Loading...";
    document.getElementById('pbid-UserButton').click();

    // Show the Add and Drop sections and hide the ProcessingData section
    $BlockCourseAddEntry.$visible = true;
    $BlockNull03.$visible = true;
    $BlockCourseDrop.$visible = true;
    $ProcessingData.$visible = false;

    // Show the BlockCourseAddEntry and BlockCourseDrop objects
    $BlockCourseAddEntry.$visible = true;
    $BlockNull03.$visible = true;
    $BlockCourseDrop.$visible = true;

    // Load Student Information
    $DropGrid.$load({clearCache:true});
    $DropMessage.$load({clearCache:true});
    $AddButtonText.$load({clearCache:true});
    $Processing.$load({clearCache:true});

    // Refresh the Drop Add Data
    document.getElementById('pbid-RefreshDropAddData').click();
    document.getElementById('pbid-RefreshDropAddData').click();

    // Hide the DropGrid buttons
    document.getElementById('pbid-DropApplyChanges').style.display = 'none';
    document.getElementById('pbid-DropReset').style.display = 'none';
  },
  function(response) {
    var errorMessage = response.data.errors?response.data.errors.errorMessage:null;
    if (response.data.errors.errorMessage) {
      errorMsg = response.data.errors.errorMessage;
    }
    else if (response.data.errors[0].errorMessage) {
      errorMsg = response.data.errors[0].errorMessage;
    }
    else {
      errorMsg = errorMessage?errorMessage:response.data;
    }
    if (errorMsg) {

      // Show the Add and Drop sections and hide the ProcessingData section
      $BlockCourseAddEntry.$visible = true;
      $BlockNull03.$visible = true;
      $BlockCourseDrop.$visible = true;
      $ProcessingData.$visible = false;

      alert("DropApplyChanges - onClick - dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }
  });
}
else {

  // Confirm's Cancel button clicked.  Reset the DropGrid.

  // Loop through all DropGrid rows
  for (i=0; i<table.rows.length-1; i++) {
    $DropGrid.$data[i].CONSENTCODE = '';
    $DropGrid.$data[i].DROPCHECKBOX = '0';
  }

  document.getElementById("pbid-CourseDropForm").reset();

  // Procedure call - Student Check - This loads the SZRDRAD table
  $studentCheck.$post({
    stu_pidm: document.getElementById('pbid-PassPIDM').value,
    user_source: document.getElementById('pbid-UserSource').value
  },
  null,
  function(response) {
    // Success!

    // Procedure call - Drop Check - This checks course drops
    $dropCheck.$post({
      stu_pidm: document.getElementById('pbid-PassPIDM').value,
      user_source: document.getElementById('pbid-UserSource').value,
      drops_in: null,
      changes_in: null,
      passcode_in: null
    },
    null,
    function(response) {
      // Success!

      document.getElementById("pbid-CourseDropLabel").innerHTML = "Loading...";
      document.getElementById('pbid-UserButton').click();

      // Show the BlockCourseAddEntry and BlockCourseDrop objects
      $BlockCourseAddEntry.$visible = true;
      $BlockNull03.$visible = true;
      $BlockCourseDrop.$visible = true;

      // Load Student Information
      $StuNameID.$load();
      $AddTermEntry.$load();
      $AddTrackEntry.$load();
      $DropGrid.$load({clearCache:true});
      $AddEntryStuName.$load();
      $AddEntryStuClass.$load();
      $AddMessage.$load({clearCache:true});
      $DropMessage.$load({clearCache:true});
      $AddButtonText.$load({clearCache:true});
      $Processing.$load({clearCache:true});

      // Hide the DropGrid buttons
      document.getElementById('pbid-DropApplyChanges').style.display = 'none';
      document.getElementById('pbid-DropReset').style.display = 'none';
    },
    function(response) {
      var errorMessage = response.data.errors?response.data.errors.errorMessage:null;
      if (response.data.errors.errorMessage) {
        errorMsg = response.data.errors.errorMessage;
      }
      else if (response.data.errors[0].errorMessage) {
        errorMsg = response.data.errors[0].errorMessage;
      }
      else {
        errorMsg = errorMessage?errorMessage:response.data;
      }
      if (errorMsg) {
        alert("DropApplyChanges - onClick - dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
        return;
      }
    });

  },
  function(response) {
    var errorMessage = response.data.errors?response.data.errors.errorMessage:null;
    if (response.data.errors.errorMessage) {
      errorMsg = response.data.errors.errorMessage;
    }
    else if (response.data.errors[0].errorMessage) {
      errorMsg = response.data.errors[0].errorMessage;
    } 
    else {
      errorMsg = errorMessage?errorMessage:response.data;
    }
    if (errorMsg) {
      alert("DropApplyChanges - onClick - studentCheck Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }
  });
}