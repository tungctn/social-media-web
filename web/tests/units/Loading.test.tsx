import Loading from "@/components/Loading";
import LoadingProvider from "@/providers/LoadingProvider";
import { render } from "@testing-library/react";

describe("Loading Component", () => {
  test("render component", () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });
});

describe("LoadingProvider Component", () => {
  test("render component", () => {
    const { container } = render(
      <LoadingProvider>
        <div>Loading</div>
      </LoadingProvider>
    );
    expect(container).toBeInTheDocument();
  });
});
