import Products from './pages/Products/Products'
import { ADDPRODUCT_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUSTS_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/const";
import Profile from "./pages/Profile/Profile";
import AddProduct from "./pages/AddProduct/AddProduct";
import Cart from "./pages/Cart/Cart";
import Registration from "./pages/sign-up/SignUp";
import Auth from './pages/sign-in/SignIn';
// import { sample } from "effector";
// import { appStarted } from "./shared/config/init";
// import { createBrowserHistory } from "history";


export const authRoutes = [
    {
        path: PRODUSTS_ROUTE,
        Component: Products,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: ADDPRODUCT_ROUTE,
        Component: AddProduct
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    }, {
        path: REGISTRATION_ROUTE,
        Component: Registration,
    },
]

// export const history = createHistoryRouter

// sample({
//     clock: appStarted,
//     fn: () => createBrowserHistory(),
//     target: 
// })