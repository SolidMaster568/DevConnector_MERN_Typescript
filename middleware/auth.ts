import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/user";

export default async (req, res, next) => {
	const token: string | undefined = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.json({ errors: [{ msg: "no token found, unautherized" }] });
	}

	try {
		const { id }: any = jwt.verify(token, process.env.JWT_SECRET);
		const user: UserDocument = await User.findOne({ id });
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ errors: [{ msg: "Token is invalid" }] });
	}
};
