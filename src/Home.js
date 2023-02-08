import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAdd from "./components/Modal/ModalAdd";
import ModalEdit from "./components/Modal/ModalEdit";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const lastPage = Math.ceil(items.length / itemsPerPage);
  const navigate = useNavigate();
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const deleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(process.env.REACT_APP_BACKEND_API_HOST + `/products/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchData();
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete the data.", "error");
          });
      } else {
      }
    });
    fetchData();
  };

  const handleEdit = (id) => {
    localStorage.setItem("id", JSON.stringify(id));
    setModalEdit(true);
  };
  const fetchData = async () => {
    const token = localStorage.getItem("Token");
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_API_HOST + `/products?search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data.data;
    setItems(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);
  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };
  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });
  return (
    <div className="container mx-auto">
      <div className="justify-between flex mt-3">
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="container h-96 flex overflow-auto overflow-x-scroll mt-5">
        <table className="table-auto w-full text-center">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Photo</th>

              <th className="px-4 py-2">Sell</th>
              <th className="px-4 py-2">Buy</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 flex justify-center align-middle">
                  <img
                    src={item.photo}
                    style={{ width: "205px", height: "150px" }}
                  />
                </td>

                <td className="border px-4 py-2">
                  {currency.format(item.sellprice)}
                </td>
                <td className="border px-4 py-2">
                  {currency.format(item.buyprice)}
                </td>
                <td className="border px-4 py-2">{item.stock}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container flex justify-between mt-5 ml-2">
        <div></div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2  rounded"
            onClick={() => setModalAdd(true)}
          >
            Add
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {isModalAdd && <ModalAdd onClose={() => setModalAdd(false)} />}
      {isModalEdit && <ModalEdit onClose={() => setModalEdit(false)} />}
    </div>
  );
};

export default Home;
