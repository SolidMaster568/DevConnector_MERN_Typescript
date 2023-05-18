import { Request, Response } from "express";
import Post, { PostDocument } from "../../models/post";

export default async (req: Request, res: Response) => {
	try {
		const posts: PostDocument[] = await Post.find().sort({ date: "-1" });
		res.json(posts);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
