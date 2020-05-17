var oracledb = require('oracledb');
var config = require("../config");

var pool = oracledb.createPool({
	connectionLimit:10,
	user:config.database.user,
	password:config.database.password,
	connectString:config.database.connectString,
	multipleStatements : true
});




module.exports.pool = pool