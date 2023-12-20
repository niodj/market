import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popup } from "./PopupConfirm";

type PopupPropsType = {
  popupStatus?: boolean;
};
describe("Popup component", () => {
  const mockProps = {
    showPopup: true,
    onHide: jest.fn(),
    onConfirm: jest.fn(),
    popupStatus: "free", // Make sure it's a string
    popupImage: "path/to/image",
    title: "Test Title",
  };

  it("renders with provided props", () => {
    const { getByText, getByAltText } = render(<Popup {...mockProps} />);

    expect(getByText("Confirm")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByAltText("Popup Image")).toBeInTheDocument();
    expect(getByText("free")).toBeInTheDocument();

    // Assuming you have styles for `statusTextTrue` and `statusTextFalse` in your CSS
    expect(getByText("free")).toHaveClass("statusTextTrue");
  });

  it("calls onHide and onConfirm callbacks when buttons are clicked", () => {
    const { getByText } = render(<Popup {...mockProps} />);

    fireEvent.click(getByText("Yes"));
    expect(mockProps.onConfirm).toHaveBeenCalled();

    fireEvent.click(getByText("No"));
    expect(mockProps.onHide).toHaveBeenCalled();
  });

  it("renders without image and status when popupStatus is not provided", () => {
    const { queryByAltText, queryByText } = render(
      <Popup {...mockProps} popupStatus={undefined} />
    );

    expect(queryByAltText("Popup Image")).toBeNull();
    expect(queryByText("free")).toBeNull();
    expect(queryByText("on repair")).toBeNull();
  });
});
