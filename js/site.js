'use strict'

const myQuestions = [
    {
      question: "What is the capital of Westeros in Game of Thrones?",
      answers: {
        a: "Winterfell",
        b: "King's Landing",
        c: "Highgarden",
      },
      correctAnswer: "b",
    },
    {
      question: "Which color is not one of the five colors in the Olympic Rings?",
      answers: {
        a: "Orange",
        b: "Blue",
        c: "Black",
      },
      correctAnswer: "a",
    },
    {
      question: "In tennis, what piece of fruit is found at the top of the men's Wimbledon trophy?",
      answers: {
        a: "Apple",
        b: "Pineapple",
        c: "Banana",
      },
      correctAnswer: "b",
    },
    {
      question: "Which state is landlocked in the United States?",
      answers: {
        a: "Mississippi",
        b: "Delaware",
        c: "Vermont",
      },
      correctAnswer: "c",
    },
    {
      question: "Which Russian town suffered an infamous nuclear disaster in 1986?",
      answers: {
        a: "Chernobyl",
        b: "Volgograd",
        c: "Sochi",
      },
      correctAnswer: "a",
    },
  ];

// Global variables
let time = 0;
const countTimer = setInterval(count, 1000);
const quizContainer = document.querySelector('#quiz');
const submitButton = document.querySelector('#submit');

// create the quiz dynamically
function createQuiz(){
  // store the HTML for displaying on page
  const output = [];

  // loop through myQuestions
  myQuestions.forEach((currentQuestion, questionNumber) => {

      // store all answers
      const answers = [];

      // for each option in each question
      for(const option in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<p>
            <input type="radio" name="question${questionNumber}" value="${option}" id="choice_${questionNumber}${option}">
            <label for="choice_${questionNumber}${option}">${currentQuestion.answers[option]}</label>
          </p>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question-wrapper">
          <div class="question"><h5>${currentQuestion.question}</h5></div>
          <div class="answers">${answers.join('')}</div>
        </div>`
      );
    }
  );

  // combine output list and display on page
  quizContainer.innerHTML = output.join('');
}

// function to show score and time the quiz took
function showResults(){

  // select all answers
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of correct answers
  let numCorrect = 0;

  // loop through myQuestions
  myQuestions.forEach((currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selected = `input[name=question${questionNumber}]:checked`;
    // find selected answer or empty
    const userAnswer = (answerContainer.querySelector(selected) || {}).value;

    // if answer is matches correct in myQuestions
    if(userAnswer === currentQuestion.correctAnswer){
      // increment numCorrect
      numCorrect++;
    }
  });

// show reset button and hide submit button
submitButton.style.display = 'none';
resetQuiz.style.display = 'inline-block';


// show number of correct answers out of total and stop showing tracker
quizContainer.innerHTML = `<div class="results">${numCorrect}/${myQuestions.length}</div><div class="time">${time} seconds</div>`;
clearInterval(countTimer);
time = 0;
document.querySelector('#tracker').style.display = 'none';
}

// function to show and hide questions
function showQuestion(n) {
  // remove active-question class from the current question
  qWrappers[currentQuestion].classList.remove('active-question');
  // place active-question class on new question
  qWrappers[n].classList.add('active-question');
  currentQuestion = n;

  // show submit button on last question instead of next
  if (currentQuestion === qWrappers.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
    resetQuiz.style.display = 'none'
  }
  // tracker
  document.querySelector('#tracker').innerHTML = `${currentQuestion + 1} out of ${qWrappers.length}`;
}

// show next question
function showNextQuestion() {
  showQuestion(currentQuestion + 1);
}

// Initialize the quiz from the object
createQuiz();

// variables for showing next question
const nextButton = document.querySelector('#next');
const qWrappers = document.querySelectorAll('.question-wrapper');
const resetQuiz = document.querySelector('#reset');
let currentQuestion = 0;

// Show the first question on page load
showQuestion(currentQuestion);

// Event listeners
submitButton.addEventListener('click', showResults);
nextButton.addEventListener('click', showNextQuestion);
resetQuiz.addEventListener('click', reset);

// reset quiz by reloading the widnow
function reset() {
  location.reload();
}

// count timer
function count() {
  time++;
  console.log(time, "seconds");
}


