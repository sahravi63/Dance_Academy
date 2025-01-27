const express=require('express');
const path=require('path');
const fs=require('fs');
const { default: mongoose } = require('mongoose');
const app=express();
const bodyparser=require('body-parser');
app.use(express.urlencoded({ extended: true }));

const port=8000;

mongoose.connect('mongodb://localhost/Dance_Academy', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Failed to connect to MongoDB', err));





const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Item was saved to the database");
    }).catch((err) => {
        console.log(err);  // Log the error for debugging
        res.status(400).send("Item was not saved to the database");
    });
});


app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});