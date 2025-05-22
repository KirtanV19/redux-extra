import Users from './components/Users'
import PostLists from './components/PostLists'
const App = () => {
  return (
    <div>
      <h1 className='text-base font-bold'>Posts</h1>
      <PostLists />
    </div>
  )
}

export default App