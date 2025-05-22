import PostLists from "./components/PostLists";
import AddPostForm from "./components/AddPostForm";

const App = () => {
  return (
    <div>
      <h1 className="text-base font-bold">Posts</h1>
      <PostLists />
      <AddPostForm />
    </div>
  );
};

export default App;
