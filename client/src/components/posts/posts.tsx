import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostItem from "./post-item";
import { getPosts } from "../../store/actions/posts";
import { AppState } from "../../store/configureStore";
import { PostType } from "../../global.types";
import { MoonLoader } from "react-spinners";
import {} from "../../store/actions/action.types";
import PostForm from "./post-form";

function Posts({ getPosts, posts, postsLoading }: PostsProps) {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<h1 className="text-secondary border-bottom border-secondary mb-3">
						Timeline
					</h1>
					<PostForm />
					{postsLoading ? (
						<div className="loader-page">
							<MoonLoader loading={true} size={100} color="#00A3B8" />
						</div>
					) : (
						<div>
							{posts.map(post => (
								<PostItem key={post._id} post={post} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	posts: state.posts.posts,
	postsLoading: state.posts.loading,
});

export default connect(mapStateToProps, { getPosts })(Posts);

interface PostsProps {
	getPosts: VoidFunction;
	posts: PostType[];
	postsLoading: boolean;
}
