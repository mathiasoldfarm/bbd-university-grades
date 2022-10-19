import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import requestModel from '../models/request.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allEmployers = (req, res) => {
    const employerDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/employer.json')));
    res.status(200).send(employerDB.employers.map(e => e.name));   
    return;
}

const fetchEmployerInfo = (req, res) => {
    const employerDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/employer.json')));

    const { name } = req.params;
    const employerData = employerDB.employers.filter(data => data.name === name);
    if ( employerData.length == 0 ) {
        res.status(400).send("Couldn't find employer with the name");   
        return;
    }
    res.status(200).send(employerData[0]);   
    return;
}

const fetchTranscriptByCpr = (req, res) => {
    const permissionDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/permission.json')));
    const studentDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/student.json')));
    const blockchainDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/blockchain.json')));
    const requestDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/request.json')));

    const { cpr, companyname } = req.params;
    const student = studentDB.students.filter(s =>
        s.cpr === parseInt(cpr)
    );
    if ( student.length === 0 ) {
        res.status(400).send("The given CPR doesn't exist in our system"); 
        return; 
    }

    const permission = permissionDB.permissions.filter(
        p => p.companyName === companyname && p.studentCpr === parseInt(cpr)
    );
    if ( permission.length === 0 ) {
        const requests = requestDB.requests.filter(
            r => r.companyName === companyname && r.studentCpr === parseInt(cpr)
        );
        if ( requests.length !== 0 ) {
            res.status(401).send("You have a pending request for access to transcripts for the given student"); 
            return; 
        } 
        res.status(401).send("You do not have access to transcripts by the given cpr"); 
        return; 
    }
    const grades = blockchainDB.blocks.filter(
        block => block.studentCpr === parseInt(cpr)
    );
    res.status(200).send(grades);
    return;
}

const requestAccessByCpr = (req, res) => {
    const requestDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/request.json')));
    const permissionDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/permission.json')));

    const { cpr, companyname } = req.body;
    const permission = permissionDB.permissions.filter(
        p => p.companyName === companyname && p.studentCpr === parseInt(cpr)
    );
    if ( permission.length !== 0 ) {
        res.status(200).send("You already have access");  
        return;
    }
    const requests = requestDB.requests.filter(
        r => r.companyName === companyname && r.studentCpr === parseInt(cpr)
    );
    if ( requests.length !== 0 ) {
        res.status(200).send("You already have a pending request");  
        return;
    }

    requestDB.requests.push(new requestModel(cpr, companyname));
    fs.writeFileSync(path.resolve(__dirname, '../database/request.json'), JSON.stringify(requestDB, null, 2));

    res.status(200).send("Request sent. You will havce access when the student has accepted");
    return;
}

export {
    fetchEmployerInfo,
    fetchTranscriptByCpr,
    requestAccessByCpr,
    allEmployers
}