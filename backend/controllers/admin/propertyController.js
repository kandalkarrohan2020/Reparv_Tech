import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { convertImagesToWebp } from "../../utils/convertImagesToWebp.js";

const calculateEMI = (principal, rate = 9, years = 20) => {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) return principal / months;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
};

// **Fetch All Properties**
export const getAll = (req, res) => {
  const propertyLister = req.params.lister;
  if (!propertyLister) {
    return res.status(401).json({ message: "Select Listerr Not Selected" });
  }
  let sql;

  if (propertyLister === "Reparv Employee") {
    sql = `SELECT properties.*,
                      builders.company_name, 
                      employees.name AS fullname, 
                      employees.contact
               FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               INNER JOIN employees ON properties.employeeid = employees.id 
               ORDER BY properties.propertyid DESC;`;
  } else if (propertyLister === "Onboarding Partner") {
    sql = `SELECT properties.*,
                      builders.company_name, 
                      onboardingpartner.fullname, 
                      onboardingpartner.contact,
                      onboardingpartner.city AS partnerCity
               FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               INNER JOIN onboardingpartner ON properties.partnerid = onboardingpartner.partnerid 
               ORDER BY properties.propertyid DESC;`;
  } else if (propertyLister === "Project Partner") {
    sql = `SELECT properties.*,
           builders.company_name, 
           projectpartner.fullname, 
           projectpartner.contact,
           projectpartner.city AS partnerCity
        FROM properties 
        INNER JOIN builders ON properties.builderid = builders.builderid 
        INNER JOIN projectpartner ON properties.projectpartnerid = projectpartner.id 
        ORDER BY properties.propertyid DESC;`;
  } else if (propertyLister === "Guest User") {
    sql = `SELECT properties.*,
           builders.company_name, 
           guestUsers.fullname, 
           guestUsers.contact,
           guestUsers.city AS partnerCity
        FROM properties 
        INNER JOIN builders ON properties.builderid = builders.builderid 
        INNER JOIN guestUsers ON properties.guestUserId = guestUsers.id 
        ORDER BY properties.propertyid DESC;`;
  } else {
    sql = `SELECT properties.*,
                      builders.company_name 
               FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               ORDER BY properties.propertyid DESC;`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
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

// **Fetch Single Property by ID**
export const getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = `
    SELECT 
      properties.*,
      builders.company_name, 
      onboardingpartner.fullname, 
      onboardingpartner.contact, 
      onboardingpartner.email,
      onboardingpartner.city AS partnerCity
    FROM properties
    INNER JOIN builders ON builders.builderid = properties.builderid
    LEFT JOIN onboardingpartner ON properties.partnerid = onboardingpartner.partnerid
    WHERE properties.propertyid = ?
    ORDER BY properties.propertyid DESC;
  `;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(result[0]); // Return only the first property
  });
};

// get all images
export const getImages = (req, res) => {
  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = "SELECT * FROM propertiesimages WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property images:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result);
  });
};

export const addProperty = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;

  // Convert uploaded images to WebP
  const files = await convertImagesToWebp(req.files);

  const {
    builderid,
    propertyCategory,
    propertyApprovedBy,
    propertyName,
    address,
    state,
    city,
    pincode,
    location,
    distanceFromCityCenter,
    totalSalesPrice,
    totalOfferPrice,
    stampDuty,
    registrationFee,
    gst,
    advocateFee,
    msebWater,
    maintenance,
    other,
    propertyType,
    builtYear,
    ownershipType,
    builtUpArea,
    carpetArea,
    parkingAvailability,
    totalFloors,
    floorNo,
    loanAvailability,
    propertyFacing,
    reraRegistered,
    furnishing,
    waterSupply,
    powerBackup,
    locationFeature,
    sizeAreaFeature,
    parkingFeature,
    terraceFeature,
    ageOfPropertyFeature,
    furnishingFeature,
    amenitiesFeature,
    propertyStatusFeature,
    floorNumberFeature,
    smartHomeFeature,
    securityBenefit,
    primeLocationBenefit,
    rentalIncomeBenefit,
    qualityBenefit,
    capitalAppreciationBenefit,
    ecofriendlyBenefit,
  } = req.body;

  if (
    !builderid ||
    !propertyCategory ||
    !propertyApprovedBy ||
    !propertyName ||
    !address ||
    !state ||
    !city ||
    !pincode ||
    !location ||
    !distanceFromCityCenter ||
    !totalSalesPrice ||
    !totalOfferPrice ||
    !stampDuty ||
    !registrationFee ||
    !gst ||
    !advocateFee ||
    !msebWater ||
    !maintenance ||
    !other ||
    !builtYear ||
    !ownershipType ||
    !builtUpArea ||
    !carpetArea ||
    !parkingAvailability ||
    !totalFloors ||
    !floorNo ||
    !loanAvailability ||
    !propertyFacing ||
    !furnishing ||
    !waterSupply ||
    !powerBackup ||
    !locationFeature ||
    !sizeAreaFeature ||
    !parkingFeature ||
    !terraceFeature ||
    !ageOfPropertyFeature ||
    !furnishingFeature ||
    !amenitiesFeature ||
    !propertyStatusFeature ||
    !floorNumberFeature ||
    !smartHomeFeature ||
    !securityBenefit ||
    !primeLocationBenefit ||
    !rentalIncomeBenefit ||
    !qualityBenefit ||
    !capitalAppreciationBenefit ||
    !ecofriendlyBenefit
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const calculateEMI = (price) => {
    const interestRate = 0.08 / 12; // 8% annual interest
    const tenureMonths = 240; // 20 years
    return Math.round(
      (price * interestRate * Math.pow(1 + interestRate, tenureMonths)) /
        (Math.pow(1 + interestRate, tenureMonths) - 1)
    );
  };

  const emi = calculateEMI(Number(totalOfferPrice));

  const getImagePaths = (field) =>
    files[field]
      ? JSON.stringify(files[field].map((f) => `/uploads/${f.filename}`))
      : null;

  const frontView = getImagePaths("frontView");
  const sideView = getImagePaths("sideView");
  const kitchenView = getImagePaths("kitchenView");
  const hallView = getImagePaths("hallView");
  const bedroomView = getImagePaths("bedroomView");
  const bathroomView = getImagePaths("bathroomView");
  const balconyView = getImagePaths("balconyView");
  const nearestLandmark = getImagePaths("nearestLandmark");
  const developedAmenities = getImagePaths("developedAmenities");

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0)
        return res.status(202).json({ message: "Property already exists!" });

      const insertSQL = `
      INSERT INTO properties (
        builderid, propertyCategory, propertyApprovedBy, propertyName, address, state, city, pincode, location,
        distanceFromCityCenter, totalSalesPrice, totalOfferPrice, emi, stampDuty, registrationFee, gst, advocateFee, 
        msebWater, maintenance, other, propertyType, builtYear, ownershipType, builtUpArea, carpetArea,
        parkingAvailability, totalFloors, floorNo, loanAvailability, propertyFacing, reraRegistered, 
        furnishing, waterSupply, powerBackup, locationFeature, sizeAreaFeature, parkingFeature, terraceFeature,
        ageOfPropertyFeature, furnishingFeature, amenitiesFeature, propertyStatusFeature, floorNumberFeature, smartHomeFeature,
        securityBenefit, primeLocationBenefit, rentalIncomeBenefit, qualityBenefit, capitalAppreciationBenefit, ecofriendlyBenefit,
        frontView, sideView, kitchenView, hallView, bedroomView, bathroomView, balconyView,
        nearestLandmark, developedAmenities,
        updated_at, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        builderid,
        propertyCategory,
        propertyApprovedBy,
        propertyName,
        address,
        state,
        city,
        pincode,
        location,
        distanceFromCityCenter,
        totalSalesPrice,
        totalOfferPrice,
        emi,
        stampDuty,
        registrationFee,
        gst,
        advocateFee,
        msebWater,
        maintenance,
        other,
        propertyType,
        builtYear,
        ownershipType,
        builtUpArea,
        carpetArea,
        parkingAvailability,
        totalFloors,
        floorNo,
        loanAvailability,
        propertyFacing,
        reraRegistered,
        furnishing,
        waterSupply,
        powerBackup,
        locationFeature,
        sizeAreaFeature,
        parkingFeature,
        terraceFeature,
        ageOfPropertyFeature,
        furnishingFeature,
        amenitiesFeature,
        propertyStatusFeature,
        floorNumberFeature,
        smartHomeFeature,
        securityBenefit,
        primeLocationBenefit,
        rentalIncomeBenefit,
        qualityBenefit,
        capitalAppreciationBenefit,
        ecofriendlyBenefit,
        frontView,
        sideView,
        kitchenView,
        hallView,
        bedroomView,
        bathroomView,
        balconyView,
        nearestLandmark,
        developedAmenities,
        currentdate,
        currentdate,
      ];

      db.query(insertSQL, values, (err, result) => {
        if (err) {
          console.error("Error inserting property:", err);
          return res.status(500).json({ message: "Insert failed", error: err });
        }
        res.status(201).json({
          message: "Property added successfully",
          id: result.insertId,
        });
      });
    }
  );
};

// Update property controller
export const update = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.params.id;

  if (!Id) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  const files = await convertImagesToWebp(req.files);

  const {
    builderid,
    propertyCategory,
    propertyApprovedBy,
    propertyName,
    address,
    state,
    city,
    pincode,
    location,
    distanceFromCityCenter,
    totalSalesPrice,
    totalOfferPrice,
    stampDuty,
    registrationFee,
    gst,
    advocateFee,
    msebWater,
    maintenance,
    other,
    propertyType,
    builtYear,
    ownershipType,
    builtUpArea,
    carpetArea,
    parkingAvailability,
    totalFloors,
    floorNo,
    loanAvailability,
    propertyFacing,
    reraRegistered,
    furnishing,
    waterSupply,
    powerBackup,
    locationFeature,
    sizeAreaFeature,
    parkingFeature,
    terraceFeature,
    ageOfPropertyFeature,
    furnishingFeature,
    amenitiesFeature,
    propertyStatusFeature,
    floorNumberFeature,
    smartHomeFeature,
    securityBenefit,
    primeLocationBenefit,
    rentalIncomeBenefit,
    qualityBenefit,
    capitalAppreciationBenefit,
    ecofriendlyBenefit,
  } = req.body;

  // Validation
  if (
    !builderid ||
    !propertyCategory ||
    !propertyApprovedBy ||
    !propertyName ||
    !address ||
    !state ||
    !city ||
    !pincode ||
    !location ||
    !distanceFromCityCenter ||
    !totalSalesPrice ||
    !totalOfferPrice ||
    !stampDuty ||
    !registrationFee ||
    !gst ||
    !advocateFee ||
    !msebWater ||
    !maintenance ||
    !other ||
    !builtYear ||
    !ownershipType ||
    !builtUpArea ||
    !carpetArea ||
    !parkingAvailability ||
    !totalFloors ||
    !floorNo ||
    !loanAvailability ||
    !propertyFacing ||
    !furnishing ||
    !waterSupply ||
    !powerBackup ||
    !locationFeature ||
    !sizeAreaFeature ||
    !parkingFeature ||
    !terraceFeature ||
    !ageOfPropertyFeature ||
    !furnishingFeature ||
    !amenitiesFeature ||
    !propertyStatusFeature ||
    !floorNumberFeature ||
    !smartHomeFeature ||
    !securityBenefit ||
    !primeLocationBenefit ||
    !rentalIncomeBenefit ||
    !qualityBenefit ||
    !capitalAppreciationBenefit ||
    !ecofriendlyBenefit
  ) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  const emi = calculateEMI(Number(totalOfferPrice));

  // Fetch existing property to retain old image paths if not replaced
  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length === 0)
        return res.status(404).json({ message: "Property not found" });

      const existing = result[0];

      const getImagePaths = (field) =>
        files[field]
          ? JSON.stringify(files[field].map((f) => `/uploads/${f.filename}`))
          : existing[field];

      const updateSQL = `
      UPDATE properties SET 
        builderid=?, propertyCategory=?, propertyApprovedBy=?, propertyName=?, address=?, state=?, city=?, pincode=?, location=?,
        distanceFromCityCenter=?, totalSalesPrice=?, totalOfferPrice=?, emi=?, stampDuty=?, registrationFee=?, gst=?, advocateFee=?, 
        msebWater=?, maintenance=?, other=?, propertyType=?, builtYear=?, ownershipType=?,
        builtUpArea=?, carpetArea=?, parkingAvailability=?, totalFloors=?, floorNo=?, loanAvailability=?,
        propertyFacing=?, reraRegistered=?, furnishing=?, waterSupply=?, powerBackup=?, locationFeature=?, sizeAreaFeature=?, parkingFeature=?, terraceFeature=?,
        ageOfPropertyFeature=?, furnishingFeature=?, amenitiesFeature=?, propertyStatusFeature=?, floorNumberFeature=?, smartHomeFeature=?,
        securityBenefit=?, primeLocationBenefit=?, rentalIncomeBenefit=?, qualityBenefit=?, capitalAppreciationBenefit=?, ecofriendlyBenefit=?,
        frontView=?, sideView=?, kitchenView=?, hallView=?, bedroomView=?, bathroomView=?, balconyView=?,
        nearestLandmark=?, developedAmenities=?, updated_at=?
      WHERE propertyid = ?
    `;

      const values = [
        builderid,
        propertyCategory,
        propertyApprovedBy,
        propertyName,
        address,
        state,
        city,
        pincode,
        location,
        distanceFromCityCenter,
        totalSalesPrice,
        totalOfferPrice,
        emi,
        stampDuty,
        registrationFee,
        gst,
        advocateFee,
        msebWater,
        maintenance,
        other,
        propertyType,
        builtYear,
        ownershipType,
        builtUpArea,
        carpetArea,
        parkingAvailability,
        totalFloors,
        floorNo,
        loanAvailability,
        propertyFacing,
        reraRegistered,
        furnishing,
        waterSupply,
        powerBackup,
        locationFeature,
        sizeAreaFeature,
        parkingFeature,
        terraceFeature,
        ageOfPropertyFeature,
        furnishingFeature,
        amenitiesFeature,
        propertyStatusFeature,
        floorNumberFeature,
        smartHomeFeature,
        securityBenefit,
        primeLocationBenefit,
        rentalIncomeBenefit,
        qualityBenefit,
        capitalAppreciationBenefit,
        ecofriendlyBenefit,
        getImagePaths("frontView"),
        getImagePaths("sideView"),
        getImagePaths("kitchenView"),
        getImagePaths("hallView"),
        getImagePaths("bedroomView"),
        getImagePaths("bathroomView"),
        getImagePaths("balconyView"),
        getImagePaths("nearestLandmark"),
        getImagePaths("developedAmenities"),
        currentdate,
        Id,
      ];

      db.query(updateSQL, values, (err) => {
        if (err) {
          console.error("Error updating property:", err);
          return res.status(500).json({ message: "Update failed", error: err });
        }

        res.status(200).json({ message: "Property updated successfully" });
      });
    }
  );
};

export const del = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const imageFields = [
    "frontView",
    "sideView",
    "kitchenView",
    "hallView",
    "bedroomView",
    "bathroomView",
    "balconyView",
    "nearestLandmark",
    "developedAmenities",
  ];

  // Fetch all image paths from DB
  db.query(
    `SELECT ${imageFields.join(", ")} FROM properties WHERE propertyid = ?`,
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      const property = result[0];

      // Loop through image fields and delete each image
      imageFields.forEach((field) => {
        if (property[field]) {
          try {
            const paths = JSON.parse(property[field]);
            if (Array.isArray(paths)) {
              paths.forEach((imgPath) => {
                const fullPath = path.join(process.cwd(), imgPath);
                fs.unlink(fullPath, (err) => {
                  if (err && err.code !== "ENOENT") {
                    console.error(`Error deleting ${imgPath}:`, err);
                  }
                });
              });
            }
          } catch (e) {
            console.error(`Failed to parse ${field}:`, e);
          }
        }
      });

      // Delete the property from DB
      db.query("DELETE FROM properties WHERE propertyid = ?", [Id], (err) => {
        if (err) {
          console.error("Error deleting property:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        res.status(200).json({
          message: "Property and associated images deleted successfully",
        });
      });
    }
  );
};

//**Change status */
export const status = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
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
        "UPDATE properties SET status = ? WHERE propertyid = ?",
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
            .json({ message: "Property status change successfully" });
        }
      );
    }
  );
};

//**approve property */
export const approve = (req, res) => {
  const Id = parseInt(req.params.id);
  console.log(Id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      let approve = "";
      if (result[0].approve === "Not Approved" || "Rejected") {
        approve = "Approved";
      } else {
        approve = "Not Approved";
      }

      db.query(
        "UPDATE properties SET rejectreason = NULL, approve = ? WHERE propertyid = ?",
        [approve, Id],
        (err, result) => {
          if (err) {
            console.error("Error deleting :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Property status change successfully" });
        }
      );
    }
  );
};

//* ADD Seo Details */
export const seoDetails = (req, res) => {
  const { seoTittle, seoDescription } = req.body;
  if (!seoTittle || !seoDescription) {
    return res.status(401).json({ message: "All Field Are Required" });
  }
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE properties SET seoTittle = ?, seoDescription = ? WHERE propertyid = ?",
        [seoTittle, seoDescription, Id],
        (err, result) => {
          if (err) {
            console.error("Error While Add Seo Details:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Seo Details Add successfully" });
        }
      );
    }
  );
};


export const addRejectReason = (req, res) => {
  const { rejectReason } = req.body;
  if (!rejectReason) {
    return res.status(401).json({ message: "All Field Are Required" });
  }
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      db.query(
        "UPDATE properties SET approve = 'Rejected', rejectreason = ? WHERE propertyid = ?",
        [rejectReason, Id],
        (err, result) => {
          if (err) {
            console.error("Error While Add Reject Reason :", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res
            .status(200)
            .json({ message: "Property Reject Reason Add successfully" });
        }
      );
    }
  );
};


// **Add Property**
export const addImages = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;

  try {
    const files = req.files; // Array of uploaded files
    const imagePaths = files.map((file) => file.filename); // Get filenames

    // Insert each image as a separate row
    const insertSQL = `INSERT INTO propertiesimages (propertyid, image, updated_at, created_at) 
                       VALUES ?`;

    const values = imagePaths.map((filename) => [
      Id,
      filename,
      currentdate,
      currentdate,
    ]);

    db.query(insertSQL, [values], (err, result) => {
      if (err) {
        console.error("Error inserting Images:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Images uploaded", images: imagePaths });
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// ** New Additional Info Add API **
export const additionalInfoAdd = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");

  const {
    propertyid,
    wing,
    floor,
    flatno,
    direction,
    ageofconstruction,
    carpetarea,
    superbuiltup,
    salesprice,
    description,
    ownercontact,
  } = req.body;

  // Files check
  const owneradhar = req.files?.owneradhar
    ? req.files.owneradhar[0].filename
    : null;
  const ownerpan = req.files?.ownerpan ? req.files.ownerpan[0].filename : null;
  const schedule = req.files?.schedule ? req.files.schedule[0].filename : null;
  const signed = req.files?.signed ? req.files.signed[0].filename : null;
  const satbara = req.files?.satbara ? req.files.satbara[0].filename : null;
  const ebill = req.files?.ebill ? req.files.ebill[0].filename : null;

  const insertSQL = `
    INSERT INTO propertiesinfo 
    (propertyid, wing, floor, flatno, direction, ageofconstruction, carpetarea, superbuiltup, salesprice, description, ownercontact,
      owneradhar, ownerpan, schedule, signed, satbara, ebill, updated_at, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertSQL,
    [
      propertyid,
      wing,
      floor,
      flatno,
      direction,
      ageofconstruction,
      carpetarea,
      superbuiltup,
      salesprice,
      description,
      ownercontact,
      owneradhar,
      ownerpan,
      schedule,
      signed,
      satbara,
      ebill,
      currentdate,
      currentdate,
    ],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting:", insertErr);
        return res
          .status(500)
          .json({ message: "Database error", error: insertErr });
      }

      res.status(201).json({
        message: "Additional Info added successfully",
        Id: insertResult.insertId,
      });
    }
  );
};

// ** Additional Info Edit API **
export const editAdditionalInfo = (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = parseInt(req.params.id);

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property Info ID" });
  }

  const {
    wing,
    floor,
    flatno,
    direction,
    ageofconstruction,
    carpetarea,
    superbuiltup,
    salesprice,
    description,
    ownercontact,
  } = req.body;

  // Files check
  const owneradhar = req.files?.owneradhar
    ? req.files.owneradhar[0].filename
    : null;
  const ownerpan = req.files?.ownerpan ? req.files.ownerpan[0].filename : null;
  const schedule = req.files?.schedule ? req.files.schedule[0].filename : null;
  const signed = req.files?.signed ? req.files.signed[0].filename : null;
  const satbara = req.files?.satbara ? req.files.satbara[0].filename : null;
  const ebill = req.files?.ebill ? req.files.ebill[0].filename : null;

  // Start fields and values
  let updateFields = [
    "wing = ?",
    "floor = ?",
    "flatno = ?",
    "direction = ?",
    "ageofconstruction = ?",
    "carpetarea = ?",
    "superbuiltup = ?",
    "salesprice = ?",
    "description = ?",
    "ownercontact = ?",
    "updated_at = ?",
  ];

  const updateValues = [
    wing,
    floor,
    flatno,
    direction,
    ageofconstruction,
    carpetarea,
    superbuiltup,
    salesprice,
    description,
    ownercontact,
    currentdate,
  ];

  // Dynamically add files if uploaded
  if (owneradhar) {
    updateFields.push("owneradhar = ?");
    updateValues.push(owneradhar);
  }
  if (ownerpan) {
    updateFields.push("ownerpan = ?");
    updateValues.push(ownerpan);
  }
  if (schedule) {
    updateFields.push("schedule = ?");
    updateValues.push(schedule);
  }
  if (signed) {
    updateFields.push("signed = ?");
    updateValues.push(signed);
  }
  if (satbara) {
    updateFields.push("satbara = ?");
    updateValues.push(satbara);
  }
  if (ebill) {
    updateFields.push("ebill = ?");
    updateValues.push(ebill);
  }

  const updateSQL = `UPDATE propertiesinfo SET ${updateFields.join(
    ", "
  )} WHERE propertyinfoid = ?`;

  updateValues.push(Id);

  db.query(updateSQL, updateValues, (err, result) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({
      message: "Additional Info updated successfully",
      affectedRows: result.affectedRows,
    });
  });
};

export const propertyInfo = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id))
    return res.status(400).json({ message: "Invalid Property ID" });

  const sql = "SELECT * FROM propertiesinfo WHERE propertyid = ?";
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(201).json({ propertyid: Id });
    }
    res.json(result[0]);
  });
};

export const deleteImages = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  // First, fetch the image path from the database
  db.query(
    "SELECT image FROM propertiesimages WHERE imageid = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.error("Error fetching image:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Image not found" });
      }

      const imagePath = result[0].image; // Get the image path
      if (imagePath) {
        const filePath = path.join(process.cwd(), imagePath); // Full path to the file

        // Delete the image file from the uploads folder
        fs.unlink(filePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting image:", err);
          }

          // Now delete the record from the database
          db.query(
            "DELETE FROM propertiesimages WHERE imageid = ?",
            [Id],
            (err) => {
              if (err) {
                console.error("Error deleting Image:", err);
                return res
                  .status(500)
                  .json({ message: "Database error", error: err });
              }
              res.status(200).json({ message: "Image deleted successfully" });
            }
          );
        });
      } else {
        res.status(404).json({ message: "Image path not found" });
      }
    }
  );
};

export const addCsvFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  const results = [];

  const filePath = req.file.path;

  const stream = fs.createReadStream(filePath).pipe(csv());

  let responded = false; // Prevent multiple responses

  stream.on("data", (row) => {
    results.push(row);
  });

  stream.on("end", () => {
    const values = results.map((row) => [
      row.propertyid,
      row.wing || null,
      row.floor || null,
      row.flatno || null,
      row.flatfacing || null,
      row.type || null,
      row.carpetarea || null,
      row.superbuiltup || null,
      row.facing || null,
      row.sqftprice || null,
      row.mouza || null,
      row.khasrano || null,
      row.clubhousecharge || null,
      row.parkingcharge || null,
      row.watercharge || null,
      row.societydeposit || null,
      row.maintanance || null,
      row.documentcharge || null,
      row.updated_at || new Date(),
      row.created_at || new Date(),
    ]);

    const query = `
      INSERT INTO propertiesinfo (
        propertyid, wing, floor, flatno, flatfacing, type,
        carpetarea, superbuiltup, facing, sqftprice, mouza,
        khasrano, clubhousecharge, parkingcharge, watercharge,
        societydeposit, maintanance, documentcharge,
        updated_at, created_at
      ) VALUES ?
    `;

    db.query(query, [values], (err, result) => {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });

      if (responded) return; // Avoid duplicate response
      if (err) {
        console.error("Database error:", err);
        responded = true;
        return res.status(500).json({
          message: "Failed to insert CSV data into database.",
          error: err.sqlMessage || err.message,
        });
      }

      responded = true;
      return res.status(200).json({
        message: "CSV data inserted successfully.",
        insertedRows: result.affectedRows,
      });
    });
  });

  stream.on("error", (csvError) => {
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting file after CSV error:", unlinkErr);
      }
    });

    if (!responded) {
      responded = true;
      console.error("CSV parsing error:", csvError);
      return res.status(500).json({
        message: "Error reading CSV file.",
        error: csvError.message,
      });
    }
  });
};

// ** Fetch Property Information by ID **
export const fetchAdditionalInfo = (req, res) => {
  const Id = parseInt(req.params.id);
  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  const sql = `SELECT * FROM propertiesinfo WHERE propertyid = ? ORDER BY propertyinfoid`;

  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property Details:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Property Additional Information not found" });
    }

    res.json(result); // Return only the first property
  });
};
