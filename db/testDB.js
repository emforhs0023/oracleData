var oracledb = require('oracledb');
const pool = require("../services/database").pool;


module.exports.todoWork = function(callback){
    
    oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECTSTRING
    },

    function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
 
        // PrepareStatement 구조
        let query = 'select * from TEST_DATA' 
              
 
        connection.execute(query, function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            doRelease(connection, result.rows);         // Connection 해제
        });
    });    
 

    // DB 연결 해제
    function doRelease(connection, result) {
        connection.release(function (err) {
            if (err) {
                console.error(err.message);
            }
            
            // DB종료까지 모두 완료되었을 시 응답 데이터 반환
            callback(result);
        });
    }
}

// module.exports.testData = function(callback){
 
//     pool.getConnection(function(err, connection){
//         console.log("fadsdasf")
//         // if (err) {
//         //     console.error(err.message);
//         //     return;
//         // }
 
//         // // PrepareStatement 구조
//         // let query = 'select * from TEST_DATA' 
//         // connection.execute(query, function (err, result) {
//         //     if (err) {
//         //         console.error(err.message);
//         //         doRelease(connection);
//         //         return;
//         //     }
//         //     doRelease(connection, result.rows);         // Connection 해제
//         // })
//     });    
 

//     // DB 연결 해제
//     function doRelease(connection, result) {
//         connection.release(function (err) {
//             if (err) {
//                 console.error(err.message);
//             }
            
//             // DB종료까지 모두 완료되었을 시 응답 데이터 반환
//             callback(result);
//         });
//     }
// }