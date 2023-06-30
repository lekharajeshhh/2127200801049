import React, { useEffect, useState } from 'react';

const NumberManagementService = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    const urls = getURLsFromQueryParams();
    const promises = urls.map((url) => fetch(url).then((response) => response.json()));

    try {
      const responses = await Promise.allSettled(promises);
      const validResponses = responses
        .filter((response) => response.status === 'fulfilled' && response.value.numbers)
        .map((response) => response.value.numbers)
        .flat();

      const mergedNumbers = Array.from(new Set(validResponses)).sort((a, b) => a - b);
      setNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const getURLsFromQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('url');
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <h2>Numbers:</h2>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberManagementService;