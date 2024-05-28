import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { saveData } from "../store/postsSlice";
import { Link } from "react-router-dom";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const postsStatus = useSelector((state) => state.posts.status);
    const dispatch = useDispatch();
    const userPosts = useSelector((state) => state.posts.userPosts);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (postsStatus) {
            setPosts(userPosts.documents);
        } else {
            databaseService.getPosts([]).then((userPosts) => {
                if (userPosts) {
                    setPosts(userPosts.documents);
                    dispatch(saveData(userPosts));
                }
            });
        }
    }, []);

    let count = 0;
    posts.map((post) => {
        if (post.userId === userData.$id) count++;
    });

    if (count === 0) {
        return (
            <div className=" w-full py-8 my-36 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link to="/add-post">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Post your first Blog.
                                </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.toReversed().map(
                        (post) =>
                            post.userId === userData.$id && (
                                <div key={post.$id} className="p-2 sm:w-1/4 w-full">
                                    <PostCard {...post} />
                                </div>
                            )
                    )}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;
