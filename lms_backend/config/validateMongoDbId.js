const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId(id);
  if (!isValid) throw new Error("This Id is not valid ot it is missing");
};

module.exports = validateMongoDbId;
