import { Link } from "react-router";
import { useAuth } from "../stores/authStore";
import { logout as firebaseLogOut } from "../lib/auth";

function Navbar({ title }) {
  const { user, logout } = useAuth((state) => state);

  const handleLogout = async () => {
    logout();
    await firebaseLogOut();
  };

  return (
    <>
      <nav className="bg-[#1C2127] py-5 px-8 fixed z-10 w-screen top-0">
        {/* <!-- Link Brand --> */}
        <div className="container flex items-center justify-between max-w-325 mx-auto">
          {/* For Navigation */}
          <div className="nav-wrapper flex items-center gap-27.5">
            <a href="/" className="text-3xl text-[#E4E7EB] font-bebas">
              {title}
            </a>

            {/* <!-- Navigations --> */}
            <div className="text-[#9CA3AF] flex gap-6 font-inter">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <Link to="/browse" className="hover:text-white">
                Browse
              </Link>
              <Link to="/watchlist" className="hover:text-white">
                Watchlist
              </Link>
              <Link to="/my-reviews" className="hover:text-white">
                My Reviews
              </Link>
            </div>
          </div>

          {/* <!-- User Profile and Login Dropdown --> */}
          <div className="user-profile flex items-center gap-4">
            {user ? (
              <div className="dropdown-end">
                <button
                  className="user-info flex items-center gap-2 cursor-pointer"
                  popoverTarget="popover-1"
                  style={{ anchorName: "--anchor-1" }}
                >
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                <ul
                  className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                  popover="auto"
                  id="popover-1"
                  style={
                    {
                      positionAnchor: "--anchor-1",
                    } /* as React.CSSProperties */
                  }
                >
                  <li>
                    {/* Logout Button */}
                    <button className="btn btn-error" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-warning bg-[#FF8000] hover:bg-amber-600 border-amber-600 rounded-md h-9 flex items-center font-inter font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="py-9.5"></div>
    </>
  );
}

export default Navbar;
