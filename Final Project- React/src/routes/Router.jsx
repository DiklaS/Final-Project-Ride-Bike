import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import ResponsiveAppBar from "../components/Navbar/ResponsiveAppBar";
import FavoritesPage from "../pages/FavoritesPage";
import CreateCardPage from "../pages/CreateCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import DetailedItemPage from "../pages/DetailedItemPage";
import SignupPage from "../pages/SignupPage";
import UsersTablePage from "../pages/UsersTablePage";
import ItemsPage from "../pages/ItemsPage";
import PasswordPage from "../pages/PasswordPage";
import ContactPage from "../pages/ContactPage";

//element={<ProtectedRoute element={<LogoutPage />} />}

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.TRY} element={<ResponsiveAppBar />} />
      <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
      <Route path={ROUTES.DETAILEDCARD} element={<DetailedItemPage />} />
      <Route path={ROUTES.LOGOUT} element={<ProtectedRoute element={<LogoutPage />} />}/>
      <Route path={ROUTES.EDITCARD} element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={<EditCardPage />}/>}/>
      <Route path={ROUTES.CARDLIKE} element={<ProtectedRoute element={<FavoritesPage />} />}/>
      <Route path={ROUTES.PROFILE} element={<ProtectedRoute element={<ProfilePage />} />}/>
      <Route path={ROUTES.CREATECARD} element={<SuperProtectedRoute isAdmin={true} element={<CreateCardPage/>}/>}/>
      <Route path={ROUTES.MYCARDS} element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={<MyCardsPage/>}/>}/>
      <Route path={ROUTES.CRM} element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={<UsersTablePage/>}/>}/>
      <Route path={ROUTES.RATING} element={<SuperProtectedRoute isAdmin={true} element={<ItemsPage/>}/>}/>
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage/>}/>
      <Route path={ROUTES.RESET_PASSWORD} element={<PasswordPage />} />
      <Route path="*" element={<h1>404</h1>} />
      
      {/* //<Route path="/reg" element={<REGPage/>}/> */}
    </Routes>
    
  );
};

export default Router;


//</Routes><Route path={ROUTES.BIZNUMBER} element={<SuperProtectedRoute isAdmin={true} isBiz={true} element={</>}/>}/></SuperProtectedRoute>