import React from 'react'
import Unavbar from './Unavbar'
import "./uhome.css"
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../Componenets/Footer'


const Uhome = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Unavbar/>
      
      <div>
      <h1 className='text-center' style={{fontSize:"50px"}}>Trending</h1>
      <div  style={{display:"flex",justifyContent:"center"}}>
  {/* <hr style={{ height: "px", width:"250px",color:"black", backgroundColor:"black"}} /> */}
  <br/>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Card style={{ width: '18rem' ,marginRight:"80px"}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://static.toiimg.com/photo/msid-101421315/101421315.jpg" style={{height:"220px"}} />
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Animal</Card.Title>
      <Card.Title className='text-center'>Pre-release</Card.Title>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem' ,marginRight:"80px"}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://vitbhopal.ac.in/file/2022/04/Advitya-2022.jpg" style={{height:"220px"}}/>
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Rivera</Card.Title>
      <Card.Title className='text-center'>College Fest</Card.Title>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem',marginRight:"80px" }}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg" style={{height:"220px"}} />
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>RRR</Card.Title>
      <Card.Title className='text-center'>Audio Launch</Card.Title>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem'}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Classical_spectacular10.jpg" style={{height:"220px"}}/>
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Stars Night</Card.Title>
      <Card.Title className='text-center'>Musical Concert</Card.Title>
    </Card.Body>
  </Card>
</div>

  </div>
  <br/>
  <br/>
  <br/>
  <div>
      <h1 className='text-center' style={{fontSize:"50px"}}>Upcomming</h1>
      <div  style={{display:"flex",justifyContent:"center"}}>
  
  <br/>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Card style={{ width: '18rem' ,marginRight:"80px"}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://static.toiimg.com/photo/101561141.cms" style={{height:"220px"}}/>
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Salaar</Card.Title>
      <Card.Title className='text-center'>Audio Launch</Card.Title>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem' ,marginRight:"80px"}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCA3IEphbg%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00355125-jvaktssvgm-portrait.jpg" style={{height:"220px"}} />
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Kisi ko batana mat </Card.Title>
      <Card.Title className='text-center'>Standup </Card.Title>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem',marginRight:"80px" }}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://filmfare.wwmindia.com/content/2023/aug/dunki11692788545.jpg" style={{height:"220px"}} />
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>Dunki</Card.Title>
      <Card.Title className='text-center'>Pre-release</Card.Title>
     
    
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem'}}>
  <Link to='/events'>
    <Card.Img variant="top" src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAzIERlYw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00373015-cjjtksburc-portrait.jpg" style={{height:"220px"}} />
    </Link>
    <Card.Body>
      <Card.Title className='text-center'>ila khata mafliya</Card.Title>
      <Card.Title className='text-center'>Standup</Card.Title>
    </Card.Body>
  </Card>
</div>
</div>
</div>
      </div>
      <br/>
     <Footer/>
          </div>
  )
}

export default Uhome