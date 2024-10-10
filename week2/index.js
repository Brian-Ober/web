const express = require('express');
const cors = require('cors');
const app = express();
const professionalRouter = require('./routes/professional');
 
app.use(cors());
app.use('/professional', professionalRouter);
 
app.listen(8080, () => {
    console.log('server is listening.')
})