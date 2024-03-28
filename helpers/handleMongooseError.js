export const handleErrorMongoose = (err, data, next) => {
  err.status = 400;
  next();
};
