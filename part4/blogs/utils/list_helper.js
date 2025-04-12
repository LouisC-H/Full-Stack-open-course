const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (currentFav, blog) => {
    console.log('currentFav.likes : ', currentFav.likes)
    if (!currentFav.likes || currentFav.likes < blog.likes) {
      return blog
    } else {
      return currentFav
    }
  }

  return blogs.reduce(reducer, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}