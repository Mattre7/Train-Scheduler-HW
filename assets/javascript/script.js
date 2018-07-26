var config = {
  apiKey: "AIzaSyDJYT6IT_0rjgtaJUWQyRcA4XdgM-lUMRY",
  authDomain: "matts-train-scheduler.firebaseapp.com",
  databaseURL: "https://matts-train-scheduler.firebaseio.com",
  projectId: "matts-train-scheduler",
  storageBucket: "matts-train-scheduler.appspot.com",
  messagingSenderId: "667900520974"
};

firebase.initializeApp(config);
var database = firebase.database();

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    console.log(moment(trainTime, "hh:mm").isValid());
    console.log(trainTime);
    console.log(moment.unix(trainTime));
    console.log(moment(frequency, "minutes").isValid());

    var timeDiff = moment().diff(moment(trainTime, "hh:mm"), "minutes");
    var timeRemainder = moment().diff(timeDiff, "minutes") % frequency;
    var minutes = frequency - timeRemainder;
    var nexttrain = moment().add(minutes, "m").format("hh:mm A");

    console.log(timeDiff);
    console.log(frequency);
    console.log(timeRemainder);
    console.log(minutes)
    console.log(nexttrain)
    console.log(moment().format('hh:mm A'));
    console.log(moment().format('X'))

    var newTraindiv = $("<div class='row newtraindiv'>")
    $(".train-group").append(newTraindiv)
    newTraindiv.append($("<h6 class='col-sm-3'>").text(trainName))
    newTraindiv.append($("<h6 class='col-sm-3'>").text(destination))
    newTraindiv.append($("<h6 class='col-sm-2'>").text(frequency))
    newTraindiv.append($("<h6 class='col-sm-2'>").text(nexttrain))
    newTraindiv.append($("<h6 class='col-sm-2'>").text(minutes))
})

$(".addtrain").on("click", function(){
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val();
//    var nextArrival = moment($("#trainTime").val(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
//    console.log(nextArrival)
    console.log(frequency);
    var newTrain = {
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
//        nextArrival: nextArrival,
        frequency: frequency,
    };
    database.ref().push(newTrain)

    console.log(newTrain)
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
    // return false;
});