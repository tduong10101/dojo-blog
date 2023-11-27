import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [error,setError]=useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => {
        console.log(res);
        if(!res.ok) {
          throw Error(`could not fetch the data for the resource - ${res.status} - ${res.statusText}`)
        }
        return res.json();
      })
      .then((data => {
        setBlogs(data);
        setIsPending(false);
        setError(null)
      }))
      .catch(err => {
        setError(err.message)
      })
  }, []);
  return (
    <div className="home">
      { error && <div>{error}</div>}
      { !error && isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
      {/* <button onClick={() => setName('luigi')}>change name</button> */}
    </div>
  );
}

export default Home;