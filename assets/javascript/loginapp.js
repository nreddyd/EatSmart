var database = firebase.database();

//LOGGING IN
//---------------------------------------

$("#log-in").on("click", function() {
  event.preventDefault();

  var userEmail = $("#user-email")
    .val()
    .trim();
  var userPass = $("#user-password")
    .val()
    .trim();
  var auth = firebase.auth();

  //checking to see value input

  // console.log("User Name is: " + userEmail + " Password is: " + userPass)

  if (userEmail == "") {
    alert("missing email");
  }
  if (userPass == "") {
    alert("missing Pass");
  } else {
    // alert("Welcome : " + userEmail);
  }

  auth
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function(user) {
      // alert("YOUR ARE LOGGED IN " + user.email)
      window.location.href = "profile.html";
    })
    .catch(function(error) {
      console.log(error.code);
      alert("Error: " + error.code);
      console.log(error.message);
    });
});

//Check if user is signed in
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
  console.log("isUserSignedIn" + isUserSignedIn);
}

//CHECK STATUS
//---------------------------------------
firebase.auth().onAuthStateChanged(function(user) {
  console.log("user:", user);

  if (user != null) {
    var userId = firebase.auth().currentUser.uid;
    var nameRef = database.ref("Users/" + userId);

    $(".log-out").removeClass("hidden");
    $(".register").addClass("hidden");
    $(".sign-in-email").addClass("hidden");
    $(".profile-page").removeClass("hidden");

    //Appending user details on profile page
    nameRef.once("value", function(snapshot) {
      var childData = snapshot.val();
      if (childData.WeekPlan != null) {
        weeklyPlan = childData.WeekPlan;
        console.log(weeklyPlan);
      }
      var ii = {
        name: childData.name,
        allergy: childData.allergy,
        diet: childData.diet,
        email: childData.email
      };

      $("#intro").append(ii.name);
      $("#intro-email").append(ii.email);
      $("#intro-diet").append(ii.diet);
      $("#intro-allergy").append(ii.allergy);
      // var iName = snapshot.val();
      // console.log(iName)
    });
    console.log("weeklyPlan");
    console.log(weeklyPlan);
    console.log(user);

    // fav functionality only when user is logged in
    var selectRef = database.ref("user/selection");
    var favRef = database.ref(`/Users/${user.uid}/favs/`);

    // Save recipe data to favs
    var selectedRecipe = {};
    selectRef.on("value", function(snapshot) {
      selectedRecipe = snapshot.val();
    });

    favRef.on("value", function(snapshot) {
      $("#dropdown1, #dropdown2").empty();

      var favRecipes = snapshot.val();

      if (favRecipes !== null) {
        for (let i = 0; i < favRecipes.length; i++) {
          var listFavs = $("<li>");
          listFavs.html(
            `<a id=${favRecipes[i].id} class="recipe"> <img src=${
              favRecipes[i].images[0].hostedSmallUrl
            }> ${favRecipes[i].id}</a>`
          );
          $("#dropdown1, #dropdown2").append(listFavs);
        }
      }
    });

    $(document).on("click", ".fav", function(event) {
      $("#like").removeAttr("href");

      favRef.once("value", function(snapshot) {
        var favRecipes = snapshot.val();
        if (favRecipes === null) {
          // favRecipes = [];
          favRef.set({ 0: selectedRecipe });
        } else {
          favRecipes.push(selectedRecipe);
          // Keep unique recipes
          var ids = favRecipes.map(recipe => {
            return recipe.id;
          });
          let unique = [...new Set(ids)];

          // only keep unique recipes
          var uniqueRecipes = [];
          for (let i = 0; i < unique.length; i++) {
            uniqueRecipes.push(favRecipes[ids.indexOf(unique[i])]);
          }
          console.log(uniqueRecipes);

          favRef.set(uniqueRecipes);
        }
      });
    });
  } else {
    $("#sign-out").addClass("hidden");

    $(document).on("click", ".fav", function(event) {
      $("#like").attr("href", "#popup1");
    });
  }
});
