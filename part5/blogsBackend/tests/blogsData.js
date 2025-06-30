const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '68628f6eaef7e4b6f9594954'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '68628f6eaef7e4b6f9594954'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '68628f6eaef7e4b6f9594954'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '68628f6eaef7e4b6f9594954'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 10,
    user: '68628f6eaef7e4b6f9594954'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '68628f6eaef7e4b6f9594954'
  }
]

const newBlog = {
  title: 'Turns out people still make blogs?',
  author: 'Sir Prized',
  url: 'http://aintthatcrazy.html',
  likes: 999,
  user: '68628f6eaef7e4b6f9594951'
}

const noTitle = {
  author: 'Sir Prized',
  url: 'http://aintthatcrazy.html',
  likes: 999
}

const noURL = {
  title: 'Turns out people still make blogs?',
  author: 'Sir Prized',
  likes: 999
}

const noLikes = {
  title: 'Turns out people still make blogs?',
  author: 'Sir Prized',
  url: 'http://aintthatcrazy.html'
}

module.exports = {
  initialBlogs, newBlog, noTitle, noURL, noLikes
}