import { validationResult } from "express-validator";
import { Document } from "mongoose";

import User, { UserDocument } from "../../models/user";
import Post, { PostDocument } from "../../models/post";
import { IPost } from "../../types";

export default async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user: UserDocument = await User.findById(req.user._id).select(
			"name avatar"
		);

		const newPost: IPost = {
			user: req.user._id,
			username: user.name,
			avatar: user.avatar,
			content: req.body.content,
		};

		const newPostDoc: PostDocument = new Post(newPost);
		await newPostDoc.save();

		res.status(201).json(newPostDoc);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
