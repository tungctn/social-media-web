import Loading from "@/components/Loading";
import LoadingProvider, { LoadingContext } from "@/providers/LoadingProvider";
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

  it("provides loading context to children", () => {
    const testChild = jest.fn();
    render(
      <LoadingProvider>
        <LoadingContext.Consumer>
          {(context) => {
            testChild(context);
            return null;
          }}
        </LoadingContext.Consumer>
      </LoadingProvider>
    );
    expect(testChild).toHaveBeenCalledWith(
      expect.objectContaining({
        isLoading: expect.any(Boolean),
        setIsLoading: expect.any(Function),
      })
    );
  });

  it("renders Loading component when isLoading is true", () => {
    render(
      <LoadingProvider>
        <LoadingContext.Consumer>
          {({ setIsLoading }) => {
            setIsLoading(true);
            return null;
          }}
        </LoadingContext.Consumer>
      </LoadingProvider>
    );

    // Kiểm tra xem component Loading có xuất hiện trên màn hình không
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
