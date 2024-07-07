import { getElementBeforeComma } from './helpers.tsx';


describe('getElementBeforeComma', () => {
  test('should return the element before the comma', () => {
    // Arrange
    const input = 'London, England';
    const expectedOutput = 'London';

    // Act
    const result = getElementBeforeComma(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('should return the trimmed element before the comma', () => {
    // Arrange
    const input = '  Berlin, Germany';
    const expectedOutput = 'Berlin';

    // Act
    const result = getElementBeforeComma(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('should return the whole string if there is no comma', () => {
    // Arrange
    const input = 'Paris';
    const expectedOutput = 'Paris';

    // Act
    const result = getElementBeforeComma(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('should return an empty string if input is empty', () => {
    // Arrange
    const input = '';
    const expectedOutput = '';

    // Act
    const result = getElementBeforeComma(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test('should handle strings with only a comma', () => {
    // Arrange
    const input = ',';
    const expectedOutput = '';

    // Act
    const result = getElementBeforeComma(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });
});