const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');


const {User} = require('../models');


const resolvers = {
  Query: {
    users: async () => {
    return User.find();
    },

    user: async (parent, {userId}) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
    const user = await User.create({ email, password });
    const token = signToken(user);

    return {token, profile: user};
    },

  login: async (parent, { email, password}) => {
    const user = await User.findOne({ email });

    if(!user) {
      throw new AuthenticationError('No user with this email found!');
    }

    const correctPw = await user.comparePassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = signToken(user);
    return {token, profile: user};
  },

   addStockToFavorites: async (parent, { userId, stockSymbol }, context) => {
    console.log("userId:", userId);
    console.log("stockSymbol:", stockSymbol);
    console.log("context.user:", context.user);

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(userId,
          {$addToSet: {"favoriteStocks.symbol": stockSymbol}},
          { new: true }
        ); return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to add to favorites');
    }
    



  }
};

module.exports = resolvers;