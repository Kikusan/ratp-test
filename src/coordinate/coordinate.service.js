const makeBoredService = ({ coordinateProvider } = {}) => {
  if (!coordinateProvider) {
    throw new Error("makeCoordinateService");
  }

  const api = {
    get: async (params) => {
      const data = await coordinateProvider.get(params);
      return formatData(data.records);
    },
  };

  return api;
};

module.exports = makeBoredService;

const formatData = (data) => {
  return data.map((record) => ({
    name: record.fields && record.fields.stop_name,
    coordinates: record.fields && record.fields.stop_coordinates,
    recordid: record.recordid,
    description: record.fields && record.fields.stop_desc,
  }));
};
