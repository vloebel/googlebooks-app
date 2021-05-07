const { AuthenticationError } = require('apollo-server-express');
const { saveBookIds } = require('../../client/src/utils/localStorage');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
// MUTATIONS //
// login, adduser, saveBook, and removeBook
  Mutation: {
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    // based on addReaction in module21 because books 
    // are never created individually
    saveBook: async (parent, args, context) => {
      console.log(user);
      // savedBooks: body in api becomes savedBooks: args
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, args, context) => {
      console.log(user);
      // params.bookId in api becomes args.bookId
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

  }

};


module.exports = resolvers;