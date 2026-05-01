import { navLinks } from "../constants";

const Navbar = () => {
  return (
    <header>
      <nav className="py-5">
        <img src="/logo.svg" alt="Apple Logo" title="Apple Logo" />

        <ul>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href="#">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex-center gap-3">
          <button>
            <img src="/search.svg" alt="Search" title="Search" />
          </button>
          <button>
            <img src="/cart.svg" alt="Cart" title="Cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
