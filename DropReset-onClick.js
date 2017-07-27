// DropReset - onClick

var table = document.getElementById("pbid-DropGrid");
var i = 0;

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
      alert("DropReset - dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
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
    alert("DropReset - studentCheck Error: " + errorMsg,{type:"error"});  // Display Error
    return;
  }
});