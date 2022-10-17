import fs from 'fs';
import requestModel from '../models/request';

const allEmployers = (res, req) => {
    const employerDB = JSON.parse(fs.readFileSync('../database/employer.json'));
    res.status(200).send(employerDB.employers);   
    return;
}

const fetchEmployerInfo = (res, req) => {
    const employerDB = JSON.parse(fs.readFileSync('../database/employer.json'));

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
    const permissionDB = JSON.parse(fs.readFileSync('../database/permission.json'));
    const blockchainDB = JSON.parse(fs.readFileSync('../database/blockchain.json'));

    const { cpr, companyName } = req.params;
    const permission = permissionDB.permissions.filter(
        p => p.companyName === companyName && p.studentCpr === parseInt(cpr)
    );
    if ( permission.length === 0 ) {
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
    const requestDB = JSON.parse(fs.readFileSync('../database/request.json'));
    const permissionDB = JSON.parse(fs.readFileSync('../database/permission.json'));

    const { cpr, companyName } = req.body;
    const permission = permissionDB.permissions.filter(
        p => p.companyName === companyName && p.studentCpr === parseInt(cpr)
    );
    if ( permission.length !== 0 ) {
        res.status(200).send("You already have access");  
        return;
    }
    const requests = requestDB.requests.filter(
        r => r.companyName === companyName && r.studentCpr === parseInt(cpr)
    );
    if ( requests.length !== 0 ) {
        res.status(200).send("You already have a pending request");  
        return;
    }

    requestDB.requests.push(new requestModel(cpr, companyName));
    fs.writeFileSync('../database/request.json', JSON.stringify(requestDB, null, 2));

    res.status(200).send();
    return;
}

export {
    fetchEmployerInfo,
    fetchTranscriptByCpr,
    requestAccessByCpr,
    allEmployers
}