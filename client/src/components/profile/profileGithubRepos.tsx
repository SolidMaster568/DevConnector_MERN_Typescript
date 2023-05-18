import React, {useEffect} from "react";
import {connect} from "react-redux";
import {GithubRepoType} from "../../global.types";
import {getGithubRepos} from "../../store/actions/profile";
import {AppState} from "../../store/configureStore";

function ProfileGithubRepos({
                                username,
                                repos,
                                getGithubRepos,
                            }: ProfileGithubReposProps) {
    useEffect(() => getGithubRepos(username), [getGithubRepos, username]);
    return (
        <div className="mt-4 mt-md-0">
            <h1 className="text-dark border-bottom border-dark">Github Repos</h1>
            <div className="row">
                {repos.map(repo => (
                    <div key={repo.id} className="col-12 col-md-4 p-1 p-md-2">
                        <div className="card bg-dark text-white">
                            <div style={{transform: "rotate(0)"}}>
                                <h4 className="card-header d-flex justify-content-center">
                                    {repo.name}
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                       className="stretched-link"/>
                                </h4>
                            </div>
                            <div className="card-body">
                                <p>{repo.description}</p>
                                <div className="row justify-content-center">
                                    <p className="badge badge-primary mx-2">
                                        Stars: {repo.stargazers_count}
                                    </p>
                                    <p className="badge badge-info mx-2">
                                        Watchers: {repo.watchers_count}
                                    </p>
                                    <p className="badge badge-light mx-2">Forks: {repo.forks_count}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithubRepos);

interface ProfileGithubReposProps {
    username: string;
    repos: GithubRepoType[];
    getGithubRepos: (username: string) => void;
}
