$(document).ready(function() {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function() {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      if (this.checked) {
          selectedAmenities[amenityId] = amenityName;
      } else {
          delete selectedAmenities[amenityId];
      }

      const amenitiesList = Object.values(selectedAmenities).join(', ');
      $('div.amenities h4').text(amenitiesList);
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: function(data) {
        for (let place of data) {
            let article = $("<article>").appendTo(".places");
            let title = $("<div>").addClass("title_box").appendTo(article);
            $("<h2>").text(place.name).appendTo(title);
            $("<div>").addClass("price_by_night").text(place.price_by_night + "$").appendTo(title);
            let info = $("<div>").addClass("information").appendTo(article);
            $("<div>").addClass("max_guest").text(place.max_guest).appendTo(info);
            $("<div>").addClass("number_rooms").text(place.number_rooms).appendTo(info);
            $("<div>").addClass("number_bathrooms").text(place.number_bathrooms).appendTo(info);
            let description = $("<div>").addClass("description").html(place.description).appendTo(article);
        }
    },
    error: function(error) {
        console.error('Error submitting data:', error);
    }
});

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
      if (data.status === "OK") {
          $('#api_status').addClass('available');
      } else {
          $('#api_status').removeClass('available');
      }
  });
});
