const User = require("./Users");
//const hashService = require("../../utils/hash/hashService");

const hashService = require("../../../utils/hash/hashService")


const registerUser = (userData) => {
  const user = new User(userData);
  return user.save({ password: 0 });
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find().select(["-password", "-createdAt", "-__v"]);
};

const getUserById = (id) => {
  return User.findById(id).select(["-password", "-createdAt", "-__v"]);
};

const updateUser = (id, userToUpdate) => {
  //normalize card
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  }).select(["-password", "-createdAt", "-__v"]);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const updateUserResetTokenByEmail = async (email, resetToken, resetTokenExpiration) => {
  console.log(resetToken)
  return User.findOneAndUpdate(
    { email: email }, // Find the user by email
    { $set: { resetToken: resetToken, resetTokenExpiration: resetTokenExpiration } },// Update the reset token and expiration
    { new: true } // Return the updated user
  );
}; 

const updatePasswordByEmail = async (email, newPassword) => {
return User.findOneAndUpdate(
  { email: email },// Find the user by email
  { $set: { password: newPassword} }, // Update the password
  { new: true } // Return the updated user
   
)};  







module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserResetTokenByEmail,
  updatePasswordByEmail
};
