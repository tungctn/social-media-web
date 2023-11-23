import MockAdapter from "axios-mock-adapter";
import axios from "@/config/axios";
import { ReactType } from "@/constants/Others";

const mock = new MockAdapter(axios);

describe("Axios Interceptors Test", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("should add an Authorization header if token is present", async () => {
    const token = "test-token";
    localStorage.setItem("token", token);

    mock.onGet("/test-token").reply((config) => {
      expect(config.headers?.Authorization).toBe(`Bearer ${token}`);
      return [200, {}];
    });

    await axios.get("/test-token");
  });

  test("should not add an Authorization header if token is not present", async () => {
    localStorage.removeItem("token");

    mock.onGet("/test-no-token").reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, {}];
    });

    await axios.get("/test-no-token");
  });

  test("should handle a response with status 204 and return true", async () => {
    mock.onGet("/test-204").reply(204);

    const response = await axios.get("/test-204");
    expect(response).toBe(true);
  });

  test("should handle a response and return data", async () => {
    const responseData = { message: "Success" };

    mock.onGet("/test-data").reply(200, responseData);

    const response = await axios.get("/test-data");
    expect(response).toEqual(responseData);
  });
  test("should handle a response error", async () => {
    mock.onGet("/test-error").reply(400);

    try {
      await axios.get("/test-error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
