// AddConsentRequired - onLoad

if ($AddConsentRequired != '' && $AddConsentRequired != null ) {
  // Course requires consent, show the AddConsentEntry object
  document.getElementById("pbid-AddConsentEntry-container").style.display = "block";
}
else {
  document.getElementById("pbid-AddConsentEntry-container").style.display = "none";
}