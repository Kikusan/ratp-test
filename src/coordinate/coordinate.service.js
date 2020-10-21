const makeBoredService = ({ coordinateProvider } = {}) => {
  if (!coordinateProvider) {
    throw new Error("makeCoordinateService");
  }

  const api = {
    get: async (location) => {
      const data = await coordinateProvider.get(location);
      return data.records;
    },
  };

  return api;
};

module.exports = makeBoredService;
