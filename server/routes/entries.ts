import Router from "express";
import { check } from "express-validator";
import multer from "multer";
import path from "path";

import { getEntries, getLastEntry, getImageFileEntries, setEntries, updateLastEntry } from "../controllers/entries";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

const checkFileType = function (file: Express.Multer.File, cb: any) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
    return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

const DIR = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const fileSplit = file.originalname.split('.');
        const [filename] = file.originalname.split('.');
        const uniqueSuffix = filename + "-" + Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + fileSplit[fileSplit.length - 1];
        cb(null, uniqueSuffix)
    }

});


const upload = multer({ storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

router.post('/entries', upload.single('image'), [
    check('title', 'The title is obligatory').not().isEmpty(),
    check('description', 'The description is obligatory').not().isEmpty(),
    validateFields
], setEntries);

router.put('/updateLastEntry/:id', [
    check('title', 'The title is obligatory').not().isEmpty(),
    check('description', 'The description is obligatory').not().isEmpty(),
    validateFields
], updateLastEntry);
router.get('/lastEntry', getLastEntry);
router.get('/entries', getEntries);
router.get('/entriesImageFile/:id', getImageFileEntries);

module.exports = router;