import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Import Routes
import loginRoutes from "./routes/loginRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import builderRoutes from "./routes/builderRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import cityRoutes from "./routes/stateRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// ✅ Use Routes
app.use("/api/v1/users", loginRoutes);
app.use("/employees", employeeRoutes);
app.use("/properties", propertyRoutes);
app.use("/builders", builderRoutes);
app.use("/customers", customerRoutes);
app.use("/roles", roleRoutes);
app.use("/departments", departmentRoutes);
app.use("/states", stateRoutes);
app.use("/cities", cityRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});