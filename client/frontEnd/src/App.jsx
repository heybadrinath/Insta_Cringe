import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import UserLogin from "./components/userLogin";
import AllRoutes from "./AlllRoutes";
import "./App.css";

function App() {
  const [cookies, setCookies] = useState({});
  const [authorized, setAuthorized] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const getCookies = () => {
      return document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
    };
    setCookies(getCookies());
  }, []);

  const authorize = () => {
    return cookies.userToken ? true : false;
  };

  const loginUser = async (token) => {
    setCookies({ userToken: token });
    setLogin(false);
    setAuthorized(true);
  };

  const logoutUser = () => {
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCookies({});
    setAuthorized(false);
  };

  useEffect(() => {
    setAuthorized(authorize());
  }, [cookies]);

  return (
    <BrowserRouter>
      <div className="home">
        <h1>Welcome To Insta Cringe</h1>
        <div>
          {authorized ? (
            <>
              <Link to="/post">
                <button>Post</button>
              </Link>
              <button onClick={logoutUser}>Logout</button>

            </>
          ) : (
            <button onClick={() => setLogin(true)}>Login</button>
          )}
        </div>
      </div>
      <p>
        Discover the ultimate collection of cringe-worthy Instagram bios all in
        one place. From the hilariously awkward to the downright bizarre, we've
        got it covered. Scroll through our curated list and prepare to laugh,
        cringe, and maybe even find some inspiration for your own bio. Join us
        in celebrating the quirks and eccentricities of Instagram bios on
        InstaCringeBio!
      </p>
      {login ? (
        <UserLogin login={loginUser} />
      ) : authorized ? (
        <AllRoutes />
      ) : (
        <h4>Log in to use the App</h4>
      )}
    </BrowserRouter>
  );
}

export default App;
