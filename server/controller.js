module.exports = {

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await db.get_posts();
    // console.log(posts)
    res.status(200).send(posts)
  },

  searchPosts: async (req, res) => {
    const db = req.app.get('db')
    const { search, authorId, userPosts } = req.params
    console.log("con search", search);
    console.log(req.params)

    let posts = [];
    if (userPosts === 'true') {
      posts = await db.search_user_posts(authorId, search);
    } else {
      posts = await db.search_other_posts(authorId, search);
    }
    console.log(posts);
    res.status(200).send(posts);
  }


  // searchAllPosts: async (req, res) => {
  //   const db = req.app.get('db')
  //   console.log("req.params=", req.params)
  //   const { search } = req.params
  //   console.log("con search", search)
  //   const searchedPosts = await db.search_all_posts(search);
  //   console.log("searched posts", searchedPosts)
  //   res.status(200).send(searchedPosts)
  // },

  // searchWithoutMyPosts: async (req, res) => {
  //   const db = req.app.get('db')
  //   const { id, search } = req.params;

  //   const posts = await db.search_without_my_posts([id, search])
  //   res.status(200).send(searchedPosts)
  // }


}