# Task Management App

A modern, responsive task management application built with React and Material-UI. This application allows users to create, manage, and track their tasks with a clean and intuitive interface.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, read, update, and delete tasks
- **Responsive Design**: Built with Material-UI for a modern, mobile-friendly interface
- **Protected Routes**: Private routes ensure authenticated access to dashboard
- **Form Validation**: Robust form validation using Formik and Yup
- **Date Management**: Enhanced date handling with date-fns library
- **API Integration**: RESTful API communication with Axios

## 🛠️ Tech Stack

- **Frontend Framework**: React 17.0.2
- **UI Library**: Material-UI 4.12.3
- **Routing**: React Router DOM 5.2.0
- **HTTP Client**: Axios 0.21.1
- **Form Management**: Formik 2.2.9
- **Validation**: Yup 0.32.9
- **Date Utilities**: date-fns 2.23.0
- **Testing**: Jest, React Testing Library

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)

### ⚠️ Node.js Compatibility Note

If you're using Node.js 17+ and encounter OpenSSL errors, the project scripts have been configured with the `--openssl-legacy-provider` flag to ensure compatibility with the current React Scripts version.

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Task Management App/client"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### 🔑 Demo Login Credentials

Since this is a demo app with mock authentication, you can use any email and password combination to log in. For example:

- **Email**: `admin@test.com` (or any email format)
- **Password**: `password123` (or any password with 3+ characters)

**Note**: The app accepts any valid email format and password with at least 3 characters. You can also register a new account using the signup form.

## 📜 Available Scripts

### `npm start` or `npm run dev`
Runs the app in development mode. The page will reload when you make changes, and lint errors will appear in the console.

### `npm test`
Launches the test runner in interactive watch mode. See the [running tests documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes.

### `npm run eject`
⚠️ **Note: This is a one-way operation. Once you eject, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This will give you full control over the configuration files.

## 🏗️ Project Structure

```
client/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable React components
│   │   └── PrivateRoute.js
│   ├── contexts/          # React context providers
│   ├── pages/             # Page components
│   │   ├── Dashboard.js   # Main task dashboard
│   │   ├── Login.js       # User login page
│   │   └── Register.js    # User registration page
│   ├── services/          # API service functions
│   │   └── TaskService.js # Task-related API calls
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
├── package.json           # Project dependencies and scripts
└── README.md             # Project documentation
```

## 🔐 Authentication

The application includes a complete authentication system:

- **Registration**: New users can create accounts
- **Login**: Existing users can sign in securely
- **Protected Routes**: Dashboard and task features require authentication
- **Token-based Auth**: Uses JWT tokens for secure API communication

## 📱 User Interface

- **Material-UI Theme**: Custom theme with primary (#3f51b5) and secondary (#f50057) colors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Clean Layout**: Intuitive navigation and user-friendly interface
- **Form Validation**: Real-time validation feedback for better user experience

## 🔧 API Integration

The application communicates with a backend API for:

- User authentication (login/register)
- Task CRUD operations (Create, Read, Update, Delete)
- Secure token-based requests

API endpoints are configured to work with `/api/tasks` base URL.

## 🧪 Testing

The project includes comprehensive testing setup:

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **User Event Testing**: Simulated user interactions

Run tests with:
```bash
npm test
```

## 🚀 Deployment

To deploy the application:

1. **Build the production version**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your preferred hosting service (Netlify, Vercel, AWS S3, etc.)

For more deployment options, see the [Create React App deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

#### OpenSSL Error (Node.js 17+)
**Error**: `error:0308010C:digital envelope routines::unsupported`

**Solution**: This project is configured to handle this automatically, but if you still encounter issues:

1. **Use the configured scripts** (recommended):
   ```bash
   npm start  # Already includes --openssl-legacy-provider
   ```

2. **Alternative: Set environment variable globally**:
   ```bash
   # Windows (Command Prompt)
   set NODE_OPTIONS=--openssl-legacy-provider
   
   # Windows (PowerShell)
   $env:NODE_OPTIONS="--openssl-legacy-provider"
   
   # macOS/Linux
   export NODE_OPTIONS=--openssl-legacy-provider
   ```

3. **Long-term solution**: Upgrade to React Scripts 5+ when available

#### Other Common Issues

- **Port 3000 already in use**: Kill the process using port 3000 or use a different port
- **Module not found errors**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Build fails**: Check for any TypeScript errors or missing dependencies

### Getting Help

- Check the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- Review [React documentation](https://reactjs.org/)
- Browse [Material-UI documentation](https://material-ui.com/)

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.

---

**Happy Task Managing! 📝✅**#   T a s k - M a n a g a r  
 #   T a s k - M a n a g a r  
 