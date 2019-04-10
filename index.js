const express = require('express')
const multer = require('multer')
// const upload = multer({
//     dest:'public/images/'
// })

const storageImage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images/')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage:storageImage})

const app = express();
app.set('view engine','ejs');

app.get('/upload-file',(req,res)=>{
    res.render('upload');
})

app.post('/upload-file',upload.single('image'),(req,res)=>{
    const image = req.file 
    res.send({image})
});

app.listen(3000,()=>console.log('Server started!'))