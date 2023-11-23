import PostCard from "@/components/PostCard";
import PostDetail from "@/partials/app/Post/PostDetail";
import { getPostById } from "@/services/postService";
import store from "@/store";
import { posts } from "@/utils/fakeData/Post";
import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { AxiosResponse } from "axios";
import PostReactCounts from "@/components/PostReactCounts";
import PostReacts from "@/components/PostReacts";
import PostCommentsList from "@/partials/app/Post/PostCommentsList";
import { getComments } from "@/services/commentServices";
import PostCommentField from "@/components/PostCommentField";
import ReactIcon from "@/components/ReactIcon";
import { ReactType } from "@/constants/Others";

describe("PostCard Component", () => {
  const post = posts[0];
  test("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <PostCard post={post} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});

describe("PostReact Component", () => {
  const post = posts[0];
  test("Co thuoc tinh iconCustomClassName", () => {
    const { container } = render(
      <PostReactCounts
        likes={1000}
        comments={1000}
        shares={1000}
        iconCustomClassName="bg-white"
      />
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });

  test("Co thuoc tinh customClassName", () => {
    const { container } = render(
      <PostReactCounts
        likes={1000}
        comments={1000}
        shares={1000}
        customClassName="bg-white"
      />
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });

  test("Khi click vao comment thì goi hàm handleComment", () => {
    const handleComment = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <PostReacts postId={1} onChange={onChange} onComment={handleComment} />
      </Provider>
    );
    const comment = container.querySelector(".comment");
    fireEvent.click(comment!);
    expect(handleComment).toHaveBeenCalled();
  });

  test("Khi click vao share thì goi hàm handleShare", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <PostReacts postId={1} onChange={onChange} />
      </Provider>
    );
    const share = container.querySelector(".share");
    fireEvent.click(share!);
    // expect().toHaveBeenCalled();
  });
});

jest.mock("../../src/services/commentServices", () => ({
  getComments: jest.fn(),
}));

// Mock the `Comment` component
jest.mock("../../src/components/Comment", () => (props: any) => (
  <div data-testid="comment">{props.comment.content}</div>
));

describe("PostCommentField Component", () => {
  const post = posts[0];
  test("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <PostCommentField
          postId={post.id}
          onChange={() => {}}
          onSend={() => {}}
        />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const element = container.querySelector(".on-submit");
    fireEvent.click(element!);
  });
});

describe("ReactIcon Component", () => {
  const renderLabel = (reactType: ReactType) => {
    switch (reactType) {
      case ReactType.like:
        return "Liked";
      case ReactType.love:
        return "Loved";
      case ReactType.angry:
        return "Angry";
      case ReactType.cute:
        return "Cute";
      case ReactType.sad:
        return "Sad";
      case ReactType.wow:
        return "Wow";
      default:
        return "Like";
    }
  };
  test.each([
    [ReactType.like, "Liked", "FaThumbsUp"],
    [ReactType.love, "Loved", "EmojiLoveImg"],
    [ReactType.cute, "Cute", "EmojiCuteImg"],
    [ReactType.angry, "Angry", "EmojiAngryImg"],
    [ReactType.sad, "Sad", "EmojiCryImg"],
    [ReactType.wow, "Wow", "EmojiWowImg"],
  ])(
    "renders correct icon and label for reactType %p",
    (reactType: any, expectedLabel: string, expectedIcon: any) => {
      render(<ReactIcon reactType={reactType} />);
      console.log(renderLabel(reactType));
      screen.getByText(renderLabel(reactType));
      // if (reactType === ReactType.like) {
      //   expect(getByText(expectedIcon)).toBeInTheDocument();
      // } else {
      //   expect(getByAltText(expectedIcon)).toBeInTheDocument();s
      // }
    }
  );
});

// type MockGetPostById = jest.Mock<
//   ReturnType<typeof getPostById>,
//   Parameters<typeof getPostById>
// >;
// jest.mock("../../src/services/postService", () => ({
//   getPostById: jest.fn(),
// }));
