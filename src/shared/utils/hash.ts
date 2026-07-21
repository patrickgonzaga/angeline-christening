export const generateCoords = (str: string, index: number) => {
  let hash1 = 0;
  let hash2 = 0;
  const combined = str + index;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash1 = (hash1 << 5) - hash1 + char;
    hash1 = hash1 & hash1;
    hash2 = (hash2 << 7) - hash2 + char;
    hash2 = hash2 & hash2;
  }
  
  // Safe boundaries (10% to 90% space to avoid clipping screen borders)
  const x = 10 + Math.abs(hash1 % 80);
  const y = 15 + Math.abs(hash2 % 70);
  
  return { x, y };
};
