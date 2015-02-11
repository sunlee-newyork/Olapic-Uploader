$(document).ready(function () {

    $('.submit').click(function (e) {

        // Default values
        var host       = "https://rest.photorank.me/";
        var version    = "v2.2";
        var authToken  = $('.olapic-apikey').val();

        // User values
        var userEmail  = $('.user-email').val();
        var userName   = $('.user-name').val();
        var userAvatar = $('.user-avatar').val();

        // Grab file
        var imageFile  = $('.image-file')[0].files[0];
        
        if (!imageFile) {
            alert('Please select a file first!');
            return false;
        }

        else {

            // Make first request with jQuery AJAX
            $.ajax({
                type: "POST",
                url: host + 'users' + '?auth_token=' + authToken + '&version=' + version,
                data: {
                    'email'      : userEmail,
                    'screen_name': userName,
                    'avatar_url' : userAvatar
                },
                success: function (response) {
                    $('.response').append("<p>Successfully made first call: </p>" + JSON.stringify(response));
                    
                    var userID = response.data.id;

                    // Workaround jQuery file POST using XMLHttpRequest
                    var mediaUploadURL = host + 'users/' + userID + '/media' + '?auth_token=' + authToken + '&version=' + version;
                    var form = document.getElementById('form');
                    var formData = new FormData(form);
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', mediaUploadURL, true);
                    xhr.send(formData);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState==4 && xhr.status==200) {
                            $('.response').append("<p>Image POST Success: </p>" + xhr.responseText);
                        }
                    }

                },
                error: function (err) {
                    console.log("Error: ", err);
                }
            });

        }

    });
});