import {render, screen} from "@testing-library/react";
import PostPreview, {getStaticProps} from "../../pages/posts/preview/[slug]";
import {mocked} from "jest-mock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {getPrismicClient} from "../../services/prismic";

jest.mock("next-auth/react")
jest.mock("next/router")
jest.mock("../../services/prismic");

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post content</p>",
  updatedAt: "March, 10",
};

describe("Post preview page", () => {
  test("post preview page renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<PostPreview post={post}/>);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  test("post preview page redirects to full post when user is subscribed", async () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: "fake-active-subscription"
      },
      status: "authenticated"
    } as any)

    const useRouterMocked = mocked(useRouter)
    const replaceMock = jest.fn()
    useRouterMocked.mockReturnValueOnce({
      replace: replaceMock
    } as any)

    render(<PostPreview post={post}/>);

    expect(replaceMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  test("post preview page loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{type: "heading", text: "My New Post"}],
          content: [{type: "paragraph", text: "My new post content"}],
        },
        last_publication_date: "04-01-2021"
      })
    } as any)

    const response = await getStaticProps({
      params: {
        slug: "my-new-post"
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My New Post",
            content: "<p>My new post content</p>",
            updatedAt: "April 01, 2021"
          }
        }
      })
    );
  });
});
