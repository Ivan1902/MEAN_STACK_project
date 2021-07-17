var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var multer = require('multer');
var path = require('path');



var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

var db = mongojs('mongodb+srv://ivan:ivan@cluster0.iikva.mongodb.net/pia?retryWrites=true&w=majority',['knjige']);

router.get('/sveKnjige',function(req,res,next){
    db.knjige.find(function(err,users){
        if(err){
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/updateCekanje',function(req,res,next){
    db.knjige.updateOne({naziv: req.body.naziv},
        {$set: {cekanje: req.body.cekanje}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/updateStatus',function(req,res,next){
    db.knjige.updateOne({naziv: req.body.naziv},
        {$set: {cekanje: req.body.cekanje,
        procitao: req.body.procitao,
        cita: req.body.cita}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
})

router.post('/updateOcena',function(req,res,next){
    db.knjige.updateOne({naziv: req.body.naziv},
        {$set: {ocena: req.body.ocena}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/dodajKnjigu',upload.single('slika'),function(req,res,next){
    console.log('Pozvano dodavanje knjige')
    var putanja;
    var tmp = req.body.genericka;
    if(tmp == 'da'){
        
        putanja= "uploads\\generickaKnjiga.jpg";
        
    }
    else{
        putanja = req.file.path;
    }
    var data = {
        naziv: req.body.naziv,
        autor: typeof(req.body.autor) === 'string'?[req.body.autor]: req.body.autor,
        datum: req.body.datum,
        zanr: typeof(req.body.zanr) === 'string' ? [req.body.zanr]: req.body.zanr,
        opis: req.body.opis,
        procitao: [],
        cita: [],
        cekanje: [],
        strane: req.body.strane,
        odobrena: false,
        slika: 'http://localhost:3000/'+putanja
    }
    
    db.knjige.save(data,function(err,tmp){
        if(err){ 
            res.send(err);
        }      
        res.json(tmp);
    }) 
});

router.post('/updateOdobrena',function(req,res,next){
    db.knjige.updateOne({naziv: req.body.naziv},
        {$set: {odobrena: req.body.odobrena}}, function(err,user){
        if(err){
            res.send(err);
        }
        console.log(user);
        res.json(user);
    })
});

router.post('/updateKnjiga',upload.single('slika'),function(req,res,next){

    console.log('Pozvano updateovanje knjige')
    var putanja;
    var tmp = req.body.zameniSliku;
    if(tmp == 'da'){
        
        putanja= 'http://localhost:3000/'+req.file.path;
        
    }

    
    console.log(req.body.autor[1])
    console.log(req.body.ocena)
    var data = {
        naziv: req.body.naziv,
        autor: typeof(req.body.autor) === 'string'?[req.body.autor]: req.body.autor,
        datum: req.body.datum,
        zanr: typeof(req.body.zanr) === 'string' ? [req.body.zanr]: req.body.zanr,
        opis: req.body.opis,
        strane: req.body.strane,
        odobrena: false,
        ocena: req.body.ocena,
        procitao: typeof(req.body.procitao) === 'string' ? [req.body.procitao]: req.body.procitao,
        cita: typeof(req.body.cita) === 'string' ? [req.body.cita]: req.body.cita,
        cekanje: typeof(req.body.cekanje) === 'string' ? [req.body.cekanje]: req.body.cekanje,

    }
    console.log(req.body.naziv)
    if(tmp == 'da'){
        db.knjige.updateOne({naziv: req.body.naziv},
            {$set: {autor: data.autor,
                datum: data.datum,
                zanr: data.zanr,
                opis: data.opis,
                odobrena: req.body.odobrena,
                procitao: data.procitao,
                cita: data.cita,
                cekanje: data.cekanje,
                strane: data.strane,
                ocena: data.ocena,
                slika: putanja}}, function(err,user){
            if(err){
                res.send(err);
            }
            console.log(user);
            res.json(user);
        })
    }
    else{
        db.knjige.updateOne({naziv: req.body.naziv},
            {$set: {autor: data.autor,
                datum: data.datum,
                zanr: data.zanr,
                opis: data.opis,
                odobrena: req.body.odobrena,
                procitao: data.procitao,
                cita: data.cita,
                cekanje: data.cekanje,
                strane: data.strane,
                ocena: data.ocena}}, function(err,user){
            if(err){
                res.send(err);
            }
            console.log(user);
            res.json(user);
        })
    }
    
});


module.exports = router;