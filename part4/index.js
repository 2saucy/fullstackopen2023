const app = require('./app')
const { PORT, MONGODB_URI } = require('./utils/config')
const mongoose = require('mongoose')


// Conect to mongodb
mongoose
    .connect(MONGODB_URI)
    .then(res => {
        console.log('You are now connected to MongoDB.')
    })
    .catch(err => {
        console.log('Error trying connect to MongoDB ' + err.message)
    })


app.listen(PORT, () => {
    console.log(`Server listen in port ${PORT}.`)
})