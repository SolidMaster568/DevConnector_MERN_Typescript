import { ObjectID } from "mongodb";
import Profile, { ProfileDocument } from "../../models/profile";

export default async (req, res) => {
	const userId = req.params.userId;

	try {
		const profile: ProfileDocument = await Profile.findOne({
			user: userId,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(404).json({ errors: [{ msg: "profile not found" }] });
		}

		res.status(200).json(profile);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(404).json({ errors: [{ msg: "profile not found" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
