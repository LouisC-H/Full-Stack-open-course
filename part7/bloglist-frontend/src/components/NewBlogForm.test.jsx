import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

describe("<NewBlogForm />", () => {
  let container;
  let mockCreateBlogHandler;
  let mockSendNotificationHandler;

  beforeEach(() => {
    const user = {
      name: "Test User",
      username: "testUser",
    };

    mockCreateBlogHandler = vi.fn();
    mockSendNotificationHandler = vi.fn();

    container = render(
      <NewBlogForm
        user={user}
        createBlog={mockCreateBlogHandler}
        sendNotification={mockSendNotificationHandler}
      />,
    ).container;
  });

  test("Create a new blog and check that the event handler receives the right details", async () => {
    const user = userEvent.setup();

    const titleTextBox = container.querySelector("#titleInput");
    await user.type(titleTextBox, "My New Blog");
    const authorTextBox = container.querySelector("#authorInput");
    await user.type(authorTextBox, "John Doe");
    const urlTextBox = container.querySelector("#urlInput");
    await user.type(urlTextBox, "https://example.com");

    const submitButton = screen.getByText("save");
    await user.click(submitButton);

    const newBlogExpected = {
      title: "My New Blog",
      author: "John Doe",
      url: "https://example.com",
      user: { name: "Test User", username: "testUser" },
    };

    expect(mockCreateBlogHandler.mock.calls[0][0]).toStrictEqual(
      newBlogExpected,
    );
  });
});
