
$(document).ready()
{
    $("#profile-picture").click(function (b) {
        $("#uploadImg").click();
    });

    function previewPic(uploader) {
        if (uploader.files && uploader.files[0]) {
            $("#profile-picture").attr('src',
                window.URL.createObjectURL(uploader.files[0]));
        }
    }

}
$("#uploadImg").change(function () {
    previewPic(this)
});

//checking/ Storing in database

// var database = firebase.database();

// $("uploadImg").on('change', function (e) {

//     var file = e.target.files[0];

//     var storageRef = firebase.storage().ref("'/users/'" + file.name);

//     console.log(fileLocation);

//     var task = storageRef.put(file);

//     task.on('state_changed',

//         function progress(snapshot) {
//             var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             uploader.value = percentage;
//             if (percentage == 100) {
//                 alert("file uploaded Successfully");
//             }
//         },
//         function error(err) {

//         },
//         function complete() {

//         }

//     );
// });