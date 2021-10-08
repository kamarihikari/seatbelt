const seatbelt = require('./index');

describe('Seatbelt', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  describe('Exception', () => {
    it('should reject if the first argument type is not a function', async () => {
      const firstArgError = new Error('First argument must be a function');

      const [err] = await seatbelt(false);
      expect(err).toEqual(firstArgError);
    });
    it('should reject if the error handler type is not a function', async () => {
      const fn = jest.fn();
      const secondArgError = new Error('Error handler must be a function');

      const [err] = await seatbelt(fn, false);
      expect(err).toEqual(secondArgError);
    });
    it('should return an array with error element set if function has an exception', async () => {
      const fnError = new Error('Thrown Error');
      const badFn = jest.fn().mockRejectedValue(fnError);

      const [err] = await seatbelt(badFn);
      expect(err).toEqual(fnError);
    });
    it('should properly catch non-promise function exception', async () => {
      const thrownError = new Error('Thrown non-promise error');
      const regfn = jest.fn().mockImplementation(() => { throw thrownError });

      const [err] = await seatbelt(regfn);
      expect(err).toBe(thrownError);
    });
  });
  describe('Execution', () => {
    it('should return array with data element set if a promise function resolves', async () => {
      const value = 'jamarv4-with-promise';
      const fn = jest.fn().mockResolvedValue(value);

      const [err, data] = await seatbelt(fn);
      expect(err).toBeFalsy();
      expect(data).toBe(value);
    });
    it('should return array with data element set if a non-promise function execs successfully', async () => {
      const value = 'jamarv4-non-promise';
      const fn = jest.fn().mockReturnValue(value);

      const [err, data] = await seatbelt(fn);
      expect(err).toBeFalsy();
      expect(data).toBe(value);
    });
  });
});