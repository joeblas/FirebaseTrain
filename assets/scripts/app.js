(function(){
    // Initialize Firebase

      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdXxzEAOdnf4vvh1fgkQMR-y49lagpmPI",
    authDomain: "trainproject-adb04.firebaseapp.com",
    databaseURL: "https://trainproject-adb04.firebaseio.com",
    projectId: "trainproject-adb04",
    storageBucket: "trainproject-adb04.appspot.com",
    messagingSenderId: "195230019417"
  };
    
    firebase.initializeApp(config);
    var database = firebase.database();
    
    var trainName = $('#train-name');
    var destination = $('#destination');
    var firstTrain = $('#first-train');
    var freq = $('#frequency');

    var trainTable = $('#train-table')

    
    var trainObject = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
    }

    

    
    
    var trainsRef = database.ref('trains');
    var trainadd = trainsRef.push();

    //grabs values and adds train to firebase
    function addTrain(){
        $('#add-train').on('click', function(event){
             event.preventDefault();
             trainObject.name = trainName.val().trim();
             trainObject.destination = destination.val().trim();
             trainObject.firstTrain = firstTrain.val().trim();
             trainObject.frequency = freq.val().trim();
             //this adds the values to firebase
             trainadd.set(trainObject) 
             //clears the form after submit
             $('form').each(function(){
                 this.reset();
             });
        })
    }

    database.ref('trains').on('child_added', function(snap){
        var result = snap.val();
        var timeCalcObj = { 
            nextArrival: moment().add(result.frequency, 'm').format('HH:mm A'),
            minAway: moment().subtract(result.frequency, 'm').format('m')
         }   
            trainTable.append(
                '<tr>'+
                '<td>'+result.name+'</td>'+
                '<td>'+result.destination+'</td>'+
                '<td>'+result.frequency+'</td>'+
                '<td>'+timeCalcObj.nextArrival+'</td>'+
                '<td>'+timeCalcObj.minAway+'</td>'+
                '</tr>'
            )
    })

    function main(){
        addTrain();
    }

    main();//main program run

    
}())//end of iffy