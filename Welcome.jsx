import { useState,useContext,useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserContext,PostsContext } from '../../App';


function Welcome() {
  const [newPost, setNewPost] = useState('');
  const [edit,setEdit] = useState(null);
  const [editContent,setEditContent] = useState('')

 const { username } = useContext(UserContext);
 const { posts, setPosts } = useContext(PostsContext);
 const [errorMessage, setErrorMessage] = useState("");
 const [avatarUrl, setAvatarUrl] = useState('');

 

axios.defaults.withCredentials = true;





const fetchItems = async () =>{
  try{
    const response = await axios.get('http://localhost:3001/posts');
    console.log(response.data.posts);
    // console.log(username)
  setPosts(response.data.posts)
  }
  catch(error){
     console.error('Error fetching posts:', error);
  }
};


useEffect(() => {
  
    fetchItems()
  },[]);


const handleSubmit = (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (!newPost.trim()) {
    console.error('Post content is empty.');
    return;
  }
  if (!username || username.toLowerCase() === 'guest') {
    setErrorMessage("You must be logged in to create a post. But you can check out other posts!");
      return;
  }
  
  axios
    .post('http://localhost:3001/posts', { content: newPost, username })
    .then((response) => {
      console.log(response.data);
      let {content,username,created_at,id}  =  response.data
      setPosts((prevPosts) => [...prevPosts, {content,username,created_at,id}]); // Add the new post
      setNewPost(''); // Clear the input
      fetchItems()
     
    })
    .catch((error) => {
      console.error('Error creating post:', error.response?.data || error.message);
    });
};

const handleEdit = (id, content) => {
  setEdit(id);
  setEditContent(content);
};

const handleUpdate = (id) => {
  axios
    .put(`http://localhost:3001/posts/${id}`, { content: editContent })
    .then((response) => {
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === id ? { ...p, content: editContent } : p
          )
        );
        setEdit(null);
        setEditContent('');
      } else {
        console.error('Failed to update post:', response.data.error);
      }
    })
    .catch((err) => console.error('Error updating post:', err));
};

const handleDelete = (id) => {
  axios
    .delete(`http://localhost:3001/posts/${id}`)
    .then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    })
    .catch((err) => {
      console.error('Error deleting post:', err);
    });
};
// Loading The Picture
useEffect(() => {
  if (username) {
    const url = `https://robohash.org/${username}`;
    setAvatarUrl(url);
  }
}, [username]);

  return (
  
    <div className="bg-white">
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
       <div className="max-w-2xl mx-auto" style={{ marginTop: '200px' }}>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Your message
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="What is on your mind ?..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
     
      ></textarea>
      <button
      type='button'
        onClick={handleSubmit}
       
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
      {errorMessage && (
            <p className="mt-2 text-red-500">{errorMessage}</p>
          )}
      </div>
      <div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 " />
        <div className="absolute inset-y-0 right-1/2 -z-10 " />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg"
            className="mx-auto h-12"
          />
          <figure className="mt-10">
            <blockquote>
              <div>
                 <ul>
           {posts &&
            posts.filter((p)=>p.username === username)
           .map((p) => (
            <li key={p.id} className='tweets'>
              {p.id === edit?(
                <>
                <textarea type ='text'
                 className="w-full p-2 border rounded"
                value={editContent}
                onChange={(e)=>setEditContent(e.target.value)} 
                rows='4'
                />
                <button onClick={()=>handleUpdate(p.id)}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                </>
              ):(
                <>
            <ul>
            <li key={p.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
         <p className="pcontent">{p.content}</p>
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
         <div className="mr-4">
            <img
              src={avatarUrl}
              alt="user Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-lg">{p.username}</p>
            <p className="text-sm text-gray-500">{new Date(p.created_at).toLocaleString()}</p>
          </div>
        </div>
         <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer mr-4 text-blue-500"
            onClick={() => handleEdit(p.id, p.content)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(p.id)}
          />
        </div>
      </div>
  </li>
  </ul>
   </>
              )}
           </li>
            ))}
           </ul>
           
              </div>
            </blockquote>
           </figure>
        </div>
      </section>
        </div>
         </div>
         
  </div>
)
}

  


export default Welcome
 

 
