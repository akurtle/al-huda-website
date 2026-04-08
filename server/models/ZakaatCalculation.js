const BaseModel = require('./BaseModel');

class ZakaatCalculation extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.userId = data.userId || '';
    this.calculationDate = data.calculationDate || new Date().toISOString();
    this.currency = data.currency || 'USD';
    this.assets = data.assets || {
      cashOnHand: 0,
      bankBalance: 0,
      goldValue: 0,
      silverValue: 0,
      investments: 0,
      businessAssets: 0,
      otherAssets: 0
    };
    this.liabilities = data.liabilities || {
      debts: 0,
      expenses: 0
    };
    this.totalAssets = data.totalAssets || 0;
    this.totalLiabilities = data.totalLiabilities || 0;
    this.netWealth = data.netWealth || 0;
    this.nisabThreshold = data.nisabThreshold || 0;
    this.isEligible = data.isEligible || false;
    this.zakaatAmount = data.zakaatAmount || 0;
    this.notes = data.notes || '';
  }

  static get COLLECTION() { return 'zakaatCalculations'; }

  /**
   * Perform zakaat calculation
   */
  calculate(nisab = 490) {
    this.totalAssets = Object.values(this.assets)
      .reduce((sum, val) => sum + (Number(val) || 0), 0);
    this.totalLiabilities = Object.values(this.liabilities)
      .reduce((sum, val) => sum + (Number(val) || 0), 0);
    this.netWealth = Math.max(0, this.totalAssets - this.totalLiabilities);
    this.nisabThreshold = nisab;
    this.isEligible = this.netWealth >= nisab;
    this.zakaatAmount = this.isEligible ? this.netWealth * 0.025 : 0;
    return this;
  }

  validate() {
    const errors = [];
    if (this.totalAssets < 0) errors.push('Total assets cannot be negative');
    return { valid: errors.length === 0, errors };
  }
}

module.exports = ZakaatCalculation;
