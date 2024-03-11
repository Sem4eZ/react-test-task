import React, { useState, useEffect } from "react";
import { getProducts, getSizes } from "../services/api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Ошибка загрузки списка продуктов:", error);
      });

    getSizes()
      .then((sizes) => {
        setSizes(sizes);
      })
      .catch((error) => {
        console.error("Ошибка загрузки списка размеров:", error);
      });
  }, []);

  const getSizeLabel = (sizeId) => {
    const size = sizes.find((size) => size.id === sizeId);
    return size ? size.label : "Доступных размеров нет в наличии";
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold text-center my-8">
        Список товаров
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-6">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div>
              <h3 className="text-xl font-semibold mb-4 ml-4">
                {product.name}
              </h3>
              <div className="grid gap-4 grid-cols-1 p-4">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    {color.images && color.images.length > 0 && (
                      <img
                        src={color.images[0]}
                        alt={`Фотография ${product.name} ${color.name}`}
                        className="w-full h-auto mb-4"
                      />
                    )}
                    <p className="text-gray-700 mb-2">Доступные размеры:</p>
                    {color.sizes ? "" : <div>Размеров нет в наличии</div>}
                    <ul className="flex gap-2">
                      {color.sizes.map((sizeId) => (
                        <li key={sizeId} className="mb-2">
                          <span className="inline-block px-3 py-1 bg-gray-200 rounded-md">
                            {getSizeLabel(sizeId)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 mb-2">Цвет: {color.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
