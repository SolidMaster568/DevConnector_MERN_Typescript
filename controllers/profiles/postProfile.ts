import { validationResult } from "express-validator";
import { IProfile } from "../../types";
import Profile, { ProfileDocument } from "../../models/profile";

export default async (req, res) => {
	const errros = validationResult(req);
	if (!errros.isEmpty()) {
		return res.status(400).json({ errors: errros.array() });
	}

	const {
		bio,
		githubusername,
		company,
		website,
		location,
		status,
		skills,
		experience,
		education,
		social,
	}: IProfile = req.body;

	const profileFields = {
		user: req.user._id,
		status,
		skills,
		experience,
		education,
		social: {},
	};

	// adding optional fileds if exist
	const optionalFields = {
		bio,
		githubusername,
		company,
		website,
		location,
	};

	for (const key in optionalFields) {
		if (optionalFields[key]) {
			profileFields[key] = optionalFields[key];
		}
	}

	// adding social links if exist
	for (const key in social) {
		if (social[key]) {
			profileFields.social[key] = social[key];
		}
	}

	try {
		const profileExists = await Profile.exists({ user: req.user._id });

		if (profileExists) {
			const profile: ProfileDocument = await Profile.findOneAndUpdate(
				{ user: req.user._id },
				{ $set: profileFields },
				{ new: true } // defaults to false which will return the original document
			);
			res.status(201).json(profile);
		} else {
			const profile: ProfileDocument = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
