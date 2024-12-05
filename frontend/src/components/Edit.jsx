import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const API_URL = "/api/books";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { _id } = useParams();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/${_id}`);
        reset(res.data.data);
        setError(null);
      } catch (error) {
        setError("Lỗi không lấy được ");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [_id, reset]);
  const onSubmit = async (data) => {
    const { _id, updated_at, created_at, __v, ...updateData } = data;
    setIsLoading(true);
    try {
      await axios.put(`${API_URL}/${_id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Cập nhật thành công");
      nav("/");
      setError(null);
    } catch (error) {
      message.error("Cập nhật thất bại");
      setError("Cập nhật thất bại", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Edit</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error:{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", {
              required: "Không được bỏ trống trường title",
              minLength: {
                value: 6,
                message: "Tối thiểu 6 kí tự",
              },
            })}
          />
          {errors.title && (
            <span className="text-danger fw-bold">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            {...register("author", {
              required: "Không được bỏ trống trường author",
            })}
          />
          {errors.author && (
            <span className="text-danger fw-bold">{errors.author.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", {
              required: "Không được bỏ trống trường price",
            })}
          />
          {errors.price && (
            <span className="text-danger fw-bold">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            {...register("image", {
              required: "Không được bỏ trống trường image",
            })}
          />
          {errors.image && (
            <span className="text-danger fw-bold">{errors.image.message}</span>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
