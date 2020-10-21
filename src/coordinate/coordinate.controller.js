function makeCoordinateController({ coordinateService } = {}) {
  if (!coordinateService) {
    throw new Error("CoordinateController");
  }

  const api = {
    get: async (req, res, next) => {
      const params = {
        location: req.query.location,
        page: req.query.page,
        itemPerPage: req.query["item-per-page"],
        sortByName: req.query["sort-by-name"],
      };

      try {
        const results = await coordinateService.get(params);
        res.status(200).send(results);
      } catch (error) {
        next(error);
      }
    },
  };

  return api;
}

module.exports = makeCoordinateController;
