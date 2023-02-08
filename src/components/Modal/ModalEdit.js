import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const ModalEdit = ({ onClose }) => {
  const [id, setID] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [items, setItems] = useState();
  const [inputData, setInputData] = useState({
    name: null,
    sellprice: null,
    buyprice: null,
    stock: null,
  });

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    if (id) {
      setID(id);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({
        method: "GET",
        url: process.env.REACT_APP_BACKEND_API_HOST + `/products/detail/${id}`,
      });
      setItems(res.data.data[0]);
    };
    fetchData();
  }, [id]);

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
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("stock", inputData.stock);
    formData.append("sellprice", inputData.sellprice);
    formData.append("buyprice", inputData.buyprice);
    formData.append("photo", photo);
    console.log(formData);
    axios
      .put(
        process.env.REACT_APP_BACKEND_API_HOST + `/products/${id}`,
        formData
        // , {
        //   "content-type": "multipart/form-data",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )
      .then((res) => {
        localStorage.removeItem("id");
        Swal.fire("Success", "Edit Product Success", "success");
        window.location.reload();
      })
      .catch((err) => {
        console.log("edit data fail");
        console.log(err);
      });
  };

  const close = () => {
    localStorage.removeItem("id");
    onClose();
  };

  return (
    <div className="fixed top-1 left-0 right-0 bottom-0 bg-black bg-opacity-75 ">
      <div className="m-auto max-w-sm bg-white p-6">
        {items ? (
          <form onSubmit={postForm}>
            <div className="mb-4">
              <label
                className="block font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full border border-gray-400 p-2 bg-gray-300"
                name="name"
                type="text"
                value={inputData.name}
                placeholder={items.name}
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
                placeholder={items.buyprice}
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
                placeholder={items.sellprice}
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
                placeholder={items.stock}
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
              onClick={close}
            >
              Close
            </button>
          </form>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default ModalEdit;
