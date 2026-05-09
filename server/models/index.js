const BaseModel = require('./BaseModel');
const User = require('./User');
const Event = require('./Event');
const Announcement = require('./Announcement');
const Donation = require('./Donation');

/**
 * Model Registry - provides access to all models by collection name
 */
const ModelRegistry = {
  users: User,
  events: Event,
  announcements: Announcement,
  donations: Donation,

  getModel(collection) {
    return this[collection] || BaseModel;
  },

  fromData(collection, id, data) {
    const Model = this.getModel(collection);
    return new Model({ id, ...data });
  }
};

module.exports = {
  BaseModel,
  User,
  Event,
  Announcement,
  Donation,
  ModelRegistry
};
