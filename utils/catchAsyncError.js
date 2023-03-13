module.exports = Func => {
  return (req, res, next) => {
    Func(req, res, next).catch(next);
  };
};
