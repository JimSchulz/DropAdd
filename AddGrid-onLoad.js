// AddGrid - onLoad

// Set AddGrid Label

var termSelected = $SearchTermSelect.$selected?$SearchTermSelect.$selected.TERM_VALUE:null;

if (termSelected == null) {
  document.getElementById("pbid-CourseAddSearchLabel").innerHTML = "Choose class schedule criteria to view available courses.";
}
else {
  document.getElementById("pbid-CourseAddSearchLabel").innerHTML = "Class Schedule Search Course Results";
}


// Turn off the checkboxes for non-course rows

document.getElementById('pbid-UserButton').click();

var table = document.getElementById("pbid-AddGrid");
var CRN = '';
var i = 0;

// Loop through all AddGrid rows
for (i=0; i<table.rows.length-1; i++) {

  CRN = $AddGrid.$data[i].CRN;

  if (CRN == '<b>CRN</b>' || CRN == '' || CRN == null) {
    document.getElementById("pbid-AddCourse-" + i).style.display = "none";  // Hide Checkbox
  }

}  // Close For Loop

document.getElementById('pbid-UserButton').click();