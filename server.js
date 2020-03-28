'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
const bcrypt = require("bcrypt")

fccTesting(app); //For FCC testing purposes

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log(hash)
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res);
  });
});
//END_ASYNC

//START_SYNC
let hash= bcrypt.hashSync(myPlaintextPassword, saltRounds);
let result =   bcrypt.compareSync(myPlaintextPassword, hash);
console.log(hash,result)
//END_SYNC

app.get('/', async (req, res) => {
    if(!req.query.word) return res.json({error:"Add param 'word' as query parameter."})
    let hash= await bcrypt.hash(req.query.word, saltRounds);
    res.json({word:req.query.word,hash: hash})
})

app.listen(process.env.PORT || 3000, () => {});
