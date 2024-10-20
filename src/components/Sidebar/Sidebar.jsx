import { MoreVertical, ChevronLast, ChevronFirst, Search } from "lucide-react";
import { createContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Create and export SidebarContext
export const SidebarContext = createContext();

export default function Sidebar({ children, expanded, setExpanded }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user)

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all duration-300 overflow-x-hidden`}>
      <nav className="fixed h-full flex flex-col bg-white border-r shadow-sm">
        <div className="px-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center justify-center no-underline overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <img src="/images/logoILA.png" alt="Logo" className="h-16 scale-150" />
            <p className="text-4xl m-0 text-blue-600 tracking-widest font-bold">ILA</p>
          </button>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-transform duration-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Search Input */}
        <div className={`mt-3 px-3`}>
          <div
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md bg-gray-200 text-gray-600 cursor-pointer transition-colors group
    hover:bg-blue-50`}
          >
            <Search className="text-gray-500" size={20} />
            {expanded && (
              <input
                type="text"
                placeholder="Tìm kiếm"
                style={{ fontSize: "16px" }}
                className="ml-3 w-full text-ellipsis bg-transparent outline-none placeholder-gray-500"
              />
            )}
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold truncate">{user.name}</h4>
              <span className="text-xs text-gray-600 truncate">{user.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}