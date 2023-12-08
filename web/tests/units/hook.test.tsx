import useForceUpdate from "@/hooks/useForceUpdate";
import usePostModal from "@/hooks/usePostModal";
import { render, act } from "@testing-library/react";
import { useEffect, useState } from "react";

const TestComponent = () => {
  const forceUpdate = useForceUpdate();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((count) => count + 1);
  }, [forceUpdate]);

  return <div>{renderCount}</div>;
};

const TestComponent1 = () => {
  const { isOpen, isEdit, postDetail, onOpen, onClose, onEdit } =
    usePostModal();

  return (
    <div>
      <span>isOpen: {isOpen ? "true" : "false"}</span>
      <span>isEdit: {isEdit ? "true" : "false"}</span>
      <button onClick={onOpen}>Open</button>
      <button onClick={onClose}>Close</button>
      <button onClick={() => onEdit({ id: 1, content: "Test Post" })}>
        Edit
      </button>
      {postDetail && <span>Post Detail: {JSON.stringify(postDetail)}</span>}
    </div>
  );
};

describe("useForceUpdate", () => {
  it("Function useForceUpdate", () => {
    const forceUpdate = useForceUpdate();
    const { container } = render(<TestComponent />);

    expect(container).toHaveTextContent("1");
  });
});

describe("usePostModal", () => {
  it("updates state correctly for each action", () => {
    const { getByText } = render(<TestComponent1 />);

    // Test opening the modal
    act(() => {
      getByText("Open").click();
    });
    expect(getByText("isOpen: true")).toBeInTheDocument();

    // Test closing the modal
    act(() => {
      getByText("Close").click();
    });
    expect(getByText("isOpen: false")).toBeInTheDocument();

    // Test editing a post
    act(() => {
      getByText("Edit").click();
    });
    expect(getByText("isOpen: true")).toBeInTheDocument();
    expect(getByText("isEdit: true")).toBeInTheDocument();
    expect(
      getByText('Post Detail: {"id":1,"content":"Test Post"}')
    ).toBeInTheDocument();
  });
});
