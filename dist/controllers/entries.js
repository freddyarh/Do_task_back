"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageFileEntries = exports.getEntries = exports.getLastEntry = exports.updateLastEntry = exports.setEntries = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const entries_1 = __importDefault(require("../models/entries"));
const setEntries = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const file = req.file;
    const data = Object.assign(Object.assign({}, body), { image: file === null || file === void 0 ? void 0 : file.filename });
    const entries = new entries_1.default(data);
    yield entries.save();
    res.json({
        ok: true,
        msj: 'Your entry has saved successfully',
        entries
    });
});
exports.setEntries = setEntries;
const updateLastEntry = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const _a = req.body, { title, description } = _a, rest = __rest(_a, ["title", "description"]);
    const entry = yield entries_1.default.findOneAndUpdate(id, { title, description }, { new: true }).exec();
    return res.json({
        ok: true,
        msj: "Successfull",
        entry
    });
});
exports.updateLastEntry = updateLastEntry;
const getLastEntry = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const lastEntry = yield entries_1.default.find().limit(1).sort({ $natural: -1 });
    res.json({
        ok: true,
        msj: 'Access true',
        lastEntry
    });
});
exports.getLastEntry = getLastEntry;
const getEntries = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield entries_1.default.find({});
    res.json({
        ok: true,
        msj: 'Access true',
        entries
    });
});
exports.getEntries = getEntries;
const getImageFileEntries = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pathImagen = path_1.default.join(__dirname, `../../uploads/${id}`);
    if (fs_1.default.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
    }
    const pathNoImagen = path_1.default.join(__dirname, '../../assets/no-image.jpg');
    res.sendFile(pathNoImagen);
});
exports.getImageFileEntries = getImageFileEntries;
//# sourceMappingURL=entries.js.map