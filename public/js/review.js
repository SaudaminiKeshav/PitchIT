$(document).ready(function() {
    var saveReviewBtn = $(".save-review");
    var reviewText = $("#exampleFormControlTextarea1");
    var clicking = $("#click");
    var txtBtn = $(".writeTxtBtn");

    saveReviewBtn.on("click", function(event) {
        event.preventDefault();
        console.log("clicked bruh");

        var review = reviewText.val().trim();
        var id = saveReviewBtn.data("id");

        if(!review) {
            return;
        }

        addReview(review, id);
        reviewText.val("");
    });

    function addReview(text, id) {
        //var id = $(this).data("id");

        var review = {
            review: text,
            id: id
        };

        $.ajax("/api/review/" + id, {
          type: "PUT",
          data: review
        }).then(function() {
            window.location.replace("/dashboard");
            console.log("review added");
          });
      }
});