// var database = firebase.database();

// //Pushing new user data onto database
// $("#register").on("click", function () {
//     database.ref().on("child_added", function (childSnap) {
//         //grabbing input value
//         theName = childSnap.val().theName;
//         theEmail = childSnap.val().theEmail;
//         thePass = childSnap.val().thePass;
//     })

//     var theName = $("#userName").val().trim();
//     var theEmail = $("#userEmail").val().trim();
//     var thePass = $("#userPassword").val().trim();

//     //object
//     var newUser = {
//         theName: theName,
//         theEmail: theEmail,
//         thePass: thePass
//     }
//     database.ref().push(newUser);
// });

//LOGGING IN
//---------------------------------------
$("#log-in").on("click", e => {

    event.preventDefault();

    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-password").val().trim();
    var auth = firebase.auth();

    //checking to see value input
    console.log("User Name is: " + userEmail + " Password is: " + userPass)

    var promise = auth.signInWithEmailAndPassword(userEmail, userPass);

    //checking for errors
    promise.catch(e => console.log(e.message));
})


//NEW USER
//---------------------------------------
$("#register").on("click", e => {

    event.preventDefault();

    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-password").val().trim();
    var auth = firebase.auth();

    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("allgood")
        $("#register-form").removeClass("hide");
        $("#login-form").addClass("hide");
    }

    var promise = auth.createUserWithEmailAndPassword(userEmail, userPass).then(function (user) {
        return user.updateProfile({ displayName: $("#user-name").val() });
    });
    promise.catch(e => console.log(e.message));
});


//LOGGING OUT
//---------------------------------------
$("#sign-out").on("click", e => {
    firebase.auth().signOut();
});


//CHECK STATUS
//---------------------------------------
firebase.auth().onAuthStateChanged(user => {

    event.preventDefault();

    var userEmail = $("#user-email").val().trim();

    if (user) {

        var user = firebase.auth().currentUser;


        //FIX: firebaseUser not displaying
        console.log("welcome   " + user);
        $("#sign-out").removeClass("hide");
        $("#register").addClass("hide");
        $("#log-in").addClass("hide");
        $("#user-email").addClass("hide");
        $("#user-password").addClass("hide");

        $("#intro").append("YOU ARE LOGGIN IN   " + userEmail);
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
        }

    } else {
        console.log("not logged in  ");
    }
});


