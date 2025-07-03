import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Menu } from "lucide-react";

const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const Navbar = () => {
  const [showSubMenus, setShowSubMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Track File", path: "/home", icon: <DoublePlayIcon /> },
    { name: "My Files", path: "/my-files", icon: <DoublePlayIcon /> },
    { name: "Take File", path: "/take-file", icon: <DoublePlayIcon /> },
    { name: "My History", path: "/my-history", icon: <DoublePlayIcon /> },
  ];

  useEffect(() => {
    const expanded = {};
    menuItems.forEach((item) => {
      if (
        item.hasSubMenu &&
        item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
      ) {
        expanded[item.name] = true;
      }
    });
    setShowSubMenus(expanded);
  }, [location.pathname]);

  const toggleSubMenu = (itemName) => {
    setShowSubMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-primaryBg -px-1 -py-1 text-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <img src="/logo1.jpg" alt="Logo" className="h-24 w-auto -ml-5" />
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <Menu size={52} />
        </button>
      </div>

      {/* Sidebar for PC and mobile (toggleable) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primaryBg text-white transform transition-transform duration-300 ease-in-out
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-96 md:flex md:flex-col md:p-4 md:space-y-4`}
      >
        {/* Logo */}
        <div className="hidden md:block">
          <img src="/logo1.jpg" alt="Logo" className="w-72 h-auto mt-2 mb-1" />
        </div>
        <div className="md:hidden flex justify-end p-2">
          <button onClick={() => setIsMobileOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.subMenu &&
              item.subMenu.some((sub) => location.pathname === sub.path));

          return (
            <div key={item.name}>
              <button
                className={`flex items-center space-x-3 p-3 transition-all duration-300 w-full text-left ${
                  isActive ? "bg-[#00a2cd]" : ""
                }`}
                onClick={() => {
                  if (item.hasSubMenu) {
                    toggleSubMenu(item.name);
                  } else {
                    navigate(item.path);
                    setIsMobileOpen(false); // close on mobile after click
                  }
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>

              {item.hasSubMenu && showSubMenus[item.name] && (
                <div className="ml-8 space-y-2">
                  {item.subMenu.map((sub) => (
                    <button
                      key={sub.name}
                      className={`flex items-center space-x-3 p-2 transition-all duration-300 hover:bg-[#007a9c] w-full text-left ${
                        location.pathname === sub.path ? "bg-[#00a2cd]" : ""
                      }`}
                      onClick={() => {
                        navigate(sub.path);
                        setIsMobileOpen(false); // close on mobile after click
                      }}
                    >
                      {sub.icon}
                      <span>{sub.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
