const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const usersValidationService = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
//const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser");
const _ = require("lodash");
const nodemailer = require("nodemailer");
//const {generateToken} = require("../../utils/token/jwt")
const { verifyToken, generateToken } = require("../../utils/token/tokenService");


const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: "diklalavy@gmail.com", 
    pass: "qsgyweljdngjrgbc", 
  },
});

//1. REGISTER USER
router.post("/", async (req, res) => {
  try {
    const existingUser = await usersServiceModel.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: "The email has already been taken by another user." });
    } 
    await usersValidationService.registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    const newUser = await usersServiceModel.registerUser(req.body);
    res.send(_.pick(newUser, ["_id", "name", "phone", "email", "image", "address", "isBusiness"]));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    await usersValidationService.loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("Invalid email and/or password.");

    const currentTime = Date.now();
    const blockDuration = 24 * 60 * 60 * 1000; 

    if (userData.loginAttempts >= 3 && userData.blockExpiresAt > currentTime) {
      throw new CustomError(
        `Account blocked for 24 hours. Please try again later.`
      );
    }

    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password  
    );
    if (!isPasswordMatch) {
      userData.loginAttempts = (userData.loginAttempts || 0) + 1;
      
      if (userData.loginAttempts >= 3) {
        userData.blockExpiresAt = currentTime + blockDuration;
      } 

    await usersServiceModel.updateUser(userData._id, userData);
      throw new CustomError("Invalid email and/or password.");
    }

    // Reset login attempts upon successful login
    userData.loginAttempts = 0;
    userData.blockExpiresAt = null;
    await usersServiceModel.updateUser(userData._id, userData);

    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      imageUrl: userData.image.url,
      imageAlt: userData.image.alt,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

//3. GET ALL USERS
router.get("/", authmw,
permissionsMiddlewareUser(true, false),
async (req, res) => {
  try {
    const allUsers = await usersServiceModel.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

//4. GET USER
router.get("/:id", authmw,
permissionsMiddlewareUser(true, true),
async (req, res) => {
  try {
    await usersValidationService.userIdValidation(req.params.id);
    const userFromDB = await usersServiceModel.getUserById(req.params.id);
    if (!userFromDB) {
      res.status(404).json("User not found");
    } else {
      res.json(userFromDB);
    }  
  } catch (err) {
    res.status(400).json(err);
  }
});

//5. EDIT USER
router.put("/:id", authmw,
permissionsMiddlewareUser(true, true),
async (req, res) => {
  try {
    let normalUser = await normalizeUser(req.body);
    await usersValidationService.userIdValidation(req.params.id);
    await usersValidationService.editUserValidation(normalUser);
    const userFromDB = await usersServiceModel.updateUser(
      req.params.id,
      req.body
    );
    res.json(userFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

//6. CHANGE ISADMIN STATUS
router.patch("/:id", authmw, 
permissionsMiddlewareUser(true, true),
async (req, res) => {
  try {
    await usersValidationService.userIdValidation(req.params.id);
    const loggedInUserId = req.userData._id; 

    let user = await usersServiceModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.isAdmin = !user.isAdmin;
    user = await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//7. DELETE USER
router.delete(
  "/:id", authmw,
  permissionsMiddlewareUser(true, false),
  async (req, res) => {
    try {
      await usersValidationService.userIdValidation(req.params.id);
      const userFromDB = await usersServiceModel.deleteUser(req.params.id);
      if (userFromDB) {
        res.json({ msg: "user was deleted" });
      } else {
        res.status(404).json({ msg: "could not find the user" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  } 
);
//7. RESET PASSWORD EMAIL 
 router.post("/password/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const resetToken = await generateToken({ userEmail }, "1h"); // Implement your token generation logic

    const user = await usersServiceModel.getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Send the password reset email
    const resetLink = `http://localhost:3000/password/${resetToken}`;
    const mailOptions = {
      from: "diklalavy@gmail.com", 
      to: "diklalavy@gmail.com", 
      subject: "Password Reset Request",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password reset email sent successfully" });
      }
    });
    const resetTokenExpiration = new Date(Date.now() + 4*60*60*1000); // 4 hour
    await usersServiceModel.updateUserResetTokenByEmail(userEmail, resetToken, resetTokenExpiration)
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: err.message });
  }
}); 
//8. RESET PASSWORD 
router.post('/password_reset/', async (req, res) => {
  try {
    const { resetToken, newPassword} = req.body;
    const isValidToken = await verifyToken(resetToken);
    console.log(resetToken)
    if (!isValidToken) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
    const hashedPassword = await hashService.generateHash(newPassword);
    const userEmail = isValidToken.userEmail;
    await usersServiceModel.updatePasswordByEmail(userEmail, hashedPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
}); 
//9. CONTACT MESSAGE EMAIL
router.post('/sendEmail', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: 'diklalavy@gmail.com', // Replace with your email address
      to: 'diklalavy@gmail.com', // Receiver's email
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email.' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully.' });
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
