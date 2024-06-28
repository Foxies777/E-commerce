import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $cart, getCartFx } from "../index";
import { useProfile } from "../../Profile";

export const useCart = () => {
    const [cart, loading] = useUnit([$cart, getCartFx.pending]);
    const [user, userloading] = useProfile();
    useEffect(() => {
        if (user) {
            getCartFx(+user?.id);
        }
    }, []);

    return [cart, loading] as const;
};
