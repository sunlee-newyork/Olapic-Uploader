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
        var userID = '';

        $('.response').append(userName);

        // Image file values
        var imageFile  = $('.image-file')[0].files[0];
        var caption    = $('.caption').val();
        var streamURIs = [];
        
        $('.stream-uri').each(function () {
            streamURIs.push(this.value);
        });

        $('.response').append(imageFile, streamURIs);

        $.ajax({
            type: "POST",
            url: host + 'users' + '?auth_token=' + authToken + '&version=' + version,
            data: {
                'email'      : 'sun@olapic.com',
                'screen_name': 'Sun Lee'
            },
            success: function (response) {
                $('.response').append(JSON.stringify(response));
                userID = response.data.id;

                $.ajax({
                    type: "POST",
                    contentType: "multipart/form-data;",
                    url: host + 'users/' + userID + '/media' + '?auth_token=' + authToken + '&version=' + version,
                    data: {
                        'image'       : imageFile,                                
                        'caption'     : caption,
                        'stream_uri'  : streamURIs
                    },
                    success: function (response) {
                        $('.response').append(response);
                    },
                    error: function (err) {
                        $('.response').append(err);
                    }
                });

            },
            error: function (err) {
                console.log("Error: ", err);
            }
        });

    });
});