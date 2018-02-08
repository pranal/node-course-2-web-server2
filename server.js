const express=require('express');

var app=express();
const hbs=require('hbs');
const fs=require('fs');

const port= process.env.PORT || 3000;

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
next();
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

app.listen(port,()=>{
  console.log(`Listening to server${port}`);
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear:new Date().getFullYear()
  })
});
