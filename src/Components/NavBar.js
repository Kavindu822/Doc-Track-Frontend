import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Menu, LogOut } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
    { name: "My Profile", path: "/my-profile", icon: <DoublePlayIcon /> },
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

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("jwtToken");
            navigate("/");
            setIsMobileOpen(false);
          },
        },
        { label: "No" },
      ],
    });
  };

  return (
    <>
      {/* ✅ Mobile Top Navbar (Only on Mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-primaryBg px-4 py-2 flex items-center justify-between text-white shadow-md border-b border-white/20">
        <img src="/logo1.jpg" alt="Logo" className="h-14 w-auto" />
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <Menu size={32} />
        </button>
      </div>

      {/* ✅ Sidebar for Both Desktop and Mobile */}
      <div
        className={`fixed top-0 md:top-0 left-0 z-40 h-full w-64 bg-primaryBg text-white transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:w-96 md:flex md:flex-col`}
      >
        <div className="overflow-y-auto h-full md:h-auto md:p-4 md:space-y-4 pt-20 md:pt-4">
          {/* ✅ Show logo ONLY in Desktop view */}
          <div className="hidden md:flex justify-center md:justify-start mb-6">
            <img src="/logo1.jpg" alt="Logo" className="w-72 h-auto" />
          </div>

          {/* ✅ Menu Items */}
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.subMenu &&
                item.subMenu.some((sub) => location.pathname === sub.path));

            return (
              <div key={item.name}>
                <button
                  className={`flex items-center space-x-3 px-4 py-3 w-full text-left transition-all duration-300 rounded-lg hover:bg-[#007a9c] ${
                    isActive ? "bg-[#00a2cd]" : ""
                  }`}
                  onClick={() => {
                    if (item.hasSubMenu) {
                      toggleSubMenu(item.name);
                    } else {
                      navigate(item.path);
                      setIsMobileOpen(false);
                    }
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </button>

                {/* Submenu Items */}
                {item.hasSubMenu && showSubMenus[item.name] && (
                  <div className="ml-8 space-y-2">
                    {item.subMenu.map((sub) => (
                      <button
                        key={sub.name}
                        className={`flex items-center space-x-3 p-2 w-full text-left transition-all duration-300 rounded-md hover:bg-[#007a9c] ${
                          location.pathname === sub.path ? "bg-[#00a2cd]" : ""
                        }`}
                        onClick={() => {
                          navigate(sub.path);
                          setIsMobileOpen(false);
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

          {/* ✅ Logout Button */}
          <div className="mt-auto p-4 border-t border-white/30">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left hover:bg-[#007a9c] transition-all duration-300 p-2 rounded-lg"
            >
              <LogOut size={24} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
