const { FakeResponse, FakeRequest } = require("../utils/test.utils");
const makeCoordinateController = require("./coordinate.controller");

describe("Coordinate Controller", () => {
  let request, response;
  let coordinateController;
  let coordinateService;
  let next;
  let error;

  describe("get", () => {
    describe("when success", () => {
      beforeEach(() => {
        request = new FakeRequest({
          query: {},
        });
        response = new FakeResponse();
        coordinateService = {
          get: jest.fn(() => Promise.resolve([{}, {}])),
        };
        coordinateController = makeCoordinateController({
          coordinateService,
        });
        coordinateController.get(request, response);
      });
      describe("no params", () => {
        it("should call coordinateService.get", () => {
          expect(coordinateService.get).toHaveBeenCalled();
        });
        it("should return status 200", () => {
          expect(response.__status).toEqual(200);
        });
        it("should return an array of coordinates", () => {
          expect(response.__content).toEqual([{}, {}]);
        });
      });
      describe("with params", () => {
        beforeEach(() => {
          request = new FakeRequest({
            query: {
              location: "neuilly-plaisance",
              "sort-by-name": "desc",
              page: 2,
              "item-per-page": 20,
            },
          });
          coordinateController.get(request, response);
        });
        it("should call coordinateService.get", () => {
          expect(coordinateService.get).toHaveBeenCalledWith({
            location: "neuilly-plaisance",
            sortByName: "desc",
            page: 2,
            itemPerPage: 20,
          });
        });
      });
    });
    describe("when failed", () => {
      beforeEach(() => {
        error = new Error();
        coordinateService = {
          get: jest.fn(() => Promise.reject(error)),
        };
        next = jest.fn();
        coordinateController = makeCoordinateController({ coordinateService });
        coordinateController.get(request, response, next);
      });
      it("should call next with error", () => {
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
