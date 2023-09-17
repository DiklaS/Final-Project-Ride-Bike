const normalizeUser = (userData) => {
  if (!userData.name) {
    userData.name = {};
  }
  userData.name = {
    ...userData.name,
    middleName: userData.name.middleName || "",
  };
  if (!userData.image) {
    userData.image = {};
  }
  userData.image = {
    url:
      userData.image.url ||
      "https://cdn.pixabay.com/photo/2020/10/07/20/53/bike-5636252_1280.png",
    alt: userData.image.alt || "Profile image",
  };
  if (!userData.address) {
    userData.address = {};
  }
  userData.address = {
    ...userData.address,
    state: userData.address.state || "",
  }
  return {
    ...userData,
    /* address: {
      ...userData.address,
      state: userData.address.state || "not defined",
    }, */
  };
};

module.exports = normalizeUser;
