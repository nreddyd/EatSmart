// // Second API random Image 

// var inputFood = "food";
// var Authorization = "Client-ID YOUR_ACCESS_KEY";
// var mainURL = "https://api.unsplash.com/photos/?random?client-iD=YOUR_ACCESS_KEY"

// $("#random").on("click", function () {
//     $.ajax({
//         url: mainURL,
//         dataType: 'json',
//         method: "GET"
//     }).then(function (response) {
//         var imageUrl = response.urls.regular;
//         $("profilePicture").append(response);
//     })
// })