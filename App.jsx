import React,{useState,useEffect} from 'react'
import Welcome from './assets/Components/Welcome'
import Signup from './assets/Components/Signup'
import './index.css';
import{Route,RouterProvider,createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import SignIn from './assets/Components/SignIn';
import Error from './assets/Components/Error';
import Chats from './assets/Components/Chats';
import Layout from './assets/Components/Layout';
import axios from 'axios';

export const UserContext = React.createContext()
export const PostsContext = React.createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((res) => {
        if (res.data.valid) {
          setUsername(res.data.name);
        } 
      })
      .catch((err) => console.error(err));
  }, []);
  

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
   
    <Route index element={<SignIn/>}/>
    <Route path='/login' element={<Signup/>}/> 

    <Route element={<Layout posts={posts} setPosts={setPosts} />}> 
   <Route path='/welcome' element={
    <Welcome posts={posts} setPosts={setPosts}/>}/> 
    <Route path='/thoughts' element={<Chats posts={posts} />}/>
    </Route>
   <Route path='*' element={<Error/>}/> 
   
  </>
 )
)



  return (
    <>
  
    <UserContext.Provider value={{username,setUsername}}>
    <PostsContext.Provider value={{ posts, setPosts }}>
      <RouterProvider router={router}/>
     </PostsContext.Provider>
       </UserContext.Provider>
     </> 

  )
}

export default App