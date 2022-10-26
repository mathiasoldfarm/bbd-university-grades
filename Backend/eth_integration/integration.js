import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Set the 1st account for transactions
web3.eth.defaultAccount = web3.eth.accounts[0];

// Set the ABI
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, './abi.json')));
var contract = new web3.eth.Contract(ABI, "0xB3fbe840Fd36dc32B8a2c27D44696dEE1acdCc98");

contract.methods.addGrade(1,"125","University A", "Math","02.11.12").send({from: "0x720b7e7d44839Ed356BCC25c50cb186E78DD8ACb"}, (err, res) => {
    if ( err ) {
        console.log(err);
    } else {
        contract.methods.getAllGrades("125").call((err, res) => { console.log(res)});
    }
});