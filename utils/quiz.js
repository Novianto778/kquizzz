const fs = require('fs');

const loadQuiz = () => {
  const quizBuffer = fs.readFileSync('./data/quiz.json');
  const parsedQuiz = JSON.parse(quizBuffer);
  return parsedQuiz;
};

const findQuiz = (id) => {
  const quizzes = loadQuiz();
  const quiz = quizzes.find((item) => item.id == id);
  return quiz;
};

module.exports = { loadQuiz, findQuiz };
