const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

const User = require('./models/user');
mongoose.connect('mongodb://localhost/userData');

app.use(bodyParser.json());


// Create a function for the response, so we can refactor code:
function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err
    })
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

// We can shorten these routes further by using the JavaScript spread syntax, which copies each key/value pair in our newData object.
// So, rather than this:
// {
//   name:req.body.newData.name,
//   email:req.body.newData.email,
//   password:req.body.newData.password
// }
// we can write this:{...req.body.newData}.


// CREATE
app.post('/users', (req, res) => {
  User.create(
    { ...req.body.newData },
    (err, data) => {
      sendResponse(res, err, data)
    }
  )
})

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data)
    })
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      {
        new: true
      },
      (err, data) => {
        sendResponse(res, err, data)
      }
    )
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(
      req.params.id,
      (err, data) => {
        sendResponse(res, err, data)
      }
    )
  })



app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})