const http = require("http");
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let admin = {};
var allSeller = [];
var allCustomer = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some(u => u.customerId === customerId);

  if (!checkUser) {
    allCustomer.push({customerId, socketId, userInfo});
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some(u => u.sellerId === sellerId);

  if (!checkSeller) {
    allSeller.push({sellerId, socketId, userInfo});
  }
}

const findCustomer = (customerId) => {
  return allCustomer.find(c => c.customerId === customerId);
}

const findSeller = (sellerId) => {
  return allSeller.find(c => c.sellerId === sellerId);
}

const remove = (socketId) => {
  allCustomer = allCustomer.filter(c => c.socketId !== socketId);
  allSeller = allSeller.filter(c => c.socketId !== socketId);
}

io.on("connection", (soc) => {
  console.log("socket server running..");
  soc.on('add_user',(customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit('activeSeller', allSeller); 
  });

  soc.on('add_seller',(sellerId, userInfo) => {
    addSeller(sellerId, soc.id, userInfo);
    io.emit('activeSeller', allSeller);
  });

  soc.on('send_seller_message',(msg) => {
    const customer = findCustomer(msg.receiverId);

    if (customer !== undefined) {
      soc.to(customer.socketId).emit('seller_message', msg);
    }
  });

  soc.on('send_customer_message',(msg) => {
    const seller = findSeller(msg.receiverId);

    if (seller !== undefined) {
      soc.to(seller.socketId).emit('customer_message', msg);
    }
  });

  soc.on('send_message_seller_to_admin',(msg) => { 
    if (admin.socketId) {
      soc.to(admin.socketId).emit('receved_seller_message', msg);
    }
  })

  soc.on('add_admin', (adminInfo) => {
    delete adminInfo.email;
    delete adminInfo.password;
    admin = adminInfo;
    admin.socketId = soc.id; 
    io.emit('activeSeller', allSeller);
  });

  soc.on('disconnect',() => {
    remove(soc.id);
    io.emit('activeSeller', allSeller);
  });

  soc.on('send_message_admin_to_seller',(msg) => {
    const seller = findSeller(msg.receiverId);

    if (seller !== undefined) {
      soc.to(seller.socketId).emit('receved_admin_message', msg);
    }
  });
});

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", 'http://localhost:3001'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/home", require("./routes/home/homeRoutes"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use('/api', require('./routes/chatRoutes'));

app.get("/", (req, res) => res.send("Welcome"));

dbConnect();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
