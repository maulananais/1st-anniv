# Panduan Penyesuaian Gambar AR

## Mengubah Ukuran Gambar

Untuk mengubah ukuran gambar, modifikasi atribut berikut pada elemen `<a-image>` di file `index.html`:

```html
width="1.2" height="1.8"
```

Sesuaikan nilai tersebut dengan kebutuhan Anda. Nilai yang lebih besar akan membuat gambar lebih besar.

## Mengubah Border Radius

Untuk mengubah radius sudut gambar (border-radius), modifikasi nilai berikut pada `script.js`:

```javascript
let radius = 40; // border radius size
```

Nilai yang lebih besar akan membuat sudut lebih tumpul/melengkung.

## Mengubah Animasi Kemunculan

Untuk mengubah animasi kemunculan, modifikasi atribut `animation` pada elemen `<a-image>` di file `index.html`:

```html
animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 1000; easing: easeOutElastic"
```

- `from`: ukuran awal
- `to`: ukuran akhir
- `dur`: durasi animasi dalam milidetik
- `easing`: jenis efek animasi
