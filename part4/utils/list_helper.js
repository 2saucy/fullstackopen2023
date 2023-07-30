const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum = sum + blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  let maxLikes = -1
  let fav = null
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      fav = blog
    }
  })
  return fav
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
