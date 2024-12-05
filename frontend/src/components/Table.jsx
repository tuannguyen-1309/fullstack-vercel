import { Link } from "react-router-dom";

const Table = ({ books, onDelete }) => {
  return (
    <table className="table table-hover table-fixed">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td>{index+1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td><img src={book.image} width={100} height={100} alt="" /></td>
            <td>
              <Link to={`edit/${book._id}`} className="btn btn-warning">
                Edit
              </Link>
              <button
                onClick={() => onDelete(book._id)}
                className="btn btn-danger ms-3"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
