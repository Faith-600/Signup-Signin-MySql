import React,{useEffect}from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Layout({posts,setPosts}) {
 const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => {
        if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts); // Update posts state only if it's an array
        } else {
          console.error('Posts data is not an array:', res.data.posts);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
          <Header/>
     <Outlet/>
    </div>
  );
}

export default Layout;
