import fs from 'fs';
import employerModel from './models/employer.js';
import studentModel from './models/student.js';
import universityModel from './models/university.js';
import permissionModel from './models/permission.js';
import gradesModel from './models/grade.js';
import requestModel from './models/request.js';

const initialData = () => {
    const employerFile = './database/employer.json';
    const studentFile = './database/student.json';
    const universityFile = './database/university.json';
    const permisionsFile = './database/permission.json';
    const requestFile = './database/request.json';

    const employer = {
        employers: []
    }

    const student = {
        students: []
    }

    const university = {
        universities: []
    }

    const permission = {
        permissions: []
    }

    const request = {
        requests: []
    }

    const employers = [
        {name: "Company A", country: "Country A"},
        {name: "Company B", country: "Country B"},
        {name: "Company C", country: "Country B"}
    ]
    employers.forEach(data => {
        const { name, country } = data;
        employer.employers.push(new employerModel(name, country))
    });

    const universities = [
        {name: "University A", country: "Country A"},
        {name: "University B", country: "Country B"}
    ]
    universities.forEach(data => {
        const { name, country } = data;
        university.universities.push(new universityModel(name, country))
    });

    const students = [
        {name: "Student A", cpr: 1, university: "University A"},
        {name: "Student B", cpr: 2, university: "University A"},
        {name: "Student C", cpr: 3, university: "University A"},
        {name: "Student D", cpr: 4, university: "University B"},
        {name: "Student E", cpr: 5, university: "University B"},
        {name: "Student F", cpr: 6, university: "University B"}
    ]
    students.forEach(data => {
        const { name, cpr, university } = data;
        student.students.push(new studentModel(name, cpr, university))
    });

    const permissions = [
        {studentCpr: 1, companyName: "Company A"},
        {studentCpr: 2, companyName: "Company B"}
    ]
    permissions.forEach(data => {
        const { studentCpr, companyName } = data;
        permission.permissions.push(new permissionModel(studentCpr, companyName))
    });

    const requests = [
        {studentCpr: 3, companyName: "Company A"},
        {studentCpr: 4, companyName: "Company B"}
    ]
    requests.forEach(data => {
        const { studentCpr, companyName } = data;
        request.requests.push(new requestModel(studentCpr, companyName))
    });

    fs.writeFileSync(employerFile, JSON.stringify(employer, null, 2));
    fs.writeFileSync(studentFile, JSON.stringify(student, null, 2));
    fs.writeFileSync(universityFile, JSON.stringify(university, null, 2));
    fs.writeFileSync(permisionsFile, JSON.stringify(permission, null, 2));
    fs.writeFileSync(requestFile, JSON.stringify(request, null, 2));
}

initialData();