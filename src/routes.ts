import Products from './pages/Products/ui/Products'
import Profile from "./pages/Profile/ui/Profile";
import AddProduct from "./pages/AddProduct/ui/AddProduct";
import Cart from "./pages/Cart/ui/Cart";
import Registration from "./pages/sign-up/ui/SignUp";
import Auth from './pages/sign-in/ui/SignIn';
import { ERoutes } from './utils/const';

export const authRoutes = [
    {
        path: ERoutes.PRODUSTS,
        Component: Products,
    },
    {
        path: ERoutes.PROFILE,
        Component: Profile
    },
    {
        path: ERoutes.ADDPRODUCT,
        Component: AddProduct
    },
    {
        path: ERoutes.CART,
        Component: Cart
    }
]
export const publicRoutes = [
    {
        path: ERoutes.LOGIN,
        Component: Auth,
    }, {
        path: ERoutes.REGISTRATION,
        Component: Registration,
    },
]
