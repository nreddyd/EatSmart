$(document).ready(function() {
  // Materlize functionality
  $('.sidenav').sidenav();
  $('select').formSelect();

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBHDCWBQo0xRH-To2V5bfxNdBKU0FNuffs',
    authDomain: 'eatsmart-group.firebaseapp.com',
    databaseURL: 'https://eatsmart-group.firebaseio.com',
    projectId: 'eatsmart-group',
    storageBucket: 'eatsmart-group.appspot.com',
    messagingSenderId: '9553700006'
  };
  firebase.initializeApp(config);

  // Firebase Google Authorization
  var database = firebase.database();
  signInButtonElement = $('#sign-in');
  signOutButtonElement = $('#sign-out');

  signInButtonElement.on('click', signIn);
  signOutButtonElement.on('click', signOut);

  $('#submit').on('click', function(e) {
    event.preventDefault();
    var searchPhrase = $('#meal').val();
    var allergies = $('#allergy').val();
    var diets = $('#diet').val();
    var cuisines = $('#cuisine').val();
    var courses = $('#course').val();
    var holidays = $('#holiday').val();
    var time = parseInt($('#time').val()) * 60;

    var requiredPictures = true;
    var url = `http://api.yummly.com/v1/api/recipes?_app_id=6fe80130&_app_key=e47479bfbd3e29b4ddd5ceb95d60916f&q=${searchPhrase.replace(
      ' ',
      '+'
    )}&requirePictures=true${allergies
      .map(allergy => {
        return '&allowedAllergy[]=' + allergy;
      })
      .join('')}`;
    console.log(url);

    async function getRecipes() {
      const result = await $.ajax({
        url: url,
        method: 'GET'
      });

      return result;
    }

    getRecipes()
      .then(res => {
        $('#recipeList').empty();
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
  $(document).on('click', '.recipe', function(event) {
    console.log('get recipe');

    $(
      '#recipeButtons'
    ).html(`        <button class="btn waves-effect waves-light" type="submit" name="action" id="submit">
        <i class="material-icons right">thumb_up</i>
      </button>
      <button class="btn waves-effect waves-light" type="submit" name="action" id="submit">Get Recipe!
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light" type="submit" name="action" id="submit">Add to meal plan
        <i class="material-icons right">send</i>
      </button>`);
  });

  // Supplementary Functions
  //  add images functions
  function addImages(course, recipe) {
    // image = $('<img>')
    // image.attr('src', recipe.smallImageUrls);
    // image.attr('id', recipe.id);

    var recipeDiv = $('<div>');
    recipeDiv.addClass('card horizontal');
    recipeDiv.html(`
      <div class="card-stacked">
        <div class="card-content">
            <img id=${recipe.id} src=${recipe.smallImageUrls}>
            <a class="recipe">${recipe.id
              .split('-')
              .slice(0, -1)
              .join(' ')}</a>
        </div>
      </div>`);

    $('#recipeList').append(recipeDiv);
  }
});
