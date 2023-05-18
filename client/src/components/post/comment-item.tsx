import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../store/actions/posts";
import { AppState } from "../../store/configureStore";
import moment from "moment";
import { CommentType } from "../../global.types";

function CommentItem({
	postId,
	comment: { _id, content, username, avatar, user, date },
	authLoading,
	userId,
	deleteComment,
}: CommentItemProps) {
	const deleteCommentHandler = () => {
		const confirmation = window.confirm(
			"are you sure you want to delete this comment ?"
		);
		if (confirmation) deleteComment(_id!, postId);
	};
	return (
		<div className="card my-2">
			<div className="row card-body p-1 m-0 row justify-content-between">
				<Link
					to={`/profile/${user}`}
					className="card-body p-1 m-0 row justify-content-start link-no-decoration"
				>
					<img className="thumbnail mr-2" src={avatar} alt="" />
					<h5 className="text-dark">{username}</h5>
				</Link>
				<div className="d-flex align-items-center">
					<p className="mr-2 mb-0">{moment(date).format("MMM DD YYYY")}</p>
					{!authLoading && user === userId && (
						<button onClick={deleteCommentHandler} className="close mr-2 text-danger">
							<span aria-hidden="true">&times;</span>
						</button>
					)}
				</div>
			</div>
			<p className="card-body m-0 p-2 pt-0">{content}</p>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	authLoadin: state.auth.loading,
	userId: state.auth.user!._id,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

interface CommentItemProps {
	postId: string;
	comment: CommentType;
	authLoading?: boolean;
	userId: string;
	deleteComment: (commentId: string, postId: string) => void;
}
