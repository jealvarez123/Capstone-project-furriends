console.log("find.js is working");

$('#changeZip').on('submit', function(e) {
  e.preventDefault();
  let newZip = $('#zipcode').val();
  let data = {location: newZip};
  $.ajax({
    method: 'PUT',
    url: '/find',
    data: data
  }).done(function(data) {
  	$('#zipP').text(`Based on your current zipcode of ${newZip}`);
    window.location = "/find"
	});
});
