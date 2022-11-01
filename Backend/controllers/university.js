import gradeModel from '../models/grade.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import { postGradeData } from '../eth_integration/integration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allUniversities = (req, res) => {
    const universityDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/university.json')));
    res.status(200).send(universityDB.universities.map(u => u.name));   
    return;
}

const fetchUniversityInfo = (req, res) => {
    const universityDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/university.json')));

    const { universityname } = req.params;
    const universityData = universityDB.universities.filter(u => u.name === universityname);
    if ( universityData.length == 0 ) {
        res.status(400).send("Couldn't find university with the given name");
        return;
    }
    res.status(200).send(universityData[0]);   
    return;
}

const addGrade = (req, res) => {
    const universityDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/university.json')));
    const studentDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/student.json')));

    const { studentCpr, universityName, course, grade } = req.body;
    const university = universityDB.universities.filter(u => u.name === universityName);
    if ( university.length == 0 ) {
        res.status(400).send("Couldn't find university with the name");   
        return;
    }
    const student = studentDB.students.filter(s => s.cpr === parseInt(studentCpr));
    if ( student.length == 0 ) {
        res.status(400).send("Couldn't find student with the name");   
        return;
    }
    
    const date = (new Date()).toString();
    postGradeData(grade, studentCpr, universityName, course, date, () => {
        res.status(200).send();
        return;
    });
}

export {
    addGrade,
    allUniversities,
    fetchUniversityInfo
}