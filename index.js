var http = require('http');
var fs = require('fs');
require('./modal/connectdb.js')
var querystring = require('querystring');
var url = require('url');

const User = require('./modal/User');
// http is inbuilt module in node js which is used to create a server and return some response
http.createServer(async function (req, res) {

  // console.log("headers--------- " ,req.headers)
  // console.log("url - ==========" ,req.url)


  // lets send html response to user

  // lets read an html file usig fs module and send its content to user now
  console.log(req.method,"=========")
  if(req.url == "/add/user" && req.method == "GET")
  {
  	console.log("add api")
  	fs.readFile('./test.html',(err,html)=>{

  	res.write(html);
  	res.end()
  	})
  }
  // fetching user data
    else if(req.url == "/api/fetch/user" && req.method == "GET")
  {
  	
  	// fs.readFile('./test.html',(err,html)=>{
  		User.find({}).then(users=>{
  			if(users[0])
  			{
  				 	res.end(JSON. stringify({ success:1,message:"user fetched",users }));
  			}
  			else
  			{
  				res.end(JSON. stringify({ success:0,message:"no user found",users:[] }));
  			}
  		})

 
  	// })
  }

      else if(req.url.indexOf('/api/delete/user') >= 0 && req.method == "GET")
  {
  	console.log("delete user with id ",req.params)

  	console.log("user hostname is ",req.url.indexOf('/api/delete/user') >= 0)

  	const parsed = url.parse(req.url)
  	console.log("parsed param are ",parsed)
  	const query = querystring.parse(parsed.query)
  	console.log("query param are ",query)
  	
  	// fs.readFile('./test.html',(err,html)=>{
  		// User.find({}).then(users=>{
  		// 	if(users[0])
  		// 	{
  		// 		 	res.end(JSON. stringify({ success:1,message:"user fetched",users }));
  		// 	}
  		// 	else
  		// 	{
  		// 		res.end(JSON. stringify({ success:0,message:"no user found",users:[] }));
  		// 	}
  		// })

 
  	// })
  }
    else if(req.url == "/api/add/user" && req.method == "POST")
  {
  	console.log("add api")
	  const buffers = [];

	
	  for await (const chunk of req) {
	    buffers.push(chunk);
	  }

	  const data = Buffer.concat(buffers).toString();

	  console.log(data);


	  let {name , password} = JSON.parse(data)

  	let user = new User({
  		name,
  		password

  	})
  	res.setHeader('Content-Type', 'application/json');
  	user.save().then(()=>{
	res.end(JSON. stringify({ success:1,message:"user added",user }));

  	}).catch(err=>{
	res.end(JSON. stringify({ success:0,message:"error occured" }));

  	})

  }


// in this video we will create routes
 // for read,update and delete operation


// route for update the user
    else if(req.url == "/api/update/user" && req.method == "POST")
  {
  	console.log("add api")
	  const buffers = [];

	
	  for await (const chunk of req) {
	    buffers.push(chunk);
	  }

	  const data = Buffer.concat(buffers).toString();

	  console.log(data);


	  let {name , password} = JSON.parse(data)

  	let user = new User({
  		name,
  		password

  	})
  	res.setHeader('Content-Type', 'application/json');
  	user.save().then(()=>{
	res.end(JSON. stringify({ success:1,message:"user updated" }));

  	}).catch(err=>{
	res.end(JSON. stringify({ success:0,message:"error occured" }));

  	})

  }


}).listen(8080);

// also we have installed a third party module ie nodemon which is used to refresh the server when any file change occur
