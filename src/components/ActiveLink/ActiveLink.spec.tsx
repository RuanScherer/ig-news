import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter: () => {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Active Link", () => {
  test("active link renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("active link is receiving active class", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });

  test("active link is not receiving active class", () => {
    render(
      <ActiveLink href="/other" activeClassName="active">
        <a>Other</a>
      </ActiveLink>
    );

    expect(screen.getByText("Other")).not.toHaveClass("active");
  });
});
