import multer from 'multer'

//disc storage configuration
const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage});

export default upload;