const express = require('express');
const app = express();
const port = 9999;
const { v4: uuidv4 } = require('uuid');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// User info storage
let users = [];                  

// Print hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Add a new user
app.post("/users", (req, res) => {
    const { name, email} =  req.body;    // grab details from json msg

    if(!name || !email){
        return res.status(400).json({ message: "Missing name and/or email"});
    }

    newUser = {
        id: uuidv4(),
        name,
        email,
    };

    users.push(newUser)
    return res.status(201).json(newUser);
});

// Get user details using id
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;       // grab id from uri
    const foundUser = users.find((u => u.id == userId))

    if(!foundUser){
        return res.status(404).json({ message: "Provided id does not exist"})
    }
    return res.status(200).json(foundUser)
}
);

// Update user details providing id
app.put("/users/:id", (req, res) => {
    const { name, email } = req.body;       // grab details from json msg
    const userId = req.params.id;           // grab id from uri

    foundUser = users.find((u => u.id == userId))
    if (!name || !email){
        return res.status(400).json( {message: "Missing name and/or email"})
    }
    if (!foundUser){
        return res.status(404).json({message: "Provided id does not exist"})
    }

    //Update array
    foundUser.name = name;
    foundUser.email = email;
    return res.status(200).json(foundUser)
})

// Delete user details providing id
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;       // grab id from uri

    const foundUser = users.find((u => u.id == userId))
    if(!foundUser)
    {
        return res.status(404).json({message: "No user with provided id"})
    }
    console.log("Preparing to delete user")
    users.splice(users.indexOf(foundUser))
    return res.status(204).json({message:"Successfully deleted user"})
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing