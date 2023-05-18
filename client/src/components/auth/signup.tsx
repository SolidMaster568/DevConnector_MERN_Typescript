import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alerts";
import { signup } from "../../store/actions/auth";
import { SignupParams } from "../../global.types";

function Signup({ setAlert, signup }: SignupProps) {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password1: "",
		password2: "",
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (formData.password1 !== formData.password2) {
			setAlert("passwords don't match", "danger");
		} else {
			const { name, email, password1 } = formData;
			signup({ name, email, password: password1 });
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 my-3">
					<h1 className="text-primary display-4 border-bottom border-primary mb-4">
						Sign Up
					</h1>
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<input
								type="text"
								placeholder="Name"
								name="name"
								required
								onChange={onChange}
								value={formData.name}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								placeholder="Email Address"
								required
								name="email"
								onChange={onChange}
								value={formData.email}
								className="form-control"
							/>
							<small className="form-text text-muted">
								This site uses Gravatar so if you want a profile image, use a
								Gravatar email
							</small>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Password"
								name="password1"
								minLength={6}
								onChange={onChange}
								value={formData.password1}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Confirm Password"
								name="password2"
								minLength={6}
								onChange={onChange}
								value={formData.password2}
								className="form-control"
							/>
						</div>
						<div className="row mx-1">
							<button type="submit" className="btn btn-primary">
								Sign Up
							</button>
							<p className="ml-3 my-2">
								Already have an account? <Link to="/login">Log In</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default connect(null, { setAlert, signup })(Signup);

interface SignupProps {
	setAlert: typeof setAlert;
	signup: (signupParams: SignupParams) => void;
}

interface FormData {
	name: string;
	email: string;
	password1: string;
	password2: string;
}
