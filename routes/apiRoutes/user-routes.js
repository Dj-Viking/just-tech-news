const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for all users', '\x1b[00m');
  //Access our User Model and run .findAll() method)
  User.findAll(
    {
      attributes: {
        exclude: ['password']
      }
    }
  )
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for single user', '\x1b[00m');
  User.findOne(
    {
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json(
        {
          message: 'No user found with this id'
        }
      );
      return;
    } else {
      res.json(dbUserData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST /api/users
router.post('/', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for add a user', '\x1b[00m');
  //👇 expects {username: 'name', email: 'email', password: 'password'}
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }  
  )
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for update a user', '\x1b[00m');
  //👇 expects {username: 'name', email: 'email', password: 'password'}
  //****if req.body has exact key/value pairs to match the model, you can just use req.body instead 
  User.update(
    req.body, 
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json(
        {
          message: 'No user found with this id'
        }
      );
      return;
    } else {
      res.json(dbUserData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for delete a user', '\x1b[00m');
  User.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json(
        {
          message: 'No user found with this id'
        }
      );
      return;
    } else {
      res.json(dbUserData);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;


//not using /users in any routes here because in this file we take routes
// and implement them into another router instance,
// prefixing them with the path /users at that time