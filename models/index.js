const User = require('./User.js');
const Post = require('./Post.js');

//one user can have many posts...but only a post only has one user
User.hasMany(Post, 
  {
    foreignKey: 'user_id'
  }
);

Post.belongsTo(User, 
  {
    foreignKey: 'user_id'
  }
)

module.exports = { User, Post };