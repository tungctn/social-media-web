import CommentComponent from "@/components/Comment";
import CommentActions from "@/components/CommentActions";
import CommentReacts from "@/components/CommentReacts";
import ReactsBox from "@/components/ReactsBox";
import store from "@/store";
import { commentsByPostId } from "@/utils/fakeData/Comment";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

describe("Comment Component", () => {
  test("render component", () => {
    const comment = commentsByPostId[0];
    const { container } = render(
      <Provider store={store}>
        <CommentComponent comment={comment} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});

describe("ReactBox Component", () => {
  test("render component", () => {
    const mockOnReact = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <ReactsBox onReact={mockOnReact} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  // test("Gọi hàm handleAction", () => {
  //   const comment = commentsByPostId[0];
  //   const onAction = jest.fn();
  //   const { container } = render(
  //     <Provider store={store}>
  //       <CommentComponent comment={comment} onAction={onAction} />
  //     </Provider>
  //   );
  //   const btn = container.querySelector(".btn-more");
  //   fireEvent.click(btn!);
  //   expect(onAction).toHaveBeenCalled();
  // });
});

describe("Goi hàm", () => {
  test("Gọi hàm onAction", () => {
    const comment = commentsByPostId[0];
    const onAction = jest.fn();
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} onAction={onAction} />
      </Provider>
    );
    const Action = render(
      <Provider store={store}>
        <ReactsBox onReact={onAction} />
      </Provider>
    );
    fireEvent.click(Action.container.querySelector(".text-deep-lilac")!);
    // Action.getByText("Edit");
    const element = screen.getByText("Report");
    fireEvent.click(element);
    expect(onAction).toHaveBeenCalled();
  });

  test("Gọi hàm onReply", () => {
    const comment = commentsByPostId[0];
    const onReply = jest.fn();
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} onReply={onReply} />
      </Provider>
    );
    const element = screen.getByText("Reply");
    fireEvent.click(element);
    expect(onReply).toHaveBeenCalled();
  });

  test("Gọi hàm handleShowReply", () => {
    const comment = commentsByPostId[1];
    render(
      <Provider store={store}>
        <CommentComponent comment={comment} />
      </Provider>
    );
    const element = screen.getByText("Watch the reply (2)");
    fireEvent.click(element);
  });

  test("Gọi hàm handleReactIcon", () => {
    const comment = commentsByPostId[0];
    const onReact = jest.fn();
    render(
      <Provider store={store}>
        <CommentReacts commentId={comment.id} onReact={onReact} />
      </Provider>
    );
    const { container } = render(
      <Provider store={store}>
        <ReactsBox onReact={onReact} />
      </Provider>
    );
    const element = container.querySelector(".text-deep-lilac");
    fireEvent.click(element!);
    const listImgElement = container.querySelectorAll("img");
    listImgElement.forEach((img, index) => {
      fireEvent.click(img);
      expect(onReact).toHaveBeenCalled();
    });
  });
});

describe("Test Comment Component Action", () => {
  test("Gọi hàm onAction", () => {
    const comment = commentsByPostId[0];
    const onAction = jest.fn();
    const onChange = jest.fn();
    
    render(
      <Provider store={store}>
        <CommentActions authorId={7} commentId={1} onChange={onChange} />
      </Provider>
    );
    const element = screen.getByText("Edit");
    fireEvent.click(element);
    expect(onAction).toHaveBeenCalled();
  });
});
