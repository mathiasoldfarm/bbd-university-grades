const express = require('express');
const employer = require('./routes/employer');
const student = require('./routes/student');
const university = require('./routes/university');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/employer", employer);
app.use("/student", student);
app.use("/university", university);

app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})