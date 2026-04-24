import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { CartContext } from "../context/CartContext";

const CartIcon = ({ isCartActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-7 h-7 transition-colors cursor-pointer ${
      isCartActive
        ? "text-[#CAFC00] drop-shadow-[0_0_12px_#CAFC00]"
        : "text-white hover:text-[#CAFC00]"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState("#inicio");

  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const navLinks = [
    { name: "Inicio", to: "/#inicio", id: "inicio" },
    { name: "Productos", to: "/#productos", id: "productos" },
    { name: "Sobre Nosotros", to: "/#sobre-nosotros", id: "sobre-nosotros" },
    { name: "Contacto", to: "/#contacto", id: "contacto" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -64;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    let observer;
    let retryCount = 0;
    const maxRetries = 50;

    const connectObserver = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const foundAny = sections.some((el) => el !== null);

      if (!foundAny) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(connectObserver, 100);
        }
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: "-120px 0px -40% 0px",
        threshold: 0,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach((el) => {
        if (el) observer.observe(el);
      });
    };

    connectObserver();

    return () => {
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const checkIsActive = (link) => {
    const { pathname } = location;
    if (pathname === "/") return activeHash === `#${link.id}`;
    return false;
  };

  const isCarritoPage = location.pathname === "/carrito";

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5 h-24 flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 flex items-center justify-start">
            <HashLink
              smooth
              to="/#inicio"
              scroll={scrollWithOffset}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src="/imagenes/otros/logo.jpeg"
                className="w-15 h-15 object-contain"
                alt="Swish Logo"
              />
              <span className="font-strasua text-3xl text-white tracking-widest group-hover:text-[#CAFC00] transition-colors">
                SWISH
              </span>
            </HashLink>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => {
              const isActive = !isCarritoPage && checkIsActive(link);

              return (
                <HashLink
                  key={link.name}
                  smooth
                  to={link.to}
                  scroll={scrollWithOffset}
                  className={`text-sm font-octosquares tracking-wide transition-all duration-300 relative py-1 group ${
                    isActive
                      ? "font-bold text-[#CAFC00] drop-shadow-[0_0_12px_#CAFC00]"
                      : "text-white hover:text-[#CAFC00]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#CAFC00] transition-transform duration-300 ease-out 
                    ${
                      isActive
                        ? "w-full scale-x-100"
                        : "w-full scale-x-0 origin-left group-hover:scale-x-100"
                    }`}
                  />
                </HashLink>
              );
            })}
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <div className="relative cursor-pointer hover:scale-110 transition-transform flex items-center">
              <Link
                to="/carrito"
                aria-label="Ir al carrito"
                className="relative"
              >
                <CartIcon isCartActive={isCarritoPage} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#CAFC00] text-black text-xs font-black font-octosquares rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_10px_rgba(202,252,0,0.5)]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none text-white hover:text-[#CAFC00] transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`
        absolute top-[96px] left-0 w-full bg-[#111111]/95 backdrop-blur-md text-white flex flex-col items-center gap-8 py-10 transition-all duration-300 ease-in-out md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-white/10
        ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }
      `}
      >
        {navLinks.map((link) => {
          const isActive = !isCarritoPage && checkIsActive(link);

          return (
            <HashLink
              key={link.name}
              smooth
              to={link.to}
              scroll={scrollWithOffset}
              onClick={() => setIsOpen(false)}
              className={`relative text-xl font-octosquares tracking-[0.1em] group ${
                isActive ? "text-[#CAFC00] font-bold" : "hover:text-[#CAFC00]"
              }`}
            >
              {link.name}
            </HashLink>
          );
        })}
      </div>
    </nav>
  );
}
