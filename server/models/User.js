const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.uid = data.uid || '';
    this.displayName = data.displayName || '';
    this.email = data.email || '';
    this.photoURL = data.photoURL || '';
    this.city = data.city || '';
    this.country = data.country || '';
    this.timezone = data.timezone || '';
    this.calculationMethod = data.calculationMethod || 'ISNA';
    this.preferences = data.preferences || {
      notifications: true,
      darkMode: false,
      language: 'en'
    };
    this.role = data.role || 'member';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
  }

  static get COLLECTION() { return 'users'; }

  validate() {
    const errors = [];
    if (!this.uid) errors.push('User ID (uid) is required');
    if (!this.email) errors.push('Email is required');
    return { valid: errors.length === 0, errors };
  }
}

module.exports = User;
