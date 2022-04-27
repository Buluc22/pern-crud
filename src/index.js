const express = require('express')
const morgan = require('morgan')

const taskRoutes = require('./routes/taks.routes');

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(taskRoutes);
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(4000)
console.log('server on port 4000')