const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};

const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
};

const getMyCards = (userId) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getMyCards(userId);
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardByBizNumber(bizNumber);
  }
};

const updateCard = (id, cardToUpdate) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
};

const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};

const changeBizCard = (bizId, bizNumberToUpdate) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(bizId, bizNumberToUpdate);
  }
};

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
