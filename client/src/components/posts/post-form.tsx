import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/posts";
import { PostType, UserType } from "../../global.types";
import { AppState } from "../../store/configureStore";

const PostForm = ({ addPost, currentUser }: PostFormProps) => {
	const [content, setContent] = useState<string>("");
	const { avatar, name, _id } = currentUser;

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				addPost({
					user: _id,
					username: name,
					avatar,
					content,
					comments: [],
					likes: [],
					date: new Date(),
				});
				setContent("");
			}}
			className="my-3"
		>
			<textarea
				name="text"
				cols={30}
				rows={5}
				placeholder="Create a post"
				value={content}
				onChange={e => setContent(e.target.value)}
				required
				className="form-control"
				style={{ resize: "none" }}
			/>
			<div className="row justify-content-end mt-2">
				<input
					type="submit"
					className="btn btn-secondary mr-3"
					value="Submit"
				/>
			</div>
		</form>
	);
};

const mapStateToProps = (state: AppState) => ({
	currentUser: state.auth.user!,
});

export default connect(mapStateToProps, { addPost })(PostForm);

interface PostFormProps {
	addPost: (post: PostType) => void;
	currentUser: UserType;
}
