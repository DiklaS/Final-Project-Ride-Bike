const CustomError = require("../utils/CustomError");
const { getUserById } = require("../model/usersService/usersService");

const checkIfRegisteredId = async (tokenUserId, paramsUserId, res, next) => {
  try {
    const user = await getUserById(paramsUserId);
    
    if (!user) {
      return res.status(400).json({ msg: "User was not found" });
    }
    if (user._id == tokenUserId) {
      console.log(user)
      next();
    } else {
      res.status(401).json({ msg: "you are not authorized" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsMiddlewareUser = (isAdmin, isRegistered) => {
  return async (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("Must provide userData");
    }
    if (isAdmin && req.userData.isAdmin) {
      
      return next();
    }

    const userParamsId = req.params.id;
    const userTokenId = req.userData._id.toString(); // Convert to string 

    if (isRegistered) {
      return checkIfRegisteredId(userTokenId, userParamsId, res, next);
    }

    res.status(401).json({ msg: "You don't have right authorization" });
  };
};


module.exports = permissionsMiddlewareUser;
