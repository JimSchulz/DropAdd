// AddMessage - onLoad

// Show or Hide the Add Message
if ($AddMessage == '' || $AddMessage == null) {
  $AddEntryMessageForm.$visible = false;
}
else {
  $AddEntryMessageForm.$visible = true;
}