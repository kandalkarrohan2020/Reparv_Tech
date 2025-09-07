import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import "dotenv/config";

import loginRoutes from "./routes/admin/loginRoutes.js";
import profileRoutes from "./routes/admin/profileRoutes.js";
import dashboardRoutes from "./routes/admin/dashboardRoutes.js";
import employeeRoutes from "./routes/admin/employeeRoutes.js";
import builderRoutes from "./routes/admin/builderRoutes.js";
import propertyRoutes from "./routes/admin/propertyRoutes.js";
import customerRoutes from "./routes/admin/customerRoutes.js";
import roleRoutes from "./routes/admin/roleRoutes.js";
import departmentRoutes from "./routes/admin/departmentRoutes.js";
import authoritiesRoutes from "./routes/admin/authoritiesRoutes.js";
import stateRoutes from "./routes/admin/stateRoutes.js";
import cityRoutes from "./routes/admin/cityRoutes.js";
import promoterRoutes from "./routes/admin/promoterRoutes.js";
import salespersonRoutes from "./routes/admin/salespersonRoutes.js";
import partnerRoutes from "./routes/admin/partnerRoutes.js";
import projectPartnerRoutes from "./routes/admin/projectPartnerRoutes.js";
import territoryPartnerRoutes from "./routes/admin/territoryPartnerRoutes.js";
import guestUserRoutes from "./routes/admin/guestUserRoutes.js";
import propertytypeRoutes from "./routes/admin/propertytypeRoutes.js";
import enquirerRoutes from "./routes/admin/enquirerRoutes.js";
import addEnquiryRoutes from "./routes/admin/enquiryRoutes.js";
import auctionmembersRoutes from "./routes/admin/auctionmemberRoutes.js";
import ticketRoutes from "./routes/admin/ticketRoutes.js";
import apkUploadRoutes from "./routes/admin/apkUploadRoutes.js";
import blogRoutes from "./routes/admin/blogRoutes.js";
import trendRoutes from "./routes/admin/trendRoutes.js";
import sliderRoutes from "./routes/admin/sliderRoutes.js";
import testimonialRoutes from "./routes/admin/testimonialRoutes.js";
import calenderRoutes from "./routes/admin/calenderRoutes.js";
import emiRoutes from "./routes/admin/emiRoutes.js";
import marketingContentRoutes from "./routes/admin/marketingContentRoutes.js";
import brandAccessoriesRoutes from "./routes/admin/brandAccessoriesRoutes.js";

//frontend
import allPropertiesRoutes from "./routes/frontend/allPropertiesRoutes.js";
import propertiesRoutes from "./routes/frontend/propertiesRoutes.js";
import joinourteamRoutes from "./routes/frontend/joinourteamRoutes.js";
import propertyinfoRoutes from "./routes/frontend/propertyinfoRoutes.js";
import enquiryRoutes from "./routes/frontend/enquiryRoutes.js";
import frontendBlogRoutes from "./routes/frontend/blogRoutes.js";
import sliderImagesRoutes from "./routes/frontend/sliderRoutes.js";
import testimonialFeedbackRoutes from "./routes/frontend/testimonialRoutes.js";
import frontendEmiRoutes from "./routes/frontend/emiRoutes.js";

// Payment Route
import paymentRoutes from "./routes/paymentRoutes.js";

// Map Route
import geocodeRoutes from "./routes/geocodeRoutes.js";

// Guest User Routes
import guestUserLoginRoutes from "./routes/guestUser/userRoutes.js";
import guestUserProfileRoutes from "./routes/guestUser/profileRoutes.js";
import guestUserDashboardRoutes from "./routes/guestUser/dashboardRoutes.js";
import guestUserPropertyRoutes from "./routes/guestUser/propertyRoutes.js";
import guestUserBuilderRoutes from "./routes/guestUser/builderRoutes.js";

// builder
import builderLoginRoutes from "./routes/builder/loginRoutes.js";
import builderProfileRoutes from "./routes/builder/profileRoutes.js";
import builderDashboardRoutes from "./routes/builder/dashboardRoutes.js";
import builderCustomerRoutes from "./routes/builder/customerRoutes.js";
import builderPropertyRoutes from "./routes/builder/propertyRoutes.js";
import builderTicketRoutes from "./routes/builder/ticketRoutes.js";

//employee
import employeeLoginRoutes from "./routes/employee/employeeLoginRoutes.js";
import employeeProfileRoutes from "./routes/employee/employeeProfileRoutes.js";
import employeeDashboardRoutes from "./routes/employee/dashboardRoutes.js";
import employeeBuildersRoutes from "./routes/employee/employeeBuildersRoutes.js";
import employeePropertyRoutes from "./routes/employee/employeePropertyRoutes.js";
import employeeTicketRoutes from "./routes/employee/employeeTicketRoutes.js";
import employeeEnquirersRoutes from "./routes/employee/employeeEnquirersRoutes.js";

// import Promoter Routes
import promoterLoginRoutes from "./routes/promoter/loginRoutes.js";
import promoterProfileRoutes from "./routes/promoter/profileRoutes.js";
import promoterAgreementRoutes from "./routes/promoter/agreementRoutes.js";
import promoterDashboardRoutes from "./routes/promoter/dashboardRoutes.js";
import promoterEnquirerRoutes from "./routes/promoter/enquirerRoutes.js";
import promoterCustomerRoutes from "./routes/promoter/customerRoutes.js";
import promoterSalespersonRoutes from "./routes/promoter/salespersonRoutes.js";
import promoterPartnerRoutes from "./routes/promoter/partnerRoutes.js";
import promoterProjectPartnerRoutes from "./routes/promoter/projectPartnerRoutes.js";
import promoterTerritoryPartnerRoutes from "./routes/promoter/territoryPartnerRoutes.js";
import promoterEmiRoutes from "./routes/promoter/emiRoutes.js";
import promoterTicketRoutes from "./routes/promoter/ticketRoutes.js";

//sales
import salesLoginRoutes from "./routes/sales/salesLoginRoutes.js";
import salesProfileRoutes from "./routes/sales/salesProfileRoutes.js";
import salesAgreementRoutes from "./routes/sales/agreementRoutes.js";
import salesDashboardRoutes from "./routes/sales/dashboardRoutes.js";
import salesPropertyRoutes from "./routes/sales/salesPropertyRoutes.js";
import salesTicketRoutes from "./routes/sales/salesTicketRoutes.js";
import salesCustomerRoutes from "./routes/sales/customerRoutes.js";
import salesEnquirersRoutes from "./routes/sales/salesEnquirerRoutes.js";
import salesEnquiryRoutes from "./routes/sales/salesEnquiryRoutes.js";
import salesCalenderRoutes from "./routes/sales/calenderRoutes.js";
import salesPropertiesRoutes from "./routes/sales/propertiesRoutes.js";
import salesPropertyinfoRoutes from "./routes/sales/propertyinfoRoutes.js";
import enquiryRoutesSaleApp from "./routes/salesAppRoute/enquiryRoute.js";

// import onBarding Partner Routes
import partnerLoginRoutes from "./routes/onboardingPartner/partnerLoginRoutes.js";
import partnerProfileRoutes from "./routes/onboardingPartner/partnerProfileRoutes.js";
import partnerAgreementRoutes from "./routes/onboardingPartner/agreementRoutes.js";
import partnerDashboardRoutes from "./routes/onboardingPartner/dashboardRoutes.js";
import partnerPropertyRoutes from "./routes/onboardingPartner/partnerPropertyRoutes.js";
import partnerBuilderRoutes from "./routes/onboardingPartner/partnerBuilderRoutes.js";
import partnerTicketRoutes from "./routes/onboardingPartner/partnerTicketRoutes.js";

// import Project Partner Routes
import projectPartnerLoginRoutes from "./routes/projectPartner/loginRoutes.js";
import projectPartnerProfileRoutes from "./routes/projectPartner/profileRoutes.js";
import projectPartnerAgreementRoutes from "./routes/projectPartner/agreementRoutes.js";
import projectPartnerDashboardRoutes from "./routes/projectPartner/dashboardRoutes.js";
import projectPartnerPropertyRoutes from "./routes/projectPartner/propertyRoutes.js";
import projectPartnerCustomerRoutes from "./routes/projectPartner/customerRoutes.js";
import projectPartnerBuilderRoutes from "./routes/projectPartner/builderRoutes.js";
import projectPartnerTicketRoutes from "./routes/projectPartner/ticketRoutes.js";

// import Territory Partner Routes
import territoryPartnerLoginRoutes from "./routes/territoryPartner/loginRoutes.js";
import territoryPartnerProfileRoutes from "./routes/territoryPartner/profileRoutes.js";
import territoryPartnerAgreementRoutes from "./routes/territoryPartner/agreementRoutes.js";
import territoryPartnerDashboardRoutes from "./routes/territoryPartner/dashboardRoutes.js";
//import territoryPartnerPropertyRoutes from "./routes/territoryPartner/propertyRoutes.js";
import territoryPartnerBuilderRoutes from "./routes/territoryPartner/builderRoutes.js";
import territoryPartnerTicketRoutes from "./routes/territoryPartner/ticketRoutes.js";
import territoryPartnerCustomerRoutes from "./routes/territoryPartner/customerRoutes.js";
import territoryPartnerEnquirersRoutes from "./routes/territoryPartner/enquirerRoutes.js";
import territoryPartnerEnquiryRoutes from "./routes/territoryPartner/enquiryRoutes.js";
import territoryPartnerCalenderRoutes from "./routes/territoryPartner/calenderRoutes.js";
import territoryPartnerPropertiesRoutes from "./routes/territoryPartner/propertiesRoutes.js";
import territoryPartnerPropertyinfoRoutes from "./routes/territoryPartner/propertyinfoRoutes.js";

import bookPropertyRoute from "./routes/sales/propertyBookingRoute.js";
//sales app route
import authRoute from "./routes/salesAppRoute/authRoute.js";
import appFlatRoute from "./routes/salesAppRoute/flatRoutes.js";
import appTicketRoute from "./routes/salesAppRoute/ticketRoute.js";
import postRoute from "./routes/salesAppRoute/postRoutes.js";
import userController from "./routes/salesAppRoute/userRoute.js";
import clientRoute from "./routes/salesAppRoute/clientRoute.js";

//territory app route
import territoryUserController from "./routes/territoryAppRoute/userRoute.js";
import territorypostRoute from "./routes/territoryAppRoute/postRoutes.js";
import territoryBooking from "./routes/territoryPartner/propertyBookingRoute.js";
import territoryClientRoute from "./routes/territoryAppRoute/profileRoute.js";

//Onboarding App
import onboardingAppRoute from "./routes/onboardingAppRoute/userRoute.js";

//ProjectPartner App
import projectPartnerAppRoute from "./routes/projectPartnerAppRoute/userRoute.js";
import projectPartnerPostRoute from "./routes/projectPartnerAppRoute/postRoutes.js";
//Customer App
import customerEmi from "./routes/customerAppRoute/EmiRoute.js";
import customerSignUp from "./routes/customerAppRoute/userRoute.js";
import customerPropertyRoute from "./routes/customerAppRoute/propertyRoute.js";
import customerTrendRoute from "./routes/customerAppRoute/trendRoute.js";
import customerEnquiryRoute from "./routes/customerAppRoute/enquiryRoute.js";

//Builder App
import builderapploginRoute from "./routes/builderAppRoute/builderapploginRoute.js";
import builderProfileRoute from "./routes/builderAppRoute/builderProfileRoutes.js";
import builderpropertyRoute from "./routes/builderAppRoute/propertyController.js";
import builderEnquiryCustomerRoute from "./routes/builderAppRoute/builderPropertyEnquiryRoute.js";
import builderCommunityRoute from "./routes/builderAppRoute/communityRoute.js";
import builderTicketRoute from "./routes/builderAppRoute/BuilderTicketRoutes.js";
import builderpostRoute from "./routes/builderAppRoute/BuilderpostRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Use `secure: true` in production with HTTPS
  })
);

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "https://admin.reparv.in",
  "https://reparv.in",
  "https://www.reparv.in",
  "https://users.reparv.in",
  "https://builder.reparv.in",
  "https://employee.reparv.in",
  "https://promoter.reparv.in",
  "https://partners.reparv.in",
  "https://onboarding.reparv.in",
  "https://sales.reparv.in",
  "https://projectpartner.reparv.in",
  "https://territory.reparv.in",
  "https://business.reparv.in",
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
    allowedHeaders: ["Content-Type", "Authorization"],
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
    "/builder/login",
    "/employee/login",
    "/promoter/login",
    "/sales/login",
    "/partner/login",
    "/project-partner/login",
    "/territory-partner/login",
    "/guest-user/register",
    "/guest-user/login",
    "/admin/authorities",
    "/admin/states",
    "/admin/cities",
    "/admin/promoter/add",
    "/admin/salespersons/add",
    "/admin/partner/add",
    "/admin/projectpartner/add",
    "/admin/territorypartner/add",
    "/admin/marketing-content",
    "/admin/apk",
    "/api/payment/create-order",
    "/api/payment/verify-payment",
    "/frontend/properties",
    "/frontend/all-properties",
    "/frontend/joinourteam",
    "/frontend/propertyinfo",
    "/frontend/enquiry",
    "/frontend/blog",
    "/frontend/blog/",
    "/frontend/blog/details/",
    "/frontend/slider",
    "/frontend/testimonial",
    "/frontend/emi",
    "/salesapp/enquiry",
    //i addedd
    "/api/booking",
    //salesPerson APP Routes
    "/salesapp/api/login",
    "/sales/flat",
    "/salesapp/flats",
    "/upload",
    "/salesapp/tickets",
    "/salesapp/post",
    "/salesapp/user",
    "/salesapp/client",
    //Territory App
    "/territoryapp/user",
    "/territoryapp/post",
    "/territoryapp/post/get",
    "/customerapp/enquiry",
    "/customerapp/",
    "/customerapp/emiform",
    //builder app
    "/builderapp/community",
    "/builderapp/user",
    "/builderapp/post",
    "/projectpartner/post",
  ];

  //  Allow public routes to pass through
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
    return next(); //  Continue to protected route
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
  console.log("Cookies:", req.cookies); //  Print cookies in terminal
  res.json({ cookies: req.cookies }); // Send cookie data in response
});

// Use Login & Auth Routes

app.use("/admin", loginRoutes);

//frontend
app.use("/frontend/all-properties", allPropertiesRoutes);
app.use("/frontend/properties", propertiesRoutes);
app.use("/frontend/joinourteam", joinourteamRoutes);
app.use("/frontend/propertyinfo", propertyinfoRoutes);
app.use("/frontend/enquiry", enquiryRoutes);
app.use("/frontend/blog", frontendBlogRoutes);
app.use("/frontend/slider", sliderImagesRoutes);
app.use("/frontend/testimonial", testimonialFeedbackRoutes);
app.use("/frontend/emi", frontendEmiRoutes);
// Payment Call
app.use("/api/payment", paymentRoutes);

// Map Route Call
app.use("/api/map", geocodeRoutes);

app.use(verifyToken);
app.use("/admin/profile", profileRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/admin/employees", employeeRoutes);
app.use("/admin/properties", propertyRoutes);
app.use("/admin/builders", builderRoutes);
app.use("/admin/customers", customerRoutes);
app.use("/admin/roles", roleRoutes);
app.use("/admin/departments", departmentRoutes);
app.use("/admin/authorities", authoritiesRoutes);
app.use("/admin/states", stateRoutes);
app.use("/admin/cities", cityRoutes);
app.use("/admin/promoter", promoterRoutes);
app.use("/admin/salespersons", salespersonRoutes);
app.use("/admin/partner", partnerRoutes);
app.use("/admin/projectpartner", projectPartnerRoutes);
app.use("/admin/territorypartner", territoryPartnerRoutes);
app.use("/admin/guestuser", guestUserRoutes);
app.use("/admin/propertytypes", propertytypeRoutes);
app.use("/admin/enquirers", enquirerRoutes);
// CSV File add Enquiries Route
app.use("/admin/enquiries", verifyToken, addEnquiryRoutes);
app.use("/admin/auctionmembers", auctionmembersRoutes);
app.use("/admin/tickets", ticketRoutes);
app.use("/admin/apk", apkUploadRoutes);
app.use("/admin/blog", blogRoutes);
app.use("/admin/trend", trendRoutes);
app.use("/admin/slider", sliderRoutes);
app.use("/admin/testimonial", testimonialRoutes);
app.use("/admin/calender", calenderRoutes);
app.use("/admin/emi", emiRoutes);
app.use("/admin/marketing-content", marketingContentRoutes);
app.use("/admin/brand-accessories", brandAccessoriesRoutes);

// Guest User Routes
app.use("/guest-user", guestUserLoginRoutes);
app.use("/guest-user/profile", guestUserProfileRoutes);
app.use("/guest-user/dashboard", guestUserDashboardRoutes);
app.use("/guest-user/builders", guestUserBuilderRoutes);
app.use("/guest-user/properties", guestUserPropertyRoutes);

// Builder Routes
app.use("/builder", builderLoginRoutes);
app.use("/builder/profile", builderProfileRoutes);
app.use("/builder/dashboard", builderDashboardRoutes);
app.use("/builder/customers", builderCustomerRoutes);
app.use("/builder/properties", builderPropertyRoutes);
app.use("/builder/tickets", builderTicketRoutes);

// Employee Routes
app.use("/employee", employeeLoginRoutes);
app.use("/employee/profile", employeeProfileRoutes);
app.use("/employee/dashboard", employeeDashboardRoutes);
app.use("/employee/builders", employeeBuildersRoutes);
app.use("/employee/properties", employeePropertyRoutes);
app.use("/employee/enquirers", employeeEnquirersRoutes);
app.use("/employee/tickets", employeeTicketRoutes);

// Project Partner Routes
app.use("/promoter", promoterLoginRoutes);
app.use("/promoter/profile", promoterProfileRoutes);
app.use("/promoter/agreement", promoterAgreementRoutes);
app.use("/promoter/dashboard", promoterDashboardRoutes);
app.use("/promoter/enquirers", promoterEnquirerRoutes);
app.use("/promoter/customers", promoterCustomerRoutes);
app.use("/promoter/salespersons", promoterSalespersonRoutes);
app.use("/promoter/partner", promoterPartnerRoutes);
app.use("/promoter/projectpartner", promoterProjectPartnerRoutes);
app.use("/promoter/territorypartner", promoterTerritoryPartnerRoutes);
app.use("/promoter/emi", promoterEmiRoutes);
app.use("/promoter/tickets", promoterTicketRoutes);

//Sales Person Routes
app.use("/sales", salesLoginRoutes);
app.use("/sales/profile", salesProfileRoutes);
app.use("/sales/agreement", salesAgreementRoutes);
app.use("/sales/enquirers", salesEnquirersRoutes);
app.use("/sales/dashboard", salesDashboardRoutes);
app.use("/sales/properties", salesPropertyRoutes);
app.use("/sales/customers", salesCustomerRoutes);
app.use("/sales/tickets", salesTicketRoutes);
app.use("/sales/calender", salesCalenderRoutes);
app.use("/sales/enquiry", salesEnquiryRoutes);
// Property Pages Routes
app.use("/sales/properties", salesPropertiesRoutes);
app.use("/sales/propertyinfo", salesPropertyinfoRoutes);

// On Boarding Partner Routes
app.use("/partner", partnerLoginRoutes);
app.use("/partner/profile", partnerProfileRoutes);
app.use("/partner/agreement", partnerAgreementRoutes);
app.use("/partner/dashboard", partnerDashboardRoutes);
app.use("/partner/properties", partnerPropertyRoutes);
app.use("/partner/builders", partnerBuilderRoutes);
app.use("/partner/tickets", partnerTicketRoutes);

// Project Partner Routes
app.use("/project-partner", projectPartnerLoginRoutes);
app.use("/project-partner/profile", projectPartnerProfileRoutes);
app.use("/project-partner/agreement", projectPartnerAgreementRoutes);
app.use("/project-partner/dashboard", projectPartnerDashboardRoutes);
app.use("/project-partner/properties", projectPartnerPropertyRoutes);
app.use("/project-partner/customers", projectPartnerCustomerRoutes);
app.use("/project-partner/builders", projectPartnerBuilderRoutes);
app.use("/project-partner/tickets", projectPartnerTicketRoutes);

// Territory Partner Routes
app.use("/territory-partner", territoryPartnerLoginRoutes);
app.use("/territory-partner/profile", territoryPartnerProfileRoutes);
app.use("/territory-partner/agreement", territoryPartnerAgreementRoutes);
app.use("/territory-partner/dashboard", territoryPartnerDashboardRoutes);
//app.use("/territory-partner/properties", territoryPartnerPropertyRoutes);
app.use("/territory-partner/builders", territoryPartnerBuilderRoutes);
app.use("/territory-partner/tickets", territoryPartnerTicketRoutes);
app.use("/territory-partner/customers", territoryPartnerCustomerRoutes);
app.use("/territory-partner/enquirers", territoryPartnerEnquirersRoutes);
app.use("/territory-partner/enquiry", territoryPartnerEnquiryRoutes);
app.use("/territory-partner/calender", territoryPartnerCalenderRoutes);
// Property Pages Routes
app.use("/territory-partner/properties", territoryPartnerPropertiesRoutes);
app.use("/territory-partner/propertyinfo", territoryPartnerPropertyinfoRoutes);

//Sales App Routes
app.use("/salesapp/api", authRoute);
app.use("/salesapp/flats", appFlatRoute);
app.use("/salesapp/tickets", appTicketRoute);
app.use("/salesapp/post", postRoute);
app.use("/salesapp/user", userController);
app.use("/salesapp/client", clientRoute);
app.use("/salesapp/enquiry", enquiryRoutesSaleApp);

//Territory App Route
app.use("/territoryapp/user", territoryUserController);
app.use("/territoryapp/post", territorypostRoute);
app.use("/territoryapp/client", territoryClientRoute);
//Book Enquiry Property
app.use("/api/booking", bookPropertyRoute);
//get territory Book Enquiry Property
app.use("/api/booking/territory", territoryBooking);

//onboarding Partner
app.use("/onboardingapp/user", onboardingAppRoute);

//ProjectPartner App
app.use("/projectpartnerRoute/user", projectPartnerAppRoute);
app.use("/projectpartner/post", projectPartnerPostRoute);

//Customer app
app.use("/customerapp", customerEmi);
app.use("/customerapp/user", customerSignUp);
app.use("/customerapp/property", customerPropertyRoute);
app.use("/customerapp/customerTrendRoute", customerTrendRoute);
app.use("/customerapp/enquiry", customerEnquiryRoute);

//Builder app
app.use("/builderapp/user", builderapploginRoute);
app.use("/builderapp/profile", builderProfileRoute);
app.use("/builderapp/property", builderpropertyRoute);
app.use("/builderapp/customer", builderEnquiryCustomerRoute);
app.use("/builderapp/community", builderCommunityRoute);
app.use("/builderapp/ticket", builderTicketRoute);
app.use("/builderapp/post", builderpostRoute);


//  Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
