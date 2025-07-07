const loginWith = async (page, username, password)  => {
  const logoutButton = page.getByRole('button', { name: 'logout' })
  if (await logoutButton.isVisible()) {
    await logoutButton.click()
  }
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('titleInput').fill(title)
  await page.getByTestId('authorInput').fill(author)
  await page.getByTestId('urlInput').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(title + " " + author).waitFor()
}

const increaseLikesBy = async (blog, numLikes)  => {
  const viewButton = blog.getByRole('button', { name: 'view' })
  if (await viewButton.isVisible()) {
    await viewButton.click()
  }
  const likeButton = blog.getByRole('button', { name: 'like' })
  for (let i = 0; i < numLikes; i++) {
    await likeButton.click()
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

export { loginWith, createBlog, increaseLikesBy }