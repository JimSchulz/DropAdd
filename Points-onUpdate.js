// Points - onUpdate

// Update Total Points value

var i = 0;
var j = document.getElementById('pbid-TotalPointsIndex').value;
var points = 0;
var pointTotal = 0;

for (i=0; i<j; i++) {

  // Numeric Input Only
  points = document.getElementById('pbid-Points-' + i).value.replace(/[^0-9]/g,'');
  if (points == '') {
    points = 0;
  }
  points = parseInt(points);
  document.getElementById('pbid-Points-' + i).value = points;

  pointTotal = pointTotal + points;  // Sum points
}

document.getElementById('pbid-Points-' + j).value = pointTotal;  // Update Total Points

if (pointTotal > 40) {
  document.getElementById('pbid-Points-' + j).style.color = 'red';
}
else {
  document.getElementById('pbid-Points-' + j).style.color = 'black';
}

// Show the CoursesButtons
document.getElementById('pbid-CoursesUpdate').style.display = 'block';
document.getElementById('pbid-CoursesReset').style.display = 'block';