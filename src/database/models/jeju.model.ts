import mongoose from "mongoose";
import jejuSchema from '../schemas/jeju.schemas'

const Jeju = mongoose.model("Jeju", jejuSchema);

export default Jeju
