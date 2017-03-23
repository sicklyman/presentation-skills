// TO DO LIST - FUNCTIONALITY
//  allow developers to enter questions and options DONE
//  determine how many questions there are DONE
//  start button to build activity DONE
//  allow them to navigate all the questions via buttons - DONE
//  make answer letters tappable DONE
//  store tapped answers allowing for changing their mind or random order DONE
//  display info about questions completed??
//  give feedback when all completed automatically or on button tap??
//  allow them to replay DONE
//  make sure that if an answer in one question is a distractor in another, it is not picked up
//      as a correct answer DONE in answer key script

// TO DO LIST - STYLING
//  style it so that they see one question at a time until they choose an option DONE
//  change styling on option letter when tapped


// GLOBAL VARIABLES //////////////////////////

// this is where developers enter questions and options
    var content = [
            ["This is the text for the first question the developer entered.",
             ["apple",  // first option is ALWAYS the correct answer
              "banana", 
              "cherry", 
              "ape",
              "eggplant",
              "fig"
             ]], 
            ["This is the text for the second question the developer entered.",
             ["ape",    // correct answer
              "bat", 
              "cat", 
              "dog",
              "emu",
              "fox"
             ]], 
            ["This is the text for the third question the developer entered.",
             ["aqua",   // correct answer
              "blue", 
              "cyan", 
              "ape",
              "ebony",
              "fuschia"
             ]],
                    ["This is the text for the first question the developer entered.",
             ["apple",  // first option is ALWAYS the correct answer
              "banana", 
              "cherry", 
              "ape",
              "eggplant",
              "fig"
             ]], 
            ["This is the text for the second question the developer entered.",
             ["ape",    // correct answer
              "bat", 
              "cat", 
              "dog",
              "emu",
              "fox"
             ]], 
            ["This is the text for the third question the developer entered.",
             ["aqua",   // correct answer
              "blue", 
              "cyan", 
              "ape",
              "ebony",
              "fuschia"
             ]]
        ];

// create an array of letters as long as the number of options
    var letters = ["A", "B", "C", "D", "E", "F"];


// NOTHING BELOW NEEDS EDITING //////////////////////////
    var answerKey = []; 
    var userChoices = [];
    var numberCorrect;

// grab original questions and correct answers BEFORE we shuffle content
    var originalQuestions = [];
    var correctOptions = [];

// work on populating the correct options array from content array above
// fill arrays to be populated with as many blank spaces as there are questions
        for (var i=0; i<correctOptions.length; i++) {
            answerKey.push("");
            userChoices.push("");
        }

// function to strip out the nth column from a multi-dimensional array and returns it as a separate array
// borrowed from http://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array-in-javascript
// const getArrayColumn = (arr, n) => arr.map(x => x[n]); 
// However, this doesn't work in IE11 which doesn't support arrow functions. Used babeljs.io to translate this to
    var getArrayColumn = function getArrayColumn(arr, n) {
        return arr.map(function (x) {
            return x[n];
        });
    };

    for (var i = 0; i < content.length; i++) {
        correctOptions.push(content[i][1][0]);
        // use borrowed function above to access only each question (not options) in turn
        originalQuestions.push(getArrayColumn(content, 0)[i]);
    }
    
// standard Fisher-Yates function from the web that performs a random shuffle
    function randomize(myArray) {
    var i = myArray.length, j, tempi, tempj;
    if (i === 0) return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        tempi = myArray[i];
        tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
        }
    }


    // function to shuffle questions and options entered above when page loads
    // triggered by a button click when activity replayed
    function start() {
        //empty page content so it isn't added to what's already there
        document.getElementById('ul-questions').innerHTML = "";
        
        // grab each question in the array and shuffle it
        $.each(content, function(i) {randomize(this[1])});
        randomize(content);
        
        // generate an answer key
        for (i=0; i<content.length; i++) {      // loop through shuffled content
            
            // find index of the first shuffled question in the original list of questions
            var questionIndex = originalQuestions.indexOf((getArrayColumn(content, 0)[i]))
            
            // find the corresponding answer that matches that question's index
            var answer = correctOptions[questionIndex];
            
            //now find where in the shuffled question's options the answer is
            var answerIndex = content[i][1].indexOf(answer);
            
            // push the corresponding letter from the letters array into the answer key
            answerKey.splice([i],1,letters[answerIndex]);
        }              

    //  put the question numbers and question text into the page
    for (i=0; i<content.length; i++) {                  // for each of the questions the developer has entered
        var q = i+1;                                    // variable to add question numbers
        var questionList = '<li class="question hidden"><div id="question" class="question-number">'+[q]+'.<div class="question-text">'+content[i][0]+'</div></div><div class="choices-block"><ul id="ul-choices-'+[q]+'" class="choices-list"></ul></div></li>';
        document.getElementById('ul-questions').innerHTML += questionList;  // add the assembled content each time the loop runs
    }
    
    // now put in the options for each question
    var q=1;    // create a variable to target each question incrementally
    var choicesBlocks = document.querySelectorAll('.choices-block').length; //find out how many questions are on the page
    for (var k=0; k<choicesBlocks; k++) {   // for each question
        for (var n=0; n<=5; n++) {  // loop through A to n where n is ONE LESS THAN the number of options
        var choicesList = '<li><div id="choices-'+letters[n]+'"><button id="'+[q]+'-'+letters[n]+'" class="choices-letter">'+letters[n]+'</button></div><div class="choices-text">'+content[k][1][n]+'</div></li>';
        document.getElementById('ul-choices-'+q).innerHTML += choicesList;  // add the options each time the loop runs
        } 
    q++;    // increment to next question number
    }    
        // temp code to add hidden to all questions

    // reveal first question only
        questionIndex = 0;
    $('.question').eq(questionIndex).removeClass('hidden');
        
        
    // prepare function to reveal next question
    function changeQ() {
        // hide all questions
        for (var i=0; i<=content.length; i++) {
            $('.question').eq(i).addClass('hidden');
        }
        // reveal the next question
        $('.question').eq(questionIndex).removeClass('hidden');
        $("#next").prop('disabled', false);
    }
    
    // disable the back button because we're on the first question
    $("#back").prop("disabled", true)
        
    // when next is clicked
    $('#next').click(function() {
        // check to make sure we're not at the end of the series
        if (questionIndex < content.length-1) {
            // if not then increment to the next question
            questionIndex++
            // run the function which shows next question
            changeQ();
            // if we are at the start of the series and moving to Q2
            if (questionIndex == 1) {
            // enable the back button
            $("#back").prop('disabled', false);
            } 
            // if we are at the end of the series
            if (questionIndex == content.length-1) {
            // disable the next button
            $(this).prop('disabled', true);
            }
        }
    });

    // when back is clicked
    $('#back').click(function() {
        // see if we're at the beginning of the series
        if (questionIndex > 0) {
            // if not then decrement to the next question
            questionIndex--
            // run the function which shows next question
            changeQ();
            // if we are at the start of the series
            if (questionIndex == 0) {
            // disable the back button
            $(this).prop('disabled', true);
            }
        }
    });
        
    // function to capture option that user taps
    $('.choices-letter').click(function() {
        // what's the ID of the clicked button
        var str = $(this).attr('id');
        // get the question number from it and remove 1 from it to prepare to use it as an index
        var number = (Number(str.substring(0,1)))-1;
        // get the answer letter from it
        var letter = str.substring(2);
        // put the answer letter in the answer key array at index one less than question number
        userChoices.splice((number),1,letter);
//        console.log(userChoices);
        });


    // function to check answers on click
    $('#check').click(function() {
        // reset score
        numberCorrect = 0;
        for (i=0; i<content.length; i++) {
            if (answerKey[i] === userChoices[i]) {
                numberCorrect++;
            }
        }
        console.log(userChoices);
        alert('You got '+numberCorrect+' out of '+content.length+' correct.');
    });
    };

$(document).ready(function() {
    start();
});

$("#shufflemc").click(start);