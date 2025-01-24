Signup-Signin-MySQL Project
This is a full-stack application built using React for the frontend and Express with MySQL for the backend. The project features user authentication, e-commerce functionality, the ability to comment on posts, a simple chat app, and a direct login feature for Guest Users with specific restrictions.

Features
User Authentication:
Sign Up: Users can create an account with a username, email, and password.
Passwords are validated for complexity (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character).
The backend ensures unique email addresses and validates the name (alphabetic characters only, 2-50 characters).
Sign In: Registered users can log in with their email and password. Upon successful authentication, users are redirected to the Welcome page.
Direct Login: Users can log in directly without signing up, using predefined credentials. Restrictions are applied to prevent unauthorized access to specific features. For instance, users who log in directly may have limited.
Welcome Page: Once logged in, users are greeted by name on the Welcome page. This page is only accessible to authenticated users.
Logout: Users can log out, which clears the session and redirects to the Sign-In page.
New Features
Commenting on Posts:
Users can leave comments on posts, allowing interaction with the content.
Comments are stored in the MySQL database, associated with the user and the post.
E-commerce Functionality:
Users can browse products, add them to the cart, and proceed to checkout.
Redux is used for state management across the cart.
Users can remove items from the cart and view the total price.
Chat App:
A real-time chat app that allows users to communicate instantly with each other.
Built with Socket.IO, users can send and receive messages in real-time.
