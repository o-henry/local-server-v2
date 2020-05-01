import mongoose from "mongoose";
import { jejuSchema } from "../schemas"

const Jeju = mongoose.model("Jeju", jejuSchema);

export default Jeju
