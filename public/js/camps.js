
$(function() {
  
  //Event listener for add people button on create trip form
  $(".add-btn").on("click", function(event) {
      event.preventDefault();
    
      let newCamper = $("#campers").val().trim();
      let li = $("<li class='friends'>");

      if (newCamper == "") {
        return;
      } else {
        li.text(newCamper);
        $(".added-campers").append(li);
        $("#campers").val("");
      }
  });
  
  
  // This is for the submit button to populate the new camping trip
  $(".submit-trip").on("click", function(event) {
    console.log("clicked submit trip");
    event.preventDefault();

    var list = [];

    $(".friends").each(function() {
      list.push($(this).text());
    });

    console.log(list);

    var imgUrl;
    var parkUrl;
    var option = $("option");

    for (var i = 0; i < option.length; i++) {
      if (option[i].value == $("#location").val().trim()) {
        console.log("got it!");
        imgUrl = option[i].dataset.image;
        parkUrl = option[i].dataset.url;
      }
    }

    // Values to create a new trip
    var newTrip = {
      title: $("#title").val().trim(),
      date: $("#date").val().trim(),
      location: $("#location").val().trim(),
      campers: list.join(",\n"),
      items: $("#items").val(),
      completed: 0,
      review: "",
      parkImgUrl: imgUrl,
      parkWebUrl: parkUrl
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