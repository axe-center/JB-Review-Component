const express = require('express');
const db = require('../database/db.js');
const fs = require('file-system');
const path = require('path');

const app = express();

app.use(express.static('dist'))
app.use(express.json());

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The army of ${port} has arrived!`);
});

app.get('/reviews', (req, res) => {
  // req.query.productId

  db.getReviewsByProductId(req.query.productId, (error, results) => {
    if (error) {
      console.error(error);
      res.end();
    } else {
      res.send(results);
    }
  });
});

app.post('/postReview', (req, res) => {
  db.postReview(req.body, (error, result) => {
    if (error) {
      console.error(error);
      res.end();
    } else {
      res.send(result);
    }
  })
});

app.put('/reviews/update', (req, res) => {
  db.updateReview(req.body, (error, result) => {
    if(error) {
      console.error(error);
      res.end();
    } else {
      console.log("success!")
      res.end()
    }
  })
})

app.post('/secret', (req, res) => {
  fs.readFile(path.join(__dirname, "../dummydata.json"), (error, data) => {
    if (error) {
      console.error(error)
    } else {
      data = JSON.parse(data);
      data.map((review, index) => {
        db.postReview(review, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            console.log("success", index);
          }
        })
      })
    }
  })
})