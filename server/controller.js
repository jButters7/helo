module.exports = {
  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await db.get_posts();
    // console.log(posts)
    res.status(200).send(posts)
  },
  searchAllPosts: async (req, res) => {
    const db = req.app.get('db')
    console.log('hittt')
    const { search } = req.body
    console.log(search)
    const searchedPosts = await db.search_all_posts([search]);
    console.log(searchedPosts)
    res.status(200).send(searchedPosts)
  }
}