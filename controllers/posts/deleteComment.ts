import { json } from "express";
import Post, { PostDocument } from "../../models/post";
import { IComment } from "../../types";

export default async (req, res) => {
	const { postId, commentId } = req.params;
	try {
		const post: PostDocument = await Post.findById(postId);
		const commentToDelete: IComment = post.comments.find(
			(el: IComment) => el._id.toString() == commentId
		);

		if (!commentToDelete) {
			return res.status(404).json({ errors: [{ msg: "not found" }] });
		}

		if (commentToDelete.user.toHexString() != req.user._id) {
			return res.status(401).json({ errors: [{ msg: "unauthorized" }] });
		}

		const updatedComments = post.comments.filter(
			(cm: IComment) => cm !== commentToDelete
		);
		post.comments = updatedComments;

		await post.save();
		res.status(200).json(post.comments);
	} catch (error) {
		console.log(error);
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
