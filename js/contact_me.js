$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var m = new mandrill.Mandrill('bSzECez1dCpbl6OZWFVKHw');


            var params = {
              "message": {
                "from_email": email,
                "from_name": name,
                "to": [{
                  "email":"patorn.u@gmail.com",
                  "name": "Patorn"
                }],
                "subject": "patorn.github.io Contact Form - Mandrill API: " + name,
                "html": "You have received a new message from your website contact form.<br>Here are the details:<br>Name: " + name + "<br>Email: "+ email + "<br>Phone: " + phone + "<br>Message:<br>" + message
              }
            };



            m.messages.send(params, function(res) {
              // Success message
              $('#success').html("<div class='alert alert-success'>");
              $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-success')
                  .append("<strong>Your message has been sent. </strong>");
              $('#success > .alert-success')
                  .append('</div>');

              //clear all fields
              $('#contactForm').trigger("reset");
            }, function(err) {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
              $('#success > .alert-danger').append('</div>');
              //clear all fields
              $('#contactForm').trigger("reset");
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
