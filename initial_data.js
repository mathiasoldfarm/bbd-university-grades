import fs from 'fs';
import employerModel from './models/employer';
import studentModel from './models/student';
import universityModel from './models/university';

const initialData = () => {
    const employerFile = './database/employer.json';
    const studentFile = './database/student.json';
    const universityFile = './database/university.json';

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

    fs.writeFile(employerFile, JSON.stringify(employer));
    fs.writeFile(studentFile, JSON.stringify(student));
    fs.writeFile(universityFile, JSON.stringify(university));
}