
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var loginRouter = express.Router();
var conn = mysql.createConnection({
	                                host:"localhost",
	                                user:"root",
	                                password:"admin",
	                                database:"health_record"
	                             });
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




loginRouter.route('/login').post(function (req, res) {

    
	var u_name = req.body.username;
	var pass = req.body.password;

	if(u_name == ""||pass == ""||u_name.length>20||pass.length>32) {
		
		console.log("error");
	    return false;

		var js = {
			      "status":"403",
			      "message":"Invalid entry"
			    };
		
		res.send(js);
	}

	else {

  	conn.query("select * from user where username='"+u_name+"'",function (err,rows) {

	var js = {
		      "status":"",
		      "message":"",
		      "type":null
		    };

	if(err)	 {
				console.log(err);
				return res.send(js);
    }
	
    if(rows.length > 0) {

		var data = JSON.stringify(rows);
		var json = JSON.parse(data);
		console.log("server :"+json[0].username+u_name+json[0].password+"   "+pass);

		if(u_name == json[0].username && pass == json[0].password) {
						
		    js.status = '200';
			js.message = "success";
					
			if(json[0].status == true) {
								         js.type = "admin";
			}

			else {
					js.type = "user";
					console.log(js.type);
				}
					     
					
		}
	
		else {
				js.status = '403';
				js.message = "failed";
					    
		}

		js.user_id = json[0].uid;
		var token = jwt.sign({ userid: json[0].uid}, 'arya',{expiresIn:60*10000});
		js.token = token;
		console.log(js);
		 
    }
       
    else {
        	js.status = '403';
		    js.message = "failed";
    }
		
	res.send(js);
		
	});
  }
});

module.exports = loginRouter;