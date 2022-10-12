const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./routes/employer')(app);
require('./routes/student')(app);
require('./routes/university')(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})