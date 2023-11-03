import PostCard from "@/components/PostCard";
import PostDetail from "@/partials/app/Post/PostDetail";
import { getPostById } from "@/services/postService";
import store from "@/store";
import { posts } from "@/utils/fakeData/Post";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AxiosResponse } from "axios";

describe("PostCard Component", () => {
  const post = posts[0];

  test("should display user post", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText(post.user.full_name)).toBeInTheDocument();
  });

  test("should display post content", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });

  test("should display post image", () => {
    render(<PostCard post={post} />);
    expect(screen.getByTestId("post-image-1").getAttribute("data-src")).toBe(
      post.images[0].url
    );
    expect(screen.getByTestId("post-image-2").getAttribute("data-src")).toBe(
      post.images[1].url
    );
  });
});

type MockGetPostById = jest.Mock<
  ReturnType<typeof getPostById>,
  Parameters<typeof getPostById>
>;
jest.mock("../../src/services/postService", () => ({
  getPostById: jest.fn(),
}));

describe("PostDetail Component", () => {
  const mockPost = posts[0];
  beforeEach(() => {
    (getPostById as MockGetPostById).mockResolvedValue({
      data: { post: mockPost },
    } as AxiosResponse);
  });

  test("renders correctly with a post", async () => {
    const post = await getPostById(mockPost.id);
    render(
      <Provider store={store}>
        <PostDetail open={true} id={mockPost.id} />
      </Provider>
    );
    expect(
      screen.findByText(post.data.post.user.full_name)
    ).resolves.toBeInTheDocument();

    expect(screen.findByText(mockPost.content)).resolves.toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Provider store={store}>
        <PostDetail open={true} id={mockPost.id} onClose={onClose} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("close-button"));
    expect(onClose).toHaveBeenCalled();
  });
});
