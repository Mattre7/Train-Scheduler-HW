var config = {
  apiKey: "AIzaSyDJYT6IT_0rjgtaJUWQyRcA4XdgM-lUMRY",
  authDomain: "matts-train-scheduler.firebaseapp.com",
  databaseURL: "https://matts-train-scheduler.firebaseio.com",
  projectId: "matts-train-scheduler",
  storageBucket: "matts-train-scheduler.appspot.com",
  messagingSenderId: "345482362969"
};

firebase.initializeApp(config);
var database = firebase.database();

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
})

$(".addtrain").on("click", function(){
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var nextArrival = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(nextArrival)
    console.log(frequency);
    var newTrain = {
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        nextArrival: nextArrival,
        frequency: frequency,
    };
    database.ref().push(newTrain)
    console.log(newTrain)
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
    return false;
});