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
/**
 * filter: mime type, check file size
 * rename file
 */
const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpg'){
        return cb(null,true)
    }
    return cb(new Error('File not allow!'))
}
const upload = multer({storage:storageImage, fileFilter, limits:{fileSize:100*1024} }) //100kb

const app = express();
app.set('view engine','ejs');

app.get('/upload-file',(req,res)=>{
    res.render('upload');
})

const single = upload.single('image') // function(res,res,()=>{})
app.post('/upload-file',(req,res)=>{
    single(req,res,function(err){
        if(err) return res.send({error: err.message})

        const image = req.file 
        res.send({image})
    })
})

// app.post('/upload-file',upload.single('image'),(req,res)=>{
//     const image = req.file 
//     const name = req.body.txtname 
//     res.send({image,name})
// });

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

// app.post('/upload-file',config,(req,res)=>{
//     const arrImage = req.files 
//     res.send({arrImage})
// });

app.listen(3000,()=>console.log('Server started!'))