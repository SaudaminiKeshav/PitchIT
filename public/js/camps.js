$(function () {
  // This is for the submit button to pupulate the new camping trip
  $(".submit-trip").on("click", function (event) {
    console.log("clicked submit trip");
    event.preventDefault();

    // Values to create a new trip
    var newTrip = {
      title: $("#title").val().trim(),
      date: $("#date").val().trim(),
      location: $("#location").val().trim(),
      campers: $("#campers").val().trim(),
      items: $("#items").val(),
      completed: 0,
      review: ""
    };

    // Post new trip
    $.ajax("/api/trips", {
      type: "POST",
      data: newTrip
    }).then(
      function () {
        console.log("created new trip");
        window.location.replace("/dashboard");
      });
  });

  // Button inside the camping trip card to update it
  $(".update-trip").on("click", function (event) {
    var id = $(this).data("id");
    var updateTrip = $(this).data("completed");

    var updateTripState = {
      completed: newCompleted
    };

    $.ajax("/api/trips/" + id, {
      type: "PUT",
      data: updateTripState
    }).then(
      function () {
        console.log("changed state to", updateTrip);
        location.reload();
      });
  });

  // Button inside the camping trip card to delete it
  $(".delete-trip").on("click", function (event) {
    var id = $(this).data("id");

    $.ajax("/api/trips/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("deleted trip", id);
      location.reload();
    });
  });
});

// Scroll to top of page button click
$(window).scroll(function () {
  var height = $(window).scrollTop();
  if (height > 100) {
    $('#back2Top').fadeIn();
  } else {
    $('#back2Top').fadeOut();
  }
});
$(document).ready(function () {
  $("#back2Top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

});