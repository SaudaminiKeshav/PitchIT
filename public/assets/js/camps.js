$(function() {
  // This is for the submit button to pupulate the new camping trip
  $(".submit-trip").on("submit", function(event) {
    event.preventDefault();

    // Values to create a new trip
    var newTrip = {
      camp_site: $("#camp-site").val().trim(),
      date: $("#date").val(),
      people: $("#people").val(),
      supplies: $("#supplies").val()
    };

    // Post new trip
    $.ajax("/api/trips", {
      type: "POST",
      data: newTrip
    }).then(
      function() {
        console.log("created new trip");
        location.reload();
      });
  });

  // Button inside the camping trip card to update it
  $(".update-trip").on("click", function(event) {
    var id = $(this).data("id");
    var newTrip = $(this).data("updateTrip");

    var updateTripState = {
      trip: newTrip
    };

    $.ajax("/api/trips/" + id, {
      type: "PUT",
      data: updateTripState
    }).then(
      function() {
        console.log("changed state to", newTrip);
        location.reload();
      });
  });

    // Button inside the camping trip card to delete it
  $(".delete-trip").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/trips/" + id, {
        type: "DELETE"
    }).then(function() {
        console.log("deleted trip", id);
        location.reload();
    });
  });
});