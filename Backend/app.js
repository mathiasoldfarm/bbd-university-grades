import express from 'express';
import employerRoute from './routes/employer.js';
import studentRoute from './routes/student.js';
import universityRoute from './routes/university.js';
import cors from 'cors';

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/employer", employerRoute);
app.use("/student", studentRoute);
app.use("/university", universityRoute);

app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})