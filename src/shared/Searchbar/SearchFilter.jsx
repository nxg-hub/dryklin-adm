import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const SearchFilter = ({ onSearch, filters }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value, selectedFilter); // Pass both search term & filter
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    onSearch(searchTerm, value); // Update search with new filter
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-full max-w-md mb-11">
      {/* Dropdown filter */}
      {currentRoute === "/dashboard/orderManagement" && (
        <div className="flex gap-2">
          <h2 className="text-xl font-semibold">Filter:</h2>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md">
            {filters?.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search input */}
      {
        <div className="relative w-[100%]">
          <input
            type="text"
            value={searchTerm}
            readOnly={
              currentRoute === "/dashboard/orderManagement" &&
              selectedFilter === ""
            }
            onChange={handleSearch}
            placeholder={`Search  ${selectedFilter}`}
            className="w-full px-8 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-500"
          />
          <CiSearch
            className="absolute text-[#E86317] top-3 left-1 "
            size={20}
          />
        </div>
      }
    </div>
  );
};

export default SearchFilter;
