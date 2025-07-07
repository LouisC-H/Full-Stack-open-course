const loginWith = async (page, username, password)  => {
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

const reLoginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'logout' }).click()
  await loginWith(page, username, password)
}

export { loginWith, createBlog, reLoginWith }