/**
* Module dependencies.
*/
var express = require('express')
  , router = express.Router()
  /* , routes = require('./routes')
  , user = require('./routes/user') */
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var session = require('express-session')
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'gate'
            });

 
connection.connect();
 
global.db = connection;
 
// all environments

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.post('/login', function (req, res) {

	  var post  = req.body;
	  var nrp = post.user_id;
	  var password = post.user_pass;
	  var gate_id = post.gate_id;
	  new Date();
	  var time = new Date()

	  console.log(time);

	  // console.log(nrp,password);
	  var sql="SELECT user.user_id, user.user_name, user.user_group, access.access_open, access.access_close FROM `user`,`access` WHERE user.user_id='"+nrp+"' AND user.user_pass = '"+password+"' AND user.user_id = access.user_id";

	  db.query(sql, function(err, results){      
	     if(results.length){
	     	var user_name = results[0].user_name;

	     	// var a_open = results[0].access_open
	     	// var a = a_open.access_open.split(":")
	     	// var b = new Date(time.getfullyear(), time.getmonth(), time.getdate(), parseint(a[0]), parseint(a[1]), parseint(a[2]))

	     	req.session.loggedin = true;
			req.session.user_name = user_name;
	     	console.log(user_name);
	     	
	        console.log(user_name);
	        
	        res.status(200)
            .json({
                message: "Logged in"
            })
	     }
	     else{
	        res.status(404)
            .json({
                message: "User or password is wrong"
            })
	     }
	             
	  });     
	req.body.user_name
});

app.post('/signup', function(req, res) {
	  var post  = req.body;
	  var user = post.user_id
	  var name = post.user_name;
	  var pass = post.user_pass;
	  var group = post.user_group;

	  var sql = "INSERT INTO `user`(`user_id`,`user_name`,`user_pass`,`user_group`) VALUES ('" + nrp + "','" + name + "','" + pass + "','" + group + "')";

	  var query = db.query(sql, function(err, results) {
	  	if(result.length){
	     res.status(201)
            .json({
                message: "User created"
            })
        }
        else{
	        res.status(400)
            .json({
                message: "Bad request"
            })
	     }
	   
	  });
});

app.get('/users', function(req, res) {
	var sql="SELECT * FROM user";
	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("mantap")
	  		res.status(200).json(results)
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});

app.get('/users/:user_id', function(req, res) {
	var user_id = req.params.user_id;
	var sql="SELECT * FROM user WHERE `user_id` = "+user_id+"";
	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("mantap")
	  		res.status(200).json(results)
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});

app.delete('/users/:user_id', function(req, res) {
	var user_id = req.params.user_id;;
	var sql="DELETE FROM user WHERE `user_id` = "+user_id+"";

	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("terhapus")
	  		res.status(200).send("deleted")
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});




app.post('/creategate', function(req, res) {
	  var post  = req.body;
	  var id = post.gate_id
	  var name= post.gate_name;

	  var sql = "INSERT INTO `gate`(`gate_id`,`gate_name`) VALUES ('" + id + "','" + name + "')";

	  var query = db.query(sql, function(err, result) {
	  	if(query){
	     res.status(201)
            .json({
                message: "Gate created"
            })
        }
        else{
	        res.status(400)
            .json({
                message: "Bad request"
            })
	     }
	   
	  });
});

app.get('/gates', function(req, res) {
	var sql="SELECT * FROM gate";
	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("mantap")
	  		res.status(200).json(results)
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});

app.get('/gates/:gate_id', function(req, res) {
	var gate_id = req.params.gate_id;
	var sql="SELECT * FROM gate WHERE `gate_id` = "+gate_id+"";

	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("bagus")
	  		res.status(200).json(results)
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});

app.delete('/gates/:gate_id', function(req, res) {
	var gate_id = req.params.gate_id;
	var sql="DELETE FROM gate WHERE `gate_id` = "+gate_id+"";

	  var query = db.query(sql, function(err, results) {
	  	if(query){
	  		console.log("terhapus")
	  		res.status(200).send("deleted")
	  		// console.log(results)
	    }
	    else{
	        res.status(400)
	        .json({
	            message: "Bad request"
	        })
	     }
	   
	  });
});

//Middleware
app.listen(3000, () => console.log('Server running on http://localhost:3000/'));