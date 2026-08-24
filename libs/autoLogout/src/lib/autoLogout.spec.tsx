import { render } from "@testing-library/react";

import AutoLogout from "./autoLogout";

describe("AutoLogout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AutoLogout />);
    expect(baseElement).toBeTruthy();
  });
});
