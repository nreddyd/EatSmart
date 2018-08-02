function signIn() {
  // TODO 1: Sign in Firebase with credential from the Google user.
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
function signOut() {
  // TODO 2: Sign out of Firebase.
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // TODO 3: Initialize Firebase.
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (
    !window.firebase ||
    !(firebase.app instanceof Function) ||
    !firebase.app().options
  ) {
    window.alert(
      'You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`'
    );
  }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
  console.log('isUserSignedIn:' + isUserSignedIn);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    // var profilePicUrl = getProfilePicUrl();
    // var userName = getUserName();

    // Set the user's profile pic and name.
    // userPicElement.style.backgroundImage = 'url(' + profilePicUrl + ')';
    // userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    // userNameElement.removeAttribute('hidden');
    // userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeClass('hidden');

    // Hide sign-in button.
    signInButtonElement.addClass('hidden');
    console.log(user.uid);
    // create firebase database for each user
    var userdb = firebase.database().ref(`/favs_${user.uid}/`);

    $('#left')
      .html(`  <button id="Pesto-Shredded-Chicken-Stuffed-Mushrooms-2468837">Favorite</button>
    <button id="add-calendar">Add to Calendar</button>
    `);

    $('button').on('click', function () {
      console.log($(this)[0].id);
      var recipe = $(this)[0].id;
      console.log('recipe:' + recipe);
      userdb.push({ recipe });
    });
    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();

    // add to calendar
    $('#add-calendar').on('click', function () { });
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    // userNameElement.setAttribute('hidden', 'true');
    // userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.addClass('hidden');

    // Show sign-in button.
    signInButtonElement.removeClass('hidden');
    console.log(user);

    $('#left').html('');
  }
}

// initialize Firebase
initFirebaseAuth();
