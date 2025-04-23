import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play } from "lucide-react";

const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const AdminNavbar = () => {
  const [showTransferSubMenu, setShowTransferSubMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Track File", path: "/admin-dashboard", icon: <DoublePlayIcon /> },
    { name: "Files", path: "/admin-dashboard/files", icon: <DoublePlayIcon /> },
    {
      name: "Employee",
      path: "/admin-dashboard/employee",
      icon: <DoublePlayIcon />,
      hasSubMenu: true,
      subMenu: [
        {
          name: "Deying",
          path: "/admin-dashboard/employee/deying",
          icon: <DoublePlayIcon />,
        },
        {
          name: "Quality",
          path: "/admin-dashboard/employee/quality",
          icon: <DoublePlayIcon />,
        },
      ],
    },
    {
      name: "File History",
      path: "/admin-dashboard/file-history",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Pending",
      path: "/admin-dashboard/pending",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Add Files",
      path: "/admin-dashboard/add-files",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Admin",
      path: "/admin-dashboard/admin",
      icon: <DoublePlayIcon />,
    },
  ];

  // Expand submenu if current path is within it
  useEffect(() => {
    const expandedMenus = {};
    menuItems.forEach((item) => {
      if (
        item.hasSubMenu &&
        item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
      ) {
        expandedMenus[item.name] = true;
      }
    });
    setShowTransferSubMenu(expandedMenus);
  }, [location.pathname]);

  const toggleSubMenu = (itemName) => {
    setShowTransferSubMenu((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div className="h-screen w-96 bg-primaryBg text-white flex flex-col p-4 space-y-4">
      {/* Logo */}
      <div className="mb-">
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
            {item.hasSubMenu && showTransferSubMenu[item.name] && (
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

export default AdminNavbar;
