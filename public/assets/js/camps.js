$(function() {
  // button to create a new trip
  $(".create-trip-btn").on("click", function(event) {
    event.preventDefault();

    app.get("/home", function(req, res) {
      res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
    });

    // $.ajax("/api/create", {
    //   type: "GET",
    //   data:
    // }).then(
    //   function() {
    //     console.log("creating new trip");
    //     location.reload();
    // });
  });

  // This is for the submit button to pupulate the new camping trip
  $(".submit-trip").on("click", function(event) {
    event.preventDefault();

    // Values to create a new trip
    var newTrip = {
      title: $("#title").val().trim(),
      location: $("#location").val().trim(),
      date: $("#date").val().trim(),
      campers: $("#campers").val().trim(),
      items: $("#items").val(),
      completed: 0
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
    var updateTrip = $(this).data("completed");

    var updateTripState = {
      completed: newCompleted
    };

    $.ajax("/api/trips/" + id, {
      type: "PUT",
      data: updateTripState
    }).then(
      function() {
        console.log("changed state to", updateTrip);
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