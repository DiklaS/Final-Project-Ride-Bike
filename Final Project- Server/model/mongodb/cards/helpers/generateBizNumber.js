const _ = require("lodash");
const Item = require("../Item");

const generateBizNumber = async () => {
  try {
    for (let i = 1000000; i <= 9999999; i++) {
      const randomNumber = _.random(1000000, 9999999);
      let item = await Item.findOne(
        { bizNumber: randomNumber },
        { bizNumber: 1, _id: 0 }
      );
      if (!item) {
        return randomNumber;
      }
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = generateBizNumber;
