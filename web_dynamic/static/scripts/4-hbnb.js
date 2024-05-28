$(document).ready(function() {
  let selectedAmenities = {};
  $('input[type="checkbox"]').change(function() {
      let amenityId = $(this).data('id');
      let amenityName = $(this).data('name');
      if ($(this).prop('checked')) {
          selectedAmenities[amenityId] = amenityName;
      } else {
          delete selectedAmenities[amenityId];
      }
      let selectedAmenitiesText = Object.values(selectedAmenities).join(', ');
      $('.amenities h4').text(selectedAmenitiesText);
  });

  $.get("http://127.0.0.1:5001/api/v1/status/", function(data, textStatus)
  {
      if (data.status === "OK") {
          $('#api_status').addClass("available");
      } else {
          $('#api_status').removeClass("available");
      }
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
              let description = $("<div>").addClass("description").text(place.description).appendTo(article);
          }
      },
      error: function(error) {
          console.error('Error submitting data:', error);
      }
  });

  $('button').click(function() {
      console.log("click button");
      $.ajax({
          url: 'http://127.0.0.1:5001/api/v1/places_search/',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({amenities: selectedAmenities}),
          dataType: 'json',
          success: function(data) {
              console.log(data);
              $('.places').empty();
              for (let place of data) {
                  let article = $("<article>").appendTo(".places");
                  let title = $("<div>").addClass("title_box").appendTo(article);
                  $("<h2>").text(place.name).appendTo(title);
                  $("<div>").addClass("price_by_night").text(place.price_by_night + "$").appendTo(title);
                  let info = $("<div>").addClass("information").appendTo(article);
                  $("<div>").addClass("max_guest").text(place.max_guest).appendTo(info);
                  $("<div>").addClass("number_rooms").text(place.number_rooms).appendTo(info);
                  $("<div>").addClass("number_bathrooms").text(place.number_bathrooms).appendTo(info);
                  let description = $("<div>").addClass("description").text(place.description).appendTo(article);
              }
          },
          error: function(error) {
              console.error('Error submitting data:', error);
          }
      });
  });
});
