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
});
