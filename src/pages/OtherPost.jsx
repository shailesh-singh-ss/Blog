import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveData } from '../store/postsSlice'
import databaseService from '../appwrite/config'
import { Container, PostCard } from '../components'

function OtherPost() {
    const [posts, setPosts] = useState([]);
    const { Id, name} = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const postsStatus = useSelector((state) => state.posts.status);
    const dispatch = useDispatch();
    const userPosts = useSelector((state) => state.posts.userPosts);

    useEffect(() => {
        if (Id) {
            setUserId(Id);
        } else {
            navigate("/");
        }
    }, [Id, navigate]);

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

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            ~{name}'s Blogs.
                        </h1>
                    </div>
                </div>
            </Container>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.toReversed().map((post) => ((post.userId === userId && post.status === "active") &&
                        <div key={post.$id} className='p-2 sm:w-1/4 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default OtherPost;
