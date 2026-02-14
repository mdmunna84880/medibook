import { validatePassword, validateEmail, validateName } from './validation.js';

// Password Validation
describe('validatePassword', () => {
  test('accepts a strong password', () => {
    const result = validatePassword('ValidPass123!');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('fails when uppercase letters are missing', () => {
    const result = validatePassword('invalidpass123!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Include at least one uppercase letter.');
  });

  test('fails when lowercase letters are missing', () => {
    const result = validatePassword('INVALIDPASS123!');
    expect(result.errors).toContain('Include at least one lowercase letter.');
  });

  test('fails when numbers are missing', () => {
    const result = validatePassword('InvalidPass!');
    expect(result.errors).toContain('Include at least one number.');
  });

  test('fails when special characters are missing', () => {
    const result = validatePassword('InvalidPass123');
    expect(result.errors).toContain(
      'Include at least one special character (@.#$!%*?&).'
    );
  });

  test('fails when the password is too short', () => {
    const result = validatePassword('Short1!');
    expect(result.errors).toContain(
      'Password must be at least 8 characters long.'
    );
  });

  test('fails when the password exceeds the maximum length', () => {
    const result = validatePassword(
      'ThisPasswordIsDefinitelyTooLong123!'
    );
    expect(result.errors).toContain(
      'Password must not exceed 16 characters.'
    );
  });
});

// Email Validation
describe('validateEmail', () => {
  test('accepts a properly formatted email', () => {
    const result = validateEmail('john.doe@example.com');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('requires an email value', () => {
    const result = validateEmail('');
    expect(result.errors).toContain('Email is required.');
  });

  test('fails when "@" is missing', () => {
    const result = validateEmail('invalid-email.com');
    expect(result.errors).toContain("Email must contain '@' symbol.");
  });

  test('fails when spaces are present', () => {
    const result = validateEmail('test @example.com');
    expect(result.errors).toContain('Email must not contain spaces.');
  });

  test('fails for incomplete email formats', () => {
    const result = validateEmail('test@');
    expect(result.errors).toContain('Invalid email format.');
  });

  test('accepts a variety of valid email formats', () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
      'user123@test-domain.org',
    ];

    validEmails.forEach(email => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(true);
    });
  });
});


// Name validation
describe('validateName', () => {
  test('accepts a standard full name', () => {
    const result = validateName('John Doe');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('requires a name value', () => {
    const result = validateName('');
    expect(result.errors).toContain('Name is required');
  });

  test('rejects names containing numbers', () => {
    const result = validateName('Munna123');
    expect(result.errors).toContain(
      'Name contains invalid characters. Only letters, and spaces are allowed.'
    );
  });

  test('rejects names containing special characters', () => {
    const result = validateName('Munna@Khan');
    expect(result.errors).toContain(
      'Name contains invalid characters. Only letters, and spaces are allowed.'
    );
  });

  test('enforces minimum length', () => {
    const result = validateName('J');
    expect(result.errors).toContain('Name must be at least 2 characters');
  });

  test('accepts multi-part names with spaces', () => {
    const result = validateName('John Doe Smith');
    expect(result.isValid).toBe(true);
  });

  test('rejects mixed valid/invalid character combinations', () => {
    const result = validateName('John123 Doe');
    expect(result.errors).toContain(
      'Name contains invalid characters. Only letters, and spaces are allowed.'
    );
  });

  test('accepts real-world valid names', () => {
    const validNames = [
      'Md Munna',
      'Nishant Kumar',
      'Chandan Kumar',
      'Elon Musk',
      'Jeff Bezos',
      'Salman Khan',
      'Sundar Pichai',
    ];

    validNames.forEach(name => {
      const result = validateName(name);
      expect(result.isValid).toBe(true);
    });
  });
});
