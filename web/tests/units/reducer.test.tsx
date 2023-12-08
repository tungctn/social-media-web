import authReducer from "@/store/reducers/authReducer";
import { LOG_IN, LOG_OUT, CHECK_LOGED_IN } from "@/store/constants/authTypes";
import postReducer from "@/store/reducers/postReducer";
import { GET_POSTS } from "@/store/constants/postType";

describe("authReducer", () => {
  // Kiểm tra trạng thái khởi tạo
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({});
  });

  // Kiểm tra LOG_IN
  it("should handle LOG_IN", () => {
    const startAction = {
      type: LOG_IN,
      success: true,
    };
    expect(authReducer({}, startAction)).toEqual({ isLogedIn: true });
  });

  // Kiểm tra LOG_OUT
  it("should handle LOG_OUT", () => {
    const startAction = {
      type: LOG_OUT,
    };
    expect(authReducer({}, startAction)).toEqual({ isLogedIn: false });
  });

  // Kiểm tra CHECK_LOGED_IN
  it("should handle CHECK_LOGED_IN", () => {
    const userInfo = { name: "User1", email: "user1@example.com" };
    const startAction = {
      type: CHECK_LOGED_IN,
      userInfo,
    };
    expect(authReducer({}, startAction)).toEqual({
      isLogedIn: Boolean(userInfo),
      user: userInfo,
    });
  });

  // Kiểm tra case mặc định
  it("should handle unknown action", () => {
    const unknownAction = { type: "UNKNOWN" };
    expect(authReducer({}, unknownAction)).toEqual({});
  });
});

describe("postReducer", () => {
  // Kiểm tra trạng thái khởi tạo
  it("should return the initial state", () => {
    expect(postReducer(undefined, {})).toEqual({ posts: [] });
  });

  // Kiểm tra GET_POSTS
  it("should handle GET_POSTS", () => {
    const posts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    const startAction = {
      type: GET_POSTS,
      payload: posts,
    };
    expect(postReducer({}, startAction)).toEqual({ posts });
  });

  // Kiểm tra case mặc định
  it("should handle unknown action", () => {
    const unknownAction = { type: "UNKNOWN" };
    expect(postReducer({}, unknownAction)).toEqual({ posts: [] });
  });
});
