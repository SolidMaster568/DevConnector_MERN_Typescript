import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../store/actions/auth";
import { LoginParamsType } from "../../global.types";

function Login({ login }: LoginProps) {
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const onSubmit = (e: FormEvent) => {
		const { email, password } = formData;
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 my-3">
					<h1 className="text-secondary display-4 border-bottom border-secondary mb-4">
						Login
					</h1>
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<input
								className="form-control"
								type="email"
								placeholder="Email Address"
								name="email"
								onChange={onChange}
								value={formData.email}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Password"
								name="password"
								minLength={6}
								onChange={onChange}
								value={formData.password}
								className="form-control"
							/>
						</div>
						<div className="row mx-1">
							<button type="submit" className="btn btn-secondary">
								Login
							</button>
							<p className="ml-3 my-2">
								Don't have an account? <Link to="/signup">Sign Up</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default connect(null, { login })(Login);

interface FormData {
	email: string;
	password: string;
}

interface LoginProps {
	login: (loginParams: LoginParamsType) => void;
}
