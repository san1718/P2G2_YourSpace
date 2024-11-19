const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Ensure posts are deleted when user is deleted
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE', // Ensure comments are deleted when post is deleted
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };