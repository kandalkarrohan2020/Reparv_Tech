import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import "dotenv/config";

import loginRoutes from "./routes/admin/loginRoutes.js";
import profileRoutes from "./routes/admin/profileRoutes.js";
import employeeRoutes from "./routes/admin/employeeRoutes.js";
import builderRoutes from "./routes/admin/builderRoutes.js";
import propertyRoutes from "./routes/admin/propertyRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import roleRoutes from "./routes/admin/roleRoutes.js";
import departmentRoutes from "./routes/admin/departmentRoutes.js";
//import stateRoutes from "./routes/admin/stateRoutes.js";
//import cityRoutes from "./routes/admin/cityRoutes.js";
import salespersonRoutes from "./routes/admin/salespersonRoutes.js";
import partnerRoutes from "./routes/admin/partnerRoutes.js";
import propertytypeRoutes from "./routes/admin/propertytypeRoutes.js";
import enquirerRoutes from "./routes/admin/enquirerRoutes.js";
import auctionmembersRoutes from "./routes/admin/auctionmemberRoutes.js";
//import ticketRoutes from "./routes/admin/ticketRoutes.js";
import sliderRoutes from "./routes/admin/sliderRoutes.js";
import testimonialRoutes from "./routes/admin/testimonialRoutes.js";
import calenderRoutes from "./routes/admin/calenderRoutes.js";
//import marketingRoutes from "./routes/admin/marketingRoutes.js";
//import rawmaterialRoutes from "./routes/admin/rawmaterialRoutes.js";

//fontend
import joinourteamRoutes from "./routes/frontend/joinourteamRoutes.js";
import newprojectRoutes from "./routes/frontend/newprojectRoutes.js";
import resaleRoutes from "./routes/frontend/resaleRoutes.js";
import rentalRoutes from "./routes/frontend/rentalRoutes.js";
import leaseRoutes from "./routes/frontend/leaseRoutes.js";
import farmhouseRoutes from "./routes/frontend/farmhouseRoutes.js";
import plotRoutes from "./routes/frontend/plotRoutes.js";
import flatRoutes from "./routes/frontend/flatRoutes.js";
import rowhouseRoutes from "./routes/frontend/rowhouseRoutes.js";
import propertyinfoRoutes from "./routes/frontend/propertyinfoRoutes.js";
import enquiryRoutes from "./routes/frontend/enquiryRoutes.js";
import sliderImagesRoutes from "./routes/frontend/sliderRoutes.js";
import testimonialFeedbackRoutes from "./routes/frontend/testimonialRoutes.js";

//employee
import employeeLoginRoutes from "./routes/employee/employeeLoginRoutes.js";
import employeeProfileRoutes from "./routes/employee/employeeProfileRoutes.js";
import employeeBuildersRoutes from "./routes/employee/employeeBuildersRoutes.js";
import employeePropertyRoutes from "./routes/employee/employeePropertyRoutes.js";
import employeeTicketRoutes from "./routes/employee/employeeTicketRoutes.js";
import employeeEnquirersRoutes from "./routes/employee/employeeEnquirersRoutes.js";

//sales
import salesLoginRoutes from "./routes/sales/salesLoginRoutes.js";
import salesProfileRoutes from "./routes/sales/salesProfileRoutes.js";
//import salesOverviewRoutes from "./routes/sales/salesOverviewRoutes.js";
import salesPropertyRoutes from "./routes/sales/salesPropertyRoutes.js";
//import salesTicketRoutes from "./routes/sales/salesTicketRoutes.js";
import salesEnquirersRoutes from "./routes/sales/salesEnquirerRoutes.js";
import salesNewprojectRoutes from "./routes/sales/salesNewprojectRoutes.js";
import salesResaleRoutes from "./routes/sales/salesResaleRoutes.js";
import salesRentalRoutes from "./routes/sales/salesRentalRoutes.js";
import salesLeaseRoutes from "./routes/sales/salesLeaseRoutes.js";
import salesFarmhouseRoutes from "./routes/sales/salesFarmhouseRoutes.js";
import salesPlotRoutes from "./routes/sales/salesPlotRoutes.js";
import salesFlatRoutes from "./routes/sales/salesFlatRoutes.js";
import salesRowhouseRoutes from "./routes/sales/salesRowhouseRoutes.js";
import salesPropertyinfoRoutes from "./routes/sales/salesPropertyinfoRoutes.js";
import salesEnquiryRoutes from "./routes/sales/salesEnquiryRoutes.js";
import salesCalenderRoutes from "./routes/sales/calenderRoutes.js";

// import Partner Routes
import partnerLoginRoutes from "./routes/onboardingPartner/partnerLoginRoutes.js";
import partnerProfileRoutes from "./routes/onboardingPartner/partnerProfileRoutes.js";
//import salesOverviewRoutes from "./routes/onboardingPartner/partnerOverviewRoutes.js";
import partnerPropertyRoutes from "./routes/onboardingPartner/partnerPropertyRoutes.js";
import partnerBuilderRoutes from "./routes/onboardingPartner/partnerBuilderRoutes.js";
//import salesTicketRoutes from "./routes/onboardingPartner/partnerTicketRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configure Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Use `secure: true` in production with HTTPS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const allowedOrigins = [
  "https://reparv.onrender.com",
  "https://reparv-tech.onrender.com",
  "https://admin.reparv.in",
  "https://reparv.in",
  "https://www.reparv.in",
  "https://employee.reparv.in",
  "https://partner.reparv.in",
  "https://sales.reparv.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin); // Debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// Use the same custom CORS for preflight requests
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS (OPTIONS):", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const publicRoutes = [
    "/admin/login",
    "/employee/login",
    "/sales/login",
    "/partner/login",
    "/frontend/joinourteam",
    "/frontend/newproject",
    "/frontend/resale",
    "/frontend/rental",
    "/frontend/lease",
    "/frontend/farmhouse",
    "/frontend/flat",
    "/frontend/plot",
    "/frontend/rowhouse",
    "/frontend/propertyinfo",
    "/frontend/enquiry",
    "/frontend/slider",
    "/frontend/testimonial",
  ];

  // ✅ Allow public routes to pass through
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully!",
  });
});

app.get("/get-cookie", (req, res) => {
  console.log("Cookies:", req.cookies); // ✅ Print cookies in terminal
  res.json({ cookies: req.cookies }); // ✅ Send cookie data in response
});

// ✅ Use Login & Auth Routes

app.use("/admin", loginRoutes);

//frontend
app.use("/frontend/joinourteam", joinourteamRoutes);
app.use("/frontend/propertyinfo", propertyinfoRoutes);
app.use("/frontend/newproject", newprojectRoutes);
app.use("/frontend/resale", resaleRoutes);
app.use("/frontend/rental", rentalRoutes);
app.use("/frontend/lease", leaseRoutes);
app.use("/frontend/farmhouse", farmhouseRoutes);
app.use("/frontend/plot", plotRoutes);
app.use("/frontend/flat", flatRoutes);
app.use("/frontend/rowhouse", rowhouseRoutes);
app.use("/frontend/enquiry", enquiryRoutes);
app.use("/frontend/slider", sliderImagesRoutes);
app.use("/frontend/testimonial", testimonialFeedbackRoutes);

app.use(verifyToken);
app.use("/admin/profile", profileRoutes);
app.use("/admin/employees", employeeRoutes);
app.use("/admin/properties", propertyRoutes);
app.use("/admin/builders", builderRoutes);
app.use("/admin/customers", customerRoutes);
app.use("/admin/roles", roleRoutes);
app.use("/admin/departments", departmentRoutes);
//app.use("/admin/states", stateRoutes);
//app.use("/admin/cities", cityRoutes);
app.use("/admin/salespersons", salespersonRoutes);
app.use("/admin/partner", partnerRoutes);
app.use("/admin/propertytypes", propertytypeRoutes);
app.use("/admin/enquirers", enquirerRoutes);
app.use("/admin/auctionmembers", auctionmembersRoutes);
//app.use("/admin/tickets", ticketRoutes);
app.use("/admin/slider", sliderRoutes);
app.use("/admin/testimonial", testimonialRoutes);
app.use("/admin/calender", calenderRoutes);
// app.use("/admin/marketing", marketingRoutes);

//Employee Routes
app.use("/employee", employeeLoginRoutes);
app.use("/employee/profile", employeeProfileRoutes);
app.use("/employee/builders", employeeBuildersRoutes);
app.use("/employee/properties", employeePropertyRoutes);
app.use("/employee/enquirers", employeeEnquirersRoutes);
app.use("/employee/tickets", employeeTicketRoutes);

//Sales Person Routes
app.use("/sales", salesLoginRoutes);
app.use("/sales/profile", salesProfileRoutes);
app.use("/sales/enquirers", salesEnquirersRoutes);
//app.use("/sales/overview", salesOverviewRoutes);
app.use("/sales/properties", salesPropertyRoutes);
//app.use("/sales/tickets",salesTicketRoutes);
app.use("/sales/calender", salesCalenderRoutes);

app.use("/sales/propertyinfo", salesPropertyinfoRoutes);
app.use("/sales/newproject", salesNewprojectRoutes);
app.use("/sales/resale", salesResaleRoutes);
app.use("/sales/rental", salesRentalRoutes);
app.use("/sales/lease", salesLeaseRoutes);
app.use("/sales/farmhouse", salesFarmhouseRoutes);
app.use("/sales/plot", salesPlotRoutes);
app.use("/sales/flat", salesFlatRoutes);
app.use("/sales/rowhouse", salesRowhouseRoutes);
app.use("/sales/enquiry", salesEnquiryRoutes);

// On Boarding Partner Routes
app.use("/partner", partnerLoginRoutes);
app.use("/partner/profile", partnerProfileRoutes);
//app.use("/partner/overview", partnerOverviewRoutes);
app.use("/partner/properties", partnerPropertyRoutes);
app.use("/partner/builders", partnerBuilderRoutes);
//app.use("/partner/tickets",partnerTicketRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
