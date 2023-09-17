const Item = require("./Item");

const createCard = (cardToSave) => {
  let item = new Item(cardToSave);
  return item.save();
};

const getAllCards = () => {
  return Item.find();
};

const getMyCards = (userId) => {
  return Item.find(userId);
};

const getCardById = (id) => {
  return Item.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Item.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  return Item.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const deleteCard = (id) => {
  return Item.findByIdAndDelete(id);
};

const changeBizCard = (bizId, bizNumberToUpdate) => {
  return Item.findByIdAndUpdate(Number(bizId), bizNumberToUpdate)
} 





module.exports = {
  createCard,
  getAllCards,
  getMyCards,
  getCardById,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  changeBizCard
  
};
