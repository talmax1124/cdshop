import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderNotes from "./screens/OrderNotes";
import fileUpload from "./screens/FileUpload";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import forgotPassword from "./screens/forgotPassword";
import TermsandConditions from "./screens/termsandconditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import WishList from "./screens/WishListScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import ShopByCategoryScreen from "./screens/ShopByCategory";
import ShopByBrandScreen from "./screens/ShopByBrandScreen";
import CurrentOffers from "./screens/CurrentCoupons";
import CreateCouponPage from "./screens/CreateCouponPage";
import CustomWork from "./screens/CustomWork";
import contactus from "./screens/contactus";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Route path="/" component={HomeScreen} exact />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/contactus" component={contactus} />
        <Route path="/forgotpassword" component={forgotPassword} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/ordernotes" component={OrderNotes} />
        <Route path="/fileupload" component={fileUpload} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/wishlist" component={WishList} />
        <Route path="/register" component={RegisterScreen} />

        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/currentoffers" component={CurrentOffers} />
        <Route path="/termsandconditions" component={TermsandConditions} />

        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <Route
          path="/verify/:token"
          component={EmailVerificationScreen}
          exact
        />
        <Route path="/admin/coupon" component={CreateCouponPage} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />

        <Route
          path="/products/category/:category"
          component={ShopByCategoryScreen}
        />
        <Route path="/products/brands/:brand" component={ShopByBrandScreen} />
        <Route path="/customwork" component={CustomWork} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/forgot-password" component={ForgotPasswordScreen} exact />
        <Route
          path="/reset-password/:id"
          component={ResetPasswordScreen}
          exact
        />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
