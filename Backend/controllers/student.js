import permissionModel from '../models/permission.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allStudents = (req, res) => {
    const studentDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/student.json')));
    res.status(200).send(studentDB.students.map(s => s.cpr));   
    return;
}

const fetchStudentInfo = (req, res) => {
    const studentDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/student.json')));

    const { cpr } = req.params;
    const studentData = studentDB.students.filter(data => data.cpr === parseInt(cpr));
    if ( studentData.length == 0 ) {
        res.status(400).send("Couldn't find student with the cpr");   
        return;
    }
    res.status(200).send(studentData[0]);   
    return;
}

const fetchRequests = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/request.json')));
    const { cpr } = req.params;
    const reqeustData = requestDB.requests.filter(data => data.studentCpr === parseInt(cpr));
    res.status(200).send(reqeustData);   
    return;
}

const fetchPermissions = (req, res) => {
    const permissionDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/permission.json')));

    const { cpr } = req.params;
    const permissionData = permissionDB.permissions.filter(data => data.studentCpr === parseInt(cpr));
    res.status(200).send(permissionData);   
    return;
}

const acceptRequest = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/request.json')));
    const permissionDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/permission.json')));

    const { cpr, companyname } = req.body;
    const reqeustData = requestDB.requests.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyname
    );
    if ( reqeustData.length === 0 ) {
        res.status(400).send("Couldn't find the given request");
        return;
    }
    requestDB.requests = requestDB.requests.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyname)
    );
    fs.writeFileSync(path.resolve(__dirname, '../database/request.json'), JSON.stringify(requestDB, null, 2));

    permissionDB.permissions.push(new permissionModel(cpr, companyname));
    fs.writeFileSync(path.resolve(__dirname, '../database/permission.json'), JSON.stringify(permissionDB, null, 2));

    res.status(200).send();
    return;
}

const declineRequest = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/request.json')));

    const { cpr, companyname } = req.body;
    const reqeustData = requestDB.requests.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyname
    );
    if ( reqeustData.length === 0 ) {
        res.status(400).send("Couldn't find the given request");
        return;
    }
    requestDB.requests = requestDB.requests.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyname)
    );
    fs.writeFileSync(path.resolve(__dirname, '../database/request.json'), JSON.stringify(requestDB, null, 2));

    res.status(200).send();
    return;
}

const deletePermission = (req, res) => {
    const permissionDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/permission.json')));

    const { cpr, companyname } = req.params;
    const permissionData = permissionDB.permissions.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyname
    );
    if ( permissionData.length === 0 ) {
        res.status(400).send("Permission did not exist");
        return;
    }

    permissionDB.permissions = permissionDB.permissions.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyname)
    );
    fs.writeFileSync(path.resolve(__dirname, '../database/permission.json'), JSON.stringify(permissionDB, null, 2));

    res.status(200).send();
    return;
}

export {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deletePermission,
    allStudents,
    fetchPermissions 
}