import { Request } from "express";
import { Document } from "mongoose";
import Post, { PostDocument } from "../../models/post";
import { IUser } from "../../types";

export default async (req, res) => {
	const postId = req.params.id as string;
	try {
		const postToDelete: PostDocument = await Post.findById(postId);
		if (!postToDelete) {
			return res.status(404).json({
				errors: [{ msg: "post doesn't exist or no longer available." }],
			});
		}
		if (postToDelete.user.toString() != req.user._id) {
			return res.status(401).json({ errors: [{ msg: "unauthorized" }] });
		}
		await postToDelete.deleteOne();
		res.status(200).json({ msg: "deleted successfully" });
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
