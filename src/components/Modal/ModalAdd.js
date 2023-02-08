import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalAdd = ({ onClose }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [id, setID] = useState(null);
  const [inputData, setInputData] = useState({
    sellprice: "",
    buyprice: "",
    stock: "",
  });

  useEffect(() => {
    let randomName = "";
    for (let i = 0; i < 4; i++) {
      randomName += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    randomName += "-";
    for (let i = 0; i < 4; i++) {
      randomName += Math.floor(Math.random() * 10);
    }

    setName(randomName);
  }, []);

  const handlePhoto = (e) => {
    const size = 100000;
    const file = e.target.files[0];

    if (
      !file.type.startsWith("image/jpeg") &&
      !file.type.startsWith("image/png")
    ) {
      Swal.fire("Failed", "Only JPG and PNG files are allowed", "error");
      e.target.value = "";
      return;
    }

    if (file.size > size) {
      Swal.fire("Failed", "File Exceed 100KB", "error");
      e.target.value = "";
      return;
    }

    setPhoto(file);
    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const postForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", inputData.stock);
    formData.append("sellprice", inputData.sellprice);
    formData.append("buyprice", inputData.buyprice);
    formData.append("photo", photo);
    console.log(formData);
    axios
      .post(process.env.REACT_APP_BACKEND_API_HOST + "/products", formData, {
        "content-type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("input data success");
        Swal.fire("Success", "Input Product Success", "success");
        window.location.reload();
      })
      .catch((err) => {
        console.log("input data fail");
        console.log(err);
      });
  };

  return (
    <div className="fixed top-1 left-0 right-0 bottom-0 bg-black bg-opacity-75 ">
      <div className="m-auto max-w-sm bg-white p-6">
        <form onSubmit={postForm}>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="buyprice"
            >
              BuyPrice
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              name="buyprice"
              type="number"
              value={inputData.buyprice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="sellprice"
            >
              Sellprice
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              name="sellprice"
              type="number"
              value={inputData.sellprice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              Stock
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              name="stock"
              type="number"
              value={inputData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="photo"
            >
              Photo (Max Size 100KB)
            </label>
            <input
              className="w-full border border-gray-400 p-2"
              name="photo"
              accept="image/*"
              type="file"
              onChange={handlePhoto}
            />
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 text-end"
            onClick={onClose}
          >
            Clode
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
