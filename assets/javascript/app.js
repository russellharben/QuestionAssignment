
var pages = [
    {
        question: [{
            ques: "What ship does the first mission take place on?",
            choices: ["Dawn Under Heaven", "Forward Unto Dawn", "The Pillar of Autumn", "Spirit of Fire"],
            correctAnswer: "The Pillar of Autumn"
        }]
    }, {
        question: [{
            ques: "What is 343 Guilty Spark?",
            choices: ["2401 Penitent Tangent", "343 Guilty Spark", "Mendicant Bias", "867 Guilty Tangent"],
            correctAnswer: "343 Guilty Spark"
        }]
    }, {
        question: [{
            ques: "Name the Captain of The Pillar of Autumn",
            choices: ["Miranda Keyes", "Jacob Keyes", "Michael Keyes", "Avery Johnson"],
            correctAnswer: "Miranda Keyes"
        }]
    }, {
        question: [{
            ques: "Who built Halo?",
            choices: ["Forerunner", "Humans", "Prometheans", "Precursors"],
            correctAnswer: "Precursors"
        }]
    }, {
        question: [{
            ques: "Who is the leader of the Brutes?",
            choices: ["Half-Jaw", "Arbiter", "Atriox", "Tartarus"],
            correctAnswer: "Arbiter"
        }]
    }, {
        question: [{
            ques: "What was Foe Hammer's call-sign?",
            choices: ["John 177", "Charlie 258", "Echo 419", "Whisky 327"],
            correctAnswer: "Echo 419"
        }]
    }, {
        question: [{
            ques: "I would have been your _______.",
            choices: ["Doom", "Enemy", "Savior", "Daddy"],
            correctAnswer: "Daddy"
        }]
    }, {
        question: [{
            ques: "What do the Covenant seek?",
            choices: ["The Great Journey", "Halo", "The Fringe", "The Ark"],
            correctAnswer: "The Great Journey"
        }]
    }, {
        question: [{
            ques: "Who created Cortana?",
            choices: ["Dr. Halsey", "Dr. Keyes", "Dr. Palmer", "The Didact"],
            correctAnswer: "Dr. Halsey"
        }]
    }, {
        question: [{
            ques: "What is The Silent Cartographer?",
            choices: ["Map Security", "An Island", "A Map Room", "The Control Room"],
            correctAnswer: "A Map Room"
        }]
    }
];



var pageQues = pages[Math.floor(Math.random() * pages.Length)];

var score = 0;

var number = 30; //  Set our number counter to 100.

var intervalId; //  Variable that will hold our interval ID when we execute the "run" function

$("#questionBtn").on("click", newQuestion);
$("#startButton").on("click", run);
$("#resume").on("click", run); //  When the resume button gets clicked, execute the run function.
$("#startOver").on("click", reset); // write a reset function

var nullFlag = false;


// reset timer
function reset() {
    $("startOver").attr("id", "resume");
    $("#resume").text("Resume");
    number = 30;
    clearInterval(intervalId);
};


// add a new question along with four answers
function newQuestion() {
    var question = $("#questions");
    var random = Math.floor((Math.random() * pages.length));
    var newQ = pages[random].question[0];
    
    var newA = newQ.choices;
    if (nullFlag === false) {
        nullFlag = true;
        var newD = "<div>" + newQ.ques + "</div>";
        question.append(newD);

        for (i = 0; i < newA.length; i++) {
            var ansArr = [];
            var b = "<input class='inp' name='name' data-value='" + i + "' type='radio'>" + newA[i] + "<br>";
            ansArr.push(b);
            question.append(b);
        }
    } else {
        question.empty();
        nullFlag = false;
        newQuestion();
    }
    
    // automatically check user answer
    var buttn = $(".inp");
    buttn.on("click", function(){
        var indChecker = $(this).data("value");
        var answer = newQ.correctAnswer;
        var correctInd = newA.indexOf(answer);
        var nw = "<div>" + score + "</div>";

        if(indChecker == correctInd){
            alert("That's right!");
            score++;
            $("#startButton").append(nw);
            newQuestion();
        } else {
            score--;
            alert("Try again!")
        }
    })
}



// score reset to 0
function resetPoints(){
    score = 0;
    $("#correct").html("<span>" + score + "</span>");
}


//  The run function sets an interval that runs the decrement function once a second.
function run() {
    newQuestion();
    $("#resume").attr('id', 'startOver');
    $("#startOver").text("Start Over");
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $("#showNumber").html("<h2>" + "Time Left: " + number + " Seconds" + "</h2>");

    //  Once number hits zero...
    if (number <= 0) {
        //  ...run the stop function.
        reset();
        //  Alert the user that time is up.
        alert("Time Up! How did you do?");
    }
}