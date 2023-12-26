const express = require('express');
const cors = require('cors');
const multer = require('multer');

require('./db/config');
const Admin = require('./db/Admin/Admin')
const hosts=require('./db/host/Hosts')
const users=require('./db/Users/users')
const events = require('./db/host/addevent');
const mybookings=require('./db/Users/mybookings')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

                                         //  Admin  //
// Login
app.post('/alogin', (req, resp) => {  
    const { email, password } = req.body;   
    Admin.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
  })
  
  // Register Api
  app.post('/asignup', (req, resp) => {
    const { name, email, password } = req.body;
    Admin.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                Admin.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
  })

                      //   User @ Admin
app.get('/users',(req,res)=>{
    users.find()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})
app.delete('/userdelete/:id',(req,res)=>{
    const { id }=req.params
     users.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
  app.delete('/userbookingdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await mybookings.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.delete('/usereventdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await events.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
        //  seller @Admin
app.get('/hosts',(req,res)=>{
hosts.find()
    .then((seller)=>{
        res.status(200).json(seller)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})

app.delete('/hostdelete/:id',(req,res)=>{
    const { id }=req.params
     hosts.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
    app.get('/bookings', (req, res) => {
    mybookings.find()
        .then((orders) => {
            res.status(200).json(orders)
        })
        .catch(() => {
            res.sendStatus(500)
        })
});

                        //    Hosts        //

//  login api
app.post('/hlogin', (req, resp) => {
    const { email, password } = req.body;
    hosts.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})

// Register Api
app.post('/hsignup', (req, resp) => {
    const { name, email, password } = req.body;
    hosts.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                hosts.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
})
app.post('/addevent', upload.single('eventImage'), async (req, res) => {
    const {
        hostId,
        hostName,
        eventName,
        description,
        type,
        time,
        date,
        price,
        location,
    } = req.body;
    const eventImage = req.file.path; // The path to the uploaded image

    const guests = Array.isArray(req.body.guests)
    ? req.body.guests.map((guest) => ({
        guestName: guest.guestName,
        guestDescription: guest.guestDescription,
        guestImage: guest.guestImage,
      }))
    : [];

    try {
        const event = new events({
            eventImage,
            hostId,
            hostName,
            eventName,
            description,
            price,
            type,
            time,
            date,
            location,
            guests,
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(400).json({ error: 'Failed to create event' });
    }
});

// ... (rest of your code)


app.get('/getevents/:hostId', async (req, res) => {
    const hostId = req.params.hostId;
    try {
        // Use the correct field name from your schema
        const tasks = await events.find({  hostId : hostId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });     
    }
});

//getbookings
app.get('/gethostbookings/:userId', async (req, res) => {
    const hostId = req.params.userId;
    try {
        const tasks = await mybookings.find({ hostId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

//delete book
app.delete('/eventdelete/:id', (req, res) => {
    const { id } = req.params;
    events.findByIdAndDelete(id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Internal server error' });
        });
})

                                                  // users  //
// login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
        users.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        return res.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                    }
                    else {
                        res.json("Invalid Password")
                    }
                }
                else {
                    res.json("User not found")
                }
            })
    })
    
    app.post('/signup', (req, resp) => {
        const { name, email, password } = req.body;
        users.findOne({ email: email })
            .then(use => {
                if (use) {
                    resp.json("Already have an account")
                } else {
                    users.create({ email: email, name: name, password: password })
                        .then(result => resp.json("  Account Created"))
                        .catch(err => resp.json(err))
                }
            }).catch(err => resp.json("failed "))
    })
    
    app.get('/events', async (req, res) => {
        try {
            const images = await events.find();
            res.json(images);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    });
    // // Single item
    app.get('/event/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const item = await events.findById({ _id: id });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    app.post('/userbooking', async (req, res) => {
        const { hostName, description, price, type, eventName, location, eventImage, hostId,date,time, totalamount, seller, sellerId, BookingDate,  userId, userName: String,quantity  } = req.body;
    
        try {
            const order = new mybookings({ hostName, description, price, type, eventName, location, eventImage, hostId, totalamount, seller, sellerId, BookingDate,  userId,date,time,  userName: String,quantity});
            await order.save();
            res.status(201).json(order);
        } catch (err) {
            res.status(400).json({ error: 'Failed to create policy' });
        }
    });
    
    app.get('/getbookings/:userId', async (req, res) => {
        const userId = req.params.userId;
        try {
            const tasks = await mybookings.find({ userId }).sort('position');
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    });

app.listen(7000,()=>{
    console.log("server is running on 7000")
})