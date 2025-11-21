const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@raynott.com" });

    if (!adminExists) {
      await User.create({
        name: "Raynott Admin",
        email: "admin@raynott.com",
        password: "Admin@123",
        isAdmin: true
      });

      console.log("Default Admin Created: admin@raynott.com");
    } else {
      console.log("ℹDefault Admin Already Exists");
    }
  } catch (error) {
    console.error("Admin Seeder Error:", error.message);
  }
};

module.exports = seedAdmin;
