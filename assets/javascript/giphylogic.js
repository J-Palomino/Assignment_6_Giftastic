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
    console.log(response)
    var results = response.data;
    $("#gifs-appear-here").html("");
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gif");
      gifDiv.addClass("col-md-3");

      var rating = results[i].rating;
      let stillImg = results[i].images["480w_still"].url

      var p = $("<p>").text("Rating: " + rating);

      var reactImage = $("<img>");
      reactImage.attr("src", results[i].images.fixed_width.url);
      gifDiv.prepend(p);
      gifDiv.prepend(reactImage);
      
      $(".gif").click(()=>{
        console.log("image clicked");
        $(this).attr("src", stillImg)
      })
      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
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
