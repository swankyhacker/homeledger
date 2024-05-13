import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Login,
  Signup,
  AddProperty,
  Catalogue,
  Listing,
  VerifySingpass,
} from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/landing",
      element: <Landing />,
    },
    {
      path: "/verify",
      element: <VerifySingpass />,
    },
    {
      path: "/addProperty",
      element: <AddProperty />,
    },
    {
      path: "/catalogue",
      element: <Catalogue />,
    },
    {
      path: "/listing",
      element: <Listing />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
