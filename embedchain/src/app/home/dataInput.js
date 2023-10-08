import React, { useState } from 'react';

export const DataSourceInput = ({ onAddDataSource }) => {
  const [dataSourceType, setDataSourceType] = useState('webPage');
  const [dataSourceValue, setDataSourceValue] = useState('');
  const [error, setError] = useState(null);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddDataSource = () => {
    // Validate and process the data source before adding
    if (dataSourceValue.trim() !== '' && isValidUrl(dataSourceValue)) {

      onAddDataSource({
        type: dataSourceType,
        value: dataSourceValue,
      });

      clearInput();
    } else {
        //invalid url
        setError('Invalid URL. Please enter a valid URL.');
        setTimeout(() => {
            setError(null);
        }, 3000);
    }
  };

  const clearInput = () => {

    // Clear the input fields after adding the data source
    setDataSourceType('webPage');
    setDataSourceValue('');
    setError(null);
  };

  return (
    <div className="my-4 text-center">
      {/* <label className="block text-gray-700">Type:</label> */}
      <select
        className="mt-1 p-2 w-full border rounded text-black"
        value={dataSourceType}
        onChange={(e) => setDataSourceType(e.target.value)}
      >
        <option value="webPage">Web Page</option>
        <option value="youtube">YouTube URL</option>
        {/* Add more options as needed */}
      </select>

      {/* <label className="block text-gray-700 mt-4">Data Source Value:</label> */}
      <input
        type="text"
        className="mt-1 p-2 w-full border rounded text-black"
        value={dataSourceValue}
        onChange={(e) => setDataSourceValue(e.target.value)}
        placeholder="Enter the URL"
      />

    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
        onClick={handleAddDataSource}
      >
        Add data
      </button>
    </div>
  );
};

export default DataSourceInput;
