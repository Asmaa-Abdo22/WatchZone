import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbarr from "./components/Navbar/Navbarr";
import LayOut from "./components/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";

export default function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        { index: true, element: <Home /> },
        { path: "/video/:categoryId/:videoId", element: <Video /> },
      ],
    },
    {
      path: "*",
      element: (
        <h1 className="text-red-600 font-bold my-4 m-auto w-50">
          404, Page Not Found
        </h1>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}
