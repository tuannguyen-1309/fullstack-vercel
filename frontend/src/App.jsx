import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import List from "./components/List";
import Add from "./components/Add";
import Edit from "./components/Edit";
// import "./App.css";

function App() {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element:<List/>,
    },
    {
      path: "add",
      element:<Add/>,
    },
    {
      path: "edit/:_id",
      element:<Edit/>,
    },
  ]);
  return (
    <div className="container">
      <header className="alert alert-success">Header</header>
      <RouterProvider router={routerConfig} />
      <footer className="alert alert-success">Footer</footer>
    </div>
  );
}

export default App;
