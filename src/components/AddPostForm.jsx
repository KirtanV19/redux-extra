import { useState, useEffect } from 'react';
import { useAddPostMutation } from '../API/postapi';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [addPost, { isLoading, isError, isSuccess, error }] = useAddPostMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim()) {
            await addPost({ title, body: 'Xyz', userId: 1 });
            setTitle('');
        }
    };

    // Optional: Auto-hide success message after a few seconds
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => setTitle(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>

            {isSuccess && <p style={{ color: 'green' }}>Post added successfully!</p>}
            {isError && <p style={{ color: 'red' }}>{error?.data || 'Error occurred!'}</p>}
        </form>
    );
};

export default AddPostForm;
