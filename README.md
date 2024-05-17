# Blog Project

A blogging platform built with React and Appwrite, allowing users to create an account, log in, view, and post blogs.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign Up, Log In, Log Out)
- Create, Read, Update, and Delete (CRUD) operations for blogs
- Responsive design for seamless user experience on different devices

## Technologies Used

- **ViteReact**: Frontend library for building user interfaces
- **Appwrite**: Backend as a service for user authentication and database management
- **TailwindCSS**: Styling the application
- **React Router**: Navigation within the application

## Setup and Installation

### Prerequisites

- Node.js installed on your local machine
- An Appwrite instance (you can set up a local instance or use a hosted version)

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/blog.git](https://github.com/shailesh-singh-ss/Blog.git)
   cd blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Appwrite:**

   - Create a project in Appwrite
   - Set up the authentication and database services
   - Get your project ID, endpoint, and API key

4. **Configure environment variables:**

   Create a `.env` file in the root of your project and add your Appwrite configuration:

   ```env
   VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
    VITE_APPWRITE_PROJECT_ID=""
    VITE_APPWRITE_DATABASE_ID=""
    VITE_APPWRITE_COLLECTION_ID=""
    VITE_APPWRITE_BUCKET_ID=""
    VITE_TINYMCE_API_KEY=""
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`.

## Usage

- **Sign Up**: Create a new account
- **Log In**: Access your account
- **Create a Blog**: Share your thoughts by creating a new blog post
- **View Blogs**: Read blogs posted by others
- **Update and Delete**: Manage your blog posts

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License .
