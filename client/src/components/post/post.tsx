import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PostItem from "../posts/post-item";
import { getPost } from "../../store/actions/posts";
import { MoonLoader } from "react-spinners";
import store, { AppState } from "../../store/configureStore";
import { PostType } from "../../global.types";
import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import { v4 as uuid } from "uuid";

function Post({ getPost, post, postLoading, match }: PostProps) {
	useEffect(() => {
		getPost(match.params.postId);
		return () => {
			store.dispatch({ type: "CLEAR_POST" });
		};
	}, [getPost, match.params.postId]);

	return postLoading || !post ? (
		<div className="loader-page">
			<MoonLoader loading={true} size={100} color="#00A3B8" />
		</div>
	) : (
		<div>
			<PostItem post={post} showControls={false} />
			<CommentForm postId={post._id!} />
			<div className="comments">
				{post.comments.map(comment => (
					<CommentItem key={uuid()} comment={comment} postId={post._id!} />
				))}
			</div>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	post: state.posts.post,
	postLoading: state.posts.loading,
});

export default withRouter(connect(mapStateToProps, { getPost })(Post));

interface PostProps extends RouteComponentProps<{ postId: string }> {
	getPost: (postId: string) => void;
	post: PostType | undefined;
	postLoading: boolean;
}
