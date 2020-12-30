const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('index.html', {title: 'H-Natsu'});
});

router.get('/visualnovels',(req, res)=>{
    res.render('visualnovels.html', {title: 'H-Visual'});
});

router.get('/signup',(req, res)=>{
    res.render('signup.html', {title: 'H-Sign Up'});
});

router.get('/rpg',(req, res)=>{
    res.render('rpg.html', {title: 'H-RPG'});
});

router.get('/games',(req, res)=>{
    res.render('games.html', {title: 'H-Games'});
});
module.exports = router;