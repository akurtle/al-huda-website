const BaseModel = require('./BaseModel');

class Event extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.title = data.title || '';
    this.description = data.description || '';
    this.type = data.type || 'general';
    this.date = data.date || '';
    this.startTime = data.startTime || '';
    this.endTime = data.endTime || '';
    this.location = data.location || '';
    this.organizer = data.organizer || '';
    this.imageURL = data.imageURL || '';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.attendees = data.attendees || [];
    this.tags = data.tags || [];
  }

  static get COLLECTION() { return 'events'; }

  validate() {
    const errors = [];
    if (!this.title) errors.push('Event title is required');
    if (!this.date) errors.push('Event date is required');
    return { valid: errors.length === 0, errors };
  }
}

module.exports = Event;
