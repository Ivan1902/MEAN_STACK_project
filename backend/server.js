var cors = require('cors');
var express = require('express');
var path = require('path');
//var body = require('body');

var index = require('./routes/index');
var korisnici = require('./routes/korisnici');
var zahtevi = require('./routes/zahtevi');
var knjige = require('./routes/knjige');
var komentari = require('./routes/komentari');
var desavanja = require('./routes/desavanja');
var desavanjaKomentari = require('./routes/desavanjaKomentari');
var desavanjaZahtevi = require('./routes/desavanjaZahtevi');
var zanrovi = require('./routes/zanrovi');

const bodyParser = require('body-parser');

var port = 3000;

var app = express();
app.use(cors({origin: "*"}));

//View engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder

app.use(express.static(path.join(__dirname,'frontend')));
//app.use(express.static())

// Body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use("/uploads",express.static(path.join("backend/uploads")));
app.use('/uploads',express.static('uploads'));

app.all("linkkojitišalješbeku",(req,res)=>{
    res.status(200).sendFile("fajlkojisalješ",{root : "./uploads tj apsolutna putanja foldera u kom su slike"});
    })


app.use('/', index);
app.use('/', korisnici);
app.use('/', zahtevi);
app.use('/', knjige);
app.use('/', komentari);
app.use('/', desavanja);
app.use('/',desavanjaKomentari);
app.use('/',desavanjaZahtevi);
app.use('/',zanrovi);

app.listen(port, function(){
    console.log('Server started on port '+ port);
});
