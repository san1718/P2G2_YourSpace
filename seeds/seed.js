const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    // Sync database (creates tables based on Sequelize models)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    // Seed Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('Users seeded successfully.');

    // Seed Posts
    const posts = await Post.bulkCreate(
      postData.map((post) => ({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      })),
      { returning: true }
    );
    console.log('Posts seeded successfully.');

    // Seed Comments
    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: posts[Math.floor(Math.random() * posts.length)].id,
      });
    }
    console.log('Comments seeded successfully.');

    console.log('Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();