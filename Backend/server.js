require('dotenv').config();
const app = require('./src/app')



app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000')
})