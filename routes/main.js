const express = require('express');
const db = require("../db/testDB");

const router = express.Router();

router.get('/', (req, res) => {
    
    res.render('index');
        
});

router.get('/test', (req, res) => {
    
    db.todoWork(function(result){
        res.send(result)
        
    })

});

router.get('/test/data', (req, res) => {
    
    // db.testData(function(result){
    //     res.send(result)
        
    // })

});



module.exports = router;