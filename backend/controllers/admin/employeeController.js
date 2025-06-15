import db from "../../config/dbconnect.js";
import moment from "moment";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/nodeMailer.js";

const saltRounds = 10;
// **Fetch All **
export const getAll = (req, res) => {
  const sql =
    "SELECT employees.*,departments.department,roles.role FROM employees INNER JOIN departments ON employees.departmentid=departments.departmentid INNER JOIN roles ON employees.roleid=roles.roleid ORDER BY employees.id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    const formatted = result.map((row) => ({
      ...row,
      created_at: moment(row.created_at).format("DD MMM YYYY | hh:mm A"),
      updated_at: moment(row.updated_at).format("DD MMM YYYY | hh:mm A"),
    }));

    res.json(formatted);
  });
};

// **Fetch Single by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  const sql = "SELECT * FROM employees WHERE id = ?";

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(result[0]);
  });
};

//** Add new employee **
export const add = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const {
    name,
    uid,
    contact,
    email,
    address,
    dob,
    departmentid,
    roleid,
    salary,
    doj,
  } = req.body;

  if (
    !name ||
    !uid ||
    !contact ||
    !email ||
    !address ||
    !dob ||
    !departmentid ||
    !roleid ||
    !salary ||
    !doj
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const joiningDate = moment(doj).isValid()
    ? moment(doj).add(1, "days").format("YYYY-MM-DD")
    : "";
  const birthDate = moment(dob).isValid()
    ? moment(dob).add(1, "days").format("YYYY-MM-DD")
    : "";
  db.query(
    "SELECT * FROM employees WHERE uid = ? OR contact = ? OR email = ?",
    [uid, contact, email],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (result.length === 0) {
        // **Add new employee**
        const insertSQL = `INSERT INTO employees (name, uid, contact, email, address, dob, departmentid, roleid, salary, doj, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(
          insertSQL,
          [
            name,
            uid,
            contact,
            email,
            address,
            birthDate,
            departmentid,
            roleid,
            salary,
            joiningDate,
            currentdate,
            currentdate,
          ],
          (err, result) => {
            if (err) {
              console.error("Error inserting :", err);
              return res
                .status(500)
                .json({ message: "Database error", error: err });
            }
            res
              .status(201)
              .json({
                message: "Employee added successfully",
                Id: result.insertId,
              });
          }
        );
      } else {
        return res.status(202).json({ message: "Employee already Exit!!" });
      }
    }
  );
};

// **Edit Employee **
export const update = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.id;
  const {
    name,
    uid,
    contact,
    email,
    address,
    dob,
    departmentid,
    roleid,
    salary,
    doj,
  } = req.body;

  if (
    !name ||
    !uid ||
    !contact ||
    !email ||
    !address ||
    !dob ||
    !departmentid ||
    !roleid ||
    !salary ||
    !doj
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const joiningDate = moment(doj).isValid()
    ? moment(doj).add(1, "days").format("YYYY-MM-DD")
    : "";
  const birthDate = moment(dob).isValid()
    ? moment(dob).add(1, "days").format("YYYY-MM-DD")
    : "";
  db.query("SELECT * FROM employees WHERE id = ?", [Id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    const sql = `UPDATE employees SET name=?, uid=?, contact=?, email=?, address=?, dob=?, departmentid=?, roleid=?, salary=?, doj=?, updated_at=? WHERE id=?`;

    db.query(
      sql,
      [
        name,
        uid,
        contact,
        email,
        address,
        birthDate,
        departmentid,
        roleid,
        salary,
        joiningDate,
        currentdate,
        Id,
      ],
      (err) => {
        if (err) {
          console.error("Error updating :", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Employee updated successfully" });
      }
    );
  });
};

// **Delete **
export const del = (req, res) => {
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  db.query("SELECT * FROM employees WHERE id = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    db.query("DELETE FROM employees WHERE id = ?", [Id], (err) => {
      if (err) {
        console.error("Error deleting :", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Employee deleted successfully" });
    });
  });
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Employee ID" });
  }

  db.query("SELECT * FROM employees WHERE id = ?", [Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    let status = "";
    if (result[0].status === "Active") {
      status = "Inactive";
    } else {
      status = "Active";
    }
    console.log(status);
    db.query(
      "UPDATE employees SET status = ? WHERE id = ?",
      [status, Id],
      (err, result) => {
        if (err) {
          console.error("Error deleting :", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(200)
          .json({ message: "Employee status change successfully" });
      }
    );
  });
};

// assign login to employee
export const assignLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Id = parseInt(req.params.id);

    if (isNaN(Id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Fetch salesperson details first
    db.query("SELECT * FROM employees WHERE id = ?", [Id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Sales Person not found" });
      }

      // Store original email before updating the database
      const email = result[0].email;
      const role = result[0].roleid;
      let loginstatus =
        result[0].loginstatus === "Active" ? "Inactive" : "Active";

      // Update salesperson details
      db.query(
        "UPDATE employees SET loginstatus = ?, username = ?, password = ? WHERE id = ?",
        [loginstatus, username, hashedPassword, Id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating salesperson:", updateErr);
            return res
              .status(500)
              .json({ message: "Database error", error: updateErr });
          }

          // Send email after successful update
          sendEmail(
            email,
            username,
            password,
            role,
            "https://employee.reparv.in"
          );

          res
            .status(200)
            .json({ message: "Employee login assigned successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error assigning login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
