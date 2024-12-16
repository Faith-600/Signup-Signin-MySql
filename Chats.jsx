import { useContext } from 'react';
import { PostsContext} from '../../App';

function Chats() {
  const { posts } = useContext(PostsContext);


  // Check if posts is an array before rendering
  const renderPosts = () => {
    if (!posts || posts.length === 0) {
      return <p>No posts available</p>;
    }
    return Array.isArray(posts) && posts.map((post) => (
      <li key={post.id} className='tweet'>
       <p className='content'>{post.content}</p><small>By {post.username}</small>
      </li>
    ));
  };

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img
          alt="Logo"
          src="https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg"
          className="mx-auto h-12"
        />
        <figure className="mt-10">
          <div>
            <ul>
              {renderPosts()}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
}

export default Chats;
