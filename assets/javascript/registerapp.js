var database = firebase.database();

//NEW USER
//---------------------------------------

var userUID;

$("#submit-register").on("click", function (event) {

    event.preventDefault();

    var userName = $("#user-name").val().trim();
    var userEmail = $("#register-email").val().trim();
    var userPass = $("#register-password").val().trim();
    var auth = firebase.auth();


    var dietType = $("#input-diet").val().trim();
    var anyAllergy = $("#input-allergy").val();



    console.log(
        "email:" + userEmail + "Pass:" + userPass + "name:" + userName + "diet:" + dietType + "Any Allergy: " + anyAllergy);

    if (userEmail == "") {
        alert("missing email")
    }
    if (userPass == "") {
        alert("missing Pass")
    } else {
        alert("Welcome :  " + userName)
        alert("allgood")
    }


    auth.createUserWithEmailAndPassword(userEmail, userPass).then(function (user) {
        userUID = user.uid;

        //testing user id
        console.log("USERUID:" + userUID)

        user.updateProfile({ displayName: userName });

        // create a new Node
        database.ref("/Users/" + userUID).set({
            "email": userEmail,
            "name": userName,
            "pass": userPass,
            "diet": dietType,
            "allergy": anyAllergy
        });
    })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
        })
        .then(function () {
            window.location.href = "profile.html";
        });


});




//REGISTER BUTTON
//---------------------------------------
$(".register").on("click", e => {


    alert("Let's register")
    window.location.href = "registerindex.html";
});

//REGISTER BUTTON
//---------------------------------------
$(".sign-in-email").on("click", e => {


    alert("Let's Log In")
    window.location.href = "signin.html";
});





//LOGGING OUT
//---------------------------------------
$(".log-out").on("click", e => {
    firebase.auth().signOut();
    alert("your logged out!")
    window.location.href = "index.html";
});

