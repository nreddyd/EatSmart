var database = firebase.database();

var userUID;


//If user selected input checkbox
// function ischeckBox() {

//     var peanuts = $("#input-allergy-peanuts").val();

//     alert(peanuts);
//     if (peanuts.checked == true) {
//         console.log("no," + peanuts);
//     } else {
//         console.log("not allergic");
//     }
// }
// ischeckBox()

//NEW USER
//---------------------------------------
$("#submit-register").on("click", e => {



    event.preventDefault();



    var userName = $("#user-name").val().trim();
    var userEmail = $("#register-email").val().trim();
    var userPass = $("#register-password").val().trim();
    var auth = firebase.auth();

    var dietType = $("#input-diet").val().trim();



    console.log(userName + "  " + userEmail + "  " + userPass + "  " + dietType)


    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("Welcome :  " + userName)
        alert("allgood")
        $("#register-form").removeClass("hide");
        $("#login-form").addClass("hide");
        $("#user-name").addClass("hide");
        $("#register-email").addClass("hide");
        $("#register-password").addClass("hide");
        $("#submit-register").addClass("hide");
        $("#input-diet").addClass("hide");
        $("#allergy-options").addClass("hide")
        $("#newuser-sign-out").removeClass("hide");



    }

    var promise = auth.createUserWithEmailAndPassword(userEmail, userPass).then(function (user) {
        return user.updateProfile({ displayName: $("#user-name").val() });

        userUID = user.uid;

        database.ref('/Users/' + userUID).set({
            'name': userName,
            'email': userEmail,
            'password': userPassword,
            'diet': dietType
        })

        console.log("the diet is" + users.diet.dietType)
    });
    promise.catch(e => console.log(e.message));
});












//PUSHING INPUT TO DATABASE
//---------------------------------------
//Pushing new user data onto database
$("#submit-register").on("click", function () {

    database.ref().on("child_added", function (childSnap) {
        //grabbing input value
        theName = childSnap.val().theName;
        theEmail = childSnap.val().theEmail;
        thePass = childSnap.val().thePass;
        theDiet = childSnap.val().theDiet
    })

    var theName = $("#user-name").val().trim();
    var theEmail = $("#register-email").val().trim();
    var thePass = $("#register-password").val().trim();
    var theDiet = $("#input-diet").val().trim();



    //object
    var newUser = {
        'theName': theName,
        'theEmail': theEmail,
        'thePass': thePass,
        'theDiet': theDiet
    }

    database.ref().push(newUser);
    console.log(newUser)


    $("#the-diet").append(newUser.theDiet);

    $("#diet-options").addClass("hide");
    $("#newuser-sign-out").addClass("hide");
    $("#sign-in").addClass("hide");


});

//LOGGING IN
//---------------------------------------
$("#log-in").on("click", e => {

    event.preventDefault();
    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-password").val().trim();
    var userDiet = $("#input-diet").val().trim();
    var auth = firebase.auth();

    //checking to see value input

    console.log("User Name is: " + userEmail + " Password is: " + userPass)

    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("Welcome :  " + userEmail)

    }



    var promise = auth.signInWithEmailAndPassword(userEmail, userPass);

    //checking for errors
    promise.catch(e => console.log(e.message));
})



//REGISTER BUTTON
//---------------------------------------
$("#register").on("click", e => {


    alert("Let's register")
    $("#register").addClass("hide");
    $("#register-form").removeClass("hide");
    $("#login-form").addClass("hide");
    $("#newuser-sign-out").addClass("hide");
    $("#sign-in").addClass("hide");
});

//REGISTER BUTTON
//---------------------------------------
$("#sign-in").on("click", e => {


    alert("Let's Log In")
    $("#login-form").removeClass("hide");
    $("#sign-in").addClass("hide");
    $("#register").addClass("hide");
    $("#register-form").addClass("hide");
});



//Creating profile references 
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}


//LOGGING OUT
//---------------------------------------
$("#sign-out").on("click", e => {
    firebase.auth().signOut();
});

$("#newuser-sign-out").on("click", e => {
    firebase.auth().signOut();
});



//Check if user is signed in
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
    console.log("isUserSignedIn" + isUserSignedIn)
}


//CHECK STATUS
//---------------------------------------
firebase.auth().onAuthStateChanged(function (user) {

    event.preventDefault();

    if (user) {

        event.preventDefault();

        console.log("user:", user);
        var loggedUser = user.email;


        //FIX: firebaseUser not displaying

        $("#sign-out").removeClass("hide");
        $("#register").addClass("hide");
        $("#log-in").addClass("hide");
        $("#user-email").addClass("hide");
        $("#user-password").addClass("hide");
        $("#sign-in").addClass("hide");

        $("#intro").append("WELCOME: " + loggedUser)
        console.log("welcome, " + user.displayName);

        if (user != null) {
            console.log("")
        }

    } else {
        console.log("not logged in  ");
    }
});


