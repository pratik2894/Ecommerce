
import Home from "./components/Home";
import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8000/api/blog/";
function App() {

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  return (
    <div>
        <Home posts={post} ></Home>
    </div>
  );
}

export default App;
