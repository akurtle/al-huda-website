const BaseModel = require('./BaseModel');

class Donation extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.userId = data.userId || '';
    this.amount = data.amount || 0;
    this.currency = data.currency || 'USD';
    this.type = data.type || 'general';
    this.method = data.method || '';
    this.status = data.status || 'pending';
    this.referenceId = data.referenceId || '';
    this.isAnonymous = data.isAnonymous || false;
    this.notes = data.notes || '';
  }

  static get COLLECTION() { return 'donations'; }

  validate() {
    const errors = [];
    if (this.amount <= 0) errors.push('Donation amount must be positive');
    if (!this.type) errors.push('Donation type is required');
    return { valid: errors.length === 0, errors };
  }
}

module.exports = Donation;
