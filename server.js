// Framekwork: Express
const express = require('express')
const app = express()

// Config CORS: share API
const cors = require('cors')
app.use(cors())

// Database: MongoDB
const mongoose = require('mongoose')
const db = "mongodb+srv://buisonanh:vandetta@mydbserver.8edsn4w.mongodb.net/online_quiz"
mongoose.connect(db)
    .then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))

// Body Parser: input data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Router: link
const appRouter = require('./api/routes/appRoutes')
appRouter(app)

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404).send('<h1>404: Page not Found<h1>');
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})


