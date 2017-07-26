// AddCourse - onUpdate

var rows = $AddGrid.$data.length;
var i = 0;
var k = 0;

// Loop through all AddGrid rows
for (i=0; i<rows; i++) {

  if (document.getElementById("pbid-AddCourse-" + i).checked) {

    // User checked an AddGrid's AddCourse checkbox

    // Set Term within the AddEntryForm
    for(k=0; k<document.getElementById('pbid-AddTermEntry').options.length; k++) {
      if (document.getElementById('pbid-AddTermEntry').options[k].innerHTML == $AddGrid.$data[i].TERM) {
        document.getElementById('pbid-AddTermEntry').selectedIndex = k;
        break;
      }
    }

    // Set the CRN within the AddEntryForm
    $AddCRNEntry = $AddGrid.$data[i].CRN;

    // Hide the Class Schedule Search and Class Schedule Search Results sections
    $BlockNull04.$visible = false;
    $BlockClassSearch.$visible = false;
    $BlockCourseAdd.$visible = false;

    // Reset the Class Search Results form
    document.getElementById("pbid-AddCourse-" + i).click();  // Maintain state of checkbox
    document.getElementById("pbid-CourseAddForm").reset();

    break;
  }
}