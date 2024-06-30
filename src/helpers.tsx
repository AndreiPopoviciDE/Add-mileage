export const getElementBeforeComma = (str: string): string => {
    if (!str) return '';
    const parts = str.split(',');
    return parts[0].trim();
  };
  
  export const generateRandomId = (): number =>Math.floor(Math.random() * 100);
  
  export const generateRandomPrice = (): string => (Math.random() * 1000).toFixed(2);