$(document).on("click", ".gif-button", function(event) {
  // event.preventDefault();
  var react = $(this).attr("data-react");
  console.log("data react", react);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    react +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    $("#gifs-appear-here").html("");

    for (var i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");
      let gifImg = $("<img>");
      var rating = results[i].rating;
      let stillImg = results[i].images["480w_still"].url;
      let gif = results[i].images.fixed_width.url;
      var p = $("<p>").text("Rating: " + rating);

      gifDiv.addClass("gif");
      gifDiv.addClass("col-md-3");
      gifDiv.prepend(p);
      gifDiv.prepend(gifImg);
      gifImg.attr("src", gif);
      gifImg.attr("dispImg", stillImg);
      gifImg.attr("dispGif", gif);
      gifImg.attr("displaying", "gif");
      gifImg.addClass("mediaItem");

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
});

$(document).on("click", ".mediaItem", function() {
  console.log("image clicked");
  if ($(this).attr("displaying") === "gif") {
    $(this).attr("src", $(this).attr("dispIMG"));
    $(this).attr("displaying", "img");
  } else {
    $(this).attr("src", $(this).attr("dispGif"));
    $(this).attr("displaying", "gif");
  }
});

$("#searchform").on("click", function(event) {
  event.preventDefault();
  console.log($(this));
  var value = $("#reaction-input").val();
  $("#buttons").append(
    `<button class="btn btn-primary gif-button" data-react=${value}>${value}</button>`
  );
  console.log(value);
});
