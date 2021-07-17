var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var multer = require('multer');
var path = require('path');
var nodeMailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { defaultMaxListeners } = require('stream');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['korisnici']);

router.post('/login',function(req,res,next){
    var data = req.body;
    console.log('Pozvana funkcija')
    console.log(data.username)
    db.korisnici.find({username: data.username, password: data.password}, function(err,user){
        //console.log('PURY');
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/pretragaKorisnika',function(req,res,next){
    var data = req.body;
    console.log('Pozvana funkcija')
    console.log(data.username)
    db.korisnici.find({username: data.username}, function(err,user){
        //console.log('PURY');
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.get('/sviKorisnici',function(req,res,next){
    db.korisnici.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/korisnikEmail',function(req,res,next){
    db.korisnici.find({email: req.body},function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/updatePassword',function(req,res,next){
    db.korisnici.updateOne({username: req.body.username},
        {$set: {password: req.body.password}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/sendEmail',function(req,res,next){
    var user = req.body;
    sendMail(user,info =>{
        console.log('Mejl je poslat!');
        res.send(info);
    })
});

async function sendMail(user,callback){

    let testAccount = await nodeMailer.createTestAccount();
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:  'inedeljkovic999@gmail.com',
            pass:   'nedeljkovic19'
        }
    });

    let mailOptions = {
        from: 'PIA - projekat',
        to: user.email,
        subject: 'Resetovanje lozinke',
        text: 'http://localhost:4200/resetovanje/'+user.username
    };

    var info = await transporter.sendMail(mailOptions);
    callback(info);
}

router.post('/updateUser',function(req,res,next){
    db.korisnici.updateOne({username: req.body.username},
        {$set: {ime: req.body.ime,
            prezime: req.body.prezime,
            username: req.body.username,
            password: req.body.password,
            datumRodj: req.body.datumRodj,
            grad: req.body.grad,
            drzava: req.body.drzava,
            email: req.body.email,
            slika: req.body.slika,
            tip: req.body.tip,
            pratioci: req.body.pratioci,
            obavestenja: req.body.obavestenja,
            aktivan: req.body.aktivan}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log('UPDATE USER')
        console.log(user);
        res.json(user);
    })
});

router.post('/profil',function(req,res,next){
    var data = req.body;
    console.log('Pozvana funkcija')
    console.log(data.username)
    db.korisnici.find({username: data.username}, function(err,user){
        //console.log('PURY');
        if(err){
            res.send(err);
        }
        //console.log(user);
        res.json(user);
    })
});

router.post('/insertKorisnik',function(req,res,next){
    console.log('insert')
    db.korisnici.save(req.body,function(err,tmp){
        if(err){
            res.send(err);
        }
        res.json(tmp);
    })
})





module.exports = router;