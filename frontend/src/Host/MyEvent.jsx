// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import './List.css';
// import { useNavigate, Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import Snavbar from './Snavbar';
// import { FaBeer, FaHeart, FaTrash } from "react-icons/fa";
// // import Footer from '../Components/Footer';

// function Myproducts() {
//   const [items, setItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // State for the search term
//   const [maxPrice, setMaxPrice] = useState(''); // State for the maximum price
//   const [sortPriceAscending, setSortPriceAscending] = useState(true);

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   async function fetchItems() {
//   //     try {
//   //       const response = await axios.get('http://localhost:8000/item');
//   //       if (response.data) {
//   //         setItems(response.data);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching items: ', error);
//   //     }
//   //   }
//   //   fetchItems();
//   // }, []);

// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user) {
//     axios
//       .get(`http://localhost:4000/getitem/${user.id}`)
//       .then((response) => {
//         console.log('Response data:', response.data); // Log the response data
//         const taskData = response.data;
//         setItems(taskData);
//       })
//       .catch((error) => {
//         console.error('Error fetching tasks: ', error);
//       });
//   } else {
//     console.log('ERROR');
//   }
// }, []);


//   const handleChange = () => {
//     navigate('/bookcab');
//   };

//   const handleSortPrice = () => {
//     setSortPriceAscending(!sortPriceAscending);
//   };

//   const sortedItems = [...items].sort((a, b) => {
//     if (sortPriceAscending) {
//       return a.price - b.price;
//     } else {
//       return b.price - a.price;
//     }
//   });

//   // Filter items based on the search term and maximum price
//   const filteredItems = sortedItems.filter((item) => {
//     const carNameMatches = item.itemtype && item.itemtype.toLowerCase().includes(searchTerm.toLowerCase());
//     const priceMatches = maxPrice === '' || (item.price && item.price <= parseFloat(maxPrice));
//     return carNameMatches && priceMatches;
//   });

// const deleteItem=((Id)=>{
//   axios.delete(`http://localhost:8000/itemdelete/${Id}`);
//   window.location.assign('/');
//   alert('Item is deleted');
// })
//   const deleteItem = (id) => {
//     axios.delete(`http://localhost:4000/itemdelete/${id}`)
//       .then(() => {
//         alert('Item is deleted');
//         console.log('Item deleted. Reloading page...');
//         window.location.reload(); // Reload the page after successful deletion
//       })
//       .catch((error) => {
//         console.error('Error deleting item: ', error);
//         alert('Failed to delete item');
//       });
//   };


//   return (
//     <div >
//       <Snavbar />
//       <div className="car-list">
//         <h1 className='text-center'>Furniture List</h1>
//    <div style={{display:"flex",justifyContent:"space-evenly"}}>
//         <input
//         style={{width:"500px",border:"1px solid black"}}
//         //   type="search"
//           placeholder="Search by Name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <input
//         style={{width:"500px",border:"1px solid black"}}
//         //   type="search"
//           placeholder="Search under By Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />
//         <Button
//           onClick={handleSortPrice}
//           style={{ backgroundColor: "orangered", width: "110px" ,border:'none'}}
//         >
//           Sort Price  {sortPriceAscending ? ' Low to High' : 'High to Low'}
//         </Button>
//         </div>
//         <br />
//         <br />
//         <br />
//         <div className="car-container"  >
//           {filteredItems.length === 0 ? (
//             <p>No items matched your search criteria.</p>
//           ) : (
//             filteredItems.map((item) => (
//               <div className="car-card" key={item._id} id="pop" style={{backgroundColor:'wheat'}}>
//   <div style={{display:"flex",justifyContent:"flex-end",color:"red"}}>
//   <button onClick={() => deleteItem(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
//   <FaTrash />
// </button>
//   </div>
// <br/>
//                 <img
//                   src={`http://localhost:4000/${item?.itemImage}`}
//                   alt={`${item.itemtype} Image`}
//                   style={{height:"200px",width:"260px"}}

//                 />
//                 <p className='text-center'> {item.itemtype}-{item._id.slice(3,7)}</p>
//                 {/* <p>Description: {item.description}</p> */}
//                 <p>Price: {item.title}</p>
//                 <p>Price: {item.price}</p>
//                 <div className="ml-auto">
//                 {/* <FaHeart color='red'/> */}
//                   <Button style={{ backgroundColor: "rebeccapurple", border: "none" }}>
//                     <Link to={`/item/${item._id}`} style={{ color: "white", textDecoration: "none" }}  >
//                      view
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       {/* <Footer/> */}
//     </div>
//   );
// }

// export default Myproducts;

// ItemList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBeer, FaHeart, FaTrash } from "react-icons/fa";
import Hnavbar from './Hnavbar';

function MyEvents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:7000/getevents/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setItems(taskData);
          console.log(taskData)
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);
  const deleteItem = ((Id) => {
    axios.delete(`http://localhost:7000/eventdelete/${Id}`);
    window.location.assign('/myevents');
    alert('event is deleted');
  })
  return (
    <div>

      <Hnavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <div style={{height:"10px"}}> */}
          {items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <div style={{ display: "flex", justifyContent: "flex-end", color: "red" }}>
                <button onClick={() => deleteItem(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                  <FaTrash />
                </button>
              </div>
              <img
                src={`http://localhost:7000/${item.eventImage}`}
                alt="Item Image"
                className="rounded-t-lg" style={{ height: "350px", width: "500px" }}
              // className="w-full h-50 object-cover mb-4 rounded"
              />
              <div>
                <p className="text-xl font-bold mb-2">{item.eventName}</p>
                <p className="text-gray-700 mb-2">Type: {item.type}</p>
                <p className="text-gray-700 mb-2">Date: {item.date}</p>
                <p className="text-gray-700 mb-2">Time: {item.time}</p>
                <p className="text-gray-700 mb-2">Location: {item.location}</p>
                <p className="text-gray-700 mb-2">Host: {item.hostName}</p>
                <p className="text-blue-500 font-bold">Price: {item.price}</p>
                <p className="text-gray-600"><strong>Description:</strong>{item.description.slice(0, 259)}  ...</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default MyEvents;
