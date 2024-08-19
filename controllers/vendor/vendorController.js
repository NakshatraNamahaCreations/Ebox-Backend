const vendorSchema = require("../../models/vendor/vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

// Controller for registering a new user
exports.vendorRegister = async (req, res) => {
  try {
    const { vendor_name, email, mobile_number, password, prefession } =
      req.body;

    // Check if the user already exists
    const existingVendor = await vendorSchema.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingMobileNumber = await vendorSchema.findOne({ mobile_number });
    if (existingMobileNumber) {
      return res.status(400).json({ message: "Mobile Number already exists" });
    }
    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newVendor = new vendorSchema({
      vendor_name,
      email,
      password: hashedPassword,
      mobile_number,
      prefession,
    });

    await newVendor.save();

    res.status(200).json({ message: "Registeration Completed", newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller for vendor login
exports.vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Find the vendor by email
    const vendor = await vendorSchema.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "email not match" });
    }
    // console.log("vendor found:", vendor);

    // console.log("user", vendor.password);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password not match" });
    }
    console.log("Password match:", isMatch);
    // Generate JWT token
    const accessToken = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { id: vendor._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      message: "Login Success",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// login with mobile number
exports.loginWithMobile = async (req, res) => {
  const { mobile_number } = req.body;
  try {
    if (!mobile_number) {
      return res.status(400).json({ error: "Mobile number required" });
    }
    // Find the vendor by email
    const vendor = await vendorSchema.findOne({ mobile_number });
    if (!vendor) {
      return res.status(400).json({ message: "mobile number not match" });
    }

    const accessToken = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { id: vendor._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      message: "Login Success",
      accessToken,
      refreshToken,
      vendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllFilteroutVendor = async (req, res) => {
  try {
    const findVendor = req.params.id;
    console.log("findVendor", findVendor);
    const allVendor = await vendorSchema.find();
    const remaingVendor = allVendor.filter(
      (vendor) => vendor._id !== findVendor
    );
    // console.log("remaingVendor", remaingVendor);
    res.status(200).json({ remaingVendor: remaingVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVendorProfile = async (req, res) => {
  try {
    const vendor = await vendorSchema
      .findById({ _id: req.params.id })
      .select("-password");
    if (!vendor) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for updating user profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     const user = await vendorSchema.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//     }).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.updateVendorProfile = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const {
      company_type,
      company_name,
      designation,
      name,
      mca_panel_member_name,
      gst_number,
      pan_number,
      trand_license,
      cin_number,
      moa_number,
    } = req.body;
    let vendor = await vendorSchema.findOne({ _id: vendorId });
    if (!vendor) {
      return res.status(404).json({
        status: 404,
        error: "vendor not found",
      });
    }
    vendor.company_type = company_type || vendor.company_type;
    vendor.company_name = company_name || vendor.company_name;
    vendor.designation = designation || vendor.designation;
    vendor.name = name || vendor.name;
    vendor.mca_panel_member_name =
      mca_panel_member_name || vendor.mca_panel_member_name;
    vendor.gst_number = gst_number || vendor.gst_number;
    vendor.pan_number = pan_number || vendor.pan_number;
    vendor.trand_license = trand_license || vendor.trand_license;
    vendor.cin_number = cin_number || vendor.cin_number;
    vendor.moa_number = moa_number || vendor.moa_number;

    let updatedVendor = await vendorSchema.findOneAndUpdate(
      { _id: vendorId },
      user,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      success: "Details Added",
      data: updatedVendor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    let vendor = await vendorSchema.findOne({ _id: req.params.id });
    if (!vendor) {
      return res.status(404).json({
        status: 404,
        error: "vendor not found",
      });
    }
    let { address } = req.body;

    if (!Array.isArray(address)) {
      address = [address]; // Convert to an array if it's not
    }
    address = address.map((addr) => ({
      ...addr,
      _id: new mongoose.Types.ObjectId(),
    }));

    vendor.address.push(...address);
    await vendor.save();

    res.status(200).json({
      status: true,
      success: "Address saved successfully",
      data: vendor.address,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a user
exports.deleteVendorProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
