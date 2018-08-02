
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

