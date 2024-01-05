import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';
import UpdateCategory from './components/Categories/UpdateCategory';
import UpdateComment from './components/Comments/UpdateComment';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar';
import AdminProtectRoute from './components/Navigation/ProtectedRoutes/AdminProtectRoute';
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute';
import CreatePost from './components/Posts/CreatePost';
import PostDetails from './components/Posts/PostDetails';
import PostsList from './components/Posts/PostsList';
import UpdatePost from './components/Posts/UpdatePost';
import AccountVerified from './components/Users/AccountVerification/AccountVerified';
import SendEmail from './components/Users/Emailing/SendEmail';
import Login from './components/Users/Login/Login';
import Profile from './components/Users/Profile/Profile';
import UpdateProfileForm from './components/Users/Profile/UpdateProfileForm';
import UploadProfilePhoto from './components/Users/Profile/UploadProfilePhoto';
import Register from './components/Users/Register/Register';
import UsersList from './components/Users/UsersList/UsersList';
import UpdatePassword from './components/Users/PasswordManagement/UpdatePassword';
import ResetPasswordForm from './components/Users/PasswordManagement/ResetPasswordForm';
import ResetPassword from './components/Users/PasswordManagement/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <>
          <Route
            path='/reset-password-token'
            element={
              <ResetPasswordForm />
            }
          />
          <Route
            path='/reset-password/:resetToken'
            element={
              <ResetPassword />
            }
          />
          <Route
            path='/add-category'
            element={
              <AdminProtectRoute>
                <AddNewCategory />
              </AdminProtectRoute>
            }
          />
          <Route
            path='/users'
            element={
              <AdminProtectRoute>
                <UsersList />
              </AdminProtectRoute>
            }
          />
          <Route
            path='/update-category/:id'
            element={
              <AdminProtectRoute>
                <UpdateCategory />
              </AdminProtectRoute>
            }
          />
          <Route
            path='/category-list'
            element={
              <AdminProtectRoute>
                <CategoryList />
              </AdminProtectRoute>
            }
          />

          <Route
            path='/verify-account/:token'
            element={
              <PrivateProtectRoute>
                <AccountVerified />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/update-password'
            element={
              <PrivateProtectRoute>
                <UpdatePassword />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/create-post'
            element={
              <PrivateProtectRoute>
                <CreatePost />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/update-post/:id'
            element={
              <PrivateProtectRoute>
                <UpdatePost />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/upload-profile-photo'
            element={
              <PrivateProtectRoute>
                <UploadProfilePhoto />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/send-email'
            element={
              <PrivateProtectRoute>
                <SendEmail />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/update-profile/:id'
            element={
              <PrivateProtectRoute>
                <UpdateProfileForm />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <PrivateProtectRoute>
                <Profile />
              </PrivateProtectRoute>
            }
          />
          <Route
            path='/update-comment/:id'
            element={
              <PrivateProtectRoute>
                <UpdateComment />
              </PrivateProtectRoute>
            }
          />

          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/posts' element={<PostsList />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<HomePage />} />
        </>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
