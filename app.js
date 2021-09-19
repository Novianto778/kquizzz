const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./utils/database');

const { loadQuiz, findQuiz } = require('./utils/quiz');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    quiz: loadQuiz(),
  });
});

app.get('/quiz', (req, res) => {
  res.render('quiz', {
    quiz: loadQuiz(),
    path: req.path,
  });
});

app.post('/quiz/:id', (req, res) => {
  const quizId = req.params.id;
  const query = req.body.query;
  res.redirect(`/quiz/${quizId}?query=${query}`);
});

app.get('/quiz/:id', (req, res) => {
  const quiz = findQuiz(req.params.id);
  const query = req.query.query || quiz.answer;
  let column;
  db.execute(query)
    .then((result) => {
      column = Object.keys(result[0][0]);
      return result;
    })
    .then((result) => {
      const arr = Object.keys(column).map(function (key) {
        return result[0].map((row) => {
          return Object.values(row);
        });
      });
      return arr;
    })
    .then((arr) => {
      res.render('quiz-item', {
        quiz,
        query: req.query.query,
        column,
        arr,
      });
    });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(port);
