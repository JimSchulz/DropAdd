// DropMessage - onLoad

// Show or Hide the Drop Message
if (document.getElementById('pbid-DropMessage').value == '' || document.getElementById('pbid-DropMessage').value == null) {
  $CourseDropMessageForm.$visible = false;
}
else {
  $CourseDropMessageForm.$visible = true;
}