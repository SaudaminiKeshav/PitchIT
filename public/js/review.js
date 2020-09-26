$(document).ready(function() {
    var saveReviewBtn = $(".save-review");
    var reviewText = $(".review-text");
    var noBtn = $(".no-btn");

    noBtn.on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var newCompleted = $(this).data("newCompleted");
        console.log("clicked on complete", id);

        var newCompleteState = {
            completed: true,
            id: id
        };

        $.ajax("/api/trips/" + id, {
            type: "PUT",
            data: newCompleteState
        }).then(function() {
            console.log("changed state to", newCompleted);
            location.reload();
        });
    })

    saveReviewBtn.on("click", function(event) {
        event.preventDefault();
        console.log("clicked bruh");

        var id = $(this).data("id");
        var review = $(`.review-text${id}`).val().trim(); //only targets the first review box
    
        console.log($(this));
        console.log("id", id);

        // if(!review) {
        //     console.log("returned");
        //     return;
        // }
      
        addReview(review, id);
        reviewText.val("");

        var id = $(this).data("id");
        var newCompleted = $(this).data("newCompleted");
        console.log("clicked on complete", id);

        var newCompleteState = {
            completed: true,
            id: id
        };

        $.ajax("/api/trips/" + id, {
            type: "PUT",
            data: newCompleteState
        }).then(function() {
            console.log("changed state to", newCompleted);
            location.reload();
        });
    });

    function addReview(text, id) {
        console.log("got here");

        var review = {
            review: text,
            id: id
        };

        console.log(review);

        $.ajax("/api/review/" + id, {
          type: "PUT",
          data: review
        }).then(function() {
            //window.location.replace("/dashboard");
            console.log("review added");
          });
      }
});