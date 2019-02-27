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
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var departure = $("#time").val().trim();
  console.log(departure);
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



  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#rate").val("");
});



database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var rate = childSnapshot.val().rate;
  var departure = childSnapshot.val().leave;


  var timeArr = departure.split(":");
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  // If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % rate;
    tMinutes = tFrequency - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment()
      .add(tMinutes, "m")
      .format("hh:mm A");
  }
  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  // Add each train's data into the table
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(rate),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes),
  );

  // Append the new row to the table
  $("#train-times > tbody").append(newRow);





  // var formatedDeparture = moment.unix(departure).format("HH:MM");


  // var remaining = moment(departure).fromNow();
  // console.log(remaining);




});