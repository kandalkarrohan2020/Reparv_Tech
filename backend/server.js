import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import "dotenv/config";

import loginRoutes from "./routes/admin/loginRoutes.js";
import employeeRoutes from "./routes/admin/employeeRoutes.js";
import builderRoutes from "./routes/admin/builderRoutes.js";
import propertyRoutes from "./routes/admin/propertyRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import roleRoutes from "./routes/admin/roleRoutes.js";
import departmentRoutes from "./routes/admin/departmentRoutes.js";
//import stateRoutes from "./routes/admin/stateRoutes.js";
//import cityRoutes from "./routes/admin/cityRoutes.js";
import salespersonRoutes from "./routes/admin/salespersonRoutes.js";
import propertytypeRoutes from "./routes/admin/propertytypeRoutes.js";
import enquirerRoutes from "./routes/admin/enquirerRoutes.js";
import auctionmembersRoutes from "./routes/admin/auctionmemberRoutes.js";
//import ticketRoutes from "./routes/admin/ticketRoutes.js";
//import calenderRoutes from "./routes/admin/calenderRoutes.js";
//import marketingRoutes from "./routes/admin/marketingRoutes.js";
//import rawmaterialRoutes from "./routes/admin/rawmaterialRoutes.js";

import employeeLoginRoutes from "./routes/employee/employeeLoginRoutes.js";
import employeeBuildersRoutes from "./routes/employee/employeeBuildersRoutes.js";
import employeeTicketRoutes from "./routes/employee/employeeTicketRoutes.js";
import employeeEnquirersRoutes from "./routes/employee/employeeEnquirersRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configure Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://reparv-tech.onrender.com",
  "https://admin.reparv.in",
  "https://reparv.in"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const publicRoutes = ["/admin/login","/employee/login","/get-cookie"];
  
    // ✅ Allow public routes to pass through
    if (publicRoutes.some(route => req.path.startsWith(route))) {
      return next();
    }
  
    const token = req.cookies?.token; // Ensure token exists
    //console.log("Token received:", token); // Debugging line
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
  
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return next(); // ✅ Continue to protected route
    } catch (error) {
      console.error("JWT Verification Failed:", error); // Log error
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  };

app.get("/get-cookie", (req, res) => {
  console.log("Cookies:", req.cookies); // ✅ Print cookies in terminal
  res.json({ cookies: req.cookies }); // ✅ Send cookie data in response
});

// ✅ Use Login & Auth Routes
app.use(verifyToken);
app.use("/admin", loginRoutes);
app.use("/admin/employees", employeeRoutes);
app.use("/admin/properties", propertyRoutes);
app.use("/admin/builders", builderRoutes);
app.use("/admin/customers", customerRoutes);
app.use("/admin/roles", roleRoutes);
app.use("/admin/departments", departmentRoutes);
//app.use("/admin/states", stateRoutes);
//app.use("/admin/cities", cityRoutes);
app.use("/admin/salespersons", salespersonRoutes);
app.use("/admin/propertytypes", propertytypeRoutes);
app.use("/admin/enquirers", enquirerRoutes);
app.use("/admin/auctionmembers", auctionmembersRoutes);
//app.use("/admin/tickets", ticketRoutes);
// app.use("/admin/calenders", calenderRoutes);
// app.use("/admin/marketing", marketingRoutes);

//Employee Routes
app.use("/employee", employeeLoginRoutes);
app.use("/employee/builders", employeeBuildersRoutes);
app.use("employee/enquirers",employeeEnquirersRoutes);
app.use("employee/tickets",employeeTicketRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
