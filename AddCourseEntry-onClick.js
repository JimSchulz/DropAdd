// AddCourseEntry - onClick

document.getElementById('pbid-UserButton').click();

// Retrieve input values from the AddEntryForm
var term = document.getElementById('pbid-AddTermEntry').value;
var crn = document.getElementById('pbid-AddCRNEntry').value;
var track = document.getElementById('pbid-AddTrackEntry').value;
var passcode = document.getElementById('pbid-AddConsentEntry').value;

// Remove the value "string:" which was prefixed via the Class Schedule Search process.
var term = term.substring(term.indexOf(":")+1, term.length);
var crn = crn.substring(crn.indexOf(":")+1,crn.length);
var track = track.substring(track.indexOf(":")+1, track.length);
var passcode = passcode.substring(passcode.indexOf(":")+1, passcode.length);

// CRN maximum value edit
if (crn.length > 5) {
  alert("CRN value is greater than 5 digits.",{flash: true,type:"error"});
  return;
}

$SummerOnCampus.$load({clearCache:true});  // Get the Summer course on-campus indicator

$SummerOffCampus.$load({clearCache:true});  // Get the Summer course off-campus indicator

var paws;

function waitForIt() {
  // We pause a moment to allow DB retrieval time for the OffCampus value
  paws = setTimeout(showHide, 200);
}

function showHide() {

  if (document.getElementById("pbid-SummerOffCampus").value == 'Y') {

    // Course is Summer Off-Campus
    
    // Prompt user to verify Off-Campus Financial Responsibility
    if (confirm("FINANCIAL RESPONSIBILITY:\n\nThe cost for each off-campus summer course consists of two charges that will be billed to your account in April:\n1. Tuition: Students are charged Summer Session tuition for all summer CC units that are not covered by the Wild Card. The Wild Card is automatically applied to the first summer course in which you enroll (with the exception of independent study courses that are not eligible for the Wild Card). Note that the Wild Card covers one unit of tuition and some off-campus summer courses are 1.5 or 2.0 units. The 2017 Summer Session tuition rate is $4,600 per one CC unit of credit.\n2. Program fee: This fee covers the travel related expense of the course such as housing, excursions, entry fees, local transportation, etc.  Some program fees cover meals or partial meals and some cover airfare. It is your responsibility to understand what is included in the program fee and what is not covered.") == true) {
      
      // Prompt user to verify Financial Penalties for Dropping this Course
      if (confirm("FINANCIAL PENALTIES FOR DROPPING THIS COURSE:\n\n1. Students must officially drop this course by turning in a Summer Off-Campus Drop Form to the Registrars Office.  Communicating your intent to your professor is NOT sufficient.\n2. If you drop the course after February 14, 2017 you will incur the following charges on your student account:\n a. 61-90 days prior to course start date: 25% of program fee.\n b. 31-60 days prior to course start date: 50% of program fee.\n c. 22-30 days prior to course start date: 75% of program fee.\n d. 0-21 days prior to course start date: 100% of program fee + 30% of tuition charge.") == true) {
        processAdd();
      }
      else {
        return;  // User pressed the cancel button for Financial Penalties
      }
    }
    else {
      return;  // User pressed the cancel button for Financial Responsibility
    }
  }
  else if (document.getElementById("pbid-SummerOnCampus").value == 'Y') {
  
    // Course is Summer On-Campus

    // Prompt user to verify On-Campus Financial Responsibility
    if (confirm("FINANCIAL RESPONSIBILITY\n\nStudents may drop a summer on-campus course three (3) weeks before the course start date with no tuition penalty. When a student drops after three (3) weeks prior to the start date, or up to the third day of the course, 30% of tuition is charged. When a student drops a course after the third day of the block, 100% of tuition is charged. In the case that the Wild Card is available, one may forfeit the Wild Card in lieu of tuition charges.") == true) {
      processAdd();
    }
    else {
      return;  // User press the cancel button for On-Campus Financial Responsibility
    }
  }
  else {  // Course is not Summer On-Campus and is not Summer Off-Campus
    processAdd();
  }
}

waitForIt();

function processAdd() {
  // Make AddTermEntry and AddCRNEntry fields read-only during this transaction session.
  document.getElementById("pbid-AddTermEntry").disabled = true;
  document.getElementById('pbid-AddCRNEntry').readOnly = true;

  // Hide the Add and Drop sections and show the ProcessingData section
  $BlockCourseAddEntry.$visible = false;
  $BlockNull03.$visible = false;
  $BlockCourseDrop.$visible = false;
  $ProcessingData.$visible = true;

  /* // Debug Code
  alert("passcode="+ passcode,{flash:true});
  alert("track="+ track,{flash:true});
  alert("crn="+ crn,{flash:true});
  alert("term="+ term,{flash:true});
  alert("user_source="+ document.getElementById('pbid-UserSource').value,{flash:true});
  alert("PassPIDM="+ $PassPIDM,{flash:true});
  */

  // Procedure call - Add Check - This checks the course being added
  $addCheck.$post({  // ---------- addCheck Post
    stu_pidm: $PassPIDM,
    user_source: document.getElementById('pbid-UserSource').value,
    term_in: term,
    crn_in: crn,
    track_in: track,
    passcode_in: passcode
  },
  null,
  function(response) {  // ---------- addCheck Success
    // Success!

    // Load verify fields
    $AddVerifyCIDTitle.$load({clearCache:true});
    $AddVerifyInstructor.$load({clearCache:true});
    $AddVerifyBlockUnit.$load({clearCache:true});

    // Load Completed Status
    // This is what tells us when a Course Add transaction is completed.
    $Completed.$load({clearCache:true});
  },
  function(response) {  // ---------- addCheck Error
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

      alert("addCheck Error: " + errorMsg,{type:"error"});  // Display Error
      return;
    }

  });  // ---------- addCheck Close
}