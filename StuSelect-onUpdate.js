// StuSelect - onUpdate

// Selected student is changing

if (document.getElementById('pbid-PassPIDM').value != null) {
  // Delete the prior PIDM's SZRDRAD records
  $deleteSZRDRAD.$post({
    stu_pidm: document.getElementById('pbid-PassPIDM').value
  },
  null,
  function(response) {
    // Success!   
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
      alert("StuSelect - Delete SZRDRAD Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }
  });
}

// Assign chosen student's values
var stuSelect = $StuSelect.$selected?$StuSelect.$selected.STU_PIDM:null;
$PassPIDM = $StuSelect.$selected?$StuSelect.$selected.STU_PIDM:null;
var userSource = document.getElementById('pbid-UserSource').value;

if (stuSelect != null) {

  // Procedure call - Student Check - This loads the SZRDRAD table
  $studentCheck.$post({
    stu_pidm: stuSelect,
    user_source: userSource
  },
  null,
  function(response) {
    // Success!

    // Procedure call - Drop Check - This checks course drops
    $dropCheck.$post({
      stu_pidm: stuSelect,
      user_source: userSource,
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
      $AddEntryStuName.$load();
      $AddEntryStuClass.$load();
      $AddMessage.$load({clearCache:true});
      $DropMessage.$load({clearCache:true});
      $AddButtonText.$load({clearCache:true});
      $Processing.$load({clearCache:true});
      $DropGrid.$load({clearCache:true});
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
        alert("dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
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
      alert("studentCheck Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }
  });

}
else {
  // Hide the BlockCourseAddEntry and BlockCourseDrop objects
  $BlockCourseAddEntry.$visible = false;
  $BlockNull03.$visible = false;
  $BlockCourseDrop.$visible = false;

  // Hide the Class Search and Result objects
  $BlockClassSearch.$visible = false;
  $BlockNull05.$visible = false;
  $BlockCourseAdd.$visible = false;
}

// Reset and Hide Add Verify fields
$AddVerifyForm.$visible = false;
document.getElementById("pbid-AddVerifyCIDTitle").value = '';
document.getElementById("pbid-AddVerifyInstructor").value = '';
document.getElementById("pbid-AddVerifyBlockUnit").value = '';

// Make AddTermEntry and AddCRNEntry fields editable during this transaction session.
document.getElementById("pbid-AddTermEntry").disabled=false;
document.getElementById('pbid-AddCRNEntry').readOnly = false;