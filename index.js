$(document).ready(function () {

    $('.submit').click(function (e) {

        // Default values
        var host       = "https://rest.photorank.me/";
        var authToken  = "0d6cdd1af34742c3855139fce0780fd1f93d1a7ba1a2c6a495bdb2d9031ec2c3";
        var version    = "v2.2";

        // User values
        var userEmail  = $('.user-email').val();
        var userName   = $('.user-name').val();
        var userAvatar = $('.user-avatar').val();

        // Grab file
        var imageFile  = $('.image-file')[0].files[0];
        if (!imageFile) {
            alert('Please select a file first!');
        }

        // Make first request with jQuery AJAX
        $.ajax({
            type: "POST",
            url: host + 'users' + '?auth_token=' + authToken + '&version=' + version,
            data: {
                'email'      : 'sun@olapic.com',
                'screen_name': 'Sun Lee'
            },
            success: function (response) {
                $('.response').append("Successfully made first call: \n" + JSON.stringify(response, null, 4));
                
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
                        $('.response').append("\nImage POST Success: " + xhr.responseText);
                    }
                }

            },
            error: function (err) {
                console.log("Error: ", err);
            }
        });

    });
});