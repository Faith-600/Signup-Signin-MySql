Signup-Signin-MySQL Project
This project is a simple user authentication application built using React for the frontend and Express with MySQL for the backend. It allows users to register, sign in, and be welcomed upon successful authentication. The backend manages user data, validation, and session handling.

Features

Sign Up
The Sign-Up page allows new users to create an account by entering a username, email, and password.
The backend validates the name to ensure it contains only alphabetic characters and is 2-50 characters long.
Passwords must meet complexity requirements (8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character).
Duplicate email addresses are not allowed.
Successful sign-up stores user information in the MySQL database.

Sign In
The Sign-In page allows registered users to log in by entering their email and password.
Upon login, the backend verifies the credentials and creates a session.
Successful login redirects users to the Welcome page.
Invalid credentials display an error message.

Welcome Page
Once logged in, the user is greeted by name on the Welcome page.
The Welcome page is restricted to logged-in users only.
If the user navigates directly to the Welcome page without being logged in, they are redirected to the Sign-In page.

Logout
Users can log out from the Welcome page.
Logging out clears the session and redirects the user to the Sign-In page.
