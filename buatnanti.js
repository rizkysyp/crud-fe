import React, { useState } from "react";

const FormModal = () => {
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Sell Price:", sellPrice);
    console.log("Buy Price:", buyPrice);
    console.log("Photo:", photo);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75">
      <div className="m-auto max-w-sm bg-white p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="sellPrice"
            >
              Sell Price
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="sellPrice"
              type="number"
              value={sellPrice}
              onChange={(event) => setSellPrice(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="buyPrice"
            >
              Buy Price
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="buyPrice"
              type="number"
              value={buyPrice}
              onChange={(event) => setBuyPrice(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              id="photo"
              type="file"
              onChange={(event) => setPhoto(event.target.files[0])}
            />
          </div>
         
