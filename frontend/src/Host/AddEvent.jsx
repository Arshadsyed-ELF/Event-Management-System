import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hnavbar from './Hnavbar';

function AddEvent() {
  const [formData, setFormData] = useState({
    description: '',
    eventName: '',
    type: '',
    date: '',
    time: '',
    price: '',
    location: '',
    guests: [], // Array to store guest details
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    if (e.target.name === 'eventImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGuestChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const guests = [...prevData.guests];
      guests[index][name] = value;
      return { ...prevData, guests };
    });
  };

  const handleAddGuest = () => {
    setFormData((prevData) => ({
      ...prevData,
      guests: [...prevData.guests, { guestName: '', guestDescription: '' }],
    }));
  };

  const handleRemoveGuest = (index) => {
    setFormData((prevData) => {
      const guests = [...prevData.guests];
      guests.splice(index, 1);
      return { ...prevData, guests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('eventImage', formData.eventImage);

      formDataToSend.append('hostName', user.name);
      formDataToSend.append('hostId', user.id);

      formData.guests.forEach((guest, index) => {
        formDataToSend.append(`guests[${index}][guestName]`, guest.guestName);
        formDataToSend.append(`guests[${index}][guestDescription]`, guest.guestDescription);
        formDataToSend.append(`guests[${index}][guestImage]`, guest.guestImage);
      });

      await axios.post('http://localhost:7000/addevent', formDataToSend);
      alert('Event added successfully');
      navigate('/myevents');
    } catch (error) {
      console.error('Error adding event : ', error);
    }
  };

  return (
    <div>
      <Hnavbar />
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="mt-8 p-4 border rounded shadow-lg bg-gray-300 p-4 rounded-lg shadow-md" style={{width:"45%"}}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Event</h2>
        <form onSubmit={handleSubmit}>
         

          <div className="mb-4" style={{display:"flex",justifyContent:"space-around"}}>
         <div>
         <label className="block text-black-900 text-center" >Event Name</label>
          <input
            type="text"
            name="eventName"
            placeholder='eventName'
            value={formData.eventName}
            onChange={handleChange}
            className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}
          />

         </div>
        <div>
        <label className="block text-black-900 text-center" >Event Type</label>
           <input
            type="text"
            name="type"
            placeholder='type'
            value={formData.type}
            onChange={handleChange}
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}
          />
        </div>
        </div>
        
        <div className="mb-4" style={{display:"flex",justifyContent:"space-around"}}>
          <dvi>
          <label className="block text-black-900 text-center" >Event Time</label>  
          <input
            type="time"
            name="time"
            placeholder='time'
            value={formData.time}
            onChange={handleChange}
            className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}
          />
          </dvi>
        
           <div>
           <label className="block text-black-900 text-center" >Event Date</label> 
           <input
            type="date"
            name="date"
            placeholder='date'
            value={formData.date}
            onChange={handleChange}
            className="border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}

          />
           </div>
        </div>
        
        <div className="mb-4" style={{display:"flex",justifyContent:"space-around"}}>
          <div>
            <label className="block text-black-900 text-center">Venue</label>
          <input
            type="loaction"
            name="location"
            placeholder='venue'
            value={formData.location}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}

          />
          </div>
           <div >
          <label className="block text-black-900 text-center">Price</label>
          <input
            type="text"
            name="price"
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{width:"280px"}}

          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-black-900 text-center">Description</label>
          <textarea
            name="description"
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {formData.guests.map((guest, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Guest {index + 1}</h3>
              <input
                type="text"
                name="guestName"
                value={guest.guestName}
                onChange={(e) => handleGuestChange(e, index)}
                className=" mb-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Guest Name `}
              />
              <input
                type="text"
                name="guestDescription"
                value={guest.guestDescription}
                onChange={(e) => handleGuestChange(e, index)}
                className=" mb-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Guest Description `}
              />
               <input
                type="text"
                name="guestImage"
                value={guest.guestImage}
                onChange={(e) => handleGuestChange(e, index)}
                className=" mb-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Guest Image URL `}
              />
             <div style={{display:"flex",justifyContent:"flex-end"}}> 

              <button
                type="button"
                onClick={() => handleRemoveGuest(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Guest
              </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddGuest}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Guest
          </button>
       
        <div className="mt-4 mb-4">
          <label className="block text-black-900">Event Images</label>
          <input
            type="file"
            name="eventImage"
            accept="mp3/*"
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            required
            style={{border:"1 px solid black"}}

          />
        </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
           Create
          </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddEvent;
