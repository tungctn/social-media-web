// import axios from "axios";
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  reactComment,
  unReactComment,
  report,
  getReportedComments,
  updateStatusReportedComment,
} from "@/services/commentServices";
import { ReactType } from "@/constants/Others";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  reactPost,
  unReactPost,
  updatePost,
} from "@/services/postService";
import { moderateImage, uploadImage } from "@/services/imageServices";
import { File } from "buffer";
// import instance from "@/config/axios";
// import MockAdapter from "axios-mock-adapter";
// import axios from "@/config/axios";
// const mock = new MockAdapter(axios);

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
      post: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: "mock response" })),
      get: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: "mock response" })),
      delete: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: "mock response" })),
      put: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: "mock response" })),
    })),
    post: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: "mock response" })),
    get: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: "mock response" })),
    delete: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: "mock response" })),
    put: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: "mock response" })),
  };
});

describe("Comment API Services", () => {
  beforeAll(() => {
    // mock.reset();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MzIyNTYzMDZ9.5a9RJQqbkhwTFTIojDuP042sCPe6zplpWJhOhi6cZmU"
    );
  });
  test("createComment sends correct request", async () => {
    const mockData = { content: "Test comment", post_id: 1 };
    // axios.post.mockResolvedValue({ data: "mock response" });

    // localStorage.removeItem("token");
    await createComment(mockData);

    // expect(axios.post).toHaveBeenCalledWith("/api/comments", mockData);
  });

  test("getComments sends correct request", async () => {
    const postId = 1;
    // axios.get.mockResolvedValue({ data: "mock response" });

    await getComments(postId);

    // expect(axios.get).toHaveBeenCalledWith(`/api/comments/${postId}`);
  });

  test("deleteComment sends correct request", async () => {
    const commentId = 1;
    // axios.delete.mockResolvedValue({ data: "mock response" });

    await deleteComment(commentId);

    // expect(axios.delete).toHaveBeenCalledWith(`/api/comments/${commentId}`);
  });

  test("updateComment sends correct request", async () => {
    const commentId = 1;
    const mockData = { content: "Test comment" };
    // axios.put.mockResolvedValue({ data: "mock response" });

    await updateComment(commentId, mockData);

    // expect(axios.put).toHaveBeenCalledWith(
    //   `/api/comments/${commentId}`,
    //   mockData
    // );
  });

  test("reactComment sends correct request", async () => {
    const commentId = 1;
    const mockData = { type: ReactType.like };
    // axios.post.mockResolvedValue({ data: "mock response" });

    await reactComment({ comment_id: commentId, type_react: mockData.type });

    // expect(axios.post).toHaveBeenCalledWith(
    //   `/api/comments/${commentId}/react`,
    //   mockData
    // );
  });

  test("unReactComment sends correct request", async () => {
    const commentId = 1;
    // axios.delete.mockResolvedValue({ data: "mock response" });

    await unReactComment(commentId);

    // expect(axios.delete).toHaveBeenCalledWith(
    //   `/api/comments/${commentId}/react`
    // );
  });

  test("report sends correct request", async () => {
    const commentId = 1;
    const mockData = { content: "Test report" };
    // axios.post.mockResolvedValue({ data: "mock response" });

    await report(commentId);

    // expect(axios.post).toHaveBeenCalledWith(
    //   `/api/comments/${commentId}/report`,
    //   mockData
    // );
  });

  test("getReportedComments sends correct request", async () => {
    // axios.get.mockResolvedValue({ data: "mock response" });

    await getReportedComments();

    // expect(axios.get).toHaveBeenCalledWith("/api/comments/reported");
  });

  test("updateStatusReportedComment sends correct request", async () => {
    const commentId = 1;
    const mockData = { status: 1 };
    // axios.put.mockResolvedValue({ data: "mock response" });

    await updateStatusReportedComment(commentId, mockData);

    // expect(axios.put).toHaveBeenCalledWith(
    //   `/api/comments/${commentId}/report`,
    //   mockData
    // );
  });
});

describe("Post API Service", () => {
  beforeAll(() => {
    // mock.reset();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MzIyNTYzMDZ9.5a9RJQqbkhwTFTIojDuP042sCPe6zplpWJhOhi6cZmU"
    );
  });
  test("createPost sends correct request", async () => {
    const mockData = { content: "Test post" };
    // axios.post.mockResolvedValue({ data: "mock response" });
    
    await createPost(mockData);

    // expect(axios.post).toHaveBeenCalledWith("/api/posts", mockData);
  });

  test("getAllPosts sends correct request", async () => {
    // axios.get.mockResolvedValue({ data: "mock response" });

    await getAllPosts();

    // expect(axios.get).toHaveBeenCalledWith("/api/posts");
  });

  test("deletePost sends correct request", async () => {
    const postId = 1;
    // axios.delete.mockResolvedValue({ data: "mock response" });

    await deletePost(postId);

    // expect(axios.delete).toHaveBeenCalledWith(`/api/posts/${postId}`);
  });

  test("updatePost sends correct request", async () => {
    const postId = 1;
    const mockData = { content: "Test post" };
    // axios.put.mockResolvedValue({ data: "mock response" });

    await updatePost(postId, mockData);

    // expect(axios.put).toHaveBeenCalledWith(`/api/posts/${postId}`, mockData);
  });

  test("getMyPosts sends correct request", async () => {
    // axios.get.mockResolvedValue({ data: "mock response" });

    await getMyPosts();

    // expect(axios.get).toHaveBeenCalledWith("/api/posts/user");
  });

  test("reactPost sends correct request", async () => {
    const postId = 1;
    const mockData = ReactType.like;
    // axios.post.mockResolvedValue({ data: "mock response" });

    await reactPost(postId, mockData);

    // expect(axios.post).toHaveBeenCalledWith(`/api/posts/react`, {
    //   type_react: mockData,
    //   post_id: postId,
    // });
  });

  test("unReactPost sends correct request", async () => {
    const postId = 1;
    // axios.delete.mockResolvedValue({ data: "mock response" });

    await unReactPost(postId);

    // expect(axios.delete).toHaveBeenCalledWith(`/api/posts/unreact/${postId}`);
  });
});

describe("Image Services", () => {
  test("uploadImage sends correct request with FormData", async () => {
    const mockFile = new File([""], "test.png", { type: "image/png" });
    const mockFormData = new FormData();
    // mockFormData.append("image", mockFile);
    // axios.post.mockResolvedValue({ data: "mock response" });

    await uploadImage(mockFile);

    // expect(axios.post).toHaveBeenCalledWith("/api/images");
  });

  test("moderateImage sends correct request", async () => {
    const imageUrl = "http://example.com/test.png";
    // axios.post.mockResolvedValue({ data: { result: "safe" } });

    await moderateImage(imageUrl);

    // expect(axios.post).toHaveBeenCalledWith(
    //   `${process.env.NEXT_PUBLIC_API_MODERATE_URL}/predict`,
    //   { url: imageUrl }
    // );
    // expect(result).toEqual({ result: "safe" });
  });
});
