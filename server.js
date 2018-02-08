const express=require('express');
var app=express();
const hbs=require('hbs');
const fs=require('fs');



hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine','hbs')


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});



app.use((req,res,next) =>{
  var now= new Date().toString();
 var log= `${now}:${req.method} ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log+'\n');
next();

});
app.use((req,res,next) =>{
res.render('maintenance.hbs');

});

app.use(express.static(__dirname+'/public'));
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
res.render('home.hbs',{
  pageTitle:'Homepage',
  welcomeMessage:'Welcome'
});
});

app.listen(3000,()=>{
  console.log("Listening to server");
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear:new Date().getFullYear()
  })
});
