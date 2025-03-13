import express from "express";
import {getAll, getById, add, update, status, assignLogin, del} from "../../controllers/admin/employeeController.js";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());
// ✅ Middleware to Verify JWT Token
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token; // Ensure cookies are properly configured in your frontend

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized. Please log in." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token. Access denied." });
//   }
// };

// const verifyToken2 = (req, res, next) => {
//   const publicRoutes = ["/user/login"];
//   if (publicRoutes.includes(req.path)) {
//     return next();
//   }

//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({ message: "Unauthorized. Please log in." });
//   try {
//     const jwtVerify = (token) => {
//       return jwt.verify(token, process.env.JWT_SECRET);
//     };
//     const decodedToken = jwtVerify(token);
//     req.user = decodedToken;
//   } catch (error) {
//     req.user = null;
//   }
//   /*
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token. Access denied." });
//     req.user = decoded;
//     next();
//   });
// */

//   return next();
// };


router.get("/", getAll);
router.get("/:id", getById);
router.post("/add", add);
router.put("/edit/:id", update);
router.put("/status/:id", status);
router.put("/assignlogin/:id", assignLogin);
router.delete("/delete/:id", del);

export default router;
