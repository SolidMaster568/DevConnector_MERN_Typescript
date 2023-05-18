import { Request, Response } from "express";
import Post, { PostDocument } from "../../models/post";

export default async (req: Request, res: Response) => {
	const postId = req.params.id;
	try {
		const post: PostDocument = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ errors: [{ msg: "post not found" }] });
		}

		res.status(200).json(post);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
