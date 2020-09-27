var firebaseConfig = {
  apiKey: "AIzaSyDtSRduHk1r_cvKsJsuvZWHRlWA_6PNHqY",
  authDomain: "pitchit-web-app.firebaseapp.com",
  databaseURL: "https://pitchit-web-app.firebaseio.com",
  projectId: "pitchit-web-app",
  storageBucket: "pitchit-web-app.appspot.com",
  messagingSenderId: "237269682914",
  appId: "1:237269682914:web:ca005756746dd0cf15ecbb",
  measurementId: "G-ZEM0HMZQ0R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var messageRef = firebase.database().ref("messages")

const anim = $("#anim");
anim.toggleClass("hideForm");

$(document).ready(function () {

  window.addEventListener("load", function () {
    init();
  });

  function init() {
    $("#formcontainer").toggleClass("hideForm");
    setTimeout(function () {
      $("#formcontainer").fadeIn(1500);
      $(".day").toggleClass("hideForm")
    }, 2000);
  };

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

    sendUserDataToFirebase(userData.name, userData.number, userData.email, userData.password);

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
        // window.location.replace("/dashboard");
        // If there's an error, handle it by throwing up a bootstrap alert
        console.log(name, number, email, password);
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});


function loadingSpinner() {
  $("#formcontainer").toggleClass("hideForm");
  $("body").toggleClass("blueBg");

  setTimeout(function () {
    $("body").toggleClass("removeBgColor");
    $("#formcontainer").fadeIn(2000);
    $("#loadingSpinner").toggleClass("hideForm")
  }, 3000);

}

function sendUserDataToFirebase(name, number, email, password) {
  //save messages to firebase
  database.ref('/users/' + userData.name).set({
    name: userData.name,
    number: userData.number,
    email: userData.email,
    password: userData.password
  });
}