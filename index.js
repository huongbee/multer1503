const express = require('express')
const app = express();
app.set('view engine','ejs');

app.get('/upload-file',(req,res)=>{
    res.render('upload');
})

app.listen(3000,()=>console.log('Server started!'))