const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true,
 useUnifiedTopology: true});
const port = 8000; 

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
});

  const Contact = new mongoose.model('Contact', contactSchema);
  

app.use('/static',  express.static('static'))
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/', async(req, res)=>{
    
    const myData = new Contact({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        pincode:req.body.pincode
    });
    
    
    const val = await myData.save().then(() =>{
        res.send("This item has been saved to the database")
    }).catch(() =>{
        res.status(400).send("This item was not saved to the database")
    });
   //res.status(200).render('contact.pug');

})


app.listen(port, () => {
    console.log(`Dance website listening on port ${port}`)
  })