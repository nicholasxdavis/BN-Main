document.addEventListener('alpine:init', () => {
  Alpine.data('qrTool', () => ({
    content: 'https://www.blacnova.net',
    color: '#111111',
    bgColor: '#ffffff',
    transparent: false,
    size: 320,
    margin: 2,
    errorLevel: 'M',
    ready: false,
    error: '',
    status: '',
    _timer: null,
    _job: 0,

    init() {
      this.$nextTick(() => this.render());
    },

    schedule() {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => this.render(), 200);
    },

    clear() {
      this.content = '';
      this.error = '';
      this.ready = false;
      this.status = '';
      const box = this.$refs.preview;
      if (box) box.innerHTML = '';
    },

    resetStyle() {
      this.color = '#111111';
      this.bgColor = '#ffffff';
      this.transparent = false;
      this.size = 320;
      this.margin = 2;
      this.errorLevel = 'M';
      this.schedule();
    },

    options() {
      return {
        width: Number(this.size) || 320,
        margin: Number(this.margin) || 0,
        color: {
          dark: this.color || '#111111',
          light: this.transparent ? '#00000000' : (this.bgColor || '#ffffff')
        },
        errorCorrectionLevel: this.errorLevel || 'M'
      };
    },

    render() {
      const text = String(this.content || '').trim();
      const box = this.$refs.preview;
      const job = ++this._job;

      this.error = '';
      this.ready = false;

      if (box) box.innerHTML = '';
      if (!text) return;

      if (typeof QRCode === 'undefined') {
        this.error = 'QR library failed to load. Refresh the page and try again.';
        return;
      }

      QRCode.toCanvas(text, this.options(), (err, canvas) => {
        if (job !== this._job) return;
        if (err) {
          this.error = 'Could not create that QR code. Try shorter text.';
          this.ready = false;
          return;
        }
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        canvas.style.display = 'block';
        if (box) {
          box.innerHTML = '';
          box.appendChild(canvas);
        }
        this.ready = true;
      });
    },

    triggerDownload(url, filename) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    downloadPng() {
      const text = String(this.content || '').trim();
      if (!text || typeof QRCode === 'undefined') return;
      QRCode.toDataURL(text, this.options(), (err, url) => {
        if (err) {
          this.status = 'Download failed. Try again.';
          return;
        }
        this.triggerDownload(url, 'qr-code.png');
        this.status = 'PNG downloaded';
        setTimeout(() => { this.status = ''; }, 1600);
      });
    },

    downloadSvg() {
      const text = String(this.content || '').trim();
      if (!text || typeof QRCode === 'undefined') return;
      QRCode.toString(text, { ...this.options(), type: 'svg' }, (err, svg) => {
        if (err) {
          this.status = 'Download failed. Try again.';
          return;
        }
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        this.triggerDownload(url, 'qr-code.svg');
        setTimeout(() => URL.revokeObjectURL(url), 250);
        this.status = 'SVG downloaded';
        setTimeout(() => { this.status = ''; }, 1600);
      });
    }
  }));
});
