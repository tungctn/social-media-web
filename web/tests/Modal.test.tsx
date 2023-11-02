import Modal from "@/components/Modal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("Modal Component", () => {
  test("should display modal when isOpen is true", () => {
    render(<Modal isOpen={true} title="Test Modal" />);
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("should not display modal when isOpen is false", () => {
    render(<Modal isOpen={false} />);
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  test("should call onClose when close button is clicked", async () => {
    const onCloseMock = jest.fn();
    render(<Modal isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByTestId("close-butto"));
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test("should display title, body, and footer", () => {
    const title = "Test Title";
    const body = <div>Test Body</div>;
    const footer = <div>Test Footer</div>;
    render(<Modal isOpen={true} title={title} body={body} footer={footer} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  test("should call onSubmit when action button is clicked", () => {
    const onSubmitMock = jest.fn();
    render(
      <Modal isOpen={true} onSubmit={onSubmitMock} actionLabel="Submit" />
    );
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
