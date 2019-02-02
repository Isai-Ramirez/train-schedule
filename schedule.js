  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6epTsjOitJIISycj_VhbgATAMFH-RIdo",
    authDomain: "home-work-956e2.firebaseapp.com",
    databaseURL: "https://home-work-956e2.firebaseio.com",
    projectId: "home-work-956e2",
    storageBucket: "home-work-956e2.appspot.com",
    messagingSenderId: "423660996537"
  };
  firebase.initializeApp(config);

  var database = firebase.database()
//   function to grab itiems from text boxes and store them in the firebase
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var departure = moment($("#time").val().trim(), "HH:mm").format("HH:mm a");
  var rate = $("#rate").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    leave: departure,
    rate: rate
  };

  // Uploads new info
  database.ref().push(newTrain);

  // Logs what i need to see
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.leave);
  console.log(newTrain.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#rate").val("");
});



database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var departure = childSnapshot.val().leave;
  var rate = childSnapshot.val().rate;

  
  console.log(trainName);
  console.log(destination);
  console.log(departure);
  console.log(rate);

 
  var departure = moment.unix(departure).format("HH:mm a");

  
  var remaining = moment(departure).fromNow();
  console.log(remaining);

 

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(rate),
    $("<td>").text(departure),
    $("<td>").text(remaining),
  );

  // Append the new row to the table
  $("#train-times > tbody").append(newRow);
});