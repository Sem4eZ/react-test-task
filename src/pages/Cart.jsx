import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (item) => {
    const { color, size, id } = item;
    dispatch(removeItemFromCart({ color, size, id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  console.log(cartItems);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Ваша корзина</h2>
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center flex-col gap-5">
          <p className="text-center text-gray-500">Ваша корзина пуста.</p>
          <Link
            to={"/"}
            className="py-2 px-4 bg-indigo-200 rounded-lg hover:bg-indigo-300 border-2 border-indigo-300"
          >
            Вернуться на главную
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden relative"
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-3xl"
                  onClick={() => handleRemoveItem(item)}
                >
                  &#10005;
                </button>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-200 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-700 mb-2">Цвет: {item.color}</p>
                  <p className="text-gray-700 mb-2">Размер: {item.size}</p>
                  <p className="text-gray-700 mb-2">Цена: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
              onClick={handleClearCart}
            >
              Очистить корзину
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
