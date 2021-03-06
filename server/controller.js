module.exports = {

  getAllPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await db.get_posts();
    res.status(200).send(posts)
  },

  searchPosts: async (req, res) => {
    const db = req.app.get('db')
    const { search, userPosts } = req.params
    const { id } = req.session.user
    const sessionAuthorId = id;

    let posts = [];
    if (userPosts === 'true') {
      posts = await db.search_user_posts(sessionAuthorId, search);
    } else {
      posts = await db.search_other_posts(sessionAuthorId, search);
    }
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
    const { id } = req.session.user
    const sessionAuthorId = id;
    const { title, img, content } = req.body;
    await db.add_new_post(sessionAuthorId, title, img, content);
    res.sendStatus(200);
  },

  deletePost: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const deleted = await db.delete_post(id);
    res.status(200).send(deleted);
  }
}