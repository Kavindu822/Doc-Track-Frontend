import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play } from "lucide-react";

const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const Navbar = () => {
  const [showSubMenus, setShowSubMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Track File", path: "/home", icon: <DoublePlayIcon /> },
    { name: "My Files", path: "/my-files", icon: <DoublePlayIcon /> },
    { name: "Take File", path: "/take-file", icon: <DoublePlayIcon /> },

    { name: "My History", path: "/my-history", icon: <DoublePlayIcon /> },
  ];

  // Auto-expand submenu based on current path
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
    <div className="h-screen w-96 bg-primaryBg text-white flex flex-col p-4 space-y-4">
      {/* Logo */}
      <div>
        <img src="/logo1.jpg" alt="Logo" className="w-72 h-auto mt-2 mb-1" />
      </div>

      {menuItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.subMenu &&
            item.subMenu.some((sub) => location.pathname === sub.path));

        return (
          <div key={item.name}>
            <button
              className={`flex items-center space-x-3 p-3 transition-all duration-300 w-full ${
                isActive ? "bg-[#00a2cd]" : ""
              }`}
              onClick={() => {
                if (item.hasSubMenu) {
                  toggleSubMenu(item.name);
                } else {
                  navigate(item.path);
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
                    onClick={() => navigate(sub.path)}
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
  );
};

export default Navbar;
