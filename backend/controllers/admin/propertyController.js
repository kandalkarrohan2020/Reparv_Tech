import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { convertImagesToWebp } from "../../utils/convertImagesToWebp.js";

function toSlug(text) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single
}

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
               ORDER BY properties.created_at DESC;`;
  } else if (propertyLister === "Onboarding Partner") {
    sql = `SELECT properties.*,
                      builders.company_name, 
                      onboardingpartner.fullname, 
                      onboardingpartner.contact,
                      onboardingpartner.city AS partnerCity
               FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               INNER JOIN onboardingpartner ON properties.partnerid = onboardingpartner.partnerid 
               ORDER BY properties.created_at DESC;`;
  } else if (propertyLister === "Project Partner") {
    sql = `SELECT properties.*,
           builders.company_name, 
           projectpartner.fullname, 
           projectpartner.contact,
           projectpartner.city AS partnerCity
        FROM properties 
        INNER JOIN builders ON properties.builderid = builders.builderid 
        INNER JOIN projectpartner ON properties.projectpartnerid = projectpartner.id 
        ORDER BY properties.created_at DESC;`;
  } else if (propertyLister === "Guest User") {
    sql = `SELECT properties.*,
           builders.company_name, 
           guestUsers.fullname, 
           guestUsers.contact,
           guestUsers.city AS partnerCity
        FROM properties 
        INNER JOIN builders ON properties.builderid = builders.builderid 
        INNER JOIN guestUsers ON properties.guestUserId = guestUsers.id 
        ORDER BY properties.created_at DESC;`;
  } else {
    sql = `SELECT properties.*,
                      builders.company_name 
               FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid 
               ORDER BY properties.created_at DESC;`;
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
    amenitiesFeature,
    propertyStatusFeature,
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
    !amenitiesFeature ||
    !propertyStatusFeature ||
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

  const seoSlug = toSlug(propertyName);

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
        ageOfPropertyFeature, amenitiesFeature, propertyStatusFeature, smartHomeFeature,
        securityBenefit, primeLocationBenefit, rentalIncomeBenefit, qualityBenefit, capitalAppreciationBenefit, ecofriendlyBenefit,
        frontView, sideView, kitchenView, hallView, bedroomView, bathroomView, balconyView,
        nearestLandmark, developedAmenities, seoSlug,
        updated_at, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        amenitiesFeature,
        propertyStatusFeature,
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
        seoSlug,
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
    amenitiesFeature,
    propertyStatusFeature,
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
    !amenitiesFeature ||
    !propertyStatusFeature ||
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
        ageOfPropertyFeature=?, amenitiesFeature=?, propertyStatusFeature=?, smartHomeFeature=?,
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
        amenitiesFeature,
        propertyStatusFeature,
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

// * UPLOAD Brochure & Video *
export const uploadBrochureAndVideo = (req, res) => {
  const propertyId = req.params.id;

  if (!propertyId) {
    return res.status(400).json({ message: "Property Id is required" });
  }

  const brochureFile = req.files?.brochureFile?.[0] || null; // image
  const videoFile = req.files?.videoFile?.[0] || null; // video

  if (!brochureFile && !videoFile) {
    return res.status(400).json({ message: "No brochure or video uploaded" });
  }

  const brochurePath = brochureFile
    ? `/uploads/brochures/${brochureFile.filename}`
    : null;
  const videoPath = videoFile ? `/uploads/videos/${videoFile.filename}` : null;

  // 1 Get old files first
  db.query(
    "SELECT brochureFile, videoFile FROM properties WHERE propertyid = ?",
    [propertyId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      const oldBrochure = result[0].brochureFile;
      const oldVideo = result[0].videoFile;

      // 2 Delete old files if new ones are provided
      if (brochureFile && oldBrochure) {
        const oldPath = path.join(process.cwd(), oldBrochure);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      if (videoFile && oldVideo) {
        const oldPath = path.join(process.cwd(), oldVideo);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // 3 Update DB with new paths
      db.query(
        "UPDATE properties SET brochureFile = ?, videoFile = ? WHERE propertyid = ?",
        [
          brochurePath || oldBrochure, // keep old if no new file
          videoPath || oldVideo,
          propertyId,
        ],
        (err) => {
          if (err) {
            console.error("Error while saving brochure/video:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({
            message: "Brochure & Video uploaded successfully",
            brochurePath: brochurePath || oldBrochure,
            videoPath: videoPath || oldVideo,
          });
        }
      );
    }
  );
};

//* ADD Seo Details */
export const seoDetails = (req, res) => {
  const { seoSlug, seoTittle, seoDescription, propertyDescription } = req.body;
  if (!seoSlug || !seoTittle || !seoDescription || !propertyDescription) {
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
        "UPDATE properties SET seoSlug = ?, seoTittle = ?, seoDescription = ?, propertyDescription = ? WHERE propertyid = ?",
        [seoSlug, seoTittle, seoDescription, propertyDescription, Id],
        (err, result) => {
          if (err) {
            console.error("Error While Add Seo Details:", err);
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }
          res.status(200).json({ message: "Seo Details Add successfully" });
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

export const setPropertyCommission = (req, res) => {
  const {
    commissionType,
    commissionAmount,
    commissionPercentage,
    commissionAmountPerSquareFeet,
  } = req.body;

  const Id = parseInt(req.params.id);

  if (!commissionType || isNaN(Id)) {
    return res
      .status(400)
      .json({ message: "Commission type and valid Property ID are required" });
  }

  // Step 1: Fetch property to get required data
  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      const property = results[0];
      let updateSQL = "";
      let updateParams = [];

      // Step 2: Handle different commission types
      if (commissionType === "Fixed") {
        if (!commissionAmount) {
          return res
            .status(400)
            .json({ message: "commissionAmount is required for Fixed type" });
        }

        updateSQL = `UPDATE properties 
                   SET commissionType = ?, commissionAmount = ?, commissionPercentage = NULL, commissionAmountPerSquareFeet = NULL 
                   WHERE propertyid = ?`;
        updateParams = [commissionType, commissionAmount, Id];
      } else if (commissionType === "Percentage") {
        if (!commissionPercentage) {
          return res.status(400).json({
            message: "commissionPercentage is required for Percentage type",
          });
        }

        const totalPrice = parseFloat(property.totalOfferPrice || 0);
        const calculatedAmount = (totalPrice * commissionPercentage) / 100;

        updateSQL = `UPDATE properties 
                   SET commissionType = ?, commissionAmount = ?, commissionPercentage = ?, commissionAmountPerSquareFeet = NULL 
                   WHERE propertyid = ?`;
        updateParams = [
          commissionType,
          calculatedAmount,
          commissionPercentage,
          Id,
        ];
      } else if (commissionType === "PerSquareFeet") {
        if (!commissionAmountPerSquareFeet) {
          return res.status(400).json({
            message:
              "commissionAmountPerSquareFeet is required for PerSquareFeet type",
          });
        }

        const carpetArea = parseFloat(property.carpetArea || 0);
        const calculatedAmount = carpetArea * commissionAmountPerSquareFeet;

        updateSQL = `UPDATE properties 
                   SET commissionType = ?, commissionAmount = ?, commissionAmountPerSquareFeet = ?, commissionPercentage = NULL 
                   WHERE propertyid = ?`;
        updateParams = [
          commissionType,
          calculatedAmount,
          commissionAmountPerSquareFeet,
          Id,
        ];
      } else {
        return res.status(400).json({ message: "Invalid commission type" });
      }

      // Step 3: Run the update
      db.query(updateSQL, updateParams, (err, result) => {
        if (err) {
          console.error("Error While Updating Commission:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(200)
          .json({ message: "Property commission saved successfully" });
      });
    }
  );
};

// Get all images for a specific property
export const getImages = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const propertyId = parseInt(req.params.id);
  if (isNaN(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  const sql = `
    SELECT frontView, sideView, hallView, kitchenView,
           bedroomView, balconyView, nearestLandmark,
           bathroomView, developedAmenities
    FROM properties
    WHERE propertyid = ?
  `;

  db.query(sql, [propertyId], (err, results) => {
    if (err) {
      console.error("Error fetching property images:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json(results[0]);
  });
};

// ** Add Property **
export const updateImages = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const Id = req.params.id;

  if (!Id || isNaN(Id)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const files = await convertImagesToWebp(req.files);

    // Fetch existing property to preserve old images if not replaced
    db.query(
      "SELECT * FROM properties WHERE propertyid = ?",
      [Id],
      (err, result) => {
        if (err) {
          console.error("DB error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "Property not found" });
        }

        const existing = result[0];

        const getImagePaths = (field) =>
          files[field]
            ? JSON.stringify(files[field].map((f) => `/uploads/${f.filename}`))
            : existing[field]; // preserve old image array

        const updateSQL = `
        UPDATE properties SET 
          frontView = ?, sideView = ?, kitchenView = ?, hallView = ?, bedroomView = ?, bathroomView = ?, 
          balconyView = ?, nearestLandmark = ?, developedAmenities = ?, updated_at = ?
        WHERE propertyid = ?
      `;

        const values = [
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
            console.error("Update error:", err);
            return res
              .status(500)
              .json({ message: "Update failed", error: err });
          }

          res
            .status(200)
            .json({ message: "Property images updated successfully" });
        });
      }
    );
  } catch (err) {
    console.error("Image conversion error:", err);
    return res
      .status(500)
      .json({ message: "File conversion failed", error: err });
  }
};

// Delete Images
export const deleteImages = (req, res) => {
  const Id = parseInt(req.params.id);
  const imageType = req.query.type; // use query param instead of req.body

  if (isNaN(Id)) {
    return res.status(400).json({ message: "Invalid Property ID" });
  }

  if (!imageType) {
    return res.status(400).json({ message: "Missing image type" });
  }

  // Fetch the image array string
  db.query(
    `SELECT ?? FROM properties WHERE propertyid = ?`,
    [imageType, Id],
    (err, result) => {
      if (err) {
        console.error("Error fetching images:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      const images = JSON.parse(result[0][imageType] || "[]");

      if (!images.length) {
        return res.status(404).json({ message: "No images to delete" });
      }

      // Delete image files from filesystem
      images.forEach((imgPath) => {
        const fullPath = path.join(process.cwd(), imgPath);
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.warn(`Could not delete file: ${fullPath}`, err.message);
          }
        });
      });

      // Update DB to remove image references
      db.query(
        `UPDATE properties SET ?? = ? WHERE propertyid = ?`,
        [imageType, JSON.stringify([]), Id],
        (err) => {
          if (err) {
            console.error("Error updating DB:", err);
            return res
              .status(500)
              .json({ message: "DB update failed", error: err });
          }

          res.status(200).json({ message: "Images deleted successfully" });
        }
      );
    }
  );
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
