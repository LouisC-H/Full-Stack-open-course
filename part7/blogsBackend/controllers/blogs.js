const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 });
  if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
});

blogsRouter.post("", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    try {
      // Look for the blog to delete.
      const blogToDelete = await Blog.findById(request.params.id);

      // If it can be found, check that the logged in user is the same as the creator of the blog. If not, they don't have permission to delete it.
      if (blogToDelete.user.toString() !== request.user.toString()) {
        return response
          .status(401)
          .json({ error: "invalid permissions - blog not created by user" });
      }
    } catch {
      // If it can't be found, return a 204 'no content' status
      response.status(204).end();
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  },
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id || user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
