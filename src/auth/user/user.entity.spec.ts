import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('UserEntity', () => {
  describe('validatePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      user.password = 'testPassword';

      // bcrypt.compare as any because normally is a read-only property
      (bcrypt.compare as any) = jest.fn();
    });

    it('should call bcrypt compare method when validating password', async () => {
      await user.validatePassword('123456');
      expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'testPassword');
    });
  });
});
