import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getSize } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeLabels, setSizeLabels] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    getProduct(parseInt(id))
      .then((productData) => {
        setProduct(productData);
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0].id);
          setSelectedSize(productData.colors[0].sizes[0]);
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки товара:", error);
      });
  }, [id]);

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const selectedColorObj = product.colors.find(
        (color) => color.id === selectedColor
      );

      setSelectedPrice(selectedColorObj.price);
      setSelectedDescription(selectedColorObj.description);
    } else if (product) {
      const defaultColor = product.colors[2];
      setSelectedPrice(defaultColor.price);
      setSelectedDescription(defaultColor.description);
    }
  }, [product, selectedColor, selectedSize]);

  useEffect(() => {
    if (selectedColor && product) {
      const color = product.colors.find((color) => color.id === selectedColor);
      Promise.all(color.sizes.map((sizeId) => getSizeLabel(sizeId)))
        .then((labels) => setSizeLabels(labels))
        .catch((error) => console.error("Ошибка загрузки размеров:", error));
    }
  }, [selectedColor, product]);

  const getSizeLabel = async (sizeId) => {
    try {
      const size = await getSize(sizeId);
      return `${size.label} (${size.number})`;
    } catch (error) {
      console.error("Ошибка загрузки размера:", error);
      return "";
    }
  };

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    setSelectedSize(
      product.colors.find((color) => color.id === colorId).sizes[0]
    );
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
    updatePrice(selectedColor, sizeId);
  };

  const updatePrice = (colorId, sizeId) => {
    const selectedColorObj = product.colors.find(
      (color) => color.id === colorId
    );
    const selectedSizeObj = selectedColorObj.sizes.find(
      (size) => size === sizeId
    );

    if (selectedColorObj && selectedSizeObj) {
      setSelectedPrice(selectedColorObj.price);
      setSelectedDescription(selectedColorObj.description);
    } else {
      setSelectedPrice(null);
      setSelectedDescription(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {product && (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-200 text-gray-700 text-lg px-6 py-4">
            {product.name}
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">Цена: {selectedPrice}</p>
            <p className="text-gray-700 text-base">
              Описание: {selectedDescription}
            </p>
          </div>
          <div className="flex w-full pt-4 pb-2 px-3 ">
            {product.colors.map((color) => (
              <button
                key={color.id}
                className={` w-full h-8  rounded-full focus:outline-none focus:shadow-outline ${
                  selectedColor === color.id
                    ? "border-2 border-indigo-500"
                    : "border-2 border-transparent"
                }`}
                style={{ backgroundColor: color.name }}
                onClick={() => handleColorChange(color.id)}
              >
                {color.name}
              </button>
            ))}
          </div>
          <div className="flex justify-center px-6 pb-4 ">
            {sizeLabels.map((sizeLabel, index) => (
              <button
                key={index}
                className={`mx-1 px-4 py-2 rounded-full focus:outline-none focus:shadow-outline ${
                  selectedSize === sizeLabel
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSizeChange(sizeLabel)}
              >
                {sizeLabel}
              </button>
            ))}
          </div>
          {selectedSize ? (
            ""
          ) : (
            <div className="flex justify-center mb-3">Нет в наличии</div>
          )}
          <div className="flex justify-center pb-4">
            {selectedColor &&
              product.colors
                .find((color) => color.id === selectedColor)
                .images.map((image, index) => (
                  <img
                    key={index}
                    className="w-32 h-auto"
                    src={image}
                    alt={`Product ${index}`}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
