"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EntriesSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    date: String,
    image: String,
    ranking: Number,
    user: String
});
const Entries = (0, mongoose_1.model)("Entries", EntriesSchema);
exports.default = Entries;
//# sourceMappingURL=entries.js.map