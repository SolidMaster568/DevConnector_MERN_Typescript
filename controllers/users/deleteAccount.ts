import User from "../../models/user";
import Profile from "../../models/profile";

export default async (req, res) => {
	const userId = req.user._id;
	try {
		await User.findByIdAndDelete(userId);
		await Profile.findOneAndRemove({ user: userId });
		res.status(200).json({ msg: "account deleted successfully" });
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
