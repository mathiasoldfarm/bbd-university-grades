import fs from 'fs';
import employerModel from './models/employer.js';
import studentModel from './models/student.js';
import universityModel from './models/university.js';

const initialData = () => {
    const employerFile = './database/employer.json';
    const studentFile = './database/student.json';
    const universityFile = './database/university.json';
    const permisionsFile = './database/permisions.json';

    const employer = {
        employers: []
    }

    const student = {
        students: []
    }

    const university = {
        universiities: []
    }

    const employers = ["Company A", "Company B", "Company C"]
    employers.forEach(name => {
        employer.employers.push(new employerModel(name))
    })

    const universities = ["University A", "University B"]
    universities.forEach(name => {
        university.universiities.push(new universityModel(name))
    })

    const students = [
        {name: "Student A", cpr: 1, university: "University A"},
        {name: "Student B", cpr: 2, university: "University A"},
        {name: "Student C", cpr: 3, university: "University A"},
        {name: "Student D", cpr: 4, university: "University B"},
        {name: "Student E", cpr: 5, university: "University B"},
        {name: "Student F", cpr: 6, university: "University B"}
    ]
    students.forEach((name, cpr, university) => {
        student.students.push(new studentModel(name, cpr, university))
    })

    const permisions = []

    fs.writeFileSync(employerFile, JSON.stringify(employers, null, 2));
    fs.writeFileSync(studentFile, JSON.stringify(students, null, 2));
    fs.writeFileSync(universityFile, JSON.stringify(universities, null, 2));
    fs.writeFileSync(permisionsFile, JSON.stringify(permisions, null, 2));
}

initialData();