import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostsList from "@/partials/app/HomePage/PostsList";
import PostCard from "@/components/PostCard";
import { posts } from "@/utils/fakeData/Post";
import { Provider } from "react-redux";
import store from "@/store";
import PostDetail from "@/partials/app/Post/PostDetail";
import exp from "constants";

describe("Integration test between PostList and PostDetail", () => {
  test("should display post detail when click on post", () => {
    const post = posts[0];
    render(
      <Provider store={store}>
        <PostCard post={post} />
      </Provider>
    );
    const imageTestIds = ["post-image-1", "post-image-2"];
    const randomTestId =
      imageTestIds[Math.floor(Math.random() * imageTestIds.length)];
    fireEvent.click(screen.getByTestId(randomTestId));
    render(
      <Provider store={store}>
        <PostDetail id={post.id} open={true} />
      </Provider>
    );
    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText(post.user.full_name)).toBeInTheDocument();
  });
});
