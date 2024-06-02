import Products from './pages/Products/Products'
import { ADDPRODUCT_ROUTE, BIN_ROUTE, LOGIN_ROUTE, PRODUSTS_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/const";
import Profile from "./pages/Profile/Profile";
import AddProduct from "./pages/AddProduct/AddProduct";
import Bin from "./pages/Bin/Bin";
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
        path: BIN_ROUTE,
        Component: Bin
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