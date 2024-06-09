"use client";
import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [bedroomCount, setBedroomCount] = useState("");
  const [areaRange, setAreaRange] = useState([0, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, priceRange, bedroomCount, areaRange });
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Type</label>
        <select
          className="form-select mt-1 block w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      <div className="mb-4 flex space-x-2">
        <div>
          <label className="block text-gray-700">Min Price</label>
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
        </div>
        <div>
          <label className="block text-gray-700">Max Price</label>
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Bedrooms</label>
        <input
          type="number"
          className="form-input mt-1 block w-full"
          value={bedroomCount}
          onChange={(e) => setBedroomCount(Number(e.target.value))}
        />
      </div>

      <div className="mb-4 flex space-x-2">
        <div>
          <label className="block text-gray-700">Min Area</label>
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={areaRange[0]}
            onChange={(e) =>
              setAreaRange([Number(e.target.value), areaRange[1]])
            }
          />
        </div>
        <div>
          <label className="block text-gray-700">Max Area</label>
          <input
            type="number"
            className="form-input mt-1 block w-full"
            value={areaRange[1]}
            onChange={(e) =>
              setAreaRange([areaRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
