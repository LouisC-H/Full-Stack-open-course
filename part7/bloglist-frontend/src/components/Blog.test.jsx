import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let mockUpdateBlogHandler;
  let mockDeleteBlogHandler;

  beforeEach(() => {
    const blog = {
      id: "12345",
      title: "Testing Blog",
      author: "Testing Master",
      url: "https://testing.com",
      likes: 0,
      user: {
        name: "Test User",
        username: "testUser",
      },
    };

    const user = {
      name: "Test User",
      username: "testUser",
    };

    mockUpdateBlogHandler = vi.fn();
    mockDeleteBlogHandler = vi.fn();

    container = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlogHandler}
        deleteBlog={mockDeleteBlogHandler}
        user={user}
      />,
    ).container;
  });

  test("At start, only base content is rendered", () => {
    const baseInfoDiv = container.querySelector(".baseInfo");
    expect(baseInfoDiv).not.toBeNull();
    screen.getByText("Testing Blog", { exact: false });
    screen.getByText("Testing Master", { exact: false });
    screen.getByText("view");

    const urlDiv = container.querySelector(".url");
    const likesDiv = container.querySelector(".likes");
    const usernameDiv = container.querySelector(".username");
    expect(urlDiv).toBeNull();
    expect(likesDiv).toBeNull();
    expect(usernameDiv).toBeNull();
  });

  test('Once "view" button is clicked, all information is shown', async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const baseInfoDiv = container.querySelector(".baseInfo");
    expect(baseInfoDiv).not.toBeNull();
    screen.getByText("Testing Blog", { exact: false });
    screen.getByText("Testing Master", { exact: false });
    screen.getByText("hide");

    const urlDiv = container.querySelector(".url");
    expect(urlDiv).not.toBeNull();
    screen.getByText("https://testing.com");

    const likesDiv = container.querySelector(".likes");
    expect(likesDiv).not.toBeNull();
    screen.getByText("Likes: 0");

    const usernameDiv = container.querySelector(".username");
    expect(usernameDiv).not.toBeNull();
    screen.getByText("Test User");
  });

  test('Clicking the "like" button calls the event handler once (repeated), and send the expected data', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likesButton = screen.getByText("like");
    await user.click(likesButton);
    expect(mockUpdateBlogHandler.mock.calls).toHaveLength(1);
    await user.click(likesButton);
    expect(mockUpdateBlogHandler.mock.calls).toHaveLength(2);
    expect(mockUpdateBlogHandler.mock.calls[0][0]).toBe("12345");

    const blogUpdateExpected = {
      title: "Testing Blog",
      author: "Testing Master",
      url: "https://testing.com",
      likes: 1,
      user: { name: "Test User", username: "testUser" },
    };
    expect(mockUpdateBlogHandler.mock.calls[0][1]).toStrictEqual(
      blogUpdateExpected,
    );
  });
});
