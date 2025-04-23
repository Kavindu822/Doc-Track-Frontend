// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Play } from "lucide-react";

// const DoublePlayIcon = () => (
//   <div className="flex items-center">
//     <Play size={20} className="-mr-3.5 text-white fill-white" />
//     <Play size={24} />
//   </div>
// );

// const AdminNavbar = () => {
//   const [showTransferSubMenu, setShowTransferSubMenu] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { name: "Track File", path: "/admin-dashboard", icon: <DoublePlayIcon /> },
//     { name: "Files", path: "/admin-dashboard/files", icon: <DoublePlayIcon /> },
//     {
//       name: "Employee",
//       path: "/admin-dashboard/employee",
//       icon: <DoublePlayIcon />,
//       hasSubMenu: true,
//       subMenu: [
//         {
//           name: "Deying",
//           path: "/admin-dashboard/employee/deying",
//           icon: <DoublePlayIcon />,
//         },
//         {
//           name: "Quality",
//           path: "/admin-dashboard/employee/quality",
//           icon: <DoublePlayIcon />,
//         },
//       ],
//     },
//     {
//       name: "File History",
//       path: "/admin-dashboard/file-history",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Pending",
//       path: "/admin-dashboard/pending",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Add Files",
//       path: "/admin-dashboard/add-files",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Admin",
//       path: "/admin-dashboard/admin",
//       icon: <DoublePlayIcon />,
//     },
//   ];

//   // Expand submenu if current path is within it
//   useEffect(() => {
//     const expandedMenus = {};
//     menuItems.forEach((item) => {
//       if (
//         item.hasSubMenu &&
//         item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
//       ) {
//         expandedMenus[item.name] = true;
//       }
//     });
//     setShowTransferSubMenu(expandedMenus);
//   }, [location.pathname]);

//   const toggleSubMenu = (itemName) => {
//     setShowTransferSubMenu((prev) => ({
//       ...prev,
//       [itemName]: !prev[itemName],
//     }));
//   };

//   return (
//     <div className="h-screen w-96 bg-primaryBg text-white flex flex-col p-4 space-y-4">
//       {/* Logo */}
//       <div className="mb-">
//         <img src="/logo1.jpg" alt="Logo" className="w-72 h-auto mt-2 mb-1" />
//       </div>

//       {menuItems.map((item) => {
//         const isActive =
//           location.pathname === item.path ||
//           (item.subMenu &&
//             item.subMenu.some((sub) => location.pathname === sub.path));

//         return (
//           <div key={item.name}>
//             <button
//               className={`flex items-center space-x-3 p-3 transition-all duration-300 w-full ${
//                 isActive ? "bg-[#00a2cd]" : ""
//               }`}
//               onClick={() => {
//                 if (item.hasSubMenu) {
//                   toggleSubMenu(item.name);
//                 } else {
//                   navigate(item.path);
//                 }
//               }}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </button>
//             {item.hasSubMenu && showTransferSubMenu[item.name] && (
//               <div className="ml-8 space-y-2">
//                 {item.subMenu.map((sub) => (
//                   <button
//                     key={sub.name}
//                     className={`flex items-center space-x-3 p-2 transition-all duration-300 hover:bg-[#007a9c] w-full text-left ${
//                       location.pathname === sub.path ? "bg-[#00a2cd]" : ""
//                     }`}
//                     onClick={() => navigate(sub.path)}
//                   >
//                     {sub.icon}
//                     <span>{sub.name}</span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AdminNavbar;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Menu } from "lucide-react";

// Icon with double play
const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const AdminNavbar = () => {
  const [showSubMenus, setShowSubMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
    { name: "Admin", path: "/admin-dashboard/admin", icon: <DoublePlayIcon /> },
  ];

  // Open submenu if currently in that route
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
      <div className="md:hidden flex items-center justify-between bg-primaryBg p-4 text-white shadow-md">
        <img src="/logo1.jpg" alt="Logo" className="h-10" />
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primaryBg text-white transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:w-96 md:flex md:flex-col md:p-4 md:space-y-4`}
      >
        {/* Close on mobile */}
        <div className="md:hidden flex justify-end p-2">
          <button onClick={() => setIsMobileOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {/* Logo on desktop */}
        <div className="hidden md:block mb-2">
          <img src="/logo1.jpg" alt="Logo" className="w-72 h-auto mt-2 mb-1" />
        </div>

        {/* Menu */}
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.subMenu &&
              item.subMenu.some((sub) => location.pathname === sub.path));

          return (
            <div key={item.name}>
              <button
                className={`flex items-center space-x-3 p-3 w-full text-left transition-all duration-300 rounded-lg hover:bg-[#007a9c] ${
                  isActive ? "bg-[#00a2cd]" : ""
                }`}
                onClick={() => {
                  if (item.hasSubMenu) {
                    toggleSubMenu(item.name);
                  } else {
                    navigate(item.path);
                    setIsMobileOpen(false); // close mobile nav
                  }
                }}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>

              {/* Submenus */}
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
                        setIsMobileOpen(false); // close mobile nav
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

export default AdminNavbar;
