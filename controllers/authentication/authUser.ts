import User, { UserDocument } from "../../models/user";
import { IUser } from "../../types";

export default async (req, res) => {
	try {
		const user: UserDocument = await User.findById(req.user._id);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			date: user.date,
		} as IUser);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: error.message }] });
	}
};
