import "dotenv/config";
const coordinateProvider = require("./coordinate.provider");

describe("Coordinate Provider", () => {
  let coordinateProxy;

  describe("get", () => {
    let expected;
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
        it("should return array of jobs", () => {
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
          result = await coordinateProxy.get("val de fontenay");
        });
        it("should call fetchMock", () => {
          expect(fetchMock).toHaveBeenCalledWith(
            `https://data.ratp.fr/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&facet=stop_name&q=val+de+fontenay`
          );
        });
        it("should return array of jobs", () => {
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
