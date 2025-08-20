import db from "../../config/dbconnect.js";
import moment from "moment";
import fs from "fs";
import path from "path";
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
  const sql = `SELECT properties.*, builders.company_name FROM properties 
               INNER JOIN builders ON properties.builderid = builders.builderid WHERE properties.projectpartnerid = ? 
               ORDER BY properties.propertyid DESC`;
  db.query(sql, [req.user.id], (err, result) => {
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
  if (isNaN(Id))
    return res.status(400).json({ message: "Invalid Property ID" });

  const sql = `SELECT properties.*, builders.company_name FROM properties 
   INNER JOIN builders on builders.builderid = properties.builderid
   WHERE properties.propertyid = ?`;
  db.query(sql, [Id], (err, result) => {
    if (err) {
      console.error("Error fetching property:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(result[0]);
  });
};

export const addProperty = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const files = await convertImagesToWebp(req.files);
  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  const Id = req.body.propertyid ? parseInt(req.body.propertyid) : null;

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
  
  // Property Registration Fee is 1% or Maximum 30,000 Rs
  let registrationFees;
  if (totalOfferPrice > 3000000) {
    registrationFees = (30000 / totalOfferPrice) * 100; // percentage for ₹30,000
  } else {
    registrationFees = 1; // 1%
  }

  // calculate EMI On OFFER PRICE
  const emi = calculateEMI(Number(totalOfferPrice));

  // Prepare image URLs
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
    "SELECT * FROM properties WHERE propertyName = ?",
    [propertyName],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });
      if (result.length > 0)
        return res.status(409).json({ message: "Property name already exists!" });

      const insertSQL = `
      INSERT INTO properties ( projectpartnerid,
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        partnerId,
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
        registrationFees,
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
          if (err.code === "ER_DUP_ENTRY") {
            // DB caught duplicate propertyName
            return res.status(409).json({ message: "Property name already exists!" });
          }
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

// **Update Property**
export const update = async (req, res) => {
  const currentdate = moment().format("YYYY-MM-DD HH:mm:ss");
  const files = await convertImagesToWebp(req.files);
  const partnerId = req.user.id;
  if (!partnerId) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

  const Id = req.params.id ? parseInt(req.params.id) : null;

  if (!Id) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

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

  // Property Registration Fee is 1% or Maximum 30,000 Rs
  let registrationFees;
  if (totalOfferPrice > 3000000) {
    registrationFees = (30000 / totalOfferPrice) * 100; // percentage for ₹30,000
  } else {
    registrationFees = 1; // 1%
  }

  // calculate EMI On OFFER PRICE
  const emi = calculateEMI(Number(totalOfferPrice));

  // Prepare image URLs
  const getImagePaths = (field, existing) =>
    files && files[field]
      ? JSON.stringify(files[field].map((f) => `/uploads/${f.filename}`))
      : existing;

  // Fetch existing property to preserve images if not reuploaded
  db.query(
    "SELECT * FROM properties WHERE propertyid = ?",
    [Id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Database error", error: err });

      if (result.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      let approve;
      if (
        result[0].approve === "Rejected" ||
        result[0].approve === "Not Approved"
      ) {
        approve = "Not Approved";
      } else {
        approve = "Approved";
      }

      const existing = result[0];

      const updateSQL = `
      UPDATE properties SET rejectreason=NULL, approve=?,
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
        approve,
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
        registrationFees,
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
        getImagePaths("frontView", existing.frontView),
        getImagePaths("sideView", existing.sideView),
        getImagePaths("kitchenView", existing.kitchenView),
        getImagePaths("hallView", existing.hallView),
        getImagePaths("bedroomView", existing.bedroomView),
        getImagePaths("bathroomView", existing.bathroomView),
        getImagePaths("balconyView", existing.balconyView),
        getImagePaths("nearestLandmark", existing.nearestLandmark),
        getImagePaths("developedAmenities", existing.developedAmenities),
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

// **Add Property**
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

// **Add Property Images**
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
