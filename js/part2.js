const questions = [
    {
      question: "What we watched  last lecture?",
      options: ["Stay with me", "Cat", "nothing"],
      correctAnswer: "stay with me"
    },
    {
      question: "Who is the GOAT?",
      options: ["PENaldo", "ME", "Leo Messi"],
      correctAnswer: "Me", 
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe"],
      correctAnswer: "blue whale"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.getElementById("question");
  const optionsContainer = document.querySelector(".options");
  const feedbackElement = document.getElementById("feedback");
  const progressElement = document.getElementById("progress");
  const submitButton = document.getElementById("submit");

  function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${current.question}`;

    optionsContainer.innerHTML = "";
    current.options.forEach((option) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${option.toLowerCase()}">${option}`;
      optionsContainer.appendChild(label);
    });

    feedbackElement.textContent = "";
    submitButton.textContent = "Submit";
    progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  }

  function checkAnswer() {
    const selectedAnswer = document.querySelector("input[name='answer']:checked");
    if (!selectedAnswer) {
      feedbackElement.textContent = "Please select an answer.";
      return;
    }

    const answer = selectedAnswer.value;
    const current = questions[currentQuestion];
    if (answer === current.correctAnswer) {
      feedbackElement.textContent = "Correct!";
      score++;
    } else {
      feedbackElement.textContent = `Incorrect. The correct answer is ${current.correctAnswer}.`;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      submitButton.textContent = "Next";
      loadQuestion();
    } else {
      questionElement.textContent = `Your Score: ${score} / ${questions.length}`;
      optionsContainer.innerHTML = "";
      feedbackElement.textContent = "";
      submitButton.style.display = "none";
      progressElement.textContent = "";
    }
  }

  submitButton.addEventListener("click", checkAnswer);
  loadQuestion();