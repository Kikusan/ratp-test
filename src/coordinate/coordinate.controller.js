function makeCoordinateController({ coordinateService } = {}) {
  if (!coordinateService) {
    throw new error("CoordinateController");
  }

  const api = {
    get: async (req, res, next) => {
      const location = req.query.location;
      try {
        const results = await coordinateService.get(location);
        res.status(200).send(results);
      } catch (error) {
        next(error);
      }
    },
  };

  return api;
}

module.exports = makeCoordinateController;
