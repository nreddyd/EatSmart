var database = firebase.database();

//Pushing new user data onto database
$("#register").on("click", function () {
    database.ref().on("child_added", function (childSnap) {
        //grabbing input value
        theName = childSnap.val().theName;
        theEmail = childSnap.val().theEmail;
        thePass = childSnap.val().thePass;
    })

    var theName = $("#userName").val().trim();
    var theEmail = $("#userEmail").val().trim();
    var thePass = $("#userPassword").val().trim();

    //object
    var newUser = {
        theName: theName,
        theEmail: theEmail,
        thePass: thePass
    }
    database.ref().push(newUser);
});

//Logging User In
$("#Log-In").on("click", e => {

    event.preventDefault();

    var userEmail = $("#userEmail").val().trim();
    var userPass = $("#userPassword").val().trim();
    var auth = firebase.auth();

    //checking to see value input
    console.log("User Name is: " + userEmail + " Password is: " + userPass)

    var promise = auth.signInWithEmailAndPassword(userEmail, userPass);

    //checking for errors
    promise.catch(e => console.log(e.message));
})


//Creating New User
$("#register").on("click", e => {

    event.preventDefault();

    var userEmail = $("#userEmail").val().trim();
    var userPass = $("#userPassword").val().trim();
    var auth = firebase.auth();

    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("allgood")
        $("#userName").removeClass("hide");
    }

    var promise = auth.createUserWithEmailAndPassword(userEmail, userPass).then(function (user) {
        return user.updateProfile({ displayName: $("#userName").val() });
    });
    promise.catch(e => console.log(e.message));
});


//Logging User Out
$("#sign-Out").on("click", e => {
    firebase.auth().signOut();
});


//On state change 
firebase.auth().onAuthStateChanged(firebaseUser => {
    event.preventDefault();
    var userEmail = $("#userEmail").val().trim();

    if (firebaseUser) {

        //FIX: firebaseUser not displaying
        console.log("welcome   " + firebaseUser);
        $("#sign-Out").removeClass("hide");
        $("#register").addClass("hide");
        $("#Log-In").addClass("hide");
        $("#userEmail").addClass("hide");
        $("#userPassword").addClass("hide");

        $("#intro").append("YOU ARE LOGGIN IN   " + userEmail);


    } else {
        console.log("not logged in  ");
    }
});


