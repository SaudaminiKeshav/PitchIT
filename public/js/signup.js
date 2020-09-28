//Region Firebase setup

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAwSYf_hueKmdVUBUaNwdf_jAyEYS7OODw",
  authDomain: "pitch-it-firebase.firebaseapp.com",
  databaseURL: "https://pitch-it-firebase.firebaseio.com",
  projectId: "pitch-it-firebase",
  storageBucket: "pitch-it-firebase.appspot.com",
  messagingSenderId: "603643031651",
  appId: "1:603643031651:web:807d273ed56cc196d98856",
  measurementId: "G-T3G428HX8G"
};

//*Firebase Cloud storage setup*
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var messageRef = firebase.database().ref("messages")

//End region


const anim = $("#anim");
anim.toggleClass("hideForm");
$("#formcontainer").toggleClass("hideForm");
$(document).ready(function () {

  window.addEventListener("load", function () {
    init();
  });

  // function animation() {
  //   setTimeout(function () {
  //     $(".day").fadeOut(1000);
  //   }, 500);
  // };

  function init() {
    setTimeout(function () {
      $("#formcontainer").fadeIn(1000);
    }, 250);
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
        setTimeout(function() {
          window.location.replace("/dashboard");
      }, 3000);
        
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

function sendUserDataToFirebase(name, number, email, password) {
  //save messages to firebase
  database.ref('/users/' + name).set({
    name: name,
    number: number,
    email: email,
    password: password
  });
}