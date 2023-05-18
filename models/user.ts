import { ObjectId } from "bson";
import { Schema, model, Document } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	avatar: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

export interface UserDocument extends Document, IUser {
	_id: ObjectId; // eliminate confilcts between IUser and Document _id member types by overwritting it
}
export default model<UserDocument>("User", userSchema);
