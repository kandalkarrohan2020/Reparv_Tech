import db from "../../config/dbconnect.js";

//Fetch All
export const getAll = (req, res) => {
  const sql = `SELECT propertyfollowup.followupid,
                      propertyfollowup.visitdate,
                      propertyfollowup.remark,
                      propertyfollowup.status, 
                      propertyfollowup.changestatus,
                      properties.propertyName,
                      enquirers.customer,
                      enquirers.contact,
                      salespersons.fullname
               FROM propertyfollowup 
               LEFT JOIN enquirers ON propertyfollowup.enquirerid = enquirers.enquirersid
               LEFT JOIN properties ON enquirers.propertyid = properties.propertyid
               LEFT JOIN salespersons ON enquirers.salespersonid = salespersons.salespersonsid
               WHERE enquirers.salespersonid = ? 
               ORDER BY propertyfollowup.followupid DESC`; 
  
  db.query(sql,[req.user.id], (err, result) => {
    if (err) {
      console.error("Error fetching :", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(result);
  });
};

/* Change status */
export const changeStatus = (req, res) => {

  const { status } = req.body;
  if (status === "") {
    return res.status(400).json({ message: "Please Select Status!" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  db.query(
    "SELECT * FROM propertyfollowup WHERE followupid = ? AND changestatus = 0",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE propertyfollowup SET status = ?, changestatus = 1 WHERE followupid = ?  AND changestatus = 0 ",
        [status, Id],
        (err, result) => {
          if (err) {
            console.error("Error changing status :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "status change successfully" });
        }
      );
    }
  );
};



