// RefreshDropAddData - onClick

// This is called from Completed-onLoad and DropApplyChanges-onClick
// This resets the drop/add form by reinitializing the SZRDRAD table.

// Procedure call - Student Check - This loads the SZRDRAD table
$studentCheck.$post({  // ---------- studentCheck Post
  stu_pidm: document.getElementById('pbid-PassPIDM').value,
  user_source: document.getElementById('pbid-UserSource').value
},
null,
function(response) {  // ---------- studentCheck Success
  // Success!

  // Procedure call - Drop Check - This checks course drops
  $dropCheck.$post({  // ---------- dropCheck Post
    stu_pidm: document.getElementById('pbid-PassPIDM').value,
    user_source: document.getElementById('pbid-UserSource').value,
    drops_in: null,
    changes_in: null,
    passcode_in: null
  },
  null,
  function(response) {  // ---------- dropCheck Success
    // Success!

    // Reload the DropGrid
    document.getElementById("pbid-CourseDropLabel").innerHTML = "Loading...";
    document.getElementById('pbid-UserButton').click();
    $DropGrid.$load({clearCache:true});
    $AddButtonText.$load({clearCache:true});
  },
  function(response) {  // ---------- dropCheck Error
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
      alert("AddCompletedButton - dropCheck Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }
  });  // ---------- dropCheck Close

},
function(response) {  // ---------- studentCheck Error
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
    alert("AddCompletedButton - studentCheck Error: " + errorMsg,{type:"error"});  // Display Error
    return;
  }
});  // ---------- studentCheck Close