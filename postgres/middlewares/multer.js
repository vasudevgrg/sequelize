// const multer= require("multer");



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/assets')
//     },
//     filename: function (req, file, cb) {
//        uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//        req.filename=uniqueSuffix;
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage });

//   const multermiddleware= (req, res, next)=>{
//     upload.single("file")(req, res, function(err){
//         if(err){
//             res.status(400).send("unable to upload ");
//         }
//         next();
//     })

//   };

//   exports.module={multermiddleware};


const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../assets'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    req.filename = uniqueSuffix;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });
// Middleware to handle file upload and set req.filename
const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: "Error uploading file" });
    }
    next();
  });
};
module.exports = { uploadMiddleware };
