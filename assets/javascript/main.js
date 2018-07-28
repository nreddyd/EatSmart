$(document).ready(function() {
  $("select").formSelect();

  $("#submit").on("click", function(e) {
    event.preventDefault();
    var searchPhrase = $("#meal").val();
    // var allergies = $("#allergy").val();
    // var diets = $("#diet").val();
    // var cuisines = $("#cuisine").val();
    var courses = $("#course").val();
    // var holidays = $("#holiday").val();
    var time = parseInt($("#time").val()) * 60;
    console.log(time);

    var requiredPictures = true;
    var url = `http://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${searchPhrase.replace(
      " ",
      "+"
    )}&requirePictures=true${courses
      .map(course => {
        return "&allowedCourse[]=" + course;
      })
      .join("")}`;
    console.log(url);

    $.ajax({
      url: url,
      method: "GET"
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, options);
});

// Or with jQuery

$(document).ready(function() {
  $(".carousel").carousel();
});
