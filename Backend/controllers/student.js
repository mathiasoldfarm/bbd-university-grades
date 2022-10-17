import permissionModel from '../models/permission';
import fs from 'fs';

const allStudents = (res, req) => {
    const studentDB = JSON.parse(fs.readFileSync('../database/student.json'));
    res.status(200).send(studentDB.students);   
    return;
}

const fetchStudentInfo = (req, res) => {
    const studentDB = JSON.parse(fs.readFileSync('../database/student.json'));

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
    const requestDB = JSON.parse(fs.readFileSync('../database/request.json'));

    const { cpr } = req.params;
    const reqeustData = requestDB.requests.filter(data => data.studentCpr === parseInt(cpr));
    res.status(200).send(reqeustData);   
    return;
}

const acceptRequest = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync('../database/request.json'));
    const permissionDB = JSON.parse(fs.readFileSync('../database/permission.json'));

    const { cpr, companyName } = req.params;
    const reqeustData = requestDB.requests.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyName
    );
    if ( reqeustData.length === 0 ) {
        res.status(400).send("Couldn't find the given request");
        return;
    }
    requestDB.requests = requestDB.requestDB.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyName)
    );
    fs.writeFileSync('../database/request.json', JSON.stringify(requestDB, null, 2));

    permissionDB.permissions.push(new permissionModel(cpr, companyName));
    fs.writeFileSync('../database/permission.json', JSON.stringify(permissionDB, null, 2));

    res.status(200).send();
    return;
}

const declineRequest = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync('../database/request.json'));

    const { cpr, companyName } = req.params;
    const reqeustData = requestDB.requests.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyName
    );
    if ( reqeustData.length === 0 ) {
        res.status(400).send("Couldn't find the given request");
        return;
    }
    requestDB.requests = requestDB.requests.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyName)
    );
    fs.writeFileSync('../database/request.json', JSON.stringify(requestDB, null, 2));

    res.status(200).send();
    return;
}

const deletePermission = (req, res) => {
    const permissionDB = JSON.parse(fs.readFileSync('../database/permission.json'));

    const { cpr, companyName } = req.params;
    const permissionData = permissionDB.permissions.filter(
        data => data.studentCpr === parseInt(cpr) && data.companyName === companyName
    );
    if ( permissionData.length === 0 ) {
        res.status(200).send("Permission did not exist");
        return;
    }
    permissionDB.permissions = permissionDB.permissions.filter(
        data => !(data.studentCpr === parseInt(cpr) && data.companyName === companyName)
    );
    fs.writeFileSync('../database/permission.json', JSON.stringify(permissionDB, null, 2));

    res.status(200).send();
    return;
}

export {
    fetchStudentInfo,
    fetchRequests,
    acceptRequest,
    declineRequest,
    deletePermission,
    allStudents
}