import { Characters } from './characters.entity';

describe('Characters', () => {
  it('should be defined', () => {
    expect(new Characters('', '', '', '', '')).toBeDefined();
  });
});
