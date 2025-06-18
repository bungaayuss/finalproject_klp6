import { Link, useNavigate } from "react-router-dom";
import "./../../../styles/header.css";
import { logout } from "../../../_services/auth";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("userInfo");
    }
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    document.querySelector(".btn-close")?.click();
  };
  

  return (
    <header className="navbar navbar-expand-lg bg-white fixed-top border-bottom shadow-sm">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fw-bold"
          style={{ color: "#014AB0" }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "60px", marginRight: "6px" }}
          />
          Event Pora
        </Link>

        {/* Burger (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="container-fluid px-4 d-none d-lg-flex justify-content-end align-items-center">
        <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link nav-link-custom">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link nav-link-custom">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/service" className="nav-link nav-link-custom">
              Service & Package
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link nav-link-custom">
              Contact
            </Link>
          </li>
        </ul>

        {token && userInfo ? (
          <>
            <Link
              to="/dashboard"
              className="btn"
              style={{
                backgroundColor: "#014AB0",
                color: "#fff",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              {userInfo.name}
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger fw-semibold px-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn"
              style={{
                backgroundColor: "#014AB0",
                color: "#fff",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn me-2"
              style={{
                border: "2px solid #014AB0",
                color: "#014AB0",
                backgroundColor: "transparent",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-end d-lg-none"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn text-start"
                onClick={() => handleNavigate("/")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn text-start"
                onClick={() => handleNavigate("/about")}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn text-start"
                onClick={() => handleNavigate("/service")}
              >
                Service & Package
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn text-start"
                onClick={() => handleNavigate("/contact")}
              >
                Contact
              </button>
            </li>

            {token && userInfo ? (
              <li className="nav-item mt-3">
                <button
                  className="btn w-100 mb-2"
                  style={{ backgroundColor: "#014AB0", color: "#fff" }}
                  onClick={() => handleNavigate("/dashboard")}
                >
                  {userInfo.name}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    document.querySelector(".btn-close")?.click();
                  }}
                  className="btn btn-danger fw-semibold w-100"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item mt-3">
                <button
                  className="btn w-100 mb-2"
                  style={{ backgroundColor: "#014AB0", color: "#fff" }}
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn w-100"
                  style={{
                    border: "2px solid #014AB0",
                    color: "#014AB0",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => handleNavigate("/register")}
                >
                  Register
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}