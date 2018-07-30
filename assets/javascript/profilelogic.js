var database = firebase.database();

var file;

var Auth = firebase.auth();


$("#uploadImg").on('change', function (event) {

    file = event.target.files[0];

    console.log(file.type);

    var typeName = determineImg(file.type);


    if (typeName === "image") {

        var userUID = Auth.currentUser.uid;

        var storageRef = firebase.storage().ref("/images/" + userUID + "/" + "profile.jpg");

        storageRef.put(file).then(function () {

            storageRef.getDownloadURL().then(function (url) {

                database.ref('/Users/' + userUID).update({
                    'photoURL': url,
                })

                urlP = url;
                $("#profilePicture").attr("src", url);

            }).catch(function (error) {

                console.log(error.code);
                console.log(error.message);

            });
        })

    } else {

        $("#imgError").text("Please choose an image file");
    }

});

function determineImg(type) {

    var arr = type.split('');

    var arr2 = [];

    for (var i = 0; i < 5; i++) {
        arr2.push(arr[i]);
    }

    var typeName = arr2.join('');

    return typeName;

}

firebase.auth().onAuthStateChanged(function (user) {

    database.ref('/Users/' + user.uid).once("value").then(function (snapShot) {

        $("#the-name").html(snapShot.val().userName);
        $("#the-email").html(snapShot.val().userEmail);
        $("#the-diet").html(snapShot.val().dietType);
        $("#the-allergy").html(snapShot.val().anyAllergy);

        var profilePic = snapShot.val().photoURL;

        console.log(profilePic);

        if (profilePic !== "") {
            $("#profilePicture").attr("src", profilePic);
        }

    });


});