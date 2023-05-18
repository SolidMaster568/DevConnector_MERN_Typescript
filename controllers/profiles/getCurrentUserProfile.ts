import Profile, { ProfileDocument } from "../../models/profile";

export default async (req, res) => {
	try {
		const profile: ProfileDocument = await Profile.findOne({
			user: req.user._id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(404).json({ errors: [{ msg: "profile not found" }] });
		}

		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
