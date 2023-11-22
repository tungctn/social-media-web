import Button from "@/components/Button";
import { render } from "@testing-library/react";

describe("Button Component", () => {
  test("Thuộc tính type mặc định là button", () => {
    const { container } = render(<Button>Button</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "button");
  });

  test("Nếu có thuộc tính customClassName thì hiển thị thuộc tính đó trong button", () => {
    const { container } = render(
      <Button customClassName="custom-class-name">Button</Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("custom-class-name");
  });

  test("Nếu có thuộc tính disabled thì hiển thị button bị disable", () => {
    const { container } = render(<Button disabled>Button</Button>);
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });
});
