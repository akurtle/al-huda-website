// ========================================
// Base Model - Flexible Schema Pattern
// ========================================
// All models extend BaseModel.
// Each model defines its fields but allows arbitrary 
// metadata through the `metadata` field.

class BaseModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.metadata = data.metadata || {}; // Flexible key-value store
  }

  /**
   * Convert to plain object for storage
   */
  toJSON() {
    const obj = { ...this };
    delete obj.id; // ID is the document key
    obj.updatedAt = new Date().toISOString();
    return obj;
  }

  /**
   * Validate model data. Override in subclasses.
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate() {
    return { valid: true, errors: [] };
  }

  /**
   * Create instance from stored data
   */
  static fromJSON(id, data) {
    return new this({ id, ...data });
  }
}

module.exports = BaseModel;
