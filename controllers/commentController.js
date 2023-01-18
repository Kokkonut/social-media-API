const { Thought } = require('../models');

module.exports = {
  // Get all posts async/await
  async getComments(req, res) {
    try {
      const postData = await Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v',
        })
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },


  // Get a single post by id async/await
  async getSingleComment(req, res) {
    try {
      const postData = await Thought.findOne({ _id: req.params.id })
        .populate({
          path: 'reactions',
          select: '-__v',
        })
        .select('-__v');
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new post async/await
  async createComment({ body }, res) {
    console.log(body);
    try {
        const thoughtData = await Thought.create(body);
        const dbUserData = await User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
        );
        if (!dbUserData) {
            res.status(404).json({ message: "No User with this ID" });
            return;
        }
        res.json(dbUserData);
    } catch (err) {
        res.json(err);
    }
},



  // delete a post by id async/await
  async deleteComment({ params }, res) {
    try {
      const postData = await Thought.findOneAndDelete({ _id: params.id });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // update a post by id async/await
  async updatePost({ params, body }, res) {
    try {
      const postData = await Thought.findOneAndUpdate({ _id: params.id },
        body,
        { new: true, runValidators: true });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
//update a post by id async/await
async updatePost({ params, body }, res) {
  try {
    const postData = await Thought.findOneAndUpdate({ _id: params.id },
      body,
      { new: true, runValidators: true });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
},

// add a reaction to a post async/await
async addReaction({ params, body }, res) {
  try {
    console.log(body);
    const postData = await Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    );
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
},

// remove a reaction from a post async/await
async removeReaction({ params }, res) {
  try {
    const postData = await Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    );
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
},

};

