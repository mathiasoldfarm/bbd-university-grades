import express from 'express';
import employerRoute from './src/routes/employer.js';
import studentRoute from './src/routes/student.js';
import universityRoute from './src/routes/university.js';

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