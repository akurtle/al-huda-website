const BaseModel = require('./BaseModel');

class Announcement extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.title = data.title || '';
    this.content = data.content || '';
    this.author = data.author || '';
    this.category = data.category || 'general';
    this.priority = data.priority || 'normal';
    this.imageURL = data.imageURL || '';
    this.isPublished = data.isPublished !== undefined ? data.isPublished : false;
    this.publishDate = data.publishDate || '';
    this.expiryDate = data.expiryDate || '';
    this.tags = data.tags || [];
  }

  static get COLLECTION() { return 'announcements'; }

  validate() {
    const errors = [];
    if (!this.title) errors.push('Title is required');
    if (!this.content) errors.push('Content is required');
    return { valid: errors.length === 0, errors };
  }
}

module.exports = Announcement;
