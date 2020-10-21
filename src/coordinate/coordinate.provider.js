import "dotenv/config";
function makeCoordinateProvider({ fetch } = {}) {
  if (!fetch) {
    throw new error("makeCoordinateProvider");
  }

  const api = {
    get: async (location) => {
      let query = "";
      if (location) {
        const formattedLocation = location.replace(/ /g, "+");
        query = `&q=${formattedLocation}`;
      }

      const response = await fetch(`${process.env.RATP_API}${query}`);

      const result = response.json();
      if (response.status === 200) {
        return result;
      }
      throw new UnexpectedError(result);
    },
  };

  return api;
}

module.exports = makeCoordinateProvider;
