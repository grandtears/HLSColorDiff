function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
  
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }
  
  document.getElementById('convert-btn').addEventListener('click', function() {
    const originalColor = document.getElementById('original-color').value;
    const targetColor = document.getElementById('target-color').value;
  
    const originalRgb = hexToRgb(originalColor);
    const targetRgb = hexToRgb(targetColor);
  
    const originalHsl = rgbToHsl(originalRgb[0], originalRgb[1], originalRgb[2]);
    const targetHsl = rgbToHsl(targetRgb[0], targetRgb[1], targetRgb[2]);
  
    const hueChange = targetHsl[0] - originalHsl[0];
    const saturationChange = targetHsl[1] - originalHsl[1];
    const lightnessChange = targetHsl[2] - originalHsl[2];
  
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      Hue Change: ${hueChange}<br>
      Saturation Change: ${saturationChange}%<br>
      Lightness Change: ${lightnessChange}%
    `;
  });
  
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }