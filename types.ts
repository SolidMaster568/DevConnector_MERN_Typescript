import { ObjectId } from "mongodb";

export interface IPost {
	user: ObjectId;
	username: String;
	content: String;
	avatar: String;
	comments?: IComment[];
	likes?: ObjectId[];
	date?: Date;
}

export interface IComment {
	_id?: ObjectId;
	date?: Date;
	user: ObjectId;
	username: String;
	content: String;
	avatar: String;
}

export interface IProfile {
	bio?: String;
	githubusername?: String;
	company?: String;
	website?: String;
	location?: String;
	status: String;
	skills: String[];
	experience: {
		jobTitle: String;
		company: String;
		location: String;
		from: Date;
		to?: Date;
		description?: String;
		current?: Boolean;
	}[];
	education: {
		school: String;
		degree: String;
		fieldOfStudy: String;
		from: Date;
		to?: Date;
		description: String;
		current?: Boolean;
	}[];
	social?: { twitter?: String; linkedIn?: String; youtube?: String };
	date?: Date;
}

export interface IUser {
	_id?: ObjectId;
	name: string;
	avatar: string;
	email: string;
	password: string;
	date?: Date;
}
