import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const BlogDetails = () => {

  const {id}= useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:5000/blogs/'+id);
  const history = useHistory();
  const handleClick = () => {
    fetch('http://localhost:5000/blogs/'+blog.id, {
      method: 'DELETE'
    }).then(()=>{
      history.push('/');
    })
  }
  return ( 
    <div className="blog-details">
      { isPending && <div>Loading ...</div> }
      { error && <div>Error: { error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Writen by: { blog.author }</p>
          <div> { blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      ) }
    </div>
  );
}

export default BlogDetails;