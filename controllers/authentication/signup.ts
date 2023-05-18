import { validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { UserDocument } from "../../models/user";

export default async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// check if email exist
		const existingUser: UserDocument = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				errors: [
					{
						msg: "email already exists",
						param: "email",
						location: "body",
					},
				],
			});
		}
		// making an avatar using gravatar
		const avatar = gravatar.url(email, {
			size: "200",
			default: "mm",
			rating: "pg",
		});

		//encrypting password
		const hashedPassword = await bcrypt.hash(password, 12);

		//saving user
		const user: UserDocument = new User({
			name,
			email,
			password: hashedPassword,
			avatar,
		});
		await user.save();

		// jwt auth
		const payload = {
			user: {
				id: user._id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_TOKEN_VALIDITY },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};
