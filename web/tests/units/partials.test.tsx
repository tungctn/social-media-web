import { fireEvent, render, waitFor } from "@testing-library/react";
import { getComments } from "@/services/commentServices";
import Comment from "@/components/Comment";
import PostCommentsList from "@/partials/app/Post/PostCommentsList";
import { getPostById } from "@/services/postService";
import { posts } from "@/utils/fakeData/Post";
import PostDetail from "@/partials/app/Post/PostDetail";

jest.mock("../../src/services/commentServices");
jest.mock("../../src/services/postService");

describe("PostCommentsList", () => {
  const mockComments = [
    { id: 1, content: "Comment 1" },
    { id: 2, content: "Comment 2" },
  ];

  beforeEach(() => {
    (getComments as jest.Mock).mockResolvedValue({
      data: { comments: mockComments },
    });
  });

  it("fetches and displays comments", async () => {
    const { getByText } = render(
      <PostCommentsList postId={123} onReply={() => {}} onAction={() => {}} />
    );

    await waitFor(() => {
      mockComments.forEach((comment) => {
        expect(getByText(comment.content)).toBeInTheDocument();
      });
    });
  });

  it("does not fetch comments if postId is not provided", () => {
    render(<PostCommentsList onReply={() => {}} onAction={() => {}} />);

    expect(getComments).not.toHaveBeenCalled();
  });
});

describe("PostDetail", () => {
  const mockPostData = posts[0];

  beforeEach(() => {
    (getPostById as jest.Mock).mockResolvedValue({
      success: true,
      data: { post: mockPostData },
    });
  });

  it("fetches and displays post data", async () => {
    const { getByText } = render(<PostDetail id={1} />);

    await waitFor(() => {
      expect(getByText(mockPostData.content)).toBeInTheDocument();
    });
  });

  // Kiểm tra xử lý khi click vào nút đóng
  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(<PostDetail id={1} onClose={handleClose} />);
    fireEvent.click(getByTestId("close-button"));
    expect(handleClose).toHaveBeenCalled();
  });

  // Kiểm tra khi không có post ID
  it("does not fetch post data if no id is provided", () => {
    render(<PostDetail id={mockPostData.id} />);
    expect(getPostById).not.toHaveBeenCalled();
  });

  // Thêm các test tương tự cho các hàm xử lý khác
});
