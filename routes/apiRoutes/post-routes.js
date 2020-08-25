const router = require('express').Router();
//including user into the post routes so we can do JOIN's at some point
const { Post, User } = require('../../models');

//route to retrieve all posts in the database

router.get('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for all posts by users', '\x1b[00m');
  Post.findAll(
    {
      //query config
      attributes: ['id', 'post_url', 'title', 'created_at'],
      //show posts in descending order by timestamp
      order: [['created_at', 'DESC']],
      //JOIN 
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }
  )
  .then(dbPostData => {
    console.log(dbPostData);
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get-one single post
router.get('/:id', (req, res) => {
  Post.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with this user id'
        }
      );
      return;
    } else {
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//create a post, user_id who posted it included!
router.post('/', (req, res) => {
  // expects {title: 'title of post', post_url: 'http://someurl.com', user_id: 1}
  Post.create(
    {
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    }
  )
  .then(dbPostData => {
    console.log(dbPostData);
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//update a posts title
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with that user id.'
        }
      );
      return;
    } else {
      console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//delete a post by id
router.delete('/:id', (req, res) => {
  Post.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json(
        {
          message: 'No post found with this id'
        }
      );
        return;
    } else {
      console.log(dbPostData);
      res.json(dbPostData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
