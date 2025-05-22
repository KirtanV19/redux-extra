import { useGetPostsQuery, useDeletePostMutation } from "../API/postapi";

const PostLists = () => {
    const { data: posts, isLoading, isError, error } = useGetPostsQuery();
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

    if (isLoading) return <p>Loading posts...</p>;
    if (isError)
        return (
            <p style={{ color: "red" }}>
                Error: {error?.status || "Something went wrong"}
            </p>
        );

    const handleDelete = async (id) => {
        if (window.confirm("are you sure?")) {
            await deletePost(id);
        }
    };

    return (
        <ul>
            {posts?.map((post) => (
                <li key={post.id} style={{ marginBottom: "0.5rem" }}>
                    {post.title}
                    <button
                        onClick={() => handleDelete(post.id)}
                        disabled={isDeleting}
                        style={{ marginLeft: "1rem", color: "red" }}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default PostLists;
