// SearchClassSchedule - onClick

// Show/Hide the Class Schedule search section

if ($BlockClassSearch.$visible == false) {
  $BlockNull04.$visible = true;
  $BlockClassSearch.$visible = true;
  $BlockNull05.$visible = true;
  $BlockCourseAdd.$visible = true;
  $SearchTermSelect.$load({clearCache:true});
  $SearchSubjectSelect.$load({clearCache:true});
  $SearchBlockSelect.$load({clearCache:true});
  $SearchInstructorSelect.$load({clearCache:true});
  $SearchDegReqSelect.$load({clearCache:true});
  $SearchCampusSelect.$load({clearCache:true});
  alert("Class Schedule form displayed below.", {flash: true});
}
else {
  $BlockClassSearch.$visible = false;
  $BlockNull05.$visible = false;
  $BlockCourseAdd.$visible = false;
}