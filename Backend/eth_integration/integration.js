import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const init = () => {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const ABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, './abi.json')));
    return new web3.eth.Contract(ABI, "0xB3fbe840Fd36dc32B8a2c27D44696dEE1acdCc98");
}

export const getAllgradesByCpr = (cpr, callBack) => {
    const contract = init();
    contract.methods.getAllGrades(cpr).call((err, res) => {
        if ( err ) {
            console.log(err);
        } else {
            callBack(res);
        }
    });
}

export const postGradeData = (grade, cpr, university, course, date, callBack) => {
    const contract = init();
    const sendOptions = {
        from: "0x720b7e7d44839Ed356BCC25c50cb186E78DD8ACb",
        gasPrice: '1',
        gas: 6721975
    }
    contract.methods.addGrade(grade, cpr, university, course, date).send(sendOptions, (err, res) => {
        if ( err ) {
            console.log(err);
        } else {
            callBack();
        }
    });
}