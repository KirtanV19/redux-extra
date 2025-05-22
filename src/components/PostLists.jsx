import { useGetPostsQuery } from '../API/postapi';

const PostLists = () => {
    const { data: posts, isLoading, isError, error } = useGetPostsQuery();

    if (isLoading) return <p>Loading posts...</p>;
    if (isError) return <p style={{ color: 'red' }}>Error: {error?.status || 'Something went wrong'}</p>;

    return (
        <ul>
            {posts?.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default PostLists;
