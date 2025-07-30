const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (currentFav, blog) => {
    if (!currentFav.likes || currentFav.likes < blog.likes) {
      return blog
    } else {
      return currentFav
    }
  }

  return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
  // Find a list of all the authors
  const findAuthorsReducer = (authorsList, blog) => {
    if (!authorsList.includes(blog.author)) {
      authorsList.push(blog.author)
    }
    return authorsList
  }
  var authorsList = blogs.reduce(findAuthorsReducer, [])
  // Find which one is biggest
  const [biggestAuthorName, biggestAuthorBlogNum] = findBiggestAuthor(authorsList, blogs)
  // Return the details in the requested format
  const biggestAuthorDetails = {
    author: biggestAuthorName,
    blogs: biggestAuthorBlogNum
  }
  return biggestAuthorDetails
}

const mostLikes = (blogs) => {
  // Find a list of all the authors
  const findAuthorsReducer = (authorsList, blog) => {
    if (!authorsList.includes(blog.author)) {
      authorsList.push(blog.author)
    }
    return authorsList
  }
  var authorsList = blogs.reduce(findAuthorsReducer, [])
  // Find which one is the most liked
  const [biggestAuthorName, mostAuthorLikesNumNum] = findMostLikedAuthor(authorsList, blogs)
  // Return the details in the requested format
  const biggestAuthorDetails = {
    author: biggestAuthorName,
    likes: mostAuthorLikesNumNum
  }
  return biggestAuthorDetails
}

const findBiggestAuthor = (authorsList, blogs) => {
  var biggestAuthorBlogNum = -1
  var biggestAuthorName = 'N/A - no blogs found'
  // For each author
  for (let authorIndex = 0; authorIndex < authorsList.length; authorIndex++) {
    const authorName = authorsList[authorIndex]

    // Count how many of the blogs are in their name
    const numBlogsByAuthorReducer = (blogsPerAuthor, blog) => {
      if (blog.author === authorName) {
        blogsPerAuthor++
      }
      return blogsPerAuthor
    }
    const authorBlogNum = blogs.reduce(numBlogsByAuthorReducer, 0)
    // If that number is more than the pevious record, save the author's details
    if (authorBlogNum > biggestAuthorBlogNum){
      biggestAuthorBlogNum = authorBlogNum
      biggestAuthorName = authorName
    }

  }
  return [biggestAuthorName, biggestAuthorBlogNum]
}

const findMostLikedAuthor = (authorsList, blogs) => {
  var biggestAuthorLikesNum = 0
  var biggestAuthorName = 'N/A - no blogs found'
  // For each author
  for (let authorIndex = 0; authorIndex < authorsList.length; authorIndex++) {
    const authorName = authorsList[authorIndex]

    // Count how many of the blogs are in their name
    const numBlogsByAuthorReducer = (likesPerAuthor, blog) => {
      if (blog.author === authorName) {
        likesPerAuthor += blog.likes
      }
      return likesPerAuthor
    }
    const authorBlogNum = blogs.reduce(numBlogsByAuthorReducer, 0)
    // If that number is more than the pevious record, save the author's details
    if (authorBlogNum > biggestAuthorLikesNum){
      biggestAuthorLikesNum = authorBlogNum
      biggestAuthorName = authorName
    }

  }
  return [biggestAuthorName, biggestAuthorLikesNum]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}