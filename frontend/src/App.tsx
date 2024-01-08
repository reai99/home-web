import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Login';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound/>,
    element: <Login/>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} err/>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default App;
