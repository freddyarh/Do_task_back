"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const entries_1 = require("../controllers/entries");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.default)();
const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    //check extension names
    const extName = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    }
    else {
        cb("Error: You can Only Upload Images!!");
    }
};
const DIR = path_1.default.join(__dirname, "../../uploads");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        console.log(req);
        const [filename, extension] = file.originalname.split('.');
        const uniqueSuffix = filename + "-" + Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + extension;
        cb(null, uniqueSuffix);
    }
});
const upload = (0, multer_1.default)({ storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
router.post('/:id/:miremos', (req, res, next) => {
    const { name, lastName } = req.body;
    console.log(req.params);
    console.log('si', req.query);
    res.status(200).json({
        ok: true,
        msj: 'Respuesta correcta',
        name,
        lastName
    });
});
router.post('/entries', upload.single('image'), [
    (0, express_validator_1.check)('title', 'The title is obligatory').not().isEmpty(),
    (0, express_validator_1.check)('description', 'The description is obligatory').not().isEmpty(),
    validate_fields_1.validateFields
], entries_1.setEntries);
router.get('/entries', entries_1.getEntries);
router.get('/entriesImageFile/:id', entries_1.getImageFileEntries);
module.exports = router;
//# sourceMappingURL=entries.js.map