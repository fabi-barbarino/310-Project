require("dotenv").config()

// start server
const express = require('express')
const app = express(),
      bodyParser = require("body-parser");
      port = process.env.PORT || 3000;
const morgan = require('morgan')


// const users = [
//   { value: 'sbar', label: 'Sebastiano Barbarino' },
//   { value: 'fbar', label: 'Fabianna Barbarino' },
//   { value: 'nbar', label: 'Nairobis Barbarino' }
// ];

const Pool = require('pg').Pool
const db = new Pool();

db.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log("Connected to database!");
    // pool.end();
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.post('/api/task', (req, res) => {
    const task = req.body.task;
    console.log('Adding Task:::::', task);
    const description = task.taskDescription;
    const sprintNum = task.sprint;
    const id = task.id;
    console.log('description is: ', description);
    console.log('id is: ', id);
    console.log('sprint is: ', sprintNum);
    res.json(".................task added");

    // status --> default false (means task is not completed)

    // INSERT task into task table
    query = 'INSERT INTO tasks (user_id, sprint_id, task_content) VALUES (' + id + ', \'' + sprintNum + '\', \'' + description + "')";

    db.query(query, (err, res) => {
        if(err) throw err;
        console.log("Added task to database")
    }) 
  
});

app.post('/api/question', (req, res) => {
    const question = req.body.question;
    console.log('Adding Question:::::', question);
    const description = question;
                // USER WILL HAVE TO BE FROM STORAGE                            fix
    const userID = 1;
    console.log('description is: ', description);
    res.json(".................question added");

    // INSERT question into questions table
    query = 'INSERT INTO questions (user_id, question_text) VALUES (' + userID + ', \'' + description + "')";

    db.query(query, (err, res) => {
        if(err) throw err;
        console.log("Added question to database")
    }) 
  
});

app.post('/api/editQuestion', (req, res) => {
    const data = req.body.data;
    console.log('editing Question:::::', data);
    const description = data.currQuestionEdit;
    const qID = data.currQid;
    console.log('description is: ', description);
    res.json(".................question added");

    // INSERT question into questions table
    query = 'update questions set question_text = \'' + description + '\' where id=' + qID;

    db.query(query, (err, res) => {
        if(err) throw err;
        console.log("edited question in database")
    }) 
  
});

app.post('/api/answer', (req, res) => {
    const answer = req.body.answer;
    console.log('Adding Question:::::', answer);
    const description = answer;
                // USER WILL HAVE TO BE FROM STORAGE                            fix
    const userID = 1;
                // QUESTION ID FROM THE PAGE                                    fix
    const qID = 1;
    console.log('description is: ', description);
    res.json(".................answer added");

    // INSERT question into questions table
    query = 'INSERT INTO answers (user_id, question_id, answer_text) VALUES (' + userID + ', \'' + qID + '\', \'' + description + "')";

    db.query(query, (err, res) => {
        if(err) throw err;
        console.log("Added answer to database")
    }) 
  
});

app.get('/api/getQandA', (req,res) => {
    let query = "select q.id as q_id, q.question_text, a.id as a_id, a.answer_text, concat(uq.first_name,' ', uq.last_name) as q_username,  concat(ua.first_name,' ', ua.last_name) as a_username from questions q left join answers a on q.id=a.question_id inner join users uq on q.user_id = uq.id left join users ua on a.user_id=ua.id order by q.id, a.id desc;"
  
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result.rows[0]) {
        res.status(200).send(result.rows);
      } else {
        res.status(200).json('No questions or answers found');
      }
    })
})
  

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  console.log(users);
  // this should come from the database
  res.json(users);
});