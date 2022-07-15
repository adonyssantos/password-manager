interface GeneratorConfig {
  length?: number;
}

export const generatePassword = (config?: GeneratorConfig): string => {
  // Configurations
  const CAPITAL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 25% of the characters
  const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz'; // 50% chance of being capital
  const NUMBERS = '0123456789'; // 15% of the characters
  const SPECIAL_CHARACTERS = '!@#$%^&*()_+~`|}{[]:;?><,./-='; // 10% of the characters
  const LENGTH = config?.length || 10;

  // Generate password
  let password = '';

  for (let i = 0; i < LENGTH; i++) {
    const random = Math.random();
    if (random < 0.25) {
      password += CAPITAL_LETTERS.charAt(Math.floor(Math.random() * CAPITAL_LETTERS.length));
    } else if (random < 0.5) {
      password += LOWER_LETTERS.charAt(Math.floor(Math.random() * LOWER_LETTERS.length));
    } else if (random < 0.75) {
      password += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
    } else {
      password += SPECIAL_CHARACTERS.charAt(Math.floor(Math.random() * SPECIAL_CHARACTERS.length));
    }
  }

  return password;
};
