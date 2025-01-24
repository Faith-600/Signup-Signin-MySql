import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { PostsContext, UserContext } from '../../App';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {username,setUsername} = useContext(UserContext)
   const {posts,setPosts} =useContext(PostsContext)
  

    const handleLogout = () => {
      axios
        .post('http://localhost:3001/logout')
        .then((res) => {
          if (res.status === 200) {
            setUsername(null);  
            sessionStorage.clear(); 
            setPosts([])
            navigate('/'); 
          }
        })
        .catch((err) => console.error(err));
    };
    
  
  const navigation = [
    { name: 'Thoughts', href: '/thoughts' },
    { name: 'Message', href: '/message' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'About', href: '/about' },
  ];

  //  UNIQUE USER COLOR
  const getUserColor = (username) => {
    if (!username) return "#4A5568"; // Default color for "Guest"
    const hash = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#E53E3E", "#3182CE", "#48BB78", "#D69E2E", "#805AD5"];
    return colors[hash % colors.length];
  };


  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="absolute top-0 right-0 p-4">
        <span className="text-lg font-semibold text-gray-700"
         style={{ color: getUserColor(username) }}>
          Welcome,{username?.charAt(0)?.toUpperCase() + username?.slice(1)}!
        </span>
      </div>
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996"
              alt="Blue Waves Logo"
              className="h-20"
            />
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="hidden lg:flex lg:flex-1 lg:justify-end text-sm font-semibold text-red-400"
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company Logo"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <button
                onClick={handleLogout}
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
