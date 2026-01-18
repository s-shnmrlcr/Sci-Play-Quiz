

/**
 * @param {string} txt - The message to display.
 * @param {string} type - The type of message ('error' for errors; any other value for status messages).
 */
function log(txt, type) {
    let color;
    let messageType;

    // Determine the color and message type based on the value of 'type'
    if (type === 'error') {
        color = 'red';
        messageType = '[ERROR]';
    } else {
        color = 'green';
        messageType = '[STATUS]';
    }
    
    // Use console.log to output the text with styling
    console.log('%c' + messageType + ': %c' + txt, 'color: ' + color, 'color: black');
}

/**
 * Displays a custom alert dialog on the page.
 *
 * @param {string} dialogTitle - The title of the dialog box.
 * @param {string} dialogMes - The message displayed in the dialog box.
 */
function alertDialog(dialogTitle, dialogMes) {
    // Create a new div element for the dialog
    const newDiv = document.createElement("div");
    
    // Assign an ID and class to the new div
    newDiv.id = "alertDialogWindow";
    newDiv.className = "alertDialogWindow";

    // Set the innerHTML using a template literal to structure the dialog
    newDiv.innerHTML = `
        <div id="alertDialogFirstCon" class="alertDialogFirstCon">
            <div id="alertDialogCon" class="alertDialogCon">
                <div class="alerDialogTitleCon">
                    <div class="alerDialogTitle">${dialogTitle}</div>
                </div>
                <div class="alertDialogMessage" id="alertDialogMessage">
                    ${dialogMes}
                </div>
                <div class="alertDialogButtonCon">
                    <button id="alertDialogPositiveButton">OKAY</button>
                </div>
            </div>
        </div>
    `;

    // Append the dialog to the document body
    document.body.appendChild(newDiv);

    // Add event listener to the OKAY button to remove the dialog on click
    document.getElementById("alertDialogPositiveButton").onclick = function () {
        document.getElementById("alertDialogWindow").remove();
    };
}

/**
 * Logs the status of database topics and their total number of questions.
 * Assumes `data_00` to `data_02` are predefined arrays and `topics` is a corresponding list of topic names.
 */
function databaseStatus() {
    for (let i = 0; i <= 2; i++) {
        let dataName = "data_" + ("0" + i).slice(-2);
        let data = eval(dataName);
        console.log(`%c[STATUS]:%c ${dataName} - Total Number of data questions at ${topics[i]}: %c${data.length} Questions`, "color:green;", "", "font-weight:bold;");
    }

    return "Successfully extracted the total numbers of questions!";
}

/**
 * Function to convert a number into words.
 * @param {number} num - The number to convert. Should be between 0 and 99.99.
 * @returns {string} The number in words.
 */
function numberToWord(num) {
    let units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
    let teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    let tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let integerPart = Math.floor(num);
    let decimalPart = Math.round((num - integerPart) * 100);

    let words = "";

    if (integerPart <= 10) {
        words += units[integerPart];
    } else if (integerPart < 20) {
        words += teens[integerPart - 11];
    } else {
        if (Math.floor(integerPart / 10) > 0) {
            words += tens[Math.floor(integerPart / 10) - 2];
        }
        if (integerPart % 10 > 0) {
            words += " " + units[integerPart % 10];
        }
    }

    if (decimalPart > 0) {
        words += " point";
        if (decimalPart < 10) {
            words += " " + units[decimalPart];
        } else if (decimalPart < 20) {
            words += " " + teens[decimalPart - 11];
        } else {
            if (Math.floor(decimalPart / 10) > 0) {
                words += " " + tens[Math.floor(decimalPart / 10) - 2];
            }
            if (decimalPart % 10 > 0) {
                words += " " + units[decimalPart % 10];
            }
        }
    }

    return words;
}

// Function to open the menu modal
function openMenuModal() {
    $(SELECT.BODY).append(`
        <div id="myModal" class="menu_modal">
            <div class="modal-content">
                <a href="javascript:void(0)" onclick="openCreateQuestionnaire()">
                    <div class="modal_content_icon"><svg style="margin: 0 5px -6px 0;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></div>
                    <div class="modal_content_description">Create your own questions</div>
                </a>
                <a href="javascript:void(0)" onclick="downloadTheWebsite()">
                    <div class="modal_content_icon"><svg style="margin: 0 5px -6px 0;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></div>
                    <div class="modal_content_description">Download the website</div>
                </a>
            </div>
        </div>
    `);
}



    // Stop the timer and reset the global timer counter
    stop_timer();
    timerCounterForGlobal = 0;

    // Retrieve all quiz button elements and icons
    let quizButtonElem = document.getElementsByClassName("quiz-button");
    let quizButtonIcon = document.getElementsByClassName("quiz-icon-container");

    // Loop through all quiz buttons and reset their styles and icons
    for (var i = 0; i < quizButtonElem.length; i++) {
        quizButtonElem[i].style.backgroundColor = "";               // Reset background color
        quizButtonElem[i].style.border = "";                        // Reset border
        quizButtonElem[i].style.transition = "0.3s";                // Add smooth transition
        quizButtonIcon[i].innerHTML = `${icon.bookmark_outline}`;   // Reset icon
    }
    $(SELECT.CONTENT_FOOTER).html(`
        &copy; ${currentYear} Research Team. All Rights Reserved.
    `);


// Function to close the menu modal
function closeMenuModal() {
    // Set the display style of the modal with the ID 'myModal' to 'none'
    $("#myModal").remove();
}

// Event handler for clicking outside the modal
window.onclick = function(event) {
    // Get the modal element with the ID 'myModal'
    var modal = document.getElementById('myModal');

    // Check if the clicked element is the modal itself
    if (event.target == modal) {
        // If the clicked element is the modal, hide the modal by setting its display style to 'none'
        $("#myModal").remove();
    }
}

// Function to open a Facebook profile in a new tab
function openCreateQuestionnaire() {
    window.open("lib/own.html", "_blank");
    closeMenuModal();
}

function downloadTheWebsite() {
    window.open("https://github.com/s-shnmrlcr/Sci-Play/", "_blank");
    closeMenuModal();
}

// Function to open the default email client with a pre-filled email address
function gotoMail() {
    window.open("mailto:shainelucero840@gmail.com.ph");
}

// Function to open a Facebook profile in a new tab
function gotoMyFB() {
    window.open("https://facebook.com/shnmrlcr", "_blank");
}

/**
 * Prints the contents of a specified HTML element.
 * @param {string} divName - The ID of the HTML element to be printed.
 */
function printResult(divName) {
    // Get the inner HTML content of the specified element
    var printContents = document.getElementById(divName).innerHTML;

    // Store the original body content
    var originalContents = document.body.innerHTML;

    // Replace the body content with the content of the specified element
    document.body.innerHTML = printContents;

    // Trigger the browser's print dialog
    window.print();

    // Restore the original body content
    document.body.innerHTML = originalContents;
}

/**
 * Generate unique number of Questions.
 * The question are not repetitive
 */
function uniqueRandomQuestion(min, max, length) {
    // Create an array with numbers from min to max
    all_array_of_question = [];
    for (let i = min; i <= max; i++) {
        all_array_of_question.push(i);
    }

    // Check if the length is valid
    if (length > (max - min + 1)) {
        throw new Error("Length of unique random array cannot be greater than the range of numbers.");
    }

    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = all_array_of_question.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all_array_of_question[i], all_array_of_question[j]] = [all_array_of_question[j], all_array_of_question[i]];
    }

    // Take the first 'length' elements from the shuffled array
    return all_array_of_question.slice(0, length);
}

/**
 * Validates the user's selected answer against the correct answer and provides feedback.
 *
 * @param {Object} answerData - The data containing the correct answer information.
 * @param {string} answerData.correct_ans - The correct answer as defined in the data structure.
 * @returns {void} - Updates the UI and logs whether the answer is correct or wrong.
 */
function fetchAnswerToCheck(answerData) {
    // Get all choice elements
    let choiceElements = document.getElementsByClassName("choices");

    // Loop through all choices
    for (var i = 0; i < choiceElements.length; i++) {
        // Reset background color for all choices
        choiceElements[i].style.backgroundColor = "";
        choiceElements[i].style.border = "";
        choiceElements[i].style.color = "";
        choiceElements[i].style.transition = "0.3s";
    }

    // Highlight the selected choice with specific styles
    choiceElements[selectedAnswerIndex].style.backgroundColor = bgColorForSelectedAnswer;
    choiceElements[selectedAnswerIndex].style.border = borderColorForSelectedAnswer;
    choiceElements[selectedAnswerIndex].style.transition = "0.3s";
    choiceElements[selectedAnswerIndex].style.color = "";

    // Retrieve the correct answer index from the provided data structure
    var correctAnswerIndex = answerData.correct_ans;

    // Generate the expected answer format (e.g., "1) Correct Answer Text")
    var correctAnswerIndex_true = (selectedAnswerIndex + 1) + ") " + correctAnswerIndex;

    // Compare the user's selected answer with the correct answer
    if (choiceElements[selectedAnswerIndex].innerHTML == correctAnswerIndex_true) {
        // Mark the answer as correct and Log "Correct" to the console if logging is enabled
        selectedAnswer = "Correct";
        if (show_correct_wrong_answer) {
            log("Correct");
        }
    } else {
        // Mark the answer as wrong and Log "Wrong" to the console if logging is enabled
        selectedAnswer = "Wrong";
        if (show_correct_wrong_answer) {
            log("Wrong", "error");
        }
    }
}

// Variable to store button label based on quiz or exam
let txtButton = "";

/**
 * Handles the completion of a quiz or exam by calculating the score, formatting results,
 * and updating the user interface with feedback and scoreboard details.
 */
function end_of_quiz() {
    // Get the current date and time for the report
    let curr_date = new Date();
    let curr_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let curr_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Format the current time (hh:mm:ss AM/PM)
    let currentTime = new Date().toLocaleTimeString();
    let timeParts = currentTime.split(":");
    let amPmPart = timeParts[2].split(" ")[1];
    let dateTimeGenerated = curr_month[curr_date.getMonth()] + ` ` + curr_date.getDate() + `, ` + curr_date.getFullYear()  + `, ` + curr_day[curr_date.getDay()] + `, ` + timeParts[0] + `:` + timeParts[1] + ` ` + amPmPart;

    // Rating based on the result
    let rating = "";

    // Calculate the percentage score of the user (with a max of 99.99%)
    let resultPercentage = (score/user_numbers_of_questions) * 99.99;

    // Convert the timer counter into hours, minutes, and seconds
    let timerDuration = Math.floor(timerCounterForGlobal);
    let minutes = Math.floor((timerDuration % 3600) / 60); // Calculate minutes within the current hour
    let seconds = Math.floor(timerDuration % 60);
    let hours = Math.floor(timerDuration / 3600);

    let txtHours = "";
    let txtMinutes = "";

    // Format the timer output based on hours, minutes, and seconds
    if (hours !== 0) {
        txtHours = `${hours} hour(s) and`;
    }
    if (minutes !== 0) {
        txtMinutes = `${minutes} minute(s) and`;
    }
    let timeFinished = `${txtHours} ${txtMinutes} ${seconds} second(s)`;

    // Determine if the user passed or failed based on a passing grade of 80%
    if (resultPercentage < passing_grade) {
        rating = `<span style="color:red">FAILED</span>`;
    }
    else {
        rating = `<span style="color:green">PASSED</span>`;
    }

    // stop the timer and stop the autosubmit functionality
    stop_timer();
    // If AutoSubmit is set to true. stop the autosubmit
    if (isAutoSubmit) {
        stopAutoSubmit();
    }

    // Congratulatory message based on the context (quiz or exam)
    let congrats_message = "";
    if (isTakingExam) {
        congrats_message = "CONGRATULATIONS ON COMPLETING THE EXAMINATION!";
        txtButton = "Exam";
    }
    else {
        congrats_message = `CONGRATULATIONS ON COMPLETING THE QUIZ!`;
        txtButton = "Quiz";
    }

    // Update the UI to show the completion message
    $(SELECT.CONTENT_MAIN).html(`
        <h2>${congrats_message}</h2>
        <p>Topic: ${topics[selectedTopicID]}.</p>
        <p>To view your results, please click the "Show Your ${txtButton} Result" button.</p>
        <button class="button_design" onclick="showResult()" class="">Show Your ${txtButton} Result</button>
    `);

    // Handle scoreboard updates for exams
    if (isTakingExam) {
        // Increment exam result counter and update scoreboard data
        counter_display_exam_result += 1;
        exam_scoreboard_topic.push(topics[3]);
        exam_scoreboard_score.push(score);
        exam_scoreboard_topic_last_num.push(user_numbers_of_questions);
        exam_scoreboard_percentage.push(resultPercentage.toFixed(2));
        exam_scoreboard_rating.push(rating);
        exam_scoreboard_finished_time.push(timeFinished);
        exam_scoreboard_userName.push(currentUserName); // Store user's name

        // Update exam-specific data for review and result storage
        scoreboard_exam_uniqueQuestionsId_00.push(uniqueRandomArrayQuestions_00);
        scoreboard_exam_uniqueQuestionsId_01.push(uniqueRandomArrayQuestions_01);
        scoreboard_exam_uniqueQuestionsId_02.push(uniqueRandomArrayQuestions_02);
       
        scoreboard_exam_my_answer.push(my_answer);
        scoreboard_exam_answer_time.push(answer_time);
        scoreboard_exam_choices.push(prev_choices);
        scoreboard_exam_correct_wrong_notif.push(correct_wrong_notif);

        // for ShowResult() storage if open using the openScoreBoard
        scoreboard_showresult_exam_subjectForTaking.push(topics[3]);
        scoreboard_showresult_exam_resultPercentage.push(resultPercentage);
        scoreboard_showresult_exam_score.push(score);
        scoreboard_showresult_exam_genInfoScore.push(genInfoScore);

        scoreboard_showresult_exam_timeFinished.push(timeFinished);
        scoreboard_showresult_exam_dateTimeGenerated.push(dateTimeGenerated);
    }
    else {
        // Increment quiz result counter and update scoreboard data
        counter_display_quiz_result += 1;
        quiz_scoreboard_topic.push(topics[selectedTopicID]);
        quiz_scoreboard_topicID.push(selectedTopicID);
        quiz_scoreboard_score.push(score);
        quiz_scoreboard_topic_last_num.push(user_numbers_of_questions);
        quiz_scoreboard_percentage.push(resultPercentage.toFixed(2));
        quiz_scoreboard_rating.push(rating);
        quiz_scoreboard_finished_time.push(timeFinished);
        quiz_scoreboard_userName.push(currentUserName); // Store user's name

        // Store quiz-specific data for result storage and review
        switch (selectedTopicID) {
            case 0:
                scoreboard_uniqueQuestionsId.push(uniqueRandomArrayQuestions_00);
            break;
            case 1:
                scoreboard_uniqueQuestionsId.push(uniqueRandomArrayQuestions_01);
            break;
            case 2:
                scoreboard_uniqueQuestionsId.push(uniqueRandomArrayQuestions_02);
            break;

        }
        scoreboard_prev_my_answer.push(my_answer);
        scoreboard_prev_answer_time.push(answer_time);
        scoreboard_prev_questions.push(prev_questions);
        scoreboard_prev_choices.push(prev_choices);
        scoreboard_correct_wrong_notif.push(correct_wrong_notif);

        // for ShowResult() storage if open using the openScoreBoard
        scoreboard_showresult_quiz_subjectForTaking.push(topics[selectedTopicID]); 
        scoreboard_showresult_quiz_score.push(score);
        scoreboard_showresult_quiz_resultPercentage.push(resultPercentage);
        scoreboard_showresult_quiz_timeFinished.push(timeFinished);
        scoreboard_showresult_dateTimeGenerated.push(dateTimeGenerated);
    }
    
    // Save user's scoreboard data to localStorage
    saveUserScoreboard();
}

// Function to display the results of the exam or quiz
function showResult(showResultTopicID) {
    // Scroll to the top of the content section
    const contentMain = document.getElementsByClassName('content-main')[0];
    contentMain.scrollTo(0, 0);

    // Reset the tooltip
    tooltip_counter = 0;

    // Get the current date and time for the report
    let curr_date = new Date();
    let curr_month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let curr_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Format the current time (hh:mm:ss AM/PM)
    let currentTime = new Date().toLocaleTimeString();
    let timeParts = currentTime.split(":");
    let amPmPart = timeParts[2].split(" ")[1];
    let dateTimeGenerated = curr_month[curr_date.getMonth()] + ` ` + curr_date.getDate() + `, ` + curr_date.getFullYear()  + `, ` + curr_day[curr_date.getDay()] + `, ` + timeParts[0] + `:` + timeParts[1] + ` ` + amPmPart;

    // Calculate the percentage score of the examinee (with a max of 99.99%)
    let resultPercentage = (score/user_numbers_of_questions) * 99.99;

    // Convert the timer counter into hours, minutes, and seconds
    let timerDuration = Math.floor(timerCounterForGlobal);
    let minutes = Math.floor((timerDuration % 3600) / 60);
    let seconds = Math.floor(timerDuration % 60);
    let hours = Math.floor(timerDuration / 3600);

    let txtHours = "";
    let txtMinutes = "";

    // Format the timer output based on hours, minutes, and seconds
    if (hours !== 0) {
        txtHours = `${hours} hour(s) and`;
    }
    if (minutes !== 0) {
        txtMinutes = `${minutes} minute(s) and`;
    }
    let timeFinished = `${txtHours} ${txtMinutes} ${seconds} second(s)`;

    // Initialize subject for the exam or quiz
    let subject_for_taking = "";

    let overAllText = "";

    // Rating and message based on the result
    let rating = "";
    let message = "";

    // Subject-specific rating and area score
    let exam_rating = "";
    let subject_per_area_score = "";

    // Determine if it's a quiz or an exam
    isTxtExamOrQuiz = txtButton;

    // Update variables when viewing results via the scoreboard
    if (isReviewingResultViaScoreBoard) {
        if (isTakingExam) {
            // Assign exam-related variables
            subject_for_taking  = scoreboard_showresult_exam_subjectForTaking[scoreboard_dataIndex];
            resultPercentage    = scoreboard_showresult_exam_resultPercentage[scoreboard_dataIndex];
            score               = scoreboard_showresult_exam_score[scoreboard_dataIndex];
            genInfoScore        = scoreboard_showresult_exam_genInfoScore[scoreboard_dataIndex];

            timeFinished        = scoreboard_showresult_exam_timeFinished[scoreboard_dataIndex];
            dateTimeGenerated   = scoreboard_showresult_exam_dateTimeGenerated[scoreboard_dataIndex];
        }
        else {
            // Assign quiz-related variables
            subject_for_taking  = scoreboard_showresult_quiz_subjectForTaking[scoreboard_dataIndex];
            resultPercentage    = scoreboard_showresult_quiz_resultPercentage[scoreboard_dataIndex];
            score               = scoreboard_showresult_quiz_score[scoreboard_dataIndex];
            timeFinished        = scoreboard_showresult_quiz_timeFinished[scoreboard_dataIndex];
            dateTimeGenerated   = scoreboard_showresult_dateTimeGenerated[scoreboard_dataIndex];
        } 
    }

    // Calculate individual subject ratings
    let genInfoRatePercentage = (genInfoScore/user_numbers_of_questions) * 99.99;

    if (isTakingExam) {
        // Generate exam rating table
        exam_rating = `
            <div>
                <b>Rating per Subject Areas</b>
            </div>
            <table class="design_table_rating_exam">
                <th>General Info</th>
                <tr>

                    <td><span class="general_info_rate">${genInfoRatePercentage.toFixed(2)}</span>%</td>
                <tr>
            </table>
        `;

        // Display the subject currently being taken
        subject_for_taking = topics[3];

        // Display the score per subject area
        subject_per_area_score = `
            <p>
                You got the following points per subject area:
                <p>
                    <div>General Information: <b>${genInfoScore} point(s)</b> out of ${user_numbers_of_questions} questions.</div>
                
                </p>
            </p>
        `;

        overAllText = `Overall, `;
    }
    else {
        // Assign the subject for the selected Quiz
        subject_for_taking = topics[selectedTopicID];
    }

    // Determine whether the examinee passed or failed (80% is the passing grade)
    if (resultPercentage < passing_grade) {
        rating = `<span style="color:red">FAILED</span>`;
        message = `While you may not have achieved the desired score on this occasion, I hope that this experience has been a valuable learning opportunity for you. Failing the ${isTxtExamOrQuiz} does not define your capabilities, but rather provides an opportunity for improvement and further study. I encourage you to review the materials and consider retaking the ${isTxtExamOrQuiz} in the future to see your progress.`;
    }
    else {
        rating = `<span style="color:green">PASSED</span>`;
        message = "Congratulations on your achievement! I hope that this experience has been valuable to you in your quest for knowledge and learning.";
    }

    // Display the result to the user
    $(SELECT.CONTENT_MAIN).html(`
        <div class="print_button_con"><button type="button" onclick="printResult('printableArea')">
            ${icon.printer}
            Print Result</button>
        </div>

        <div class="show_result_con" >
                <div id="printableArea">
                    <center>
                        <b>REPORT OF RATING</b>
                    </center>
                    <p>Dear Ma'am/Sir,</p>
                    <p>Good day!</p>
                    <p style="text-align:justify;">
                        Please be informed that you <b>${rating}</b> the ${subject_for_taking} -, with a general rating of <b>${numberToWord(resultPercentage.toFixed(2))} Percent (${resultPercentage.toFixed(2)}%)</b>
                    </p>
                    ${subject_per_area_score}
                    <center>
                        <p>
                            ${overAllText}You got <b>${score} point(s) out of ${user_numbers_of_questions} questions</b>.<br/>
                            You finished the ${isTxtExamOrQuiz} in <b>${timeFinished}</b>.
                        </p>
                        ${exam_rating}
                    </center>
                    <p>
                        <p style="text-align:justify;">${message}</p>
                    </p>
                    <p>
                        Very truly yours,
                    </p>
                    <p>
                        <b>${letter_name}</b><br>
                        ${letter_position}
                    </p>
                    <p>
                        <i>Date and Time Generated: <b>${dateTimeGenerated}</b></i>
                    </p>
                    <center>
                        <i style="font-size:11px">Please note: This is an electronic printout. It is not intended to be used for any legal purposes.</i>
                    </center>
                </div>
            </div>
        </div>
    `);

    // If it's an ongoing exam, provide an option to review answers
    if (isTakingExam) {
        if (isReviewingResultViaScoreBoard) {
            $(SELECT.CONTENT_FOOTER).html(`
                <div class="review_ans_con">
                    <button onclick="reviewed_ans_for_exam(${scoreboard_dataIndex})" class="review_answer ripple-btn">Review your Answer</button>
                </div>
            `);
        }
        else {
            $(SELECT.CONTENT_FOOTER).html(`
                <div class="review_ans_con">
                    <button onclick="reviewed_ans_for_exam()" class="review_answer ripple-btn">Review your Answer</button>
                </div>
            `);
        }
    }
    else {
        // Provide review answer options for quiz if the user is reviewing the answer via scoreboard
        if (isReviewingResultViaScoreBoard) {
            $(SELECT.CONTENT_FOOTER).html(`
                <div class="review_ans_con">
                    <button onclick="displayQuizPrevQuestionsAndChoices(${scoreboard_topicIndex}, ${scoreboard_dataIndex})" class="scoreboard_review_answer ripple-btn">Review your Answer</button>
                </div>
            `);
        }
        else {
            $(SELECT.CONTENT_FOOTER).html(`
                <div class="review_ans_con">
                    <button onclick="displayQuizPrevQuestionsAndChoices(${selectedTopicID})" class="review_answer ripple-btn">Review your Answer</button>
                </div>
            `);
        }
    }
}

// Function to update the timer
function update_timer() {
    timerInterval = setInterval(function() {
        // Increment the timer counters
        timerCounter++;
        timerCounterForGlobal++;

        // Calculate the timer duration in seconds
        let timerDuration = Math.floor(timerCounter);

        // Calculate the current seconds and minutes
        let secs = Math.floor(timerDuration) % 60;
        let min = Math.floor(timerDuration / 60);

        // Convert the seconds and minutes to strings for display
        let secs_string = secs.toString();
        let min_string = min.toString();

        // Get the length of the seconds and minutes strings
        let secs_length = secs_string.length;
        let min_length = min_string.length;

        // Get the timer display elements
        let timerMinutes = document.querySelector("#timerMinutes");
        let timerSeconds = document.querySelector("#timerSeconds");

        // Update the seconds display, adding a leading zero for single-digit numbers
        if (secs_length == 1) {
            timerSeconds.innerHTML = "0" + secs_string;
        }
        else {
            timerSeconds.innerHTML = secs_string;
        }

        // Update the minutes display, adding a leading zero for single-digit numbers
        if (min_length == 1) {
            timerMinutes.innerHTML = "0" + min_string;
        }
        else {
            timerMinutes.innerHTML = min_string;
        }
    }, convert_to_milliseconds);
}

// Function to stop the timer
function stop_timer() {
    // Stop the interval of the update timer
    clearInterval(timerInterval);

    // Reset the timer for initiating counter
    timerInitiateCounter = 0;
}

function initiate_timer() {
    // Increment the timerInitiateCounter by 1.
    timerInitiateCounter++;

    // Check if the timer has been initiated for the first time.
    // If so, call the update_timer function.
    if (timerInitiateCounter == 1) {
        // Call the update_timer function to start the timer.
        // This function is only called the first time the timer is initiated.
        update_timer();
    }

    // Reset the counter for timerCounting
    timerCounter = 0;
}

/**
 * Opens the scoreboard to display the results of quizzes and exams.
 * This function performs the following actions:
 * 1. Marks that the user is reviewing the results via the scoreboard.
 * 2. Stops and resets the global timer.
 * 3. Resets the styles and icons of all quiz buttons to their default state.
 * 4. Sets flags indicating that the user is no longer taking a quiz or exam.
 * 5. Renders the structure of the scoreboard, including placeholders for quiz and exam results.
 * 6. Populates the scoreboard with the user's quiz and exam scores if available.
 * 7. Clears all variables related to the previous questions, choices, and answers.
 */
function openScoreboard() {
    // Set the variable to true to indicate the user is reviewing results via the scoreboard
    isReviewingResultViaScoreBoard = true;

    // Stop the timer and reset the global timer counter
    stop_timer();
    timerCounterForGlobal = 0;

    // Retrieve all quiz button elements and icons
    let quizButtonElem = document.getElementsByClassName("quiz-button");
    let quizButtonIcon = document.getElementsByClassName("quiz-icon-container");

    // Loop through all quiz buttons and reset their styles and icons
    for (var i = 0; i < quizButtonElem.length; i++) {
        quizButtonElem[i].style.backgroundColor = "";               // Reset background color
        quizButtonElem[i].style.border = "";                        // Reset border
        quizButtonElem[i].style.transition = "0.3s";                // Add smooth transition
        quizButtonIcon[i].innerHTML = `${icon.bookmark_outline}`;   // Reset icon
    }

    // Set flags to indicate the user is not taking a quiz or an exam
    isTakingQuiz = false;
    isTakingExam = false;

    // Display the scoreboard structure in the main content area
    $(SELECT.CONTENT_MAIN).html(`
        <h1>Score Board</h1><br/>
        <div id="scoreboard_result_con">
            <div id="scoreboard_quiz_result_con"><span style="color:#777777">Your score result in <b>Quiz</b> will display here.</span></div>
            <br/><hr/><br/>
            <div id="scoreboard_exam_result_con"><span style="color:#777777">Your score result in <b>Exam</b> will display here.</span></div>
        </div>
    `);

    // Display the footer content with passing grade information
    $(SELECT.CONTENT_FOOTER).html(`
        <div style="font-size:13px"><strong>Please note</strong>: <br/>The Passing Grade is ${passing_grade}.00% and above</div>
    `);

    // Populate the quiz results table if applicable
    if (counter_display_quiz_result > 0) {
        $("#scoreboard_quiz_result_con").html(`
            <h2>Your scores in Quiz:</h2>
            <table id="score_list_quiz" class="design_score_list">
                <th>Quiz No.</th>
                <th style="text-align:left">Student Name</th>
                <th style="text-align:left">Topic</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Rating</th>
                <th>Finished time</th>
                <th>Review Answer</th>
            </table>
        `);
    }
    for (var i = 0; i < quiz_scoreboard_topic.length; i++) {
        $("#score_list_quiz").append(`
            <tr>
                <td><span class="verbal_rate">${[i+1]}</span></td>
                <td style="width:200px;text-align:left"><span class="analytical_info_rate">${quiz_scoreboard_userName[i] || 'Unknown'}</span></td>
                <td style="width:450px;text-align:left"><span class="analytical_info_rate">${quiz_scoreboard_topic[i]}</span></td>
                <td style="width:80px;"><span class="numerical_info_rate"><sup>${quiz_scoreboard_score[i]}</sup>&frasl;<sub>${quiz_scoreboard_topic_last_num[i]}</sub></td>
                <td style="width:80px;"><span class="numerical_info_rate">${quiz_scoreboard_percentage[i]}%</td>
                <td style="width:70px;"><span class="numerical_info_rate">${quiz_scoreboard_rating[i]}</td>
                <td style="width:140px;"><span class="numerical_info_rate">${quiz_scoreboard_finished_time[i]}</td>
                <td style="width:100px;"><span class="numerical_info_rate"><button class="review_answer" onclick="displayQuizPrevQuestionsAndChoices(${quiz_scoreboard_topicID[i]}, ${[i]})">Review</button></td>
            </tr>
        `);
    }

    // Populate the exam results table if applicable
    if (counter_display_exam_result > 0) {
        $("#scoreboard_exam_result_con").html(`
            <h2>Your scores in Exam:</h2>
            <table id="score_list_exam" class="design_score_list">
                <th>Exam No.</th>
                <th style="text-align:left">Student Name</th>
                <th style="text-align:left">Topic</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Rating</th>
                <th>Finished time</th>
                <th>Review Answer</th>
            </table>
        `);
    }
    for (var i = 0; i < exam_scoreboard_topic.length; i++) {
        $("#score_list_exam").append(`
            <tr>
                <td><span class="verbal_rate">${[i+1]}</span></td>
                <td style="width:200px;text-align:left"><span class="analytical_info_rate">${exam_scoreboard_userName[i] || 'Unknown'}</span></td>
                <td style="width:450px;text-align:left"><span class="analytical_info_rate">${topics[3]}</span></td>
                <td style="width:80px;"><span class="numerical_info_rate"><sup>${exam_scoreboard_score[i]}</sup>&frasl;<sub>${exam_scoreboard_topic_last_num[i]}</sub></td>
                <td style="width:80px;"><span class="numerical_info_rate">${exam_scoreboard_percentage[i]}%</td>
                <td style="width:70px;"><span class="numerical_info_rate">${exam_scoreboard_rating[i]}</td>
                <td style="width:140px;"><span class="numerical_info_rate">${exam_scoreboard_finished_time[i]}</td>
                <td style="width:100px;"><span class="numerical_info_rate"><button class="review_answer" onclick="reviewed_ans_for_exam(${[i]})">Review</button></td>
            </tr>
        `);
    }

    // Reset the database-related variables
    prev_questions      = [];   // Clear previous questions
    prev_choices        = [];   // Clear previous choices
    my_answer           = [];   // Clear user answers
    answer_time         = [];   // Clear answer timings
    correct_wrong_notif = [];   // Clear correct/wrong notifications
    tooltip_counter     = 0;    // Reset the tooltip
}

/* Ripple effect for button */
function initializeRippleEffect() {
    // Attach the click event listener to a parent element
    document.body.addEventListener('click', function (event) {
        // Find the closest ancestor with the 'ripple-btn' class
        const rippleBtn = event.target.closest('.ripple-btn');
        
        if (rippleBtn) {
            createRipple(event, rippleBtn);
        }
    });
}

function createRipple(event, element) {
    // Create a ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate the position of the ripple
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Apply position and size to the ripple
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Append the ripple to the element
    element.appendChild(ripple);

    // Remove the ripple element after the animation completes
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Initialize the ripple effect when the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeRippleEffect();
});


// Global variables to manage the auto-submit functionality
let submittedAnswer;        // Interval ID for managing auto-submit

/**
 * Starts the auto-submit functionality for either an exam or a quiz.
 * Automatically submits random answers at regular intervals.
 *
 * @returns {string} - A confirmation message indicating that auto-submit has started.
 */
function startAutoSubmit() {
    // Disable alerts for non-answered questions during auto-submit
    disable_non_answer_alert = true;
    isAutoSubmit = true;

     if (isTakingExam) {
        // Auto-submit logic for exams and Execute every 50ms
        submittedAnswer = setInterval(function() {
            // Simulate checking a random answer
            checkExamAnswer(Math.floor(Math.random() * 5));

            // Submit the answer for the exam
            submitAnswerForExam();
        }, 50);
    }
    else {
        // Auto-submit logic for quizzes and Execute every 50ms
        submittedAnswer = setInterval(function() {
            // Simulate checking a random answer
            checkQuizAnswer(Math.floor(Math.random() * 5));

            // Submit the answer for the quiz
            submitAnswerForQuiz()
        }, 50);
    }

    // Log the initiation of auto-submit
    log("Initiating AutoSubmit!");
    return "AutoSubmit has been sucessfully initiated!";
}

/**
 * Stops the auto-submit functionality and restores default settings.
 */
function stopAutoSubmit() {
    // Re-enable alerts for non-answered questions
    disable_non_answer_alert = false;
    isAutoSubmit = false;

    // Clear the auto-submit interval
    clearInterval(submittedAnswer);

    // Log the termination of auto-submit
    log("AutoSubmit has been stopped!");
}

/**
 * Shows the authentication screen (login or signup).
 */
function showAuthScreen() {
    if (authScreenType === 'signup') {
        showSignupScreen();
    } else {
        showLoginScreen();
    }
}

/**
 * Shows the login screen.
 */
function showLoginScreen() {
    $("body").append(`
        <div class="login_window">
            <div class="login_container">
                <h2>Login</h2>
                <form onSubmit="return submitLogin(event)">
                    <label for="loginUsername">Username:</label>
                    <input autocomplete="off" placeholder="Enter your username..." type="text" id="loginUsername" name="username" />
                    <label for="loginPassword">Password:</label>
                    <input placeholder="Enter your password..." type="password" id="loginPassword" name="password" />
                    <input type="submit" value="Login" />
                </form>
                <div class="auth-footer">
                    <p>Don't have an account? <a href="javascript:void(0)" onclick="switchToSignup()">Sign up here</a></p>
                </div>
            </div>
        </div>
    `);
}

/**
 * Shows the signup screen.
 */
function showSignupScreen() {
    $("body").append(`
        <div class="login_window">
            <div class="login_container">
                <h2>Sign Up</h2>
                <form onSubmit="return submitSignup(event)">
                    <label for="signupUsername">Username:</label>
                    <input autocomplete="off" placeholder="Create a username..." type="text" id="signupUsername" name="username" />
                    <label for="signupPassword">Password:</label>
                    <input placeholder="Create a password..." type="password" id="signupPassword" name="password" />
                    <label for="signupConfirmPassword">Confirm Password:</label>
                    <input placeholder="Confirm your password..." type="password" id="signupConfirmPassword" name="confirmPassword" />
                    <input type="submit" value="Sign Up" />
                </form>
                <div class="auth-footer">
                    <p>Already have an account? <a href="javascript:void(0)" onclick="switchToLogin()">Login here</a></p>
                </div>
            </div>
        </div>
    `);
}

/**
 * Switches to login screen.
 */
function switchToLogin() {
    authScreenType = 'login';
    $(".login_window").remove();
    showLoginScreen();
}

/**
 * Switches to signup screen.
 */
function switchToSignup() {
    authScreenType = 'signup';
    $(".login_window").remove();
    showSignupScreen();
}

/**
 * Handles user signup.
 * Validates and stores new user credentials.
 *
 * @param {Event} event - The form submission event.
 * @returns {boolean} - Always returns false to prevent default form submission.
 */
function submitSignup(event) {
    event.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();

    // Validation
    if (username === "" || password === "") {
        alertDialog("Error", "Username and password cannot be empty.");
        return false;
    }

    if (password !== confirmPassword) {
        alertDialog("Error", "Passwords do not match.");
        return false;
    }

    if (password.length < 4) {
        alertDialog("Error", "Password must be at least 4 characters long.");
        return false;
    }

    // Check if user already exists
    const usersListKey = "sciplay_users_list";
    const usersList = JSON.parse(localStorage.getItem(usersListKey)) || {};

    if (usersList[username]) {
        alertDialog("Error", "Username already exists. Please choose another username.");
        return false;
    }

    // Store new user
    usersList[username] = {
        password: btoa(password), // Simple Base64 encoding (not secure for production)
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(usersListKey, JSON.stringify(usersList));
    
    log("Account created successfully! Please log in.");
    alertDialog("Success", "Account created successfully! Please log in with your credentials.");
    
    // Switch to login screen
    authScreenType = 'login';
    $(".login_window").remove();
    showLoginScreen();

    return false;
}

/**
 * Handles user login.
 * Validates credentials and loads user data.
 *
 * @param {Event} event - The form submission event.
 * @returns {boolean} - Always returns false to prevent default form submission.
 */
function submitLogin(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Validation
    if (username === "" || password === "") {
        alertDialog("Error", "Username and password cannot be empty.");
        return false;
    }

    // Check user credentials
    const usersListKey = "sciplay_users_list";
    const usersList = JSON.parse(localStorage.getItem(usersListKey)) || {};

    if (!usersList[username]) {
        alertDialog("Error", "Username does not exist.");
        return false;
    }

    const storedPassword = usersList[username].password;
    const decodedPassword = atob(storedPassword); // Decode Base64

    if (password !== decodedPassword) {
        alertDialog("Error", "Invalid password.");
        return false;
    }

    // Login successful
    currentUsername = username;
    log("Login successful! Welcome, " + username);
    
    // Load user's saved scoreboard data from localStorage
    loadUserScoreboard(username);
    
    // Remove the login window
    $(".login_window").remove();
    
    // Show name input dialog
    showNameInputDialog();

    return false;
}

/**
 * Displays a dialog asking the user to enter their full name.
 * This must be completed before accessing quizzes and exams.
 */
function showNameInputDialog() {
    const newDiv = document.createElement("div");
    newDiv.id = "nameInputWindow";
    newDiv.className = "nameInputWindow";

    newDiv.innerHTML = `
        <div id="nameInputFirstCon" class="nameInputFirstCon">
            <div id="nameInputCon" class="nameInputCon">
                <div class="nameInputTitle">Enter Your Name</div>
                <div class="nameInputDescription">Please enter your full name to proceed with the quiz and exam.</div>
                <form onsubmit="return submitUserName(event)">
                    <input 
                        type="text" 
                        id="userNameInput" 
                        class="nameInputField"
                        placeholder="Enter your full name..." 
                        autocomplete="off"
                        autofocus
                    />
                    <button type="submit" class="nameInputButton">Continue</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(newDiv);
}

/**
 * Handles the submission of the name input form.
 * 
 * @param {Event} event - The form submission event.
 * @returns {boolean} - Always returns false to prevent the default form submission action.
 */
function submitUserName(event) {
    event.preventDefault();
    
    const fullName = document.getElementById("userNameInput").value.trim();
    
    if (fullName === "") {
        alertDialog("Error", "Please enter your name.");
        return false;
    }
    
    currentUserName = fullName;
    log("Name registered: " + fullName);
    
    // Remove the name input window
    const nameInputWindow = document.getElementById("nameInputWindow");
    if (nameInputWindow) {
        nameInputWindow.remove();
    }
    
    // Show logout button
    document.getElementById("logoutButton").style.display = "block";
    
    return false;
}

/**
 * Logs out the current user.
 * Clears user data, saves the scoreboard, and shows the login screen again.
 */
function logoutUser() {
    if (!currentUsername) {
        alertDialog("Error", "No user is currently logged in.");
        return;
    }
    
    // Save the current user's scoreboard before logging out
    saveUserScoreboard();
    
    // Reset user data
    currentUsername = null;
    currentUserName = null;
    
    // Hide logout button
    document.getElementById("logoutButton").style.display = "none";
    
    // Reset all scoreboard and quiz/exam related flags
    isTakingQuiz = false;
    isTakingExam = false;
    isQuizFinished = false;
    isExamFinished = false;
    
    // Reset score and answer tracking
    score = 0;
    genInfoScore = 0;
    my_answer = [];
    answer_time = [];
    correct_wrong_notif = [];
    isAnswerSelected = false;
    selectedAnswer = null;
    
    log("Logged out successfully!");
    
    // Show login form again
    if (isLoginEnable) {
        authScreenType = 'login';
        showLoginScreen();
    }
    
    // Reset content to home page
    $(SELECT.CONTENT_MAIN).html(`
        <h2>A Message from the SciPlay Researchers</h2>
        <p>Hello and Welcome!</p>
        <p>
          This Sci-Play quiz website was created with the purpose of helping
          Grade 10 learners review and strengthen their understanding of key
          lessons in a fun and interactive way. All quiz questions included here
          were carefully selected from publicly accessible educational sources.
        </p>
        <p>
          This website is intended solely for educational use. Proper
          acknowledgment has been given to original authors and sources to
          ensure transparency and respect for their work.
        </p>
        <p>
          If you believe any content requires correction, proper attribution, or
          removal, or if you have ideas that can help improve this learning
          tool, your input is very much appreciated.
        </p>
        <p>
          You may also contribute by sharing your own educational questions
          through email, and selected submissions may be featured on the site.
        </p>
        <p>Thank you for supporting responsible and accessible learning.</p>
        <p>Martinez, Samulde, Napao, Sermida</p>
        <p>RESEARCHERS</p>
    `);
    
    $(SELECT.CONTENT_FOOTER).html("");
}

/**
 * Loads the user's scoreboard data from localStorage.
 * Restores all quiz and exam scores for the logged-in user.
 *
 * @param {string} username - The logged-in username.
 */
function loadUserScoreboard(username) {
    const userDataKey = "sciplay_user_" + username;
    const savedData = localStorage.getItem(userDataKey);
    
    if (savedData) {
        try {
            const userData = JSON.parse(savedData);
            
            // Restore quiz scoreboard data
            quiz_scoreboard_topic = userData.quiz_scoreboard_topic || [];
            quiz_scoreboard_topicID = userData.quiz_scoreboard_topicID || [];
            quiz_scoreboard_score = userData.quiz_scoreboard_score || [];
            quiz_scoreboard_topic_last_num = userData.quiz_scoreboard_topic_last_num || [];
            quiz_scoreboard_percentage = userData.quiz_scoreboard_percentage || [];
            quiz_scoreboard_rating = userData.quiz_scoreboard_rating || [];
            quiz_scoreboard_finished_time = userData.quiz_scoreboard_finished_time || [];
            quiz_scoreboard_userName = userData.quiz_scoreboard_userName || [];
            
            // Restore exam scoreboard data
            exam_scoreboard_topic = userData.exam_scoreboard_topic || [];
            exam_scoreboard_score = userData.exam_scoreboard_score || [];
            exam_scoreboard_topic_last_num = userData.exam_scoreboard_topic_last_num || [];
            exam_scoreboard_percentage = userData.exam_scoreboard_percentage || [];
            exam_scoreboard_rating = userData.exam_scoreboard_rating || [];
            exam_scoreboard_finished_time = userData.exam_scoreboard_finished_time || [];
            exam_scoreboard_userName = userData.exam_scoreboard_userName || [];
            
            // Restore review data
            scoreboard_uniqueQuestionsId = userData.scoreboard_uniqueQuestionsId || [];
            scoreboard_prev_my_answer = userData.scoreboard_prev_my_answer || [];
            scoreboard_prev_answer_time = userData.scoreboard_prev_answer_time || [];
            scoreboard_prev_questions = userData.scoreboard_prev_questions || [];
            scoreboard_prev_choices = userData.scoreboard_prev_choices || [];
            scoreboard_correct_wrong_notif = userData.scoreboard_correct_wrong_notif || [];
            
            // Restore exam review data
            scoreboard_exam_my_answer = userData.scoreboard_exam_my_answer || [];
            scoreboard_exam_answer_time = userData.scoreboard_exam_answer_time || [];
            scoreboard_exam_choices = userData.scoreboard_exam_choices || [];
            scoreboard_exam_correct_wrong_notif = userData.scoreboard_exam_correct_wrong_notif || [];
            
            scoreboard_exam_uniqueQuestionsId_00 = userData.scoreboard_exam_uniqueQuestionsId_00 || [];
            scoreboard_exam_uniqueQuestionsId_01 = userData.scoreboard_exam_uniqueQuestionsId_01 || [];
            scoreboard_exam_uniqueQuestionsId_02 = userData.scoreboard_exam_uniqueQuestionsId_02 || [];
            
            // Restore counters
            counter_display_quiz_result = userData.counter_display_quiz_result || 0;
            counter_display_exam_result = userData.counter_display_exam_result || 0;
            
            log("User data loaded successfully for: " + username);
        } catch (e) {
            log("Error loading user data: " + e.message, "error");
        }
    }
}

/**
 * Saves the user's current scoreboard data to localStorage.
 * Called whenever a quiz or exam is completed.
 */
function saveUserScoreboard() {
    if (!currentUsername) return;
    
    const userDataKey = "sciplay_user_" + currentUsername;
    const userData = {
        quiz_scoreboard_topic: quiz_scoreboard_topic,
        quiz_scoreboard_topicID: quiz_scoreboard_topicID,
        quiz_scoreboard_score: quiz_scoreboard_score,
        quiz_scoreboard_topic_last_num: quiz_scoreboard_topic_last_num,
        quiz_scoreboard_percentage: quiz_scoreboard_percentage,
        quiz_scoreboard_rating: quiz_scoreboard_rating,
        quiz_scoreboard_finished_time: quiz_scoreboard_finished_time,
        quiz_scoreboard_userName: quiz_scoreboard_userName,
        exam_scoreboard_topic: exam_scoreboard_topic,
        exam_scoreboard_score: exam_scoreboard_score,
        exam_scoreboard_topic_last_num: exam_scoreboard_topic_last_num,
        exam_scoreboard_percentage: exam_scoreboard_percentage,
        exam_scoreboard_rating: exam_scoreboard_rating,
        exam_scoreboard_finished_time: exam_scoreboard_finished_time,
        exam_scoreboard_userName: exam_scoreboard_userName,
        scoreboard_uniqueQuestionsId: scoreboard_uniqueQuestionsId,
        scoreboard_prev_my_answer: scoreboard_prev_my_answer,
        scoreboard_prev_answer_time: scoreboard_prev_answer_time,
        scoreboard_prev_questions: scoreboard_prev_questions,
        scoreboard_prev_choices: scoreboard_prev_choices,
        scoreboard_correct_wrong_notif: scoreboard_correct_wrong_notif,
        scoreboard_exam_my_answer: scoreboard_exam_my_answer,
        scoreboard_exam_answer_time: scoreboard_exam_answer_time,
        scoreboard_exam_choices: scoreboard_exam_choices,
        scoreboard_exam_correct_wrong_notif: scoreboard_exam_correct_wrong_notif,
        scoreboard_exam_uniqueQuestionsId_00: scoreboard_exam_uniqueQuestionsId_00,
        scoreboard_exam_uniqueQuestionsId_01: scoreboard_exam_uniqueQuestionsId_01,
        scoreboard_exam_uniqueQuestionsId_02: scoreboard_exam_uniqueQuestionsId_02,
        counter_display_quiz_result: counter_display_quiz_result,
        counter_display_exam_result: counter_display_exam_result
    };
    
    try {
        localStorage.setItem(userDataKey, JSON.stringify(userData));
        log("User scoreboard saved for: " + currentUsername);
    } catch (e) {
        log("Error saving user data: " + e.message, "error");
    }
}

/**
* Dynamically injects a login form into the DOM if the `isLoginEnable` flag is true.
* The login form includes input fields for username and password, and a submit button.
*/
if (isLoginEnable) {
    showAuthScreen();
}
