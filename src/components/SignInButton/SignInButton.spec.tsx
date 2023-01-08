import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignIn Button", () => {
  test("signin button renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
    expect(screen.queryByTestId("user-avatar")).not.toBeInTheDocument();
  });

  test("signin button renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
        },
        expires: "",
      },
      status: "authenticated",
    });
    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("signin button doesn't show user avatar when it is not defined", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
        },
        expires: "",
      },
      status: "authenticated",
    });
    render(<SignInButton />);

    expect(screen.queryByTestId("user-avatar")).not.toBeInTheDocument();
  });

  test("signin button shows user avatar when it is defined", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          image: "user-avatar.jpeg",
        },
        expires: "",
      },
      status: "authenticated",
    });
    render(<SignInButton />);

    expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
  });
});
