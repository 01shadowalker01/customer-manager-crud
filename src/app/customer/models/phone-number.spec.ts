import { PhoneNumber } from './phone-number.model';

describe('#PhoneNumber', () => {
  describe('#validate', () => {
    it('given a empty string, it throws an error', () => {
      expect(() => new PhoneNumber('')).toThrow();
    });

    it('given a valid phone number, it does not throw any errors', () => {
      expect(() => new PhoneNumber('+989193456789')).not.toThrow();
    });

    it('given a invalid phone number, it throws an error', () => {
      expect(() => new PhoneNumber('1234567890')).toThrow();
    });
  });
});
