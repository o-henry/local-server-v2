import { Schema } from "mongoose";

const jejuSchema = new Schema({
    location: { type: String, required: true, minlength: 1 },
    date: { type: Date, default: Date.now }
});

export default jejuSchema