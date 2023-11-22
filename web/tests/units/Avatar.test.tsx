import Avatar from "@/components/Avatar";
import { render } from "@testing-library/react";

describe("Avatar Component", () => {
  test("Nếu không có thuộc tính size thì default là 16", () => {
    const { container } = render(
      <Avatar src="https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg" />
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("width", "16");
  });

  test("Nếu có thuộc tính src thì hiển thị hình ảnh", () => {
    const { container } = render(
      <Avatar
        size={20}
        src="https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg"
      />
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  test("Nếu không có thuộc tính hasBorder thì có màu border-deep-lilac", () => {
    const { container } = render(
      <Avatar
        size={20}
        src="https://bizweb.dktcdn.net/100/378/891/files/tac-dung-cua-nhung-huou-4.jpg"
        hasBorder={true}
      />
    );
    const img = container.querySelector(".border-deep-lilac");
    expect(img).toBeInTheDocument();
  });
});

