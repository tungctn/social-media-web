import CustomCarousel from "@/components/CustomCarousel";
import { images } from "@/utils/fakeData/Image";
import { render } from "@testing-library/react";

describe("Carousel Component", () => {
  test("render component", () => {
    const listImages = images;
    const { container } = render(<CustomCarousel images={listImages} />);
    expect(container).toBeInTheDocument();
  });

  test("render component với images rỗng", () => {
    const listImages = [] as any;
    const { container } = render(<CustomCarousel images={listImages} />);
    expect(container).toBeInTheDocument();
  });
});
