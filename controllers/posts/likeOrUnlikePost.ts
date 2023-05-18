import { ObjectId } from "mongodb";
import Post, { PostDocument } from "../../models/post";

export default async (req, res) => {
	const postId = req.params.id;
	try {
		const postToLike: PostDocument = await Post.findById(postId);

		if (!postToLike) {
			return res.status(404).json({
				errors: [{ msg: "post doesn't exist or no longer available." }],
			});
		}

		const postAlreadyLiked: boolean = !!postToLike.likes.filter(
			(like: ObjectId) => req.user._id === like.toString()
		).length;

		if (!postAlreadyLiked) {
			const likes: ObjectId[] = [...postToLike.likes, req.user._id];
			await Post.updateOne({ _id: postToLike.id }, { $set: { likes } });
			res.status(201).json(likes);
		} else {
			const likes: ObjectId[] = postToLike.likes.filter(
				(like: ObjectId) => like.toString() != req.user._id
			);
			await Post.updateOne({ _id: postToLike.id }, { $set: { likes } });
			res.status(201).json(likes);
		}
	} catch (error) {
		console.log(error);
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
