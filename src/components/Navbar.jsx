import { Link } from "react-router";

function Navbar({ title }) {
  return (
    <>
      <nav className="bg-[#1C2127] py-5 px-8 fixed z-10 w-screen top-0">
        {/* <!-- Link Brand --> */}
        <div className="container flex items-center gap-27.5 max-w-325 mx-auto">
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
      </nav>
      <div className="py-9.5"></div>
    </>
  );
}

export default Navbar;
