require("dotenv").config();

const express = require("express"),
    cookieParser = require("cookie-parser"),
    cors = require("cors")

const socketLib = require('socket.io');

//config
require("./configs/mongoose.config");

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

//routes
require("./routes/users.routes")(app)
require("./routes/locations.routes")(app)
require("./routes/appointments.routes")(app)

const server = app.listen(process.env.DB_PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}`));

const io = socketLib(server, { 
    cors: { 
        origin: "http://localhost:3000", 
        methods: [ "GET", "POST" ], 
        allowed: ["*"], 
        credentials: true,
    }
});

io.on("connection", (socket) => { 
    console.log(`on server - socket id: ${socket.id}`);

    //response to the client that connected to the server
    socket.emit("client_welcome", { 
        welcome: `You are connected with socket id: ${socket.id}`
    });

    socket.on("remove_pet", (data) => { 
        console.log("\nInside remove pet from server");
        console.log(data);

        socket.broadcast.emit("removed_pet_emitted", { 
            adoptedPet: data,
            message: "Adopted Pet Removed",
        });
    });

    socket.on("added_pet", (data) => {
        socket.broadcast.emit("added_pet_emitted", { 
            newPet: data,
            message: "Someone added a pet to the shelter",
        });
    });
});
