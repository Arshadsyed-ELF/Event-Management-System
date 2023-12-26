import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';

const Uevent = () => {
    const [item, setItem] = useState(null); // Initialize item as null

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:7000/event/${id}`)
            .then((resp) => {
                console.log(resp);
                setItem(resp.data); // Set item to the fetched data (an object, not an array)
            })
            .catch(() => {
                console.log("Did not get data");
            });
    }, [id]); // Include 'id' as a dependency to re-fetch data when the ID changes

    return (
        <div>
            <Unavbar />
            <br />
            {item && (
                <div>
                    <div style={{ display: "flex", justifyContent: "center", height: "450px" }} >
                        <img src={`http://localhost:7000/${item?.eventImage}`} alt={`${item.itemtype} Image`} />
                    </div>
                    <h1 className='text-center'> {item.eventName}</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ width: '38%', marginLeft: "150px" }}>
                            <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>{item.description}</p>
                        </div>
                        <div style={{ marginRight: '300px' }}>
                            <h2 style={{ color: "grey" }}><strong>Info</strong></h2>

                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>type:  {item.type}</p>
                            <p style={{ fontSize: "20px" }}>organizer:  {item.hostName}</p>
                            <p style={{ fontSize: "20px" }}>Time:  {item.time} / {item.date}</p>
                            <p style={{ fontSize: "20px" }}>venue:  {item.location}</p>
                            <p style={{ fontSize: "20px" }}>Price:  {item.price}</p>
                        </div>
                    </div>
                    <div>
                        <p >
                        <h2 style={{ color: "grey" ,}} className='text-center'><strong>Guests</strong></h2>
                                        <hr style={{ height: "4px", backgroundColor: "black" }} />
                            {item.guests.map((guest) => (
                                <div key={guest._id}>
                                    <div style={{ width: '38%', marginLeft: "150px" }}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <img
                                                src={guest.guestImage}
                                                style={{ borderRadius: "40px"}}
                                                alt="Guest Image"
                                            />
                                        </div>
                                        <strong className='text-center'>{guest.guestName}</strong>
                                        <p style={{ fontSize: "20px" }}>{guest.guestDescription}</p>
                                    </div>
                                </div>
                            ))}

                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">
                            <Link to={`/bookticket/${item._id}`} style={{ color: "white", textDecoration: "none" }}  >
                                Book Now
                            </Link>
                        </button>
                    </div>
                </div>


            )}


        </div>
    );
};

export default Uevent;
