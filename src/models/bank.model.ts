import mongoose from "mongoose";
import mongooes, {Schema, Document} from "mongoose";

interface IBank extends Document{
    bankName: string;
    accountName: string;
    accountNumber: string;
}

const BankSchme: Schema = new Schema({
    bankName:{
        type: String, required: true
    },
    accountName:{
        type: String, required: true
    },
    accountNumber:{
        type: String, required: true
    },
})

export default mongoose.model<IBank>("Bank", BankSchme);