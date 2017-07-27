// CoursesTable - onLoad

var table = document.getElementById("pbid-CoursesTable");
var paws;
var i = 0;
var j = 0;
var k = 0;
var points = 0;

// Initially Hide the DropGrid buttons
document.getElementById('pbid-CoursesUpdate').style.display = 'none';
document.getElementById('pbid-CoursesReset').style.display = 'none';

// Populate Track select labels and values
$Track.$load();

// Allow time for the database call to finish
function waitForIt() {
  paws = setTimeout(go, 200);
}

// Go
function go() {
  for (i=0; i<table.rows.length-1; i++) {
    document.getElementById('pbid-Points-' + i).removeAttribute('readonly');
    points = points + parseInt(document.getElementById('pbid-Points-' + i).value);

    // Select Grading Track option based on database value
    trackLabel = $CoursesTable.$data[i].TRACKDESC;
    if (document.getElementById("pbid-Track-" + i).options.length == 4) {
      document.getElementById("pbid-Track-" + i).remove(0);  // Remove first option, it's blank
    }
    document.getElementById('pbid-UserButton').click();
    for (k=0; k < document.getElementById("pbid-Track-" + i).options.length; k++) {
      if (document.getElementById("pbid-Track-" + i).options[k].text == trackLabel) {
        document.getElementById("pbid-Track-" + i).selectedIndex = k;
        break;
      }
    }
  }

  // Set Styling of Point Total Line
  j = i - 1;
  document.getElementById('pbid-Track-' + j).style.display = 'none';
  document.getElementById('pbid-Points-' + j).readOnly = true;
  document.getElementById('pbid-Points-' + j).style.border = '0px';
  document.getElementById('pbid-Points-' + j).style.boxShadow = 'inset 4px 4px 4px #FFFFFF';
  document.getElementById('pbid-Points-' + j).style.fontWeight = 'bold';
  document.getElementById('pbid-Points-' + j).style.fontSize = '115%';
  document.getElementById('pbid-Points-' + j).style.paddingBottom = '14px';
  document.getElementById('pbid-Points-' + j).style.paddingRight = '21px';
  document.getElementById('pbid-Instructor-' + j).style.fontWeight = 'bold';
  document.getElementById('pbid-Instructor-' + j).style.fontSize = '115%';

  // Save the Total Points Index
  document.getElementById('pbid-TotalPointsIndex').value = j;

  // Show the Add Classes Block
  $BlockNull02.$visible = true;
  $BlockAddClasses.$visible = true;

  // Show or Hide the Student Courses Block
  if (j > 0) {
    $BlockNull03.$visible = true;
    $BlockStuCourses.$visible = true;
  }
  else {
    $BlockNull03.$visible = false;
    $BlockStuCourses.$visible = false;
  }

  document.getElementById('pbid-UserButton').click();
}

waitForIt();