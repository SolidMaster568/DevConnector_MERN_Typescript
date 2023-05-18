import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../store/configureStore";
import { PostType, UserType } from "../../global.types";
import moment from "moment";
import { likeOrUnlike, deletePost } from "../../store/actions/posts";

function PostItem({
	authLoading,
	currentUser,
	post: { _id, content, username, avatar, user, likes, comments, date },
	likeOrUnlike,
	deletePost,
	showControls = true,
	history
}: PostProps) {
	const handleDeletePost = (id: string)=>{
		const confirmation = window.confirm("are you sure you want to delete this post ?");
		confirmation && deletePost(id);
		history.push("/posts")
	}

	return (
		<div className="card my-3 shadow-sm">
			<div className="card-header d-flex justify-content-between">
				<Link
					to={`/profile/${user}`}
					className="row justify-content-start align-items-center link-no-decoration"
				>
					<img className="thumbnail" src={avatar} alt="" />
					<h5 className="text-dark ml-2 text-center">{username}</h5>
				</Link>
				<div className="d-flex align-items-center">
					<p className="mr-2 mb-0">{moment(date).format("MMM DD YYYY")}</p>
					{!authLoading && user === currentUser._id && (
						<button onClick={() => handleDeletePost(_id!)} type="button" className="close mr-2 text-danger">
							<span aria-hidden="true">&times;</span>
						</button>
					)}
				</div>
			</div>
			<div className="card-body">
				<p className="my-1">{content}</p>
				{showControls ? (
					<>
						<button
							onClick={() => likeOrUnlike(_id!)}
							type="button"
							className="btn btn-light mr-2"
						>
							<i className="fas fa-thumbs-up" />{" "}
							<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
						</button>
						<Link to={`/posts/${_id}`} className="btn btn-secondary">
							Discussion{" "}
							{comments.length > 0 && (
								<span className="p-1">{comments.length}</span>
							)}
						</Link>
					</>
				) : null}
			</div>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	authLoading: state.auth.loading,
	currentUser: state.auth.user!,
});

export default withRouter(connect(mapStateToProps, { likeOrUnlike, deletePost })(PostItem));

interface PostProps extends RouteComponentProps{
	authLoading: boolean;
	currentUser: UserType;
	post: PostType;
	likeOrUnlike: (postId: string) => void;
	deletePost: (postId: string) => void;
	showControls?: boolean;
}
