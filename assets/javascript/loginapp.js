var database = firebase.database();

//LOGGING IN
//---------------------------------------
$("#log-in").on("click", e => {

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
        alert("Welcome : " + userEmail)

    }
    window.location.href = "Homepage.html";

    auth.signInWithEmailAndPassword(userEmail, userPass)
        .then(function (user) {
            console.log(database.ref('/users/' + user.uid));
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message)
        });
    alert("YOUR ARE LOGGED IN")

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
        event.preventDefault();
        $("#sign-out").removeClass("hide");
        $("#intro").append("WELCOME: " + user.email)
    }

    else {

        console.log("not logged in");
        $("#sign-out").addClass("hide");
        $("#profile").addClass("hide");
    }
});








