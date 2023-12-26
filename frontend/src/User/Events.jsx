import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Events() {
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:7000/events`)
      .then((response) => {
        const taskData = response.data;
        console.log('Fetched events:', taskData);
        setItems(taskData);
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
      });
  }, []);


const filteredItems = items.filter((item) =>
item.eventName.toLowerCase().includes(searchName.toLowerCase()) &&
item.type.toLowerCase().includes(searchType.toLowerCase())
);

  return (
    <div>
      <Unavbar />

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Events List</h2>

        <div className="mb-4" style={{display:"flex",justifyContent:"space-around"}}>
          <div>
          <label className="text-gray-700
          
          ">Search by Name:</label>
          <input
            type="search"
            className="ml-2 p-2 border border-gray-300 rounded"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          </div>
          <div>
          <label className="text-gray-700">Search by Type:</label>
          <input
            type="search"
            className="ml-2 p-2 border border-gray-300 rounded"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <img
                src={`http://localhost:7000/${item.eventImage}`}
                alt="Item Image"
                className="rounded-t-lg"
                style={{ height: '350px', width: '500px' }}
              />
              <div>
                <p className="text-xl font-bold mb-2">{item.eventName}</p>
                <p className="text-gray-700 mb-2">Type: {item.type}</p>
                <p className="text-gray-700 mb-2">organizer: {item.hostName}</p>
                <p className="text-gray-700 mb-2">venue: {item.location}</p>
                <p className="text-blue-500 font-bold">Price: ₹{item.price}</p>

                

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ backgroundColor: 'rebeccapurple', border: 'none' }}>
                    <Link to={`/uevent/${item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
