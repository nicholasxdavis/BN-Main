document.addEventListener('alpine:init', () => {
  Alpine.data('paletteTool', () => ({
    base: '#d4611c',
    style: 'matching',
    colors: [],
    copied: '',
    status: '',
    styles: [
      { id: 'matching', label: 'Matching', hint: 'Nearby hues that work together' },
      { id: 'contrast', label: 'Contrast', hint: 'Opposites for strong accents' },
      { id: 'soft', label: 'Soft', hint: 'Light, muted tones' },
      { id: 'shades', label: 'Shades', hint: 'Light to dark of one color' }
    ],

    init() {
      this.generate();
    },

    styleHint() {
      const found = this.styles.find((s) => s.id === this.style);
      return found ? found.hint : '';
    },

    setStyle(id) {
      this.style = id;
      this.generate();
    },

    onPicker(e) {
      this.base = e.target.value;
      this.generate();
    },

    onHexInput(e) {
      this.base = e.target.value;
      this.generate();
    },

    normalizeBase() {
      let v = String(this.base || '').trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9a-fA-F]{3}$/.test(v)) {
        v = '#' + [...v.slice(1)].map((c) => c + c).join('');
      }
      if (!/^#[0-9a-fA-F]{6}$/.test(v)) return false;
      this.base = v.toLowerCase();
      return true;
    },

    randomize() {
      const h = Math.floor(Math.random() * 360);
      const s = 50 + Math.floor(Math.random() * 35);
      const l = 38 + Math.floor(Math.random() * 22);
      this.base = this.hslToHex(h, s, l);
      this.generate();
    },

    generate() {
      if (!this.normalizeBase()) return;
      const { h, s, l } = this.hexToHsl(this.base);
      let out = [];

      if (this.style === 'matching') {
        out = [
          this.hslToHex(h, Math.max(20, s - 10), Math.min(92, l + 32)),
          this.hslToHex(h, s, Math.min(78, l + 14)),
          this.hslToHex(h, s, l),
          this.hslToHex((h + 28) % 360, Math.min(90, s + 5), l),
          this.hslToHex((h + 340) % 360, Math.max(25, s - 5), Math.max(22, l - 14))
        ];
      } else if (this.style === 'contrast') {
        out = [
          this.hslToHex(h, s, l),
          this.hslToHex((h + 180) % 360, s, l),
          this.hslToHex(h, Math.min(90, s + 8), Math.min(88, l + 24)),
          this.hslToHex((h + 180) % 360, Math.max(30, s - 5), Math.max(18, l - 18)),
          this.hslToHex((h + 150) % 360, Math.max(35, s - 8), l)
        ];
      } else if (this.style === 'soft') {
        out = [
          this.hslToHex(h, Math.max(12, s - 40), 94),
          this.hslToHex(h, Math.max(16, s - 30), 86),
          this.hslToHex(h, Math.max(20, s - 22), 76),
          this.hslToHex((h + 18) % 360, Math.max(18, s - 28), 80),
          this.hslToHex((h + 342) % 360, Math.max(16, s - 32), 72)
        ];
      } else {
        out = [16, 32, 48, 68, 88].map((lv) => this.hslToHex(h, Math.max(14, s - 8), lv));
      }

      this.colors = out;
    },

    rgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    },

    async copyText(text, label) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        this.copied = label;
        this.status = '';
        clearTimeout(this._copyTimer);
        this._copyTimer = setTimeout(() => {
          if (this.copied === label) this.copied = '';
        }, 1400);
      } catch (err) {
        this.status = 'Could not copy. Select the code and copy manually.';
      }
    },

    copyColor(color) {
      this.copyText(color, color);
    },

    copyAll() {
      this.copyText(this.colors.join('\n'), 'all');
    },

    copyCss() {
      const body = this.colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n');
      this.copyText(`:root {\n${body}\n}`, 'css');
    },

    hexToHsl(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          default:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    },

    hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
      return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
    }
  }));
});
