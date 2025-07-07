const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, increaseLikesBy } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Louis Clement-Harris',
        username: 'LouisCH',
        password: 'LovesPlatypuses'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrong')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
  })

  test('a new blog can be created', async ({ page }) => {
    await createBlog(page, 'A new blog', 'Author Name', 'https://example.com')
  })

    describe('And several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'A new blog', 'Author Name', 'https://example.com')
        await createBlog(page, 'Another blog', 'Another Author', 'https://another-example.com')
        await createBlog(page, 'Third blog', 'Third Author', 'https://third-example.com')
      })

      test('a blog can be liked', async ({ page }) => {
        const secondBlog = await page.getByText('Another blog Another Author').locator('..')
        await secondBlog.getByRole('button').click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await expect(secondBlog.getByText('Likes: 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        const secondBlog = await page.getByText('Another blog Another Author').locator('..')
        page.on('dialog', dialog => dialog.accept());
        await secondBlog.getByRole('button').click()
        await secondBlog.getByRole('button', { name: 'remove' }).click()
        await expect(secondBlog).not.toBeVisible()
      })

      test("a different user cannot see a blog's delete button", async ({ page }) => {
        await loginWith(page, 'LouisCH', 'LovesPlatypuses')
        const secondBlog = await page.getByText('Another blog Another Author').locator('..')
        page.on('dialog', dialog => dialog.accept());
        await secondBlog.getByRole('button').click()
        await expect(secondBlog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test("blogs are arranged in order of likes, the blog with the most likes first", async ({ page }) => {
        const firstBlog = await page.getByText('A new blog Author Name').locator('..')
        const secondBlog = await page.getByText('Another blog Another Author').locator('..')
        const thirdBlog = await page.getByText('Third blog Third Author').locator('..')
        
        const blogList = page.getByTestId('blog')
        await expect(blogList).toHaveCount(3)
        
        await increaseLikesBy(thirdBlog, 1)
        await expect(blogList.nth(0)).toContainText('Third blog Third Author')

        await increaseLikesBy(secondBlog, 2)
        await expect(blogList.nth(0)).toContainText('Another blog Another Author')
        await expect(blogList.nth(1)).toContainText('Third blog Third Author')

        await increaseLikesBy(firstBlog, 3)
        await expect(blogList.nth(0)).toContainText('A new blog Author Name')
        await expect(blogList.nth(1)).toContainText('Another blog Another Author')
        await expect(blogList.nth(2)).toContainText('Third blog Third Author')
      })
    })
  })
})