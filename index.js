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

// app.post('/upload-file',upload.single('image'),(req,res)=>{
//     const image = req.file 
//     const name = req.body.txtname 
//     res.send({image,name})
// });
/**
 * filter: mime type, check file size
 * rename file
 */
// app.post('/upload-file',upload.array('image',4),(req,res)=>{
//     const arrImage = req.files 
//     res.send({arrImage})
// });
const config = upload.fields([{
    name: 'avatar',
    maxCount: 1
},{
    name: 'image',
    maxCount: 2
}]);

app.post('/upload-file',config,(req,res)=>{
    const arrImage = req.files 
    res.send({arrImage})
});

app.listen(3000,()=>console.log('Server started!'))