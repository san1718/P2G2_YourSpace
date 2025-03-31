# YourSpace

YourSpace is an innovative and interactive social media platform built to foster meaningful connections in a community-driven environment. Designed with a polished UI and seamless user experience, YourSpace enables users to create personalized profiles, share posts, and interact with others through likes, comments, and real-time engagement. 
It is a full-stack application deployed on Render and designed using the latest technologies, following the MVC paradigm for scalability and maintainability.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Requirements Fulfilled](#project-requirements-fulfilled)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Overview

YourSpace provides a secure and interactive platform for users to connect and engage with others through posts, likes, and comments. Built with scalability and responsiveness in mind, YourSpace offers a polished user experience on devices of all screen sizes.

## Features

- **User Authentication**: Secure login and signup functionality using `express-session` and `bcrypt` for password encryption.
- **Profile Management**: Users can create, update, and personalize their profiles, including uploading profile pictures with Multer.
- **Posting**: Users can create, view, and delete posts in real-time, with seamless integration of media uploads.
- **Likes**: Foster positive engagement by liking posts.
- **User Search**: Search and connect with other users via a responsive search feature.
- **Comments**: A working threaded comment system for user discussions.
- **Responsive Design**: A user-friendly interface adaptable to various screen sizes.
- **Protected API**: Secure API keys and sensitive data managed via environment variables.

## Technologies Used

### Frontend

- **Handlebars.js**: For templating and dynamic rendering.
- **JavaScript**: Handles UI interactivity and client-side logic.
- **CSS**: Ensures a responsive and polished design.

### Backend

- **Node.js**: Handles server-side logic and API requests.
- **Express.js**: Framework for routing and middleware.
- **PostgreSQL**: Relational database for structured data storage.
- **Sequelize**: ORM for database interactions.
- **Multer**: Middleware for secure media file uploads.

### Authentication

- **express-session**: Session management.
- **bcrypt**: Password hashing and security.

### Deployment

- **Render**: Hosting for the live application and database.

## Project Requirements Fulfilled

- **Node.js and Express.js**: RESTful API with GET and POST routes.
- **Handlebars.js**: Dynamic and responsive templating engine.
- **PostgreSQL and Sequelize**: Relational database with ORM for efficient data management.
- **Authentication**: Secure login system using `express-session` and cookies.
- **New Technology**: Integration of Multer for secure media file uploads.
- **MVC Structure**: Organized folder structure ensuring scalability.
- **Responsive and Polished UI**: Clean, user-friendly, and device-adaptive interface.
- **Deployment**: Fully functional and error-free deployment on Render.

## Future Enhancements

- **Real-Time Messaging**: Enable live chat functionality for direct user interaction.
- **Notifications**: Activity alerts for likes, comments, and new connections.
- **Dark Mode**: Improve usability with a dark theme toggle.
- **Marketplace**: Build a platform for buying, selling, or trading within the community.
- **Advanced Commenting**: Enhance the comment system with editing, deleting, and nested replies.
- **Geolocation Matching**: Match users based on their location.

## Screenshots

![YourSpace Screenshot](./public/images/demoSS.png)

## Usage

- **GitHub Repository**: [View](https://github.com/san1718/project2)
- **Live Website**: [View](https://yourspace-4rjs.onrender.com)

## Credits

The project is a collaborative effort by:

[![Art Camacho](https://img.shields.io/badge/Art%20Camacho-Visit%20GitHub-green?logo=github)](https://github.com/ArtCamacho)
[![Nancy Touma](https://img.shields.io/badge/Nancy%20Touma-Visit%20GitHub-green?logo=github)](https://github.com/ntouma513)
[![Maritza Diaz](https://img.shields.io/badge/Maritza%20Diaz-Visit%20GitHub-green?logo=github)](https://github.com/maritzadiaz77)
[![Brock Altug](https://img.shields.io/badge/Brock%20Altug-Visit%20GitHub-green?logo=github)](https://github.com/BrockAltug)
[![Sung Min An](https://img.shields.io/badge/Sung%20Min%20An-Visit%20GitHub-green?logo=github)](https://github.com/san1718)

## Additional Resources and References

[![Multer Documentation](https://img.shields.io/badge/Multer-Documentation-blue)](https://expressjs.com/en/resources/middleware/multer.html)
[![LogRocket Tutorials](https://img.shields.io/badge/LogRocket-Tutorials-blue)](https://blog.logrocket.com)
[![MDN Documentation](https://img.shields.io/badge/MDN-Documentation-blue)](https://developer.mozilla.org)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-Resource-blue)](https://stackoverflow.com)

## License

![No License](https://img.shields.io/badge/license-none-red)