var weeklyPlan = [
  {
    day: "Sunday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Monday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Tuesday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Wednesday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Thursday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Friday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  },
  {
    day: "Saturday",
    breakfast: {
      id: "",
      imgUrl: ""
    },
    lunch: {
      id: "",
      imgUrl: ""
    },
    dinner: {
      id: "",
      imgUrl: ""
    },
    snack: {
      id: "",
      imgUrl: ""
    }
  }
];

$(document).ready(function() {
  // Materlize functionality
  $(".sidenav").sidenav();
  $("select").formSelect();

  $(".dropdown-trigger").dropdown();

  var database = firebase.database();

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
    var url = `https://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${searchPhrase.replace(
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

  var selectRef = database.ref("user/selection");
  // Get recipe link
  $(document).on("click", ".recipe", function(event) {
    var recipeid = event.currentTarget.id;
    var image = "";
    var recipeUrl = "";
    var url =
      "https://api.yummly.com/v1/api/recipe/" +
      recipeid +
      "?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f";

    getRecipes(url).then(res => {
      console.log(res);
      image = res.images[0].hostedMediumUrl;
      recipeUrl = res.source.sourceRecipeUrl;
      selectRef.set(res);

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
    //TODO : figure out where these 2 lines below are going (part of which fn)
    //   // add image to recipeContent
    //   $('#testImage').html(`<img src=${res.images[0].hostedMediumUrl}>`);
    // });
    $("#recipeDay").html(`<select class="browser-default" id="mealPlanDay">
<option value="" disabled selected>Choose your option</option>
<option value="sunday">Sunday</option>
<option value="monday">Monday</option>
<option value="tuesday">Tuesday</option>
<option value="wednesday">Wednesday</option>
<option value="thursday">Thursday</option>
<option value="friday">Friday</option>
<option value="saturday">Saturday</option>
</select><button class="btn waves-effect waves-light" type="submit" name="action" id="displayCalander">Change day
<i class="material-icons right">send</i>
</button>`);
    $(
      "#recipeContent"
    ).html(`<select class="browser-default" id="mealPlanOption">
    <option value="" disabled selected>Choose your option</option>
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    <option value="snack">Snack</option>
    </select>
    <button class="btn waves-effect waves-light" type="submit" name="action" id="addToMealPlan">Add to meal plan
    <i class="material-icons right">send</i>
    </button>`);

    $(
      "#recipeButtons"
    ).html(`        <a class="btn waves-effect waves-light fav" type="submit" name="action" id="like">
        <i class="material-icons right">thumb_up</i>
      </a>
      <button class="btn waves-effect waves-light" type="submit" name="action" id="getRecipe">Get Recipe!
        <i class="material-icons right">send</i>
      </button>

      <div id="popup1" class="overlay">
	<div class="popup">
		<h2>Please log-in</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
			User must be logged in to favourite recipes!
		</div>
	</div>
</div>
      `);

    $("#addToMealPlan").on("click", function() {
      var day = $("#mealPlanDay").val();
      var course = $("#mealPlanOption").val();
      updateWeek(day, course, recipeid, image);
    });

    $("#displayCalander").on("click", function() {
      console.log(weeklyPlan);
      var day = $("#mealPlanDay").val();
      switch (day) {
        case "sunday":
          UpdateCalander(0);
          break;
        case "monday":
          UpdateCalander(1);
          break;
        case "tuesday":
          UpdateCalander(2);
          break;
        case "wednesday":
          UpdateCalander(3);
          break;
        case "thursday":
          UpdateCalander(4);
          break;
        case "friday":
          UpdateCalander(5);
          break;
        case "saturday":
          UpdateCalander(6);
          break;
      }
    });

    $("#getRecipe").on("click", function() {
      window.open(recipeUrl, "_blank");
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

  function addMealToCalander(course, recipeID, image) {
    $("#" + course).html(`<div> <img src = ${image}>
            <br><a id=${recipeID} class="recipe">${recipeID
      .split("-")
      .slice(0, -1)
      .join(" ")}</a></div>`);
  }

  function UpdateCalander(index) {
    $("#day").html(weeklyPlan[index].day);
    if (weeklyPlan[index].breakfast.id != "") {
      addMealToCalander(
        "breakfast",
        weeklyPlan[index].breakfast.id,
        weeklyPlan[index].breakfast.imgUrl
      );
    } else {
      $("#breakfast").empty();
    }
    if (weeklyPlan[index].lunch.id != "") {
      addMealToCalander(
        "lunch",
        weeklyPlan[index].lunch.id,
        weeklyPlan[index].lunch.imgUrl
      );
    } else {
      $("#lunch").empty();
    }
    if (weeklyPlan[index].dinner.id != "") {
      addMealToCalander(
        "dinner",
        weeklyPlan[index].dinner.id,
        weeklyPlan[index].dinner.imgUrl
      );
    } else {
      $("#dinner").empty();
    }
    if (weeklyPlan[index].snack.id != "") {
      addMealToCalander(
        "snack",
        weeklyPlan[index].snack.id,
        weeklyPlan[index].snack.imgUrl
      );
    } else {
      $("#snack").empty();
    }
  }

  function updateWeek(day, course, recipeid, image) {
    switch (day) {
      case "sunday":
        updateDay(0, course, recipeid, image);
        break;
      case "monday":
        updateDay(1, course, recipeid, image);
        break;
      case "tuesday":
        updateDay(2, course, recipeid, image);
        break;
      case "wednesday":
        updateDay(3, course, recipeid, image);
        break;
      case "thursday":
        updateDay(4, course, recipeid, image);
        break;
      case "friday":
        updateDay(5, course, recipeid, image);
        break;
      case "saturday":
        updateDay(6, course, recipeid, image);
        break;
    }
  }

  function updateDay(index, course, recipeid, image) {
    switch (course) {
      case "breakfast":
        weeklyPlan[index].breakfast.id = recipeid;
        weeklyPlan[index].breakfast.imgUrl = image;
        saveweekplan();
        updateCourse(index, course, recipeid, image);
        break;
      case "lunch":
        weeklyPlan[index].lunch.id = recipeid;
        weeklyPlan[index].lunch.imgUrl = image;
        saveweekplan();
        updateCourse(index, course, recipeid, image);
        break;
      case "dinner":
        weeklyPlan[index].dinner.id = recipeid;
        weeklyPlan[index].dinner.imgUrl = image;
        saveweekplan();
        updateCourse(index, course, recipeid, image);
        break;
      case "snack":
        weeklyPlan[index].snack.id = recipeid;
        weeklyPlan[index].snack.imgUrl = image;
        saveweekplan();
        updateCourse(index, course, recipeid, image);
        break;
    }
  }

  function updateCourse(index, course, recipeid, image) {
    if ($("#day").html == weeklyPlan[index].day) {
      addMealToCalander(course, recipeid, image);
    } else {
      UpdateCalander(index);
    }
  }

  function saveweekplan() {
    if (firebase.auth().currentUser != null) {
      var userid = firebase.auth().currentUser.uid;
      database.ref(`/Users/${userid}/WeekPlan/`).set(weeklyPlan);
    }
  }
});

// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

// Or with jQuery

$(document).ready(function() {
  $("select").formSelect();
});
