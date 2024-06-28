import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Navigation from "../../../components/Navigation";
import {
    removeItemFx,
    useCart,
    CartItem,
    getCartFx,
    increaseProductQuantityFx,
    decreaseProductQuantityFx,
} from "../index";
import { Spin } from "antd";
import "../index";
import { getUserFx, useProfile } from "../../Profile";

interface CartItemType {
    id: number;
    user_id: number;
    img: string;
    title: string;
    description: string;
    price: number;
    count: number;
}

const CartList = () => {
    const [cart, cartLoading] = useCart();
    const [user, userLoading] = useProfile();

    const fetchUser = useUnit(getUserFx);
    const [groupedCart, setGroupedCart] = useState<CartItemType[]>([]);

    useEffect(() => {
        if (user) {
            getCartFx(+user.id);
        }
    }, [user]);

    useEffect(() => {
        if (cart.length > 0) {
            const grouped = cart.reduce((acc: CartItemType[], item) => {
                const found = acc.find((i) => i.id === item.id);
                if (found) {
                    found.count += 1;
                } else {
                    acc.push({ ...item, count: 1 });
                }
                return acc;
            }, []);
            setGroupedCart(grouped);
        }
    }, [cart]);

    const handleRemoveFromCart = (id: number) => {
        setGroupedCart((prev) => prev.filter((item) => item.id !== id));
        removeItemFx(id);
    };

    const handleIncreasecount = (id: number) => {
        increaseProductQuantityFx(id);
        setGroupedCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i))
        );
    };

    const handleDecreasecount = (id: number) => {
        decreaseProductQuantityFx(id);
        setGroupedCart((prev) =>
            prev.map((item) =>
                item.id === id && item.count > 1
                    ? { ...item, count: item.count - 1 }
                    : item
            )
        );
    };

    const totalItems = groupedCart.filter(
        (item) => user && item.user_id === +user.id
    );
    const totalPrice = totalItems.reduce(
        (total, item) => total + item.price * item.count,
        0
    );

    if (cartLoading || userLoading) {
        return (
            <div className="spin">
                <Spin />
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-md-8">
                {groupedCart.map(
                    (item, index) =>
                        user &&
                        +user.id === item.user_id && (
                            <CartItem
                                key={`${item.id}-${index}`}
                                {...item}
                                onRemove={() => handleRemoveFromCart(item.id)}
                                onIncrease={() => handleIncreasecount(item.id)}
                                onDecrease={() => handleDecreasecount(item.id)}
                            />
                        )
                )}
            </div>
            <div className="col-md-4">
                <div style={{ border: "1px solid black", padding: "10px" }}>
                    <h4>К покупке</h4>
                    <p>{totalItems.length} товара</p>
                    <h3>Итого</h3>
                    <h2>{totalPrice} руб</h2>
                    <button className="button" type="button">
                        Оплатить
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    return (
        <>
            <Navigation />
            <div className="container mt-4">
                <h2>Корзина</h2>
                <CartList />
            </div>
        </>
    );
};

export default Cart;
