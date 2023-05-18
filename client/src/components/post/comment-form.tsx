import React, { useState } from "react";
import { connect } from "react-redux";
import { CommentType, UserType } from "../../global.types";
import { addComment } from "../../store/actions/posts";
import { AppState } from "../../store/configureStore";

function CommentForm({ postId, addComment, currentUser }: CommentFormProps) {
	const [content, setContent] = useState<string>("");

	const { _id, avatar, name } = currentUser;
	const comment: CommentType = {
		user: _id,
		avatar,
		date: new Date(),
		content,
		username: name,
	};

	return (
		<form
			className="my-3"
			onSubmit={e => {
				e.preventDefault();
				addComment(comment, postId);
				setContent("");
			}}
		>
			<div className="form-group d-flex justify-content-between">
				<textarea
					name="text"
					cols={24}
					rows={1}
					placeholder="write a comment"
					value={content}
					onChange={e => setContent(e.target.value)}
					required
					className="form-control"
					style={{ resize: "none", overflow: "hidden" }}
				/>
				<input
					type="submit"
					className="btn btn-dark ml-2"
					value="Comment"
				/>
			</div>
		</form>
	);
}

const mapStateToProps = (state: AppState) => ({
	currentUser: state.auth.user!,
});

export default connect(mapStateToProps, { addComment })(CommentForm);

interface CommentFormProps {
	postId: string;
	addComment: (comment: CommentType, postId: string) => void;
	currentUser: UserType;
}
