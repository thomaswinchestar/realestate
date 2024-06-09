'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchForm from './SearchForm';

const PROPERTIES_QUERY = gql`
  query GetProperties($type: String, $priceRange: [Float], $bedroomCount: Int, $areaRange: [Float]) {
    properties(type: $type, priceRange: $priceRange, bedroomCount: $bedroomCount, areaRange: $areaRange) {
      id
      project_name
      short_title
      price
      bedroom_count
      area
      short_description
      images
    }
  }
`;

const HomePage = () => {
  const [filters, setFilters] = useState({
    type: '',
    priceRange: [0, 0],
    bedroomCount: 0,
    areaRange: [0, 0],
  });
  
  const { data, loading, error } = useQuery(PROPERTIES_QUERY, {
    variables: filters,
  });

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data && data.properties.map((property) => (
          <div key={property.id} className="border p-4">
            <h2 className="text-xl font-bold">{property.project_name}</h2>
            <p>{property.short_title}</p>
            <p>${property.price}</p>
            <p>{property.bedroom_count} Bedrooms</p>
            <p>{property.area} sq ft</p>
            <p>{property.short_description}</p>
            <div className="mt-2 flex space-x-2 overflow-hidden">
              {property.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-1/4 h-auto object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
