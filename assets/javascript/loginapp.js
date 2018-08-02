var database = firebase.database();

//LOGGING IN
//---------------------------------------
$("#log-in").on("click", function () {

    event.preventDefault();

    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-password").val().trim();
    var auth = firebase.auth();

    //checking to see value input

    console.log("User Name is: " + userEmail + " Password is: " + userPass)

    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("Welcome : " + userEmail);
    }

    auth.signInWithEmailAndPassword(userEmail, userPass)
        .then(function (user) {
            alert("YOUR ARE LOGGED IN " + user.email)
            window.location.href = "profile.html";
        }).catch(function (error) {
            console.log(error.code);
            alert("Error: " + error.code)
            console.log(error.message)
        });
});



//Check if user is signed in
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
    console.log("isUserSignedIn" + isUserSignedIn)
}


//CHECK STATUS
//---------------------------------------
firebase.auth().onAuthStateChanged(function (user) {

    console.log("user:", user);


    if (user != null) {
        $("#intro").append(user.email)
        $(".log-out").removeClass("hidden");
        $(".register").addClass("hidden");
        $(".sign-in-email").addClass("hidden");
        $(".profile-page").removeClass("hidden")
    }

    else {

    }
});

//removed init, checking to resolve



