const { User } = require('../models');
const { Thought } = require('../models');

module.exports = {
  // Get all users async/await
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },


  // Get a single user by id async/await
  async getUserById(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.id })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({ 
          path: 'friends',
          select: '-__v',
        })  
        .select('-__v');
        console.log(userData)
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Create a new user async/await
  async newUser({ body }, res) {
    try {
      const userData = await User.create(body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Update a user by id async/await
  async updateUser({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: params.id },
        body,
        { new: true, runValidators: true }
      );
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Delete a user by id async/await
  async removeUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend to a user's friend list async/await
  async addFriend({ params }, res) {
    console.log(params)
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user's friend list async/await
  async removeFriend({ params }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
