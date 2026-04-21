import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Asegúrate de importar Link

const CartIcon = ({ isCartActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-7 h-7 transition-colors cursor-pointer ${isCartActive ? "text-[#CAFC00] drop-shadow-[0_0_12px_#CAFC00]" : "text-white hover:text-[#CAFC00]"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("inicio");

  const navLinks = [
    { name: "Inicio", to: "/", id: "inicio" }, // Va a la raíz pura
    { name: "Productos", to: "/#productos", id: "productos" },
    { name: "Sobre Nosotros", to: "/#sobre-nosotros", id: "sobre-nosotros" },
    { name: "Contacto", to: "/#contacto", id: "contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;

      const scrollPosition = window.scrollY;
      let currentSection = "inicio";

      navLinks.forEach((link) => {
        const sectionElement = document.getElementById(link.id);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop - 150;
          if (scrollPosition >= sectionTop) {
            currentSection = link.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isCarritoPage = location.pathname === "/carrito";

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-1 flex items-center justify-start">
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src="/imagenes/otros/logo.jpeg"
                className="w-15"
                alt="Swish Logo"
              />
              <span className="font-strasua text-3xl text-white tracking-widest group-hover:text-[#CAFC00] transition-colors">
                SWISH
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-10">
            {navLinks.map((link) => {
              const isActive = !isCarritoPage && activeSection === link.id;

              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-sm font-octosquares tracking-wide transition-all duration-300 ${
                    isActive
                      ? "font-octosquares font-bold text-[#CAFC00] drop-shadow-[0_0_12px_#CAFC00] "
                      : "text-white hover:text-[#CAFC00] "
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex-1 flex items-center justify-end gap-6">
            <div className="hidden md:block">
              <Link to="/carrito" aria-label="Ir al carrito">
                <CartIcon isCartActive={isCarritoPage} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
