const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }
  card.image = {
    url:
      card.image.url ||
      "https://cdn.pixabay.com/photo/2019/04/02/21/47/cyclist-4098989_640.png",
    alt: card.image.alt || "item",
  };
  if (!card.address) {
    card.address = {};
  } 
  card.address = {
    ...card.address,
    state: card.address.state || "not defined"
  };  
  email= card.email || "",
  size= card.size || ""
  return {
    ...card,
    /* address: {
      ...card.address,
      state: card.address.state || "",
    },  */
    
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
