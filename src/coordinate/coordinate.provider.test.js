import "dotenv/config";
const coordinateProvider = require("./coordinate.provider");

describe("Coordinate Provider", () => {
  let coordinateProxy;

  describe("get", () => {
    let result;
    let fetchMock;
    let querystringMock;

    afterEach(() => {
      fetchMock.mockRestore();
    });
    describe("on success", () => {
      describe("without params", () => {
        beforeEach(async () => {
          fetchMock = jest.fn().mockReturnValue({
            json: jest.fn(() => ({ data: [{}, {}] })),
            status: 200,
          });
          querystringMock = {
            stringify: jest.fn(() => ""),
          };
          const coordinateProxy = coordinateProvider({
            fetch: fetchMock,
            querystring: querystringMock,
          });
          result = await coordinateProxy.get();
        });
        it("should call fetchMock", () => {
          expect(fetchMock).toHaveBeenCalled();
        });
        it("should return array of coordinates", () => {
          expect(result).toEqual({ data: [{}, {}] });
        });
      });
      describe("with params", () => {
        beforeEach(async () => {
          fetchMock = jest.fn().mockReturnValue({
            json: jest.fn(() => ({ data: [{}, {}] })),
            status: 200,
          });
          querystringMock = {
            stringify: jest.fn(() => ""),
          };
          const coordinateProxy = coordinateProvider({
            fetch: fetchMock,
            querystring: querystringMock,
          });
          const params = {
            location: "val de fontenay",
            page: 3,
            itemPerPage: 20,
            sortByName: "desc",
          };
          result = await coordinateProxy.get(params);
        });
        it("should call fetchMock", () => {
          expect(fetchMock).toHaveBeenCalledWith(
            `https://data.ratp.fr/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&facet=stop_name&q=val+de+fontenay&rows=20&start=40&sort=-stop_name`
          );
        });
        it("should return array of coordinates", () => {
          expect(result).toEqual({ data: [{}, {}] });
        });
      });
    });
    describe("on fail", () => {
      beforeEach(() => {
        fetchMock = jest.fn().mockReturnValue({
          json: jest.fn(() => ({})),
          status: 500,
        });
        querystringMock = {
          stringify: jest.fn(() => ""),
        };
        coordinateProxy = coordinateProvider({
          fetch: fetchMock,
          querystring: querystringMock,
        });
      });

      it("should throw", async () => {
        await expect(coordinateProxy.get()).rejects.toThrow();
      });
    });
  });
});
