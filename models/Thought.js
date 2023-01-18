const { Schema, model } = require('mongoose');
const { User } = require('./User');

//reaction Schema(child)
const reactionSchema = new Schema(
  {
    //set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

//Thought schema (parent)
const thoughtSchema = new Schema(
  {
    thoughtText: { 
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// //get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// //create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

//export the Thought model
module.exports = Thought;

