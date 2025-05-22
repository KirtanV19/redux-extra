import React from 'react'
import { useGetPostsQuery } from '../API/postapi'

const PostLists = () => {

    const { data: posts, isLoading, error } = useGetPostsQuery()
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts!</p>;

    return (
        <ul className='mt-2 p-2 border border-gray-400 bg-slate-300 w-2/5'>
            {posts.slice(0, 5).map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default PostLists