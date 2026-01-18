
function createExam() {
	try {
		let quizButtonElem = document.getElementsByClassName("quiz-button");
		let quizButtonIcon = document.getElementsByClassName("quiz-icon-container");

		// Loop through all choices and Reset background color for all topic
		for (var i = 0; i < quizButtonElem.length; i++) {
			quizButtonElem[i].style.backgroundColor = "";
			quizButtonElem[i].style.border = "";
			quizButtonElem[i].style.transition = "";
			quizButtonIcon[i].innerHTML = `${icon.bookmark_outline}`;
		}

		// Declare the user taking exam to true.
		isTakingExam = true;

		// Since we taking exam, set it to false
		isTakingQuiz = false;

		// stop the timer and reset the timerInitiateCounter
		stop_timer();
		timerCounterForGlobal = 0;

	    // If AutoSubmit is set to true. stop the autosubmit
	    if (isAutoSubmit) {
	        stopAutoSubmit();
	    }

	    // Set the title for the selectedtopicId is 15 which is for the Exam.
	    selectedTopicID = 3;

	    // setting the user_numbers_of_questions for Global calculation of result for both Quiz and Exam
	    user_numbers_of_questions = 50;

		// Show the details of Exam
		$(SELECT.CONTENT_MAIN).html(`
			<h2>YOU ARE CURRENTLY TAKING EXAM RELATED TO:</h2>
	        <p><b>Topic:</b> ` + topics[selectedTopicID] + `. <br/><i style="font-size:12px">(All questions from the quizzes will be displayed here! Review it first!)</i></p>
	        <p><b>Total No. of Questions:</b> ` + user_numbers_of_questions + ` Questions. <br/><i style="font-size:12px">(The questions are related to the grade 10 science lessons.)</i></p>
	        <p><b>Passing Grade:</b> ` + passing_grade + `.00% and above.</p>
	        <b>NUMBERS OF QUESTIONS PER MAJOR TOPICS:</b>
	        <div><b>General Information:</b> ` + user_numbers_of_questions + ` Questions (${((user_numbers_of_questions/50) * 100).toFixed(2)}%)</div>
	        <br>
	        <button class="button_design ripple-btn" onclick="displayQuestionForExam()">Click to Start Exam</button>
		`);
		$(SELECT.CONTENT_FOOTER).html(`
			&copy; ${currentYear} SciPlay Research Team. All Rights Reserved.
		`);

        restartQuestionsForExam();
	} catch(error) {
		console.error("Error in createExam:", error);
		alertDialog("Error", "An error occurred: " + error.message);
	}
}

function displayQuestionForExam() {
	// Determine the currentTopic based on the questionDataIndex
	let currentTopic;
	let questionDataIndex;

	// For set of Questions of General Informations
    if (questionNumbering < 17) {
        currentTopic = data_00;
        questionDataIndex = uniqueRandomArrayQuestions_00[questionNumbering];

        // Fetch and display the questions and choices for the selected topic.
        fetchExamQuestionAndChoices(currentTopic[questionDataIndex]);
        $(SELECT.INSTRUCTION).html(SELECT.INSTRUCTION_EXAM_00);
    }
    else if (questionNumbering < 34) {
        currentTopic = data_01;
        questionDataIndex = uniqueRandomArrayQuestions_01[questionNumbering - 17];

        // Fetch and display the questions and choices for the selected topic.
        fetchExamQuestionAndChoices(currentTopic[questionDataIndex]);
        $(SELECT.INSTRUCTION).html(SELECT.INSTRUCTION_EXAM_00);
    }
    else if (questionNumbering < 50) {
        currentTopic = data_02;
        questionDataIndex = uniqueRandomArrayQuestions_02[questionNumbering - 34];

        // Fetch and display the questions and choices for the selected topic.
        fetchExamQuestionAndChoices(currentTopic[questionDataIndex]);
        $(SELECT.INSTRUCTION).html(SELECT.INSTRUCTION_EXAM_00);
    }

    // Initiate timer for questions
    initiate_timer();
}

/**
 * Displays a question and its choices to the user.
 *
 * @param {Object} questionData - An object containing information about the question.
 * @param {string} questionData.question - The text of the question.
 * @param {string[]} questionData.choices - An array of strings representing the answer choices.
 * @param {number} questionData.correct_ans - The index of the correct answer choice.
 */
function fetchExamQuestionAndChoices(questionData) {
	$(SELECT.CONTENT_MAIN).html(`
        <div class="instruction_con"><b>Instruction</b>: <span id="instruction"></span></div>
            <div class="question_con">
            <div class="question_counter_con_and_timer">
                <b>Question No. <span class='question_counter' id="question_counter">` + (questionNumbering + 1) + `</span> out of ` + numbers_of_exam_questions + `</b>
                <div title="Questionnaire Timer" class="timer">
                    <svg style="margin: 0 0 -5.5px -3px;" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
                    <span title="Minutes" id="timerMinutes">00</span> : <span title="Seconds" id="timerSeconds">00</span> 
                </div>
            </div>
            <div class="question" id="question"></div>
            <div class="choices_con" id="choices_con"></div>
            <div class="submit_question"><button class="button_design ripple-btn" onclick="submitAnswerForExam()">Submit your answer</button></div>
            <div class="question_data_poster_name">This data question is submitted by ${questionData.poster_name}</div>
        </div>
    `);

	document.getElementById("question").innerHTML = "<span class='question_counter' id='current_question_counter'>" + (questionNumbering + 1) + "</span>. ) " + questionData.question;
    prev_questions.push(questionData.question);

    // Display the choices of the current question
    // Create a copy of the choices array
    choices = questionData.choices.slice();

    // store for history of question choices purposes
    prev_choices.push(choices);

    // Shuffle the choices using the Fisher-Yates Shuffle Algorithm
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at positions i and j
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    // Generate HTML for the shuffled choices and add click event listeners
    choicesHTML = "";
    for (let i = 0; i < choices.length; i++) {
        choicesHTML += "<div class='choices ripple-btn' onclick='checkExamAnswer(" + i + ")'>" + (i + 1) + ") " + choices[i] + "</div>";
    }

    // Set the choices in the HTML
    document.getElementById("choices_con").innerHTML = choicesHTML;
}


// Function to check the answer based on the selected index
function checkExamAnswer(selectedIndexExam) {
    // Declare the selectedAnswerIndex
    selectedAnswerIndex = selectedIndexExam;

    // Lets put this here since the user is selecting his/her answer
	isAnswerSelected = true;

	// Determine the currentTopic based on the questionDataIndex
	let currentTopic;
	let questionDataIndex;

	// Check the number of answered questions for General Information
    if (questionNumbering < 17) {
        currentTopic = data_00;
        questionDataIndex = uniqueRandomArrayQuestions_00[questionNumbering];
    }
    else if (questionNumbering < 34) {
        currentTopic = data_01;
        questionDataIndex = uniqueRandomArrayQuestions_01[questionNumbering - 17];
    }
    else if (questionNumbering < 50) {
        currentTopic = data_02;
        questionDataIndex = uniqueRandomArrayQuestions_02[questionNumbering - 34];
    }

    // Check the user's answer for the exam
    if (currentTopic) {
        fetchAnswerToCheck(currentTopic[questionDataIndex]);
    }

}


// Function to submit an answer
function submitAnswerForExam() {
	switch(disable_non_answer_alert) {
		// You can submit your answer anytime, even if you have not chosen an answer.
		case true:
			// Move to the next Question
		    moveToNextQuestionForExam();
		break;

		// You will see an error if no answer is submitted
		case false:
			/* Check if an answer is selected */
			if (!isAnswerSelected) {
			    // Display an error message if no answer is selected
			    alertDialog("Oops!", "Please select your answer!");
			}
		    else {
		    	// Move to the next Question
		    	moveToNextQuestionForExam();
		    }
		break;
	}
	
    // Reset the isAnswerSelected since the answer has been submitted
	isAnswerSelected = false;
}

function moveToNextQuestionForExam() {
	let timerDuration = Math.floor(timerCounter);
	let minutes = Math.floor((timerDuration % 3600) / 60); // Calculate minutes within the current hour
	let seconds = Math.floor(timerDuration % 60);
	let hours = Math.floor(timerDuration / 3600);

	let txtHours = "";
	let txtMinutes = "";

	if (hours !== 0) {
		txtHours = `${hours} hour(s) and`;
	}
	if (minutes !== 0) {
		txtMinutes = `${minutes} minute(s) and`;
	}

	// Check if the question counter is on the last items to answer
    if (questionNumbering > (user_numbers_of_questions-2)) {
        // If this is the last question of the exam, calculate the score
        // Calculate the score
        calculateScore();

        // Call the end of quiz function
        end_of_quiz();

        // Push the selected answer to the array database
        my_answer.push(selectedAnswerIndex);
        answer_time.push(`You answered this question in <b>${txtHours} ${txtMinutes} ${seconds} second(s)</b>.`);

        // Reset the selectedAnswer and selectedAnswerIndex after they have been inputted to the my_ans database
        selectedAnswer = undefined;
        selectedAnswerIndex = undefined;
    }
    else {
        // If this is not the last question, update the question counter
        questionNumbering++;

        // Calculate the score
        calculateScore();
        
        // Push the selected answer to the array database
        my_answer.push(selectedAnswerIndex);
        answer_time.push(`You answered this question in <b>${txtHours} ${txtMinutes} ${seconds} second(s)</b>.`);

        // Reset the selectedAnswer and selectedAnswerIndex after they have been inputted to the my_ans database
        selectedAnswer = undefined;
        selectedAnswerIndex = undefined;

        // Display the next question
        displayQuestionForExam();
    }

    // Reset the counter for timerCounter
    timerCounter = 0;
}

/**
 * Function to calculate the score based on the selected answer.
 * This function increments the score and the specific score category based on the question counter.
 */
function calculateScore() {
    if (selectedAnswer == "Correct") {
        score++;
        correct_wrong_notif.push(correct_logo);

        // For Gen Info Score, need to retrieve the score up 1 to 20 questions
        if (questionNumbering < 50)   {
            genInfoScore++;
        }
    }
    else {
        // If not correct
        correct_wrong_notif.push(wrong_logo);
    }
}


/**
 * Function to display exam questions and their choices for a specific topic
 * @param {number} scoreboard_ExamIdNum - The index of the number of topics in the scoreboard
 */
function displayExamPrevQuestionsAndChoices(dataUniqueExamQuestionsIndexes, dataBaseQuestions, numberStart, enabledFirstPagination, enabledSecondPagination) {
    let n = numberStart;

    let dataUniqueRandomArrayQuestionsIndexes;
    let dataQuestions;

    for (let i = 0; i < dataUniqueExamQuestionsIndexes.length; i++) {
        dataUniqueRandomArrayQuestionsIndexes = dataUniqueExamQuestionsIndexes[i];
        dataQuestions = dataBaseQuestions[dataUniqueRandomArrayQuestionsIndexes];

        $(SELECT.CONTENT_MAIN).append(`
            <div class="prev_question_con">
                <div class="prev_question">
                    <div class="answered_time">${answer_time[n]}</div>
                    <div id="wrong_correct_answered_notif" class="c_a_n">${correct_wrong_notif[n]}</div>
                    <span class="question_numbering" id="question_numbering">${n+1}. ) ${dataQuestions.question}</span>
                <div>
            </div>
        `);
    
        // Generate and append choices for the current question
        let choicesHtml = ""; // Accumulate HTML for choices
        for (let c = 0; c < 5; c++) {
            // Access the choice for the current question
            const choice = prev_choices[n][c]; 

            // Determine the class for this choice
            let choiceClass = "";
            if (c === my_answer[n]) {
                choiceClass = "wrong"; // Mark wrong answers (if selected)
            }

            if (choice === dataQuestions.correct_ans) {
                choiceClass = "correct"; // Mark correct answers
            }

            // Add the choice with the determined class
            choicesHtml += `
                <div class="prev_choices ${choiceClass}">
                    ${c + 1}) ${choice}
                </div>
            `;
        }

        // Append the accumulated choices to the corresponding question container
        $(".prev_question_con").last().append(choicesHtml);

        // Correct Explanation and Poster name
        $(".prev_question_con").last().append(`
            <div class="question_explanation">
                <div><b>Correct Explanation:</b></div>
                <p style="font-size:15px">
                    ${dataQuestions.explanation}
                </p>
            </div>
            <div class="poster_name_for_prev_question">
                This data question is submitted by ${dataQuestions.poster_name}
            </div>
        `);

        n++; // Increment 'n' by 1
    }

    if (enabledFirstPagination) {
        $(SELECT.CONTENT_MAIN).append(`
            <div class="prev_question_con" style="border:none">
                <div class="prev_question" id="prev_question">
                    <center>
                        <button disabled class="prev_display_review_result_btn" onclick="prev_display_review_result()">${icon.prev} Previous Page</button>
                        <button class="next_display_review_result_btn" onclick="next_display_review_result()">Next Page ${icon.next}</button>
                    </center>
                </div>
            </div>
        `);

        if (isReviewingResultViaScoreBoard) {
            $(SELECT.CONTENT_FOOTER).html(`
                <div style="font-size:13px"><strong>Please note</strong>: <br/>The Passing Grade is ${passing_grade}.00% and above</div>
            `);
            $(SELECT.CONTENT_FOOTER).append(`
                <div class="scoreboard_review_ans_con">
                    <button onclick="showResult()" class="scoreboard_back_to_result_btn">Return to Result Page</button>
                    <button onclick="createExam()" class="scoreboard_retake_quiz ripple-btn">Retake Exam</button>
                </div>
                
            `);
        }
        else {
            $(SELECT.CONTENT_FOOTER).append(`
                <div class="review_ans_con">
                    <button onclick="createExam()" class="retake_quiz ripple-btn">Retake Exam</button>
                </div>
            `);
            $(SELECT.CONTENT_FOOTER).append(`
                <div class="review_ans_con">
                    <button onclick="showResult()" class="back_to_result_btn">Return to Result Page</button>
                </div>
            `);
        }
    }

    if (enabledSecondPagination) {
        $(SELECT.CONTENT_MAIN).append(`
            <div class="prev_question_con" style="border:none">
                <div class="prev_question" id="prev_question">
                    <center>
                        <button class="prev_display_review_result_btn" onclick="prev_display_review_result()">${icon.prev} Previous Page</button>
                        <button disabled class="next_display_review_result_btn" onclick="next_display_review_result()">Next Page ${icon.next}</button>
                    </center>
                </div>
            </div>
        `);
    }
}

function reviewed_ans_for_exam(scoreboard_ExamIdNum) {
    // Scroll to the top of the content section
    const contentMain = document.getElementsByClassName('content-main')[0];
    contentMain.scrollTo(0, 0);

    // Reset the tooltip
    tooltip_counter = 0;

    scoreboard_dataIndex = scoreboard_ExamIdNum;
    isTakingExam = true;

    // Reset first the content-main
    $(SELECT.CONTENT_MAIN).html(``);
    $(SELECT.CONTENT_FOOTER).html(``);

    if (isReviewingResultViaScoreBoard) {
        uniqueRandomArrayQuestions_00 = scoreboard_exam_uniqueQuestionsId_00[scoreboard_dataIndex];
        uniqueRandomArrayQuestions_01 = scoreboard_exam_uniqueQuestionsId_01[scoreboard_dataIndex];
        uniqueRandomArrayQuestions_02 = scoreboard_exam_uniqueQuestionsId_02[scoreboard_dataIndex];
       

        prev_choices = scoreboard_exam_choices[scoreboard_dataIndex];
        my_answer = scoreboard_exam_my_answer[scoreboard_dataIndex];
        answer_time = scoreboard_exam_answer_time[scoreboard_dataIndex];
        correct_wrong_notif = scoreboard_exam_correct_wrong_notif[scoreboard_dataIndex];
    }

    displayExamPrevQuestionsAndChoices(uniqueRandomArrayQuestions_00, data_00, 0, false, false);
    displayExamPrevQuestionsAndChoices(uniqueRandomArrayQuestions_01, data_01, 17, false, false);
    displayExamPrevQuestionsAndChoices(uniqueRandomArrayQuestions_02, data_02, 34, false, false);

    tooltip_counter++; 
    if (tooltip_counter == 1) {
        setTimeout(function() {
            $(".prev_choices.correct").append("<div class='tooltip_for_prev_display correct'>Correct answer.</div>");
            $(".prev_choices.wrong").append("<div class='tooltip_for_prev_display wrong'>Your answer.</div>");
        }, 100);
    }
}

function prev_display_review_result() {
    reviewed_ans_for_exam(scoreboard_dataIndex);
}
function next_display_review_result() {
    // Scroll to the top of the content section
    const contentMain = document.getElementsByClassName('content-main')[0];
    contentMain.scrollTo(0, 0);
}

// Restart Questions Data for Exam
function restartQuestionsForExam() {
	// Reset the question numbering
	questionNumbering = 0;

	// Reset, if the use accidentally/intention click the quiz (BUG No. 1)
	isTakingQuiz = false;

	// Reset the prev questions and choices
	prev_questions = [];
	prev_choices = [];

	// Reset the overall score
	score = 0;

	// Resetting the score per subject areas
    genInfoScore = 0;


	// Reset my_answer
	my_answer = [];

	// Reset the answered time
	answer_time = [];

	// Reset the correct wrong notifcation
	correct_wrong_notif = [];

    // Reset to avoid bug
    isReviewingResultViaScoreBoard = false;

    // Reset the tooltip
    tooltip_counter = 0;

    // Resetting the General Information set of Questions
	// With this, we can generate unique random questions for each topic
	uniqueRandomArrayQuestions_00 = uniqueRandomQuestion(0, (data_00.length - 1), 17); // Topic 0
	uniqueRandomArrayQuestions_01 = uniqueRandomQuestion(0, (data_01.length - 1), 17); // Topic 1
	uniqueRandomArrayQuestions_02 = uniqueRandomQuestion(0, (data_02.length - 1), 16); // Topic 2
	
}