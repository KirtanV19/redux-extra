import { useState } from 'react'
import { useAddPostMutation } from '../API/postapi'

const AddPostForm = () => {

    const [title, setTitle] = useState('');
    const [addPost, { isError, error, isLoading }] = useAddPostMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title) {
            await addPost({ title, body: 'Xyz', userId: 1 })
            setTitle('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Post Title' />
            <button type='submit' disabled={isLoading}>Submit</button>
            {isError && <p style={{ color: 'red' }}>{error?.data}</p>}
        </form>
    )
}

export default AddPostForm