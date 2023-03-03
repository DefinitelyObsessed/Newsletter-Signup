//jshint esversion: 6

const express = require("express") ;
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express() ;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/0dd638d3b8";

    const options = {
      method: "POST",
      auth: "RP:843ebd7af1f9b317b10fe8d92fad9d05-us21"
    }

    const request = https.request(url, options, function(response){

      if(  response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})




app.listen (process.env.PORT || 3000, function(){
  console.log("Server is running in port 3000");
});

// API Key
// 843ebd7af1f9b317b10fe8d92fad9d05-us21

// List  ID
// 0dd638d3b8
























// 1)you need your API key, list id and server(it is the last part of your API key)
//
// 2)you should install an npm to your project folder via terminal by typing:
// npm install @mailchimp/mailchimp_marketing in terminal , before require .
//
// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// npm install @mailchimp/mailchimp_marketing in terminal , before require .
// const mailchimp = require('@mailchimp/mailchimp_marketing');
//
// const app = express();
//
//
//
// Set up Mailchimp API key and server
// mailchimp.setConfig({
//      apiKey: "e1f76cb39f21d506fecf2d0b248f307c-us21", replace it with your API key
//     server: "us21",
// });

// Serve static files from the public directory
// app.use(express.static("public"));
//
//
//  Parse URL-encoded request bodies
// app.use(bodyParser.urlencoded({extended : true}));
//
//  Serve the signup page on the root path
// app.get('/' , function(req,res){
//
//     res.sendFile(__dirname + "/signup.html")
// });
//
// app.post("/", function(req,res){
//     const first_name = req.body.nf  ;
//     const last_name = req.body.ln  ;
//     const email =  req.body.email  ;
//     const listId = "7a97781e06";

// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//     email_address: email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: first_name ,
//       LNAME: last_name ,
//     }
//   });
//
//   console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
//
// }
//
// run();
//
//
//
// });














// app.listen(3000 , function(){
//     console.log('listening on port 3000');
// })
