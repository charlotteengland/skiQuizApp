
let questionNumber = 0;
let score = 0;

function generateQA() {
    if (questionNumber < STORE.length) {
        return `
    <div class="Question=${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
        <form>
            <fieldset>
                <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[0]}" 
                    name="answer" required>
                    <span>${STORE[questionNumber].answers[0]}</span>
                </label>
                <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[1]}" 
                    name="answer" required>
                    <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[2]}" 
                    name="answer" required>
                    <span>${STORE[questionNumber].answers[2]}</span>
                </label>
                <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[3]}" 
                    name="answer" required>
                    <span>${STORE[questionNumber].answers[3]}</span>
                </label>
                <button type="submit" class="submitButton">Submit</button>
            </fieldset>
        </form>
        </div>
    `;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
    }
}

function changeQuestionNumber() {
    questionNumber ++;
    //change text in questionNumber html class
    $('.questionNumber').text(questionNumber+1);
}

function changeScore () {
    score ++;
}

// this function will be responsibile for starting the quiz app in the DOM
    // hide the form elements
function startQuiz (){
    $('.quizStart').on('click', '.startButton', function(event) {
        $('.quizStart').remove();
        $('.questionAnswerTemplate').css('display', 'block');
        $('.questionNumber').text(1);
    });   
}
//

    // this function will be be responsible for rendering the next question
    //unhide the form elements
    // this will increment the quesion number counter
function renderQuestion () {
    $('.questionAnswerTemplate').html(generateQA());

}

    // this function will handle the selection of the answer to the Q
    // this will provide answer feedback
    // this will update the score counter
function userSelectAnswer () {
    $('form').on('submit', function (event){
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            ifAnswerIsCorrect();
        } else {
        //Q. is this adding class to div?
          selected.parent().addClass('wrong');
          ifAnswerIsWrong();
          }
        });
    }

//inside the function assign a new var correctAnswer to STORE's correvt answer
//then similar to applying renderQuestioncalls,
// apple html to questionAnswer class
//with correctFeedback class, 
//div img with icoc and alt
//p with you go it right!
//button with next

function ifAnswerIsCorrect () {    
        userAnswerFeedbackCorrect();
        updateScore();
      }
      
function ifAnswerIsWrong () {
        userAnswerFeedbackWrong();
      }

function updateScore () {
    changeScore();
    $('.score').text(score);
}

function userAnswerFeedbackCorrect () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerTemplate').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
  }
  
  //user feedback for wrong answer
  function userAnswerFeedbackWrong () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    // let iconImage = `${STORE[questionNumber].icon}`;
    $('.questionAnswerTemplate').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
  }
  
  
  //when quiz is over this is the html for the page
  function renderResults () {
    if (score >= 8) {
      $('.questionAnswerTemplate').html(`<div class="results correctFeedback"><h3>Yew! You know the rules of the mountain</h3><img src="https://media.giphy.com/media/2aLiVCqTZmxwXeRfMh/giphy.gif" alt="Olympic skier doing slips in park"/><p>You got ${score} / 10</p><p>You're ready to plan your ski trip!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else if (score < 8 && score >= 5) {
      $('.questionAnswerTemplate').html(`<div class="results correctFeedback"><h3>Almost there!</h3><img src="https://media.giphy.com/media/doW39MUpXxy8/giphy.gif" alt="skiier in powder snow animated image"/><p>You got ${score} / 10</p><p>Study a bit more and you'll be ready to hit the powder soon!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else {
      $('.questionAnswerTemplate').html(`<div class="results correctFeedback"><h3>You might want to stick with drinking hot cocoa in the cabin</h3><img src="https://media.giphy.com/media/SN9veMjGwQqE8/giphy.gif" alt="drinking hot drink animated icon"/><p>You got ${score} / 10</p><p>With a bit more practice you'll be able to enjoy the mountain soon</p><button class="restartButton">Restart Quiz</button></div>`);
    }
  }
  
  //what happens when the user clicks next
  function renderNextQuestion () {
    $('main').on('click', '.nextButton', function (event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
  
  //restart quiz function - reloads page to start quiz over
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
  }

function handleQuizApp () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
}

$(handleQuizApp)