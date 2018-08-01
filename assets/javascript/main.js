$(document).ready(function() {
  // Materlize functionality
  $(".sidenav").sidenav();
  $("select").formSelect();

  var mealPlan = {
    breakfast: "",
    lunch: "",
    dinner: "",
    snack: ""
  };
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHDCWBQo0xRH-To2V5bfxNdBKU0FNuffs",
    authDomain: "eatsmart-group.firebaseapp.com",
    databaseURL: "https://eatsmart-group.firebaseio.com",
    projectId: "eatsmart-group",
    storageBucket: "eatsmart-group.appspot.com",
    messagingSenderId: "9553700006"
  };
  firebase.initializeApp(config);

  // Firebase Google Authorization
  var database = firebase.database();
  signInButtonElement = $("#sign-in");
  signOutButtonElement = $("#sign-out");

  signInButtonElement.on("click", signIn);
  signOutButtonElement.on("click", signOut);

  $("#submit").on("click", function(e) {
    event.preventDefault();
    var searchPhrase = $("#meal").val();
    var allergies = $("#allergy").val();
    var diets = $("#diet").val();
    var cuisines = $("#cuisine").val();
    var courses = $("#course").val();
    var holidays = $("#holiday").val();
    var time = parseInt($("#time").val()) * 60;

    var requiredPictures = true;
    var url = `http://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${searchPhrase.replace(
      " ",
      "+"
    )}&requirePictures=true${allergies
      .map(allergy => {
        return "&allowedAllergy[]=" + allergy;
      })
      .join("")}`;
    console.log(url);

    getRecipes(url)
      .then(res => {
        $("#recipeList").empty();
        console.log(res);
        for (var i = 1; i < res.matches.length; i++) {
          var image;
          if (res.matches[i].attributes.course !== undefined) {
            // console.log(res.matches[i].attributes.course);
            addImages(res.matches[i].attributes.course[0], res.matches[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Get recipe link
  $(document).on("click", ".recipe", function(event) {
    var recipeid = event.currentTarget.id;

    var url =
      "http://api.yummly.com/v1/api/recipe/" +
      recipeid +
      "?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f";

    getRecipes(url).then(res => {
      console.log(res);
      $("#recipeDisplay").empty();
      var recipeDiv = $("<div>");
      // Creating an image tag
      var recipeImage = $("<img>");
      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      recipeImage.attr(
        "src",
        res.images[0].hostedMediumUrl,
        "class='center-align'"
      );
      // Appending the paragraph (the name, the time, ingredients)
      var pCourse = res.attributes.course[0];
      var pTime = res.totalTime;
      var pName = res.name;
      var pServings = res.numberOfServings;
      recipeDiv.append(recipeImage);
      recipeDiv.append("<h5>" + pName + "</h5>");
      recipeDiv.append("Course: " + pCourse + "<br>");
      recipeDiv.append("Time: " + pTime + "<br>");
      var pIngr = $("<p>").text("Ingredients: ");
      recipeDiv.append(pIngr);
      for (var i = 0; i < res.ingredientLines.length; i++) {
        pIngr = res.ingredientLines[i];
        recipeDiv.append(pIngr + "<br>");
      }
      $("#recipeDisplay").append(recipeDiv);
    });

    $(
      "#recipeButtons"
    ).html(`        <button class="btn waves-effect waves-light" type="submit" name="action" id="submit">
        <i class="material-icons right">thumb_up</i>
      </button>
      <button class="btn waves-effect waves-light" type="submit" name="action" id="submit">Get Recipe!
        <i class="material-icons right">send</i>
      </button>`);

    $("#addToMealPlan").on("click", function() {
      var course = $("#mealPlanOption").val();
      switch (course) {
        case "breakfast":
          mealPlan.breakfast.id = recipeid;
          addMealToCalander(course, recipeid);
          break;
        case "lunch":
          mealPlan.lunch.id = recipeid;
          addMealToCalander(course, recipeid);
          break;
        case "dinner":
          mealPlan.dinner.id = recipeid;
          addMealToCalander(course, recipeid);
          break;
        case "snack":
          mealPlan.snack.id = recipeid;
          addMealToCalander(course, recipeid);
          break;
      }
    });
  });

  // Supplementary Functions
  // make AJAX call
  async function getRecipes(url) {
    const result = await $.ajax({
      url: url,
      method: "GET"
    });

    return result;
  }

  //  add images functions
  function addImages(course, recipe) {
    // image = $('<img>')
    // image.attr('src', recipe.smallImageUrls);
    // image.attr('id', recipe.id);

    var recipeDiv = $("<div>");
    recipeDiv.addClass("card horizontal");
    recipeDiv.html(`
      <div class="card-stacked">
        <div class="card-content">
            <img id=${recipe.id} src=${recipe.smallImageUrls}>
            <br>
            <a id=${recipe.id} class="recipe">${recipe.id
      .split("-")
      .slice(0, -1)
      .join(" ")}</a>
        </div>
      </div>`);

    $("#recipeList").append(recipeDiv);
  }

  function addMealToCalander(course, recipeID) {
    var url =
      "http://api.yummly.com/v1/api/recipe/" +
      recipeID +
      "?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f";
    getRecipes(url).then(res => {
      $("#" + course).html(`<div> <img src = ${res.images[0].hostedSmallUrl}>
            <b><p> ${recipeID
              .split("-")
              .slice(0, -1)
              .join(" ")}</p></b></div>`);
    });
  }
});

// Or with jQuery

$(document).ready(function() {
  $("select").formSelect();
});
