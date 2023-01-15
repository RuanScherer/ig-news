import {render, screen} from "@testing-library/react";
import Post, {getServerSideProps} from "../../pages/posts/[slug]";
import {mocked} from "jest-mock";
import {getSession} from "next-auth/react";
import {getPrismicClient} from "../../services/prismic";

jest.mock("next-auth/react")
jest.mock("../../services/prismic");

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post content</p>",
  updatedAt: "March, 10",
};

describe("Post page", () => {
  test("post page renders correctly", () => {
    render(<Post post={post}/>);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
  });

  test("post page redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null)
    const response = await getServerSideProps({
      params: {
        slug: "my-new-post"
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        })
      })
    );
  });

  test("post page loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription"
    } as any)

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

    const response = await getServerSideProps({
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
