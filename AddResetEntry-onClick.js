// AddResetEntry - onClick

document.getElementById("pbid-AddEntryForm").reset();
document.getElementById("pbid-AddVerifyForm").reset();
document.getElementById("pbid-ClassSearch").reset();
document.getElementById("pbid-CourseAddForm").reset();
document.getElementById("pbid-AddConsentEntry-container").style.display = "none";
document.getElementById('pbid-AddTermEntry').disabled = false;
document.getElementById('pbid-AddCRNEntry').readOnly = false;
document.getElementById("pbid-AddVerifyCIDTitle").value = '';
document.getElementById("pbid-AddVerifyInstructor").value = '';
document.getElementById("pbid-AddVerifyBlockUnit").value = '';
document.getElementById("pbid-AddMessage").value = '';
$AddEntryMessageForm.$visible = false;
$AddVerifyForm.$visible = false;
$BlockClassSearch.$visible = false;
$BlockNull05.$visible = false;
$BlockCourseAdd.$visible = false;

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

    // Hide CourseDropForm  & DropCourseButtonsForm
    $CourseDropForm.$visible = false;
    $DropCourseButtonsForm.$visible = false;

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
      alert("AddResetEntry - dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
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
    alert("AddResetEntry - studentCheck Error: " + errorMsg,{type:"error"});  // Display Error
    return;
  }
});

$AddGrid.$load();
$SearchTermSelect.$load();
$AddGrid.$load();  // Loading AddGrid twice clears the AddGrid