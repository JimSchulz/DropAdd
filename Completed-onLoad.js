// Completed - onLoad

// Called from AddCourseEntry - addCheck Post

// Assign Completed value.  This shows us when a course add transaction is completed.

var paws;

function waitForIt() {
  // We pause a moment to allow DB retrieval time for the Completed value
  paws = setTimeout(showHide, 200);
}

function showHide() {
  if ($BlockCourseAddEntry.$visible == true || $ProcessingData.$visible == true) {
    if (document.getElementById("pbid-Completed").value == 'Y') {

      // Course Add Completed!

      // Reset and Hide Add Verify fields
      document.getElementById("pbid-AddVerifyCIDTitle").value = '';
      document.getElementById("pbid-AddVerifyInstructor").value = '';
      document.getElementById("pbid-AddVerifyBlockUnit").value = '';
      $AddVerifyForm.$visible = false;

      // Reset the Term, CRN, Letter Grade, and Consent fields
      document.getElementById("pbid-AddTermEntry").value = '';
      document.getElementById("pbid-AddCRNEntry").value = '';
      document.getElementById("pbid-AddTrackEntry").value = '';
      document.getElementById("pbid-AddConsentEntry").value = '';

      // Reset and Hide the Message area
      document.getElementById("pbid-AddMessage").value = '';
      $AddEntryMessageForm.$visible = false;

      // Make AddTermEntry and AddCRNEntry fields editable
      document.getElementById("pbid-AddTermEntry").disabled = false;
      document.getElementById('pbid-AddCRNEntry').readOnly = false;
  
      // Refresh the Drop Add Data
      document.getElementById('pbid-RefreshDropAddData').click();
      document.getElementById('pbid-RefreshDropAddData').click();

      // Show the Add and Drop sections and hide the ProcessingData section
      $BlockCourseAddEntry.$visible = true;
      $BlockNull03.$visible = true;
      $BlockCourseDrop.$visible = true;
      $ProcessingData.$visible = false;

      alert("Course has been added to your schedule.",{flash:true});
    }
    else {
   
      // Course Validation Occurring

      // Load Add Messages
      $AddMessage.$load({clearCache:true});

      // Load Add Button Text
      $AddButtonText.$load({clearCache:true});

      // Load Consent Required
      $AddConsentRequired.$load({clearCache:true});

      // Reload Processing
      $Processing.$load({clearCache:true});

      // Show the Add and Drop sections and hide the ProcessingData section
      $BlockCourseAddEntry.$visible = true;
      $BlockNull03.$visible = true;
      $BlockCourseDrop.$visible = true;
      $ProcessingData.$visible = false;
    }
  }
}

waitForIt();