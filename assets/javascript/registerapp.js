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
    var anyAllergy = $("#input-allergy").val().trim();



    console.log(
        "email:" + userEmail + "Pass:" + userPass + "name:" + userName + "diet:" + dietType + "Any Allergy: " + anyAllergy);

    $("#the-name").html(userName);
    $("#the-email").html(userEmail);
    $("#the-diet").html(dietType);
    $("#the-allergy").html(anyAllergy);

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
        user.updateProfile({ displayName: $("#user-name").val() });
        console.log(user.displayName);

        userUID = user.uid;


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
            window.location.href = "index.html";
        });

});




//REGISTER BUTTON
//---------------------------------------
$("#register").on("click", e => {


    alert("Let's register")
    window.location.href = "registerindex.html";
});

//REGISTER BUTTON
//---------------------------------------
$("#sign-in-email").on("click", e => {


    alert("Let's Log In")
    window.location.href = "signin.html";
});





//LOGGING OUT
//---------------------------------------
$("#log-out").on("click", e => {
    firebase.auth().signOut();
    window.location.href = "index.html";
    alert("your logged out!")
});

