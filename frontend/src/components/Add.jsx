import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const API_URL = "/api/books";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Thêm thành công");
      nav("/");
      setError(null);
    } catch (error) {
      message.error("Thêm thất bại");
      setError("Thêm thất bại", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Add</h1>
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
            type="text"
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

export default Add;
