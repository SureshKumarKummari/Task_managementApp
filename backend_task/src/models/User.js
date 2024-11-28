const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Switch to bcryptjs if needed

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    // Log the password before hashing
    console.log('Password to hash:', this.password);

    // Hash the password using bcryptjs
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Hashed password:', this.password);

    next();
  } catch (err) {
    next(err);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  console.log('Comparing passwords:', password, this.password);
  const isMatch = await bcrypt.compare(password, this.password);
  console.log('Password match result:', isMatch);
  return isMatch;
};


module.exports = mongoose.model("User", userSchema);
