import Loading from "@/components/Loading";
import LoadingProvider from "@/providers/LoadingProvider";
import { render } from "@testing-library/react";

describe("Loading Component", () => {
  it("render component", () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });
});

describe("LoadingProvider Component", () => {
  it("render component", () => {
    const { container } = render(
      <LoadingProvider>
        <div>Loading</div>
      </LoadingProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
