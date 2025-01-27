import mysql from "mysql";

const connectDB = async () => {
  try {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });
    db.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return;
      }
      console.log("Connected to the MySQL database.");
    });
    return db;
  } catch (err) {
    console.log("\n MySql Connection Failed :", err);
    process.exit(1);
  }
};

export default connectDB;
