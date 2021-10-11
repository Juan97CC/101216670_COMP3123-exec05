//const { json } = require('express');
const express = require('express');
const app = express();
const router = express.Router();


const fs = require("fs")
const data = fs.readFileSync('./user.json', 'utf8')
let userdata = JSON.parse(data)








/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
 // res.send('This is home router');
  res.sendFile(__dirname+ '/home.html')
     
    

})

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
 
  //let data = fs.readFileSync('user.json')
  



  

  res.send(userdata)
}


);

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:username/:userpw', (req,res) => {
  var usr;
  var pw
  let username = req.params.username
let userpw = req.params.userpw

  userdata.forEach(db => {
    usr = `${db.username}`
    pw = `${db.password}`
  
});

console.log(usr)
console.log(pw)


if(usr == username && pw == userpw ){
  res.send('status: true\nmessage: User Is valid')
}
if(usr != username && pw == userpw){
  res.send('status: false\nmessage: UserName Is invalid')
}
if(usr == username && pw != userpw ){
  res.send('status: false\nmessage: Password Is not valid')
}



 // res.send('This is login router');
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  
  let username = req.params.username
  var usr

  userdata.forEach(db => {
    usr = `${db.username}`
    
});

if(usr == username){
  res.write(` <b>${username} successfully logout.<b>`)
  res.end()
}


});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081))