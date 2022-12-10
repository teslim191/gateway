const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config({path: './config/.env'})
app.use(express.json())
app.use('/', require('./routes'))

PORT= process.env.PORT || 9800
app.listen(PORT, () => console.log('server is running on port 9800'))