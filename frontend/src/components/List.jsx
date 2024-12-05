import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import { ErrorMessage, Loading } from "./StatusComponent";
import axios from "axios";
import { message } from "antd";
const List = () => {
  const API_URL = "/api/books";

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL);
        setBooks(res.data.data);
        setError(null);
      } catch (error) {
        setError("Lỗi không lấy được ");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`);
        setBooks(books.filter((item) => item._id !== id));
        message.success("Xóa thành công");
      } catch (err) {
        message.error("Xóa thất bại");
        setError("Xóa lỗi");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1>List</h1>
      <Link to="add" className="btn btn-primary mb-3">
        Add
      </Link>
      <Table books={books} onDelete={handleDelete} />
    </div>
  );
};

export default List;
