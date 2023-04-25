const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes/apiRoutes')
const app = express()
app.set('view-engine', 'ejs')
/* Here you put all the middlewares. for example:*/
app.use(cors())
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json())
app.use(express.urlencoded())

/* Routes */
app.get('/', (req, res) => {
  res.render('index.ejs')
})
app.use('/api', apiRouter)

/* Start the server */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}`)
})
