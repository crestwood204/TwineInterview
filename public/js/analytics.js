$(document).ready(() => {
  $('#location-search').on('click', function(event) {
    event.preventDefault();
    const location = $('#location').val();
    window.location.href = `/analytics?location=${location}`;
  });
});
