import Loading from "@/components/Loading";
import { render } from "@testing-library/react";

describe("Loading Component", () => {
  it("render component", () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });
});
