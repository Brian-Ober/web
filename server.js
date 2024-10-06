const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
 
const port = process.env.PORT || 8080;
const app = express();
 
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);  // Corrected here
    });
    console.log(`Connected to DB and listening on ${port}`); // Corrected here
  }
});

