import gradeModel from '../models/grade.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allUniversities = (req, res) => {
    const universityDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/university.json')));
    res.status(200).send(universityDB.universities);   
    return;
}

const addGrade = (req, res) => {
    const blockchainDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/blockchain.json')));
    const universityDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/university.json')));
    const studentDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/student.json')));

    const { studentCpr, universityName, course, grade } = req.body;
    const university = universityDB.universities.filter(u => u.name === universityName);
    if ( university.length == 0 ) {
        res.status(400).send("Couldn't find university with the name");   
        return;
    }
    const student = studentDB.students.filter(s => s.cpr === studentCpr);
    if ( student.length == 0 ) {
        res.status(400).send("Couldn't find student with the name");   
        return;
    }
    blockchainDB.blocks.push(new gradeModel(studentCpr, universityName, course, grade));
    fs.writeFileSync(path.resolve(__dirname, '../database/blockchain.json'), JSON.stringify(blockchainDB, null, 2));
    res.status(200).send();
    return;
}

export {
    addGrade,
    allUniversities
}