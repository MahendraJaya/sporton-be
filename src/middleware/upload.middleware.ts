import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb) => {
        cb(null, uploadDir);
    },
    filename: (req:any, file:any, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req:any, file:Express.Multer.File, cb:multer.FileFilterCallback) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true)
    }else{
        cb(new Error("Only image are allow"))
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}) 