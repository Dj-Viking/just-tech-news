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
  .then(dbUserData => {
    console.log(dbUserData);
    return res.json(dbUserData);
  })
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
      console.log(dbUserData);
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
  .then(dbUserData => {
    console.log(dbUserData);
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//LOGIN ROUTE
// this isnt a get route since a GET method carries the request
// parameter appended in the URL string, whereas a POST method carries
// parameter in req.body, which makes it more secure way of transferring
// data from the client to the server. password is still in plaintext
// here which makes this transmission process vulnerable
router.post('/login', (req, res) => {
  console.log(`
  
  `)
  console.log('\x1b[33m', 'client request for user login', '\x1b[00m');
  // expects {email: 'email', password: 'password'}
  User.findOne(
    {
      where: {
        email: req.body.email
      }
    }
  )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json(
        {
          message: 'No user with that email address in the database'
        }
      );
      return;
    } else {
      console.log(dbUserData);
      // res.json(
      //   {
      //     user: dbUserData
      //   }
      // );
      //verify user
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json(
          {
            message: 'Incorrect Password.'
          }
        );
        return;
      } else {
        res.json(
          {
            user: dbUserData,
            message: 'Successful Login.'
          }
        );
      }
    }
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
      individualHooks: true,
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
      //console.log(dbUserData);
      console.log(dbUserData[1]);
      res.json(dbUserData[1]);
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
      console.log(dbUserData);
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