

function redirectToLoginPage() {
  location.replace("login.html")
}

$(document).ready(function () {

  $("#formcontainer").toggleClass("hideForm");
  $("body").toggleClass("blueBg");
  setTimeout(function () {
    $("body").toggleClass("removeBgColor");
    $("#formcontainer").fadeIn(2000);
    $("#loadingSpinner").toggleClass("hideForm")
  }, 3000);

  const anim = $("#anim");
  anim.toggleClass("hideForm");

  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var phoneNumberInput = $("input#number-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();

    var userData = {
      name: nameInput.val().trim(),
      number: phoneNumberInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.number || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.number, userData.email, userData.password);
    nameInput.val("");
    phoneNumberInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, number, email, password) {
    $.post("/api/signup", {
      name: name,
      number: number,
      email: email,
      password: password
    })
      .then(function (data) {
        anim.toggleClass("showForm");
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
