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
  },

  getOnePost: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const post = await db.get_one_post(id);
    res.status(200).send(post);
  },

  addPost: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { title, img, content } = req.body;
    await db.add_new_post(id, title, img, content);
    res.sendStatus(200);
  },

  deletePost: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    console.log('backend')
    await db.delete_post(id);
    console.log('backside 2')
    console.log(res.data);
    res.status(200).send(res.data);
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