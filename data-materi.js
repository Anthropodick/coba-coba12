/* =========================================================================
 * data-materi.js
 * -------------------------------------------------------------------------
 * Database materi. Dipakai oleh:
 *   - app.js           → render kartu materi di tab Kelas 7/8/9/10
 *   - generator-soal.js → label bab pada soal tryout
 *
 * Gaya penulisan: bahasa tutor santai, banyak analogi, dan langkah
 * contoh soal dijabarkan baris per baris (tidak melompat).
 *
 * Struktur tiap bab (JANGAN diubah bentuknya agar app.js tetap jalan):
 *   {
 *     id: 'k7-bilangan',
 *     title: '...',
 *     tag: '...',
 *     summary: `...`,
 *     formulas: [ { label: '...', html: '...' }, ... ],
 *     examples: [ { q: '...', steps: ['...','...'], a: '...' }, ... ]
 *   }
 * ========================================================================= */

window.GRADES = [

/* ============================== KELAS 7 ============================== */
{
  id: 'k7', label: 'Kelas 7',
  desc: 'Fondasi SMP: bilangan, aljabar, persamaan, perbandingan, aritmetika sosial, dan geometri dasar. Santai, kita mulai dari yang paling dasar dulu.',
  chapters: [
    {
      id: 'k7-bilangan', title: 'Bilangan Bulat & Pecahan', tag: 'Bilangan',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Bilangan bulat itu angka yang nggak punya koma: … −3, −2, −1, 0, 1, 2, 3 … Sementara pecahan itu angka "belahan" — <span class="frac"><span>1</span><span>2</span></span> artinya "satu dibagi dua".</p>
        <p><strong>Analogi gampangnya:</strong> bilangan bulat tuh kayak <em>lantai gedung</em>. B2 (basement 2) itu −2, B1 itu −1, lantai dasar 0, lalu lantai 1, 2, 3, dan seterusnya naik ke atas. Kalau pecahan tuh kayak <em>potongan pizza</em> — satu pizza utuh bisa dipotong jadi 2, 3, 4, atau berapa pun potongan.</p>
        <p><strong>Kapan dipakai?</strong> Hampir di semua soal matematika! Mulai dari hitung uang kembalian, suhu kulkas, sampai bagi-bagi kue di acara ulang tahun.</p>
        <ul>
          <li><strong>Aturan tanda:</strong> (−) × (−) hasilnya <strong>+</strong>. (−) × (+) hasilnya <strong>−</strong>. Mudahnya: <em>musuh dari musuh itu teman</em>.</li>
          <li><strong>Kurangi bilangan negatif</strong> = tambah bilangan positifnya. Contoh: 5 − (−3) sama dengan 5 + 3 = 8.</li>
          <li><strong>Urutan hitung:</strong> kurung dulu → pangkat → × dan ÷ (kiri ke kanan) → + dan − (kiri ke kanan).</li>
          <li><strong>Pecahan:</strong> untuk + atau − harus <em>samakan penyebut</em> dulu (pakai KPK). Untuk ÷, balik pecahan kedua lalu kalikan.</li>
        </ul>
        <p><strong>KPK vs FPB — analogi sederhana:</strong></p>
        <ul>
          <li><strong>FPB</strong> (Faktor Persekutuan Terbesar): kamu punya 24 coklat dan 36 permen, mau dimasukin ke kantong dengan isi sama rata. <em>Kantong paling banyak</em> yang bisa dibuat tanpa sisa? Itu FPB-nya.</li>
          <li><strong>KPK</strong> (Kelipatan Persekutuan Terkecil): lampu A nyala tiap 24 detik, lampu B nyala tiap 36 detik. <em>Kapan mereka nyala bareng lagi?</em> Itu KPK-nya.</li>
        </ul>`,
      formulas: [
        { label: 'Kurangi bilangan negatif', html: 'a − (−b) = a + b' },
        { label: 'Aturan tanda perkalian', html: '(−a) × (−b) = ab &nbsp;;&nbsp; (−a) × b = −ab' },
        { label: 'Penjumlahan pecahan', html: '<span class="frac"><span>a</span><span>b</span></span> + <span class="frac"><span>c</span><span>d</span></span> = <span class="frac"><span>ad + bc</span><span>bd</span></span>' },
        { label: 'Pembagian pecahan', html: '<span class="frac"><span>a</span><span>b</span></span> ÷ <span class="frac"><span>c</span><span>d</span></span> = <span class="frac"><span>a</span><span>b</span></span> × <span class="frac"><span>d</span><span>c</span></span>' },
        { label: 'Hubungan KPK & FPB', html: 'KPK(a, b) × FPB(a, b) = a × b' }
      ],
      examples: [
        {
          q: 'Hitung 12 + (−5) × 3 − (−4).',
          steps: [
            'Ingat urutan operasi: <strong>kali/bagi dulu</strong>, baru tambah/kurang. Jadi jangan asal hitung dari kiri, ya.',
            'Kerjakan perkalian dulu: (−5) × 3. Tanda beda (minus × plus) → hasilnya minus. 5 × 3 = 15, jadi hasilnya <strong>−15</strong>.',
            'Sekarang soalnya jadi: 12 + (−15) − (−4).',
            'Ingat aturan "kurang minus jadi tambah": − (−4) sama dengan <strong>+4</strong>. Jadi soalnya berubah jadi 12 + (−15) + 4.',
            '12 + (−15) sama artinya dengan 12 − 15, hasilnya <strong>−3</strong>.',
            'Terakhir: −3 + 4 = <strong>1</strong>. Selesai!'
          ],
          a: '1'
        },
        {
          q: 'Hitung <span class="frac"><span>2</span><span>3</span></span> + <span class="frac"><span>3</span><span>4</span></span> ÷ <span class="frac"><span>3</span><span>2</span></span>.',
          steps: [
            'Bagi dan kali dikerjakan lebih dulu daripada tambah. Jadi kerjakan dulu bagian <span class="frac"><span>3</span><span>4</span></span> ÷ <span class="frac"><span>3</span><span>2</span></span>.',
            'Bagi pecahan = kalikan dengan kebalikannya. Kebalikan dari <span class="frac"><span>3</span><span>2</span></span> adalah <span class="frac"><span>2</span><span>3</span></span>. Jadi: <span class="frac"><span>3</span><span>4</span></span> × <span class="frac"><span>2</span><span>3</span></span>.',
            'Kalikan atas dengan atas, bawah dengan bawah: (3 × 2) / (4 × 3) = <span class="frac"><span>6</span><span>12</span></span>.',
            'Sederhanakan <span class="frac"><span>6</span><span>12</span></span>: atas dan bawah sama-sama dibagi 6, jadi <span class="frac"><span>1</span><span>2</span></span>.',
            'Sekarang soalnya jadi: <span class="frac"><span>2</span><span>3</span></span> + <span class="frac"><span>1</span><span>2</span></span>. Untuk menjumlahkan, samakan penyebut dulu. KPK dari 3 dan 2 adalah 6.',
            'Ubah: <span class="frac"><span>2</span><span>3</span></span> = <span class="frac"><span>4</span><span>6</span></span> (atas-bawah dikali 2), dan <span class="frac"><span>1</span><span>2</span></span> = <span class="frac"><span>3</span><span>6</span></span> (atas-bawah dikali 3).',
            'Jumlahkan: <span class="frac"><span>4</span><span>6</span></span> + <span class="frac"><span>3</span><span>6</span></span> = <span class="frac"><span>7</span><span>6</span></span>. Karena pembilang lebih besar dari penyebut, boleh ditulis juga sebagai 1 <span class="frac"><span>1</span><span>6</span></span>.'
          ],
          a: '<span class="frac"><span>7</span><span>6</span></span> = 1 <span class="frac"><span>1</span><span>6</span></span>'
        },
        {
          q: 'Tentukan KPK dan FPB dari 24 dan 36.',
          steps: [
            'Langkah pertama: pecah tiap bilangan jadi perkalian bilangan prima (2, 3, 5, 7, …).',
            '24 = 2 × 12 = 2 × 2 × 6 = 2 × 2 × 2 × 3 = <strong>2³ × 3</strong>.',
            '36 = 2 × 18 = 2 × 2 × 9 = 2 × 2 × 3 × 3 = <strong>2² × 3²</strong>.',
            'Untuk <strong>FPB</strong>, ambil faktor yang <em>sama</em> dengan pangkat <em>terkecil</em>. Faktor sama: 2 dan 3. Pangkat terkecil 2 = 2², pangkat terkecil 3 = 3¹. Jadi FPB = 2² × 3 = 4 × 3 = <strong>12</strong>.',
            'Untuk <strong>KPK</strong>, ambil <em>semua</em> faktor dengan pangkat <em>terbesar</em>. Faktor terbesar 2 = 2³, faktor terbesar 3 = 3². Jadi KPK = 2³ × 3² = 8 × 9 = <strong>72</strong>.',
            'Cek cepat: 12 × 72 = 864, dan 24 × 36 = 864. Cocok! Berarti hitungan kita benar.'
          ],
          a: 'KPK = 72, FPB = 12'
        }
      ]
    },

    {
      id: 'k7-aljabar', title: 'Aljabar Dasar', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Aljabar itu kayak "bahasa sandi" matematika. Kita pakai huruf (x, y, a, b) buat mewakili angka yang belum kita tahu.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin x itu <em>kotak kosong</em> yang nunggu diisi angka. Kita belum tahu isinya, tapi kita bisa main-main sama kotaknya — gabungin, kurangin, kalikan — tanpa harus tahu isinya dulu.</p>
        <p><strong>Kapan dipakai?</strong> Di hampir semua rumus nanti. Mulai dari hitung umur, hitung untung jualan, sampai fisika di SMA.</p>
        <ul>
          <li><strong>Suku sejenis</strong> = suku yang variabel dan pangkatnya sama, jadi boleh digabung. Contoh: 3x dan 5x itu saudara (boleh jadi 8x). Tapi 3x dan 3x² <em>bukan</em> saudara (beda pangkat = beda keluarga, nggak bisa digabung).</li>
          <li><strong>Tanda minus di depan kurung</strong> membalik tanda semua suku di dalamnya. Kayak kamu buka pintu dan angin masuk, semua kertas di dalamnya ikut kebalik.</li>
          <li><strong>Perkalian pakai sifat distributif:</strong> angka di luar kurung harus "nyapa" <em>semua</em> isi kurung, bukan cuma yang pertama.</li>
        </ul>`,
      formulas: [
        { label: 'Sifat distributif', html: 'a(b + c) = ab + ac' },
        { label: 'Perkalian dua binomial', html: '(a + b)(c + d) = ac + ad + bc + bd' },
        { label: 'Gabung suku sejenis', html: 'px + qx = (p + q)x' }
      ],
      examples: [
        {
          q: 'Sederhanakan (7a + 2b − 5) − (3a − 4b + 1).',
          steps: [
            'Tujuan kita: gabungin suku-suku yang sejenis. Tapi sebelum itu, buka dulu tanda kurungnya.',
            'Kurung pertama nggak ada tanda minus di depannya, jadi <em>diamkan saja</em>: 7a + 2b − 5.',
            'Kurung kedua ada tanda minus di depannya → semua isi dalamnya <strong>dibalik tandanya</strong>: 3a jadi −3a, −4b jadi +4b, +1 jadi −1.',
            'Gabungkan semuanya: 7a + 2b − 5 − 3a + 4b − 1.',
            'Kelompokkan yang sejenis: (7a − 3a) + (2b + 4b) + (−5 − 1).',
            'Hitung tiap kelompok: 7a − 3a = <strong>4a</strong>; 2b + 4b = <strong>6b</strong>; −5 − 1 = <strong>−6</strong>.',
            'Hasil akhir: <strong>4a + 6b − 6</strong>.'
          ],
          a: '4a + 6b − 6'
        },
        {
          q: 'Jabarkan (2x + 3)(x − 4).',
          steps: [
            'Pakai jurus "kali silang semua": setiap isi kurung pertama ketemu setiap isi kurung kedua.',
            'Suku pertama kali suku pertama: 2x × x = <strong>2x²</strong>.',
            'Suku pertama kali suku kedua: 2x × (−4) = <strong>−8x</strong>.',
            'Suku kedua kali suku pertama: 3 × x = <strong>+3x</strong>.',
            'Suku kedua kali suku kedua: 3 × (−4) = <strong>−12</strong>.',
            'Gabungkan semuanya: 2x² − 8x + 3x − 12.',
            '−8x dan +3x itu suku sejenis (sama-sama "x"), jadi boleh digabung: −8 + 3 = −5. Hasil akhir: <strong>2x² − 5x − 12</strong>.'
          ],
          a: '2x² − 5x − 12'
        }
      ]
    },

    {
      id: 'k7-plsv', title: 'Persamaan & Pertidaksamaan Linear Satu Variabel', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Persamaan linear satu variabel (PLSV) itu "tebak-tebakan" angka yang ditutupi huruf. Contoh: x + 5 = 12, x itu berapa? Jawabannya 7. Kalau pertidaksamaan, tanda "=" diganti &lt;, &gt;, ≤, atau ≥.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin <em>timbangan yang seimbang</em>. Kalau kamu tambah 5 kg di kiri, kamu harus tambah 5 kg di kanan juga, biar timbangannya tetap seimbang. Nah, prinsip itulah yang dipakai untuk menyelesaikan persamaan.</p>
        <p><strong>Kapan dipakai?</strong> Buat mecahin soal cerita: "kalau umur Ayah dua kali umur Budi dan jumlah umur mereka 60, umur Budi berapa?"</p>
        <ul>
          <li><strong>Aturan emas:</strong> apa pun yang kamu lakukan ke ruas kiri, lakukan hal yang sama ke ruas kanan.</li>
          <li><strong>Pindah ruas</strong> = "tambah jadi kurang, kurang jadi tambah, kali jadi bagi, bagi jadi kali" — semua ini hanyalah cara cepat dari aturan emas di atas.</li>
          <li><strong>Pertidaksamaan:</strong> kalau kedua ruas dikali atau dibagi <em>bilangan negatif</em>, tanda pertidaksamaannya <strong>berbalik</strong> (dari &lt; jadi &gt;, dst).</li>
        </ul>`,
      formulas: [
        { label: 'Bentuk umum PLSV', html: 'ax + b = c &nbsp;⇒&nbsp; x = (c − b) / a &nbsp;(a ≠ 0)' },
        { label: 'Aturan pertidaksamaan', html: 'a &lt; b ⇒ a + c &lt; b + c.<br>Jika dikali c &lt; 0, tanda berbalik: a·c &gt; b·c.' }
      ],
      examples: [
        {
          q: 'Selesaikan 3x − 7 = 11.',
          steps: [
            'Tujuan kita: bikin x <em>sendirian</em> di satu ruas. Ibaratnya x itu teman yang mau kita ajak ngobrol berdua, tanpa diganggu angka lain.',
            'Di ruas kiri ada "−7". Kita usir angka 7 ke kanan dengan cara <strong>tambahkan 7 di kedua ruas</strong> (biar timbangan tetap seimbang).',
            'Ruas kiri: 3x − 7 + 7 = 3x (karena −7 + 7 = 0). Ruas kanan: 11 + 7 = 18. Sekarang soalnya jadi <strong>3x = 18</strong>.',
            'Masih ada angka 3 nempel di x. Karena 3 itu <em>dikali</em> x, cara melepasnya adalah <strong>bagi kedua ruas dengan 3</strong>.',
            'Ruas kiri: 3x ÷ 3 = x. Ruas kanan: 18 ÷ 3 = 6. Jadi <strong>x = 6</strong>.',
            'Cek dulu, biar yakin: 3(6) − 7 = 18 − 7 = 11. Cocok! Berarti x = 6 benar.'
          ],
          a: 'x = 6'
        },
        {
          q: 'Selesaikan 5 − 2x &gt; 11.',
          steps: [
            'Sama seperti persamaan, kita mau x sendirian. Mulai dari angka yang paling jauh dari x dulu.',
            'Kurangi 5 di kedua ruas, supaya 5 di kiri hilang: 5 − 2x − 5 &gt; 11 − 5, jadi <strong>−2x &gt; 6</strong>.',
            'Masih ada −2 nempel di x. Bagi kedua ruas dengan −2. <strong>TAPI INGAT:</strong> karena pembaginya negatif, tanda &gt; berbalik jadi &lt;.',
            '−2x ÷ (−2) &lt; 6 ÷ (−2). Jadi <strong>x &lt; −3</strong>.',
            'Cek pakai x = −4 (harus memenuhi karena −4 &lt; −3): 5 − 2(−4) = 5 + 8 = 13, dan 13 memang &gt; 11. Benar!',
            'Kalau lupa balik tanda, hasilnya jadi x &gt; −3, dan itu SALAH. Jadi selalu waspada saat bagi/kali dengan negatif.'
          ],
          a: 'x &lt; −3'
        }
      ]
    },

    {
      id: 'k7-perbandingan', title: 'Perbandingan (Senilai, Berbalik Nilai, Skala)', tag: 'Perbandingan',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Perbandingan itu cara bilang "A berbanding B", misalnya "2 : 3". Ada dua jenis perbandingan yang perlu kamu kenal: <em>senilai</em> dan <em>berbalik nilai</em>.</p>
        <p><strong>Analogi gampangnya:</strong></p>
        <ul>
          <li><strong>Senilai</strong> = <em>naik bareng, turun bareng</em>. Kayak beli bakso: makin banyak mangkok, makin mahal totalnya. Dua-duanya naik bareng.</li>
          <li><strong>Berbalik nilai</strong> = <em>yang satu naik, yang lain malah turun</em>. Kayak ngecat tembok: makin banyak tukang yang ngecat, makin <em>cepat</em> selesainya (harinya makin sedikit). Satu naik, satu turun.</li>
          <li><strong>Skala</strong> = perbandingan ukuran di gambar/peta dengan ukuran aslinya. Contoh 1 : 100 artinya 1 cm di gambar = 100 cm di dunia nyata.</li>
        </ul>`,
      formulas: [
        { label: 'Perbandingan senilai', html: 'x₁ / y₁ = x₂ / y₂' },
        { label: 'Perbandingan berbalik nilai', html: 'x₁ × y₁ = x₂ × y₂' },
        { label: 'Skala', html: 'Skala = jarak pada peta ÷ jarak sebenarnya' },
        { label: 'Jarak sebenarnya', html: 'Jarak sebenarnya = jarak pada peta × n &nbsp;(skala 1 : n)' }
      ],
      examples: [
        {
          q: '5 kg apel harganya Rp90.000. Berapa harga 8 kg apel?',
          steps: [
            'Kenali dulu jenis perbandingannya. Apel makin banyak, harga makin mahal → ini <strong>senilai</strong>.',
            'Tulis perbandingannya: 5 kg ↔ Rp90.000, dan 8 kg ↔ x.',
            'Karena senilai, boleh pakai "kali silang": 5/8 = 90.000/x.',
            'Kali silang: 5 × x = 8 × 90.000. Jadi 5x = 720.000.',
            'Bagi kedua ruas dengan 5: x = 720.000 ÷ 5 = 144.000.',
            'Jadi harga 8 kg apel adalah <strong>Rp144.000</strong>. Cek logika: kalau 5 kg Rp90.000, berarti 1 kg sekitar Rp18.000. Dikali 8 = Rp144.000. Cocok!'
          ],
          a: 'Rp144.000'
        },
        {
          q: '12 pekerja menyelesaikan suatu pekerjaan dalam 15 hari. Jika dikerjakan 20 pekerja, berapa hari selesainya?',
          steps: [
            'Kenali jenisnya dulu. Pekerja makin banyak, pekerjaan makin cepat selesai → harinya makin sedikit. Ini <strong>berbalik nilai</strong>.',
            'Tulis: 12 pekerja ↔ 15 hari, dan 20 pekerja ↔ x hari.',
            'Karena berbalik nilai, pakai perkalian lurus (bukan kali silang pecahan): 12 × 15 = 20 × x.',
            '12 × 15 = 180, jadi 180 = 20x.',
            'Bagi kedua ruas dengan 20: x = 180 ÷ 20 = <strong>9</strong>.',
            'Jadi dengan 20 pekerja, pekerjaan selesai dalam <strong>9 hari</strong>. Masuk akal: pekerja nambah, waktu makin singkat.'
          ],
          a: '9 hari'
        },
        {
          q: 'Pada peta berskala 1 : 2.000.000, jarak dua kota 4 cm. Berapa jarak sebenarnya?',
          steps: [
            'Skala 1 : 2.000.000 artinya 1 cm di peta = 2.000.000 cm di dunia nyata.',
            'Kalau 4 cm di peta, berarti jarak sebenarnya = 4 × 2.000.000 = <strong>8.000.000 cm</strong>.',
            'Sekarang ubah ke km (biar lebih enak dibaca). Ingat: 1 m = 100 cm, 1 km = 1.000 m = 100.000 cm.',
            'Jadi 8.000.000 cm ÷ 100.000 = <strong>80 km</strong>.',
            'Jadi jarak dua kota sebenarnya <strong>80 km</strong>.'
          ],
          a: '80 km'
        }
      ]
    },

    {
      id: 'k7-aritsosial', title: 'Aritmatika Sosial', tag: 'Aritmetika',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Aritmatika sosial itu matematika yang dipakai di jual-beli sehari-hari: untung, rugi, diskon, bunga tabungan, dan berat bersih/kotor.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin kamu jualan di kantin sekolah.</p>
        <ul>
          <li><strong>Untung</strong> = harga jual <em>lebih besar</em> dari harga beli. Kamu senang.</li>
          <li><strong>Rugi</strong> = harga jual <em>lebih kecil</em> dari harga beli. Kamu sedih.</li>
          <li><strong>Diskon</strong> = potongan harga. Kayak "diskon 20%" di toko, tandanya harga turun.</li>
          <li><strong>Bunga tunggal</strong> = uang tambahan yang bank kasih ke tabunganmu, dihitung dari modal awal.</li>
          <li><strong>Bruto</strong> = berat kotor (isi + bungkus). <strong>Neto</strong> = berat isi. <strong>Tara</strong> = berat bungkusnya. Contoh: sekarung beras, brutonya termasuk karungnya.</li>
        </ul>`,
      formulas: [
        { label: 'Untung & rugi', html: 'Untung = harga jual − harga beli &nbsp;|&nbsp; Rugi = harga beli − harga jual' },
        { label: 'Persentase untung/rugi', html: '% = (Untung atau Rugi) ÷ harga beli × 100%' },
        { label: 'Diskon', html: 'Diskon = %diskon × harga awal<br>Harga bayar = harga awal − diskon' },
        { label: 'Bunga tunggal n bulan', html: 'Bunga = Modal × bunga per tahun × n/12' },
        { label: 'Bruto, neto, tara', html: 'Bruto = Neto + Tara<br>% Tara = (Tara ÷ Bruto) × 100%' }
      ],
      examples: [
        {
          q: 'Sebuah tas dibeli Rp80.000 lalu dijual Rp92.000. Berapa persentase untungnya?',
          steps: [
            'Hitung dulu untungnya. Untung = harga jual − harga beli = 92.000 − 80.000 = <strong>Rp12.000</strong>.',
            'Persentase untung <em>selalu</em> dihitung dari harga beli, bukan harga jual. Ini penting!',
            'Rumusnya: (untung ÷ harga beli) × 100%. Jadi (12.000 ÷ 80.000) × 100%.',
            '12.000 ÷ 80.000 = 0,15. Dikali 100% = <strong>15%</strong>.',
            'Jadi persentase untungnya <strong>15%</strong>. Artinya tiap Rp100 modal, dapat untung Rp15.'
          ],
          a: 'Untung 15%'
        },
        {
          q: 'Budi menabung Rp2.000.000 dengan bunga tunggal 6% per tahun. Berapa total tabungan setelah 9 bulan?',
          steps: [
            'Hitung dulu bunga untuk 1 tahun penuh: 6% × 2.000.000 = 0,06 × 2.000.000 = <strong>Rp120.000</strong>.',
            'Tapi Budi baru nabung 9 bulan, bukan 12 bulan. Jadi bunga diprorata: (9 ÷ 12) × 120.000.',
            '9 ÷ 12 = 0,75. Dikali 120.000 = <strong>Rp90.000</strong>. Itu bunganya selama 9 bulan.',
            'Total tabungan = modal awal + bunga = 2.000.000 + 90.000 = <strong>Rp2.090.000</strong>.',
            'Jadi saldo Budi setelah 9 bulan adalah <strong>Rp2.090.000</strong>.'
          ],
          a: 'Rp2.090.000'
        },
        {
          q: 'Sekarung beras bruto 50 kg dengan tara 2%. Berapa netonya?',
          steps: [
            'Ingat: bruto = neto + tara, jadi neto = bruto − tara. Kita perlu hitung tara dulu.',
            'Tara = 2% × bruto = 0,02 × 50 kg = <strong>1 kg</strong>. Itu berat karungnya.',
            'Neto = bruto − tara = 50 − 1 = <strong>49 kg</strong>.',
            'Jadi berat bersih berasnya <strong>49 kg</strong>, dan 1 kg sisanya adalah berat karung.'
          ],
          a: '49 kg'
        }
      ]
    },

    {
      id: 'k7-geometri', title: 'Garis, Sudut, & Bangun Datar', tag: 'Geometri',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Geometri itu ilmu tentang bentuk dan ukuran. Di sini kita belajar soal garis, sudut (pertemuan dua garis), dan bangun datar (persegi, segitiga, trapesium, dll).</p>
        <p><strong>Analogi gampangnya:</strong> sudut itu kayak <em>bukaan pintu</em>. Pintu yang baru dibuka sedikit = sudut kecil (lancip). Pintu yang dibuka pas 90° = siku-siku. Pintu yang dibuka lebar banget = sudut tumpul. Kalau pintunya sampai nempel dinding (180°) = garis lurus.</p>
        <ul>
          <li><strong>Berpelurus</strong> = dua sudut yang kalau dijumlah hasilnya 180°. Kayak dua sudut di satu garis lurus. Teman sebahu.</li>
          <li><strong>Berpenyiku</strong> = dua sudut yang kalau dijumlah hasilnya 90°. Kayak dua sudut di pojok ruangan. Teman siku-siku.</li>
          <li><strong>Jumlah sudut dalam segitiga</strong> selalu 180°. Kalau kamu tahu dua sudut, yang ketiga tinggal dikurangkan dari 180°.</li>
          <li><strong>Jumlah sudut dalam segiempat</strong> selalu 360°. Ini karena segiempat bisa dipecah jadi 2 segitiga (2 × 180°).</li>
        </ul>`,
      formulas: [
        { label: 'Berpelurus & berpenyiku', html: 'Berpelurus: ∠A + ∠B = 180°<br>Berpenyiku: ∠A + ∠B = 90°' },
        { label: 'Jumlah sudut dalam', html: 'Segitiga = 180°<br>Segiempat = 360°' },
        { label: 'Segitiga', html: 'L = ½ × a × t &nbsp;;&nbsp; K = jumlah ketiga sisi' },
        { label: 'Persegi panjang', html: 'L = p × l &nbsp;;&nbsp; K = 2(p + l)' },
        { label: 'Persegi', html: 'L = s<sup>2</sup> &nbsp;;&nbsp; K = 4s' },
        { label: 'Trapesium', html: 'L = ½ × (a + b) × t' },
        { label: 'Belah ketupat / layang-layang', html: 'L = ½ × d₁ × d₂' }
      ],
      examples: [
        {
          q: 'Dua sudut berpelurus besarnya (2x + 10)° dan (3x − 20)°. Tentukan kedua sudut itu.',
          steps: [
            'Kata kunci "berpelurus" artinya kalau dijumlah = 180°. Jadi kita tulis persamaannya.',
            '(2x + 10) + (3x − 20) = 180.',
            'Gabungkan suku sejenis di kiri: 2x + 3x = 5x, dan 10 − 20 = −10. Jadi 5x − 10 = 180.',
            'Tambahkan 10 di kedua ruas: 5x = 190.',
            'Bagi kedua ruas dengan 5: x = 38.',
            'Sekarang masukkan x = 38 ke tiap sudut. Sudut pertama: 2(38) + 10 = 76 + 10 = <strong>86°</strong>. Sudut kedua: 3(38) − 20 = 114 − 20 = <strong>94°</strong>.',
            'Cek: 86° + 94° = 180°. Cocok! Berarti jawabannya benar.'
          ],
          a: '86° dan 94°'
        },
        {
          q: 'Sebuah trapesium memiliki sisi sejajar 8 cm dan 12 cm serta tinggi 5 cm. Hitung luasnya.',
          steps: [
            'Ingat rumus trapesium: L = ½ × (jumlah sisi sejajar) × tinggi.',
            'Jumlah sisi sejajar = 8 + 12 = 20 cm.',
            'Masukkan ke rumus: L = ½ × 20 × 5.',
            '½ × 20 = 10, lalu 10 × 5 = <strong>50</strong>.',
            'Jadi luas trapesium = <strong>50 cm²</strong>.'
          ],
          a: '50 cm<sup>2</sup>'
        }
      ]
    }
  ]
},

/* ============================== KELAS 8 ============================== */
{
  id: 'k8', label: 'Kelas 8',
  desc: 'Bilangan berpangkat, Pythagoras, PLSV/PtLSV, relasi & fungsi, garis lurus, dan statistika. Tenang, kita bahas pelan-pelan.',
  chapters: [
    {
      id: 'k8-pangkat', title: 'Bilangan Berpangkat & Bentuk Akar', tag: 'Bilangan',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Pangkat itu cara singkat menulis perkalian berulang. 2³ artinya 2 × 2 × 2 = 8. Bentuk akar adalah kebalikannya: √9 artinya "angka apa yang kalau dikuadratkan hasilnya 9?".</p>
        <p><strong>Analogi gampangnya:</strong> pangkat itu kayak <em>lipat ganda</em>. Kalau kamu punya 1 lembar kertas, lalu kamu lipat 3 kali (tiap lipatan jadi 2 lapis), hasilnya 2 × 2 × 2 = 8 lapis = 2³. Sementara akar itu kayak <em>membuka lipatan</em>: kalau ada 8 lapis, butuh berapa lipatan untuk dapat 8? Jawabannya 3, jadi ∛8 = 3.</p>
        <p><strong>Kapan dipakai?</strong> Buat nulis angka super gede (misal jarak planet) atau super kecil (misal ukuran virus). Juga dipakai di fisika, kimia, dan ekonomi.</p>
        <ul>
          <li>a⁰ = 1 (angka apa pun pangkat 0 hasilnya 1, kecuali 0⁰ yang tak terdefinisi).</li>
          <li>a⁻ⁿ = 1 ÷ aⁿ. Jadi pangkat negatif = "dibalik jadi pecahan".</li>
          <li><strong>Bentuk baku</strong> = a × 10ⁿ dengan 1 ≤ a &lt; 10. Dipakai buat nulis angka yang terlalu besar/kecil. Contoh: 320.000.000 = 3,2 × 10⁸.</li>
        </ul>`,
      formulas: [
        { label: 'Sifat pangkat', html: 'a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup><br>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup><br>(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup>' },
        { label: 'Pangkat khusus', html: 'a<sup>0</sup> = 1 &nbsp;;&nbsp; a<sup>−n</sup> = 1 / a<sup>n</sup>' },
        { label: 'Hubungan akar & pangkat', html: '<sup>n</sup>√a = b ⇔ b<sup>n</sup> = a' },
        { label: 'Merasionalkan penyebut', html: 'c / √a = c√a / a<br>c / (√a − √b) = c(√a + √b) / (a − b)' },
        { label: 'Bentuk baku', html: 'a × 10<sup>n</sup>, dengan 1 ≤ a &lt; 10, n bilangan bulat' }
      ],
      examples: [
        {
          q: 'Sederhanakan (2³ × 2⁴) ÷ 2⁵.',
          steps: [
            'Ingat aturan "kalau dikali, pangkatnya ditambah". Jadi 2³ × 2⁴ = 2<sup>3+4</sup> = 2⁷.',
            'Sekarang soalnya jadi 2⁷ ÷ 2⁵.',
            'Ingat aturan "kalau dibagi, pangkatnya dikurang". Jadi 2⁷ ÷ 2⁵ = 2<sup>7−5</sup> = 2².',
            '2² = 2 × 2 = <strong>4</strong>.',
            'Kalau mau dicek manual: 2³ = 8, 2⁴ = 16, hasil kalinya 128. Dibagi 2⁵ = 32. 128 ÷ 32 = 4. Cocok!'
          ],
          a: '4'
        },
        {
          q: 'Rasionalkan penyebut dari 6 / (√5 − √2).',
          steps: [
            'Kenapa harus dirasionalkan? Karena di penyebut ada akar, dan secara matematika itu "kurang rapi". Tujuannya: hilangkan akar dari penyebut.',
            'Caranya: kalikan pembilang dan penyebut dengan <em>sekawan</em> penyebut. Sekawan dari (√5 − √2) adalah (√5 + √2) — tandanya dibalik.',
            'Kalikan: (6 × (√5 + √2)) ÷ ((√5 − √2) × (√5 + √2)).',
            'Untuk penyebut, pakai rumus (a − b)(a + b) = a² − b². Jadi (√5)² − (√2)² = 5 − 2 = 3.',
            'Sekarang pecahannya: 6(√5 + √2) ÷ 3.',
            'Bagi 6 dengan 3 = 2. Hasil akhir: <strong>2(√5 + √2) = 2√5 + 2√2</strong>. Selesai!'
          ],
          a: '2√5 + 2√2'
        }
      ]
    },

    {
      id: 'k8-pythagoras', title: 'Teorema Pythagoras', tag: 'Geometri',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Pythagoras itu "kunci rahasia" segitiga siku-siku. Kalau kamu tahu dua sisinya, sisi ketiga bisa dicari. Kayak detektif yang punya dua petunjuk, pelaku ketiga bisa ditebak.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin kamu lagi main di lapangan, dan mau ambil jalan pintas <em>menyilang</em> lapangan (bukan lewat pinggir). Jalan menyilang itu <strong>hipotenusa</strong> (sisi miring), sedangkan lewat pinggir itu dua sisi siku-sikunya. Pythagoras bilang: <em>jalan menyilang selalu lebih pendek daripada lewat dua sisi</em>, dan panjangnya bisa dihitung.</p>
        <ul>
          <li><strong>Tripel Pythagoras</strong> = "tiga sekawan" bilangan bulat yang selalu akur: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Kelipatannya juga akur (misal 6-8-10 = 2× dari 3-4-5).</li>
          <li><strong>Kebalikan Pythagoras</strong> dipakai buat ngecek jenis segitiga: siku-siku, lancip, atau tumpul.</li>
          <li><strong>Sudut istimewa</strong> 45°-45°-90° dan 30°-60°-90° punya perbandingan sisi yang tetap, jadi gampang dihitung tanpa kalkulator.</li>
        </ul>`,
      formulas: [
        { label: 'Pythagoras', html: 'c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> &nbsp;(c = hipotenusa / sisi miring)' },
        { label: 'Mencari sisi', html: 'c = √(a<sup>2</sup> + b<sup>2</sup>)<br>a = √(c<sup>2</sup> − b<sup>2</sup>)' },
        { label: 'Cek jenis segitiga', html: 'c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> → siku-siku<br>c<sup>2</sup> &lt; a<sup>2</sup> + b<sup>2</sup> → lancip<br>c<sup>2</sup> &gt; a<sup>2</sup> + b<sup>2</sup> → tumpul' },
        { label: 'Segitiga siku-siku istimewa', html: '45°-45°-90° → sisi 1 : 1 : √2<br>30°-60°-90° → sisi 1 : √3 : 2' },
        { label: 'Jarak dua titik', html: 'AB = √((x₂ − x₁)<sup>2</sup> + (y₂ − y₁)<sup>2</sup>)' }
      ],
      examples: [
        {
          q: 'Sebuah tangga panjangnya 13 m bersandar pada tembok. Kaki tangga berjarak 5 m dari tembok. Berapa tinggi ujung tangga dari tanah?',
          steps: [
            'Gambarkan dulu di kepala: tangga = sisi miring (hipotenusa, c = 13), jarak kaki tangga = sisi datar (a = 5), tinggi tembok = sisi tegak (b = ?).',
            'Pakai rumus Pythagoras: c² = a² + b². Kita mau cari b, jadi ubah dulu: b² = c² − a².',
            'Masukkan angka: b² = 13² − 5² = 169 − 25 = 144.',
            'Akar-kan: b = √144 = <strong>12</strong>.',
            'Jadi ujung tangga berada di ketinggian <strong>12 m</strong>. Cek: 5-12-13 memang tripel Pythagoras. Benar!'
          ],
          a: '12 m'
        },
        {
          q: 'Hitung jarak titik A(1, 2) ke titik B(7, 10).',
          steps: [
            'Rumus jarak dua titik itu sebenarnya <em>turunan</em> dari Pythagoras. Bayangin A dan B di peta, lalu tarik garis lurus — itu hipotenusanya.',
            'Selisih x: x₂ − x₁ = 7 − 1 = 6. Selisih y: y₂ − y₁ = 10 − 2 = 8. Jadi segitiga siku-sikunya punya kaki 6 dan 8.',
            'AB = √(6² + 8²) = √(36 + 64) = √100.',
            '√100 = <strong>10</strong>. Jadi jaraknya <strong>10 satuan</strong>.',
            'Bonus: 6-8-10 itu 2× dari tripel 3-4-5. Jadi bisa langsung ketahuan tanpa hitung panjang.'
          ],
          a: '10 satuan'
        },
        {
          q: 'Segitiga dengan sisi 7 cm, 8 cm, dan 10 cm termasuk jenis apa?',
          steps: [
            'Ambil sisi terpanjang sebagai c. Di sini c = 10 (bukan 7 atau 8).',
            'Hitung c²: 10² = 100.',
            'Hitung a² + b²: 7² + 8² = 49 + 64 = 113.',
            'Bandingkan: 100 &lt; 113. Karena c² <em>lebih kecil</em> dari a² + b², maka segitiganya <strong>lancip</strong>.',
            'Ingat patokannya: kalau sama persis = siku-siku; kalau lebih kecil = lancip; kalau lebih besar = tumpul.'
          ],
          a: 'Segitiga lancip'
        }
      ]
    },

    {
      id: 'k8-plsv', title: 'PLSV & PtLSV Lanjutan', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Sebenarnya ini lanjutan dari Kelas 7, tapi sekarang lebih sering muncul dalam bentuk <em>soal cerita</em>. Jadi kita belajar mengubah cerita jadi persamaan, lalu menyelesaikannya.</p>
        <p><strong>Analogi gampangnya:</strong> soal cerita itu kayak <em>puzzle</em>. Ada beberapa petunjuk, kita susun dulu jadi kalimat matematika, baru dipecahkan. Semakin teliti baca petunjuknya, semakin cepat selesai.</p>
        <p><strong>Kapan dipakai?</strong> Buat mecahin soal-soal "kehidupan nyata" — umur, uang, jarak, banyak barang, dll.</p>
        <ul>
          <li><strong>Kata kunci penting:</strong> "paling sedikit" atau "minimal" → ≥. "Paling banyak" atau "maksimal" → ≤. "Kurang dari" → &lt;. "Lebih dari" → &gt;.</li>
          <li><strong>Langkah pemodelan:</strong> (1) tentukan variabel, (2) tulis persamaan/pertidaksamaan, (3) selesaikan, (4) cek apakah jawabannya masuk akal dalam cerita.</li>
        </ul>`,
      formulas: [
        { label: 'Prinsip kesetaraan', html: 'a = b ⇒ a ± c = b ± c; a×c = b×c; a÷c = b÷c (c ≠ 0)' },
        { label: 'Kata → tanda', html: '≥ : minimal / paling sedikit<br>≤ : maksimal / paling banyak' }
      ],
      examples: [
        {
          q: 'Jumlah umur Ayah dan Budi 48 tahun. Jika umur Ayah 3 kali umur Budi, berapa umur Budi?',
          steps: [
            'Langkah 1 — tentukan variabel. Misal umur Budi = x. Karena Ayah 3 kali umur Budi, umur Ayah = 3x.',
            'Langkah 2 — tulis persamaannya. Jumlah umur mereka = 48, jadi x + 3x = 48.',
            'Langkah 3 — selesaikan. x + 3x = 4x, jadi 4x = 48.',
            'Bagi kedua ruas dengan 4: x = 12. Jadi umur Budi = <strong>12 tahun</strong>.',
            'Cek: umur Ayah = 3 × 12 = 36. Jumlahnya 12 + 36 = 48. Cocok!'
          ],
          a: 'Budi 12 tahun (Ayah 36 tahun)'
        },
        {
          q: 'Uang Rina Rp50.000. Ia membeli buku Rp12.000 dan beberapa pensil seharga Rp3.000 per batang. Paling banyak berapa pensil yang bisa dibeli?',
          steps: [
            'Langkah 1 — tentukan variabel. Misal banyak pensil yang dibeli = n.',
            'Langkah 2 — model pertidaksamaannya. Uang yang dipakai (buku + pensil) tidak boleh lebih dari 50.000. Jadi 12.000 + 3.000n ≤ 50.000.',
            'Langkah 3 — selesaikan. Kurangi 12.000 di kedua ruas: 3.000n ≤ 38.000.',
            'Bagi kedua ruas dengan 3.000: n ≤ 38.000 ÷ 3.000 = 12,67 (kira-kira).',
            'Langkah 4 — cek konteks. n itu banyak pensil, jadi harus bilangan cacah (0, 1, 2, …). Nilai cacah terbesar yang ≤ 12,67 adalah <strong>12</strong>.',
            'Jadi paling banyak Rina bisa beli <strong>12 pensil</strong>. Kalau beli 13, uangnya kurang.'
          ],
          a: '12 pensil'
        }
      ]
    },

    {
      id: 'k8-fungsi', title: 'Relasi & Fungsi', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Fungsi itu "mesin ajaib" matematika. Kamu masukkan satu angka, keluar satu angka lain. Contoh: f(x) = 2x artinya "masukkan angka, keluarkan angka itu dikali 2".</p>
        <p><strong>Analogi gampangnya:</strong> bayangin <em>mesin blender</em>. Kamu masukkan buah → keluar jus. Nggak mungkin satu buah keluar dua jenis jus berbeda. Nah, itulah syarat fungsi: satu input, satu output. Kalau satu input bisa menghasilkan dua output berbeda, itu <em>bukan</em> fungsi.</p>
        <ul>
          <li><strong>Domain</strong> = "siapa saja yang boleh masuk mesin" (daerah asal).</li>
          <li><strong>Kodomain</strong> = "siapa saja yang mungkin keluar" (daerah kawan).</li>
          <li><strong>Range</strong> = "siapa saja yang <em>benar-benar</em> keluar" (daerah hasil).</li>
          <li><strong>Korespondensi satu-satu</strong> = fungsi yang "saling setia": tiap anggota domain punya satu pasangan, dan tiap anggota kodomain juga dipasangkan. Biasanya jumlah anggotanya harus sama.</li>
        </ul>`,
      formulas: [
        { label: 'Istilah', html: 'Domain = daerah asal<br>Kodomain = daerah kawan<br>Range = daerah hasil' },
        { label: 'Banyak pemetaan A → B', html: 'n(B)<sup>n(A)</sup>' },
        { label: 'Korespondensi satu-satu', html: 'Jika n(A) = n(B) = n, banyaknya = n!' },
        { label: 'Fungsi linear', html: 'f(x) = ax + b' }
      ],
      examples: [
        {
          q: 'Diketahui f(x) = 3x − 2 dengan domain {−1, 0, 1, 2}. Tentukan range-nya.',
          steps: [
            'Range = hasil keluaran untuk tiap input di domain. Jadi tinggal masukkan satu-satu ke rumus f(x).',
            'Untuk x = −1: f(−1) = 3(−1) − 2 = −3 − 2 = <strong>−5</strong>.',
            'Untuk x = 0: f(0) = 3(0) − 2 = 0 − 2 = <strong>−2</strong>.',
            'Untuk x = 1: f(1) = 3(1) − 2 = 3 − 2 = <strong>1</strong>.',
            'Untuk x = 2: f(2) = 3(2) − 2 = 6 − 2 = <strong>4</strong>.',
            'Jadi range = <strong>{−5, −2, 1, 4}</strong>.'
          ],
          a: 'Range = {−5, −2, 1, 4}'
        },
        {
          q: 'Diketahui A = {a, b, c} dan B = {1, 2}. Berapa banyak pemetaan dari A ke B dan dari B ke A?',
          steps: [
            'Rumus banyak pemetaan A → B = n(B)<sup>n(A)</sup>. Artinya: tiap anggota A boleh pilih pasangan apa saja di B.',
            'n(A) = 3 (yaitu a, b, c), n(B) = 2 (yaitu 1, 2). Jadi A → B = 2³ = <strong>8</strong>.',
            'Sekarang balik arahnya: B → A. Rumusnya n(A)<sup>n(B)</sup> = 3² = <strong>9</strong>.',
            'Jadi ada <strong>8 pemetaan A ke B</strong> dan <strong>9 pemetaan B ke A</strong>.'
          ],
          a: '8 pemetaan (A ke B) dan 9 pemetaan (B ke A)'
        }
      ]
    },

    {
      id: 'k8-garis', title: 'Persamaan Garis Lurus', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Ini tentang garis lurus di bidang koordinat. Kita belajar menghitung <em>kemiringan</em> (gradien), membuat persamaan garis, dan mengenali garis yang sejajar atau tegak lurus.</p>
        <p><strong>Analogi gampangnya:</strong> <strong>gradien itu kemiringan</strong> — kayak jalan nanjak di gunung. m = 2 artinya tiap maju 1 langkah, kamu naik 2 langkah. m = 0 artinya datar (kayak lapangan). Kalau gradiennya negatif, artinya jalan <em>menurun</em>.</p>
        <ul>
          <li><strong>y = mx + c</strong> itu bentuk paling umum. Huruf m = gradien (kemiringan). Huruf c = titik di mana garis memotong sumbu-y.</li>
          <li><strong>Dua garis sejajar</strong> = punya kemiringan sama (m₁ = m₂). Kayak dua rel kereta, nggak bakal ketemu.</li>
          <li><strong>Dua garis tegak lurus</strong> = kemiringannya "saling berkebalikan negatif" (m₁ × m₂ = −1). Contoh: m₁ = 2, maka m₂ = −½.</li>
        </ul>`,
      formulas: [
        { label: 'Bentuk umum', html: 'y = mx + c &nbsp;(m = gradien, c = titik potong sumbu-y)' },
        { label: 'Gradien dari 2 titik', html: 'm = (y₂ − y₁) / (x₂ − x₁)' },
        { label: 'Garis melalui titik (x₁, y₁) dengan gradien m', html: 'y − y₁ = m(x − x₁)' },
        { label: 'Garis melalui 2 titik', html: '(y − y₁) / (y₂ − y₁) = (x − x₁) / (x₂ − x₁)' },
        { label: 'Sejajar & tegak lurus', html: 'Sejajar: m₁ = m₂<br>Tegak lurus: m₁ × m₂ = −1' }
      ],
      examples: [
        {
          q: 'Tentukan gradien dan persamaan garis yang melalui A(2, 3) dan B(6, 11).',
          steps: [
            'Hitung gradien dulu: m = (y₂ − y₁) / (x₂ − x₁) = (11 − 3) / (6 − 2) = 8 / 4 = <strong>2</strong>.',
            'Sekarang kita punya gradien m = 2 dan satu titik, misalnya A(2, 3).',
            'Pakai rumus: y − y₁ = m(x − x₁). Masukkan: y − 3 = 2(x − 2).',
            'Buka kurung kanan: y − 3 = 2x − 4.',
            'Pindahkan −3 ke kanan (jadi +3): y = 2x − 4 + 3 = <strong>2x − 1</strong>.',
            'Cek dengan titik B(6, 11): y = 2(6) − 1 = 12 − 1 = 11. Cocok! Berarti persamaannya benar.'
          ],
          a: 'm = 2 dan y = 2x − 1'
        },
        {
          q: 'Tentukan persamaan garis yang sejajar dengan y = 3x + 4 dan melalui titik (1, 5).',
          steps: [
            'Kata kunci "sejajar" → gradiennya sama dengan garis asal. Garis asal y = 3x + 4 punya m = 3. Jadi gradien garis baru juga <strong>m = 3</strong>.',
            'Kita punya gradien m = 3 dan titik (1, 5). Pakai rumus y − y₁ = m(x − x₁).',
            'Masukkan: y − 5 = 3(x − 1).',
            'Buka kurung: y − 5 = 3x − 3.',
            'Pindahkan −5 ke kanan: y = 3x − 3 + 5 = <strong>3x + 2</strong>.',
            'Cek dengan titik (1, 5): y = 3(1) + 2 = 5. Cocok!'
          ],
          a: 'y = 3x + 2'
        }
      ]
    },

    {
      id: 'k8-statistika', title: 'Statistika', tag: 'Data',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Statistika itu ilmu yang ngajarin kita <em>merangkum banyak angka jadi satu angka</em> yang gampang diingat. Bayangin kamu punya banyak nilai ulangan. Terus gurunya mau tahu "kamu sebenarnya pinter nggak sih?" — nah, statistika yang jawab.</p>

        <p><strong>Empat kata kunci yang wajib kamu tahu:</strong></p>

        <p>🍬 <strong>1. Mean (rata-rata) — "bagi rata".</strong><br>
        Kayak kamu punya 12 permen dan mau dibagi ke 4 teman. Biar adil, tiap teman dapat 3. Nah, angka 3 itu <strong>mean</strong>-nya!<br>
        Cara hitungnya gampang banget: <strong>jumlahkan semua angka, lalu bagi dengan banyaknya angka</strong>.</p>

        <p>🧍 <strong>2. Median (nilai tengah) — "anak tengah barisan".</strong><br>
        Bayangin kamu dan teman-teman baris dari yang paling pendek ke paling tinggi. Yang berdiri <em>di tengah barisan</em> itu siapa? Dia median-nya!<br>
        <strong>Syarat penting:</strong> barisannya harus urut dulu ya, dari kecil ke besar. Kalau belum urut, median-nya bisa salah.</p>

        <p>🏆 <strong>3. Modus — "juara umum".</strong><br>
        Kayak kamu ngitung suara buat ketua kelas. Yang paling banyak dipilih, dialah pemenangnya. Di statistika, modus itu <strong>angka yang paling sering muncul</strong>.<br>
        Kalau semua angka cuma muncul sekali? Berarti <em>nggak ada modus</em>. Kalau ada dua yang sama-sama paling sering, boleh dua-duanya disebut modus.</p>

        <p>🍰 <strong>4. Kuartil — "bagi data jadi 4 tumpukan".</strong><br>
        Kayak kamu potong kue jadi 4 potong sama banyak. Terus tanya:
        <br>• Batas tumpukan ke-1? Itu <strong>Q₁</strong> (kuartil bawah).
        <br>• Batas tumpukan ke-2 (tengah)? Itu <strong>Q₂</strong> (median).
        <br>• Batas tumpukan ke-3? Itu <strong>Q₃</strong> (kuartil atas).</p>

        <p><strong>Bonus: Jangkauan (range)</strong> = selisih data terbesar dan terkecil. Kayak nanya "seberapa jauh anak tertinggi dan anak terpendek?" Itu jangkauannya.</p>

        <p><strong>Ingat baik-baik ya:</strong><br>
        • Mean = angka "pura-pura adil".<br>
        • Median = anak tengah di barisan.<br>
        • Modus = juara umum yang paling banyak dipilih.<br>
        • Kuartil = pembatas antar-tumpukan.</p>`,
      formulas: [
        { label: 'Mean', html: 'Mean = (jumlah semua data) ÷ (banyak data)' },
        { label: 'Median', html: 'Data ganjil: nilai tengah setelah diurutkan<br>Data genap: rata-rata dua nilai tengah' },
        { label: 'Modus', html: 'Nilai yang paling sering muncul' },
        { label: 'Jangkauan', html: 'Jangkauan = data terbesar − data terkecil' },
        { label: 'Kuartil & JIK', html: 'Q₂ = median<br>Q₁ = median data bagian bawah<br>Q₃ = median data bagian atas<br>JIK = Q₃ − Q₁' }
      ],
      examples: [
        {
          q: 'Data: 4, 6, 7, 7, 8, 9, 10, 13. Tentukan mean, median, modus, jangkauan, Q₁, Q₃, dan JIK.',
          steps: [
            '<strong>Langkah 0 — urutkan.</strong> Untung datanya sudah urut dari kecil ke besar: 4, 6, 7, 7, 8, 9, 10, 13. Kalau belum, urutkan dulu ya.',
            '🍬 <strong>Mean.</strong> Jumlahkan semua angka: 4 + 6 + 7 + 7 + 8 + 9 + 10 + 13 = 64. Banyak angka = 8. Mean = 64 ÷ 8 = <strong>8</strong>. Ibaratnya, kalau semua anak dapat nilai yang sama, nilai mereka semua 8.',
            '🧍 <strong>Median.</strong> Banyak data 8 (genap), jadi nggak ada satu angka di tengah. Ambil dua angka tengah: angka ke-4 = 7 dan angka ke-5 = 8. Rata-ratain: (7 + 8) ÷ 2 = 15 ÷ 2 = <strong>7,5</strong>. Ibaratnya: kalau 7 dan 8 tarik tambang, titik tengahnya di 7,5.',
            '🏆 <strong>Modus.</strong> Lihat lagi datanya: 4, 6, 7, 7, 8, 9, 10, 13. Angka yang muncul dua kali = 7. Angka lain cuma muncul sekali. Jadi modus = <strong>7</strong>. Ibaratnya: 7 itu juara umum yang paling banyak dipilih.',
            '📏 <strong>Jangkauan.</strong> Data terbesar − data terkecil = 13 − 4 = <strong>9</strong>. Ibaratnya: selisih anak tertinggi dan terpendek = 9.',
            '🍰 <strong>Q₁ (kuartil bawah).</strong> Bagian bawah = separuh data yang di bawah median: 4, 6, 7, 7. Median dari bagian bawah = (6 + 7) ÷ 2 = <strong>6,5</strong>. Itu Q₁.',
            '🍰 <strong>Q₃ (kuartil atas).</strong> Bagian atas = separuh data yang di atas median: 8, 9, 10, 13. Median dari bagian atas = (9 + 10) ÷ 2 = <strong>9,5</strong>. Itu Q₃.',
            '📐 <strong>JIK (jangkauan interkuartil).</strong> Q₃ − Q₁ = 9,5 − 6,5 = <strong>3</strong>. Ibaratnya: seberapa lebar "tumpukan tengah" data kita? 3.'
          ],
          a: 'Mean 8; median 7,5; modus 7; jangkauan 9; Q₁ = 6,5; Q₃ = 9,5; JIK = 3'
        },
        {
          q: 'Data: 3, 5, 6, 8, 9, 11, 12. Tentukan Q₁, Q₂, Q₃ dan JIK.',
          steps: [
            'Data sudah urut dari kecil ke besar: 3, 5, 6, 8, 9, 11, 12. Banyak data = 7 (ganjil).',
            '🍰 <strong>Q₂ (median).</strong> Karena datanya ganjil, median = data ke-4 (yang pas di tengah). Data ke-4 = <strong>8</strong>. Jadi Q₂ = 8.',
            '🍰 <strong>Q₁ (kuartil bawah).</strong> Ambil angka-angka <em>sebelum</em> median: 3, 5, 6. Karena ada 3 angka, median-nya yang di tengah = <strong>5</strong>. Jadi Q₁ = 5.',
            '🍰 <strong>Q₃ (kuartil atas).</strong> Ambil angka-angka <em>sesudah</em> median: 9, 11, 12. Median-nya yang di tengah = <strong>11</strong>. Jadi Q₃ = 11.',
            '📐 <strong>JIK.</strong> Q₃ − Q₁ = 11 − 5 = <strong>6</strong>.',
            '💡 <strong>Catatan penting.</strong> Kalau data ganjil, median (Q₂) "dikeluarin" dulu, baru sisa datanya dibagi 2 kelompok. Kalau data genap, nggak ada yang dikeluarin — dua angka tengahnya dirata-ratakan. Gampang kan?'
          ],
          a: 'Q₁ = 5, Q₂ = 8, Q₃ = 11, JIK = 6'
        }
      ]
    }
  ]
},

/* ============================== KELAS 9 ============================== */
{
  id: 'k9', label: 'Kelas 9',
  desc: 'SPLDV, bangun ruang & lingkaran, transformasi geometri, serta peluang & pemilihan sampel. Lanjut level berikutnya!',
  chapters: [
    {
      id: 'k9-spldv', title: 'Sistem Persamaan Linear Dua Variabel (SPLDV)', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> SPLDV = dua persamaan dengan dua "kotak kosong" (biasanya x dan y) yang harus dicari <em>sekakigus</em>. Karena satu persamaan saja nggak cukup buat nebak dua angka, kita pakai dua persamaan yang saling berkaitan.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin kamu dan temanmu sama-sama belanja di kantin, tapi kalian lupa harga roti dan susu. Kamu ingat "2 roti + 1 susu = 13.000", temanmu ingat "1 roti + 3 susu = 14.000". Dari dua petunjuk ini, kamu bisa nebak harga masing-masing. Itulah SPLDV.</p>
        <ul>
          <li><strong>Metode grafik:</strong> gambar dua garis, titik potongnya = jawaban.</li>
          <li><strong>Metode substitusi:</strong> nyatakan salah satu variabel dari satu persamaan, lalu masukkan ke persamaan lain.</li>
          <li><strong>Metode eliminasi:</strong> samakan koefisien salah satu variabel, lalu kurangkan/jumlahkan supaya variabel itu hilang.</li>
          <li><strong>Metode campuran:</strong> pakai eliminasi dulu, lalu substitusi — biasanya paling cepat.</li>
        </ul>`,
      formulas: [
        { label: 'Bentuk umum', html: 'ax + by = c<br>dx + ey = f' },
        { label: 'Berpotongan (1 solusi)', html: 'a/d ≠ b/e' },
        { label: 'Sejajar (tidak ada solusi)', html: 'a/d = b/e ≠ c/f' },
        { label: 'Berimpit (tak hingga solusi)', html: 'a/d = b/e = c/f' }
      ],
      examples: [
        {
          q: 'Selesaikan x + y = 7 dan 2x − y = 5 (metode campuran).',
          steps: [
            'Coba lihat dulu: koefisien y di persamaan pertama +1, di persamaan kedua −1. Kalau dijumlahkan, y-nya akan hilang. Jadi kita pakai eliminasi dulu.',
            'Jumlahkan kedua persamaan: (x + y) + (2x − y) = 7 + 5.',
            'Di kiri: x + 2x = 3x, dan y + (−y) = 0 (hilang!). Di kanan: 7 + 5 = 12. Jadi 3x = 12.',
            'Bagi kedua ruas dengan 3: x = <strong>4</strong>.',
            'Sekarang substitusi x = 4 ke persamaan pertama (yang paling simpel): x + y = 7 → 4 + y = 7.',
            'Pindahkan 4 ke kanan: y = 7 − 4 = <strong>3</strong>.',
            'Jadi x = 4 dan y = 3. Cek ke persamaan kedua: 2(4) − 3 = 8 − 3 = 5. Cocok!'
          ],
          a: 'x = 4, y = 3'
        },
        {
          q: 'Selesaikan 2x + 3y = 12 dan x − y = 1 (metode substitusi).',
          steps: [
            'Pilih persamaan yang paling gampang disusun ulang. Persamaan kedua (x − y = 1) bisa langsung kita ubah jadi x = …',
            'Dari x − y = 1, pindahkan −y ke kanan: x = y + 1. Nah, sekarang x sudah "sendirian".',
            'Substitusi x = y + 1 ke persamaan pertama: 2(y + 1) + 3y = 12.',
            'Buka kurung: 2y + 2 + 3y = 12.',
            'Gabung yang sejenis: 5y + 2 = 12.',
            'Kurangi 2 di kedua ruas: 5y = 10. Bagi dengan 5: y = <strong>2</strong>.',
            'Sekarang masukkan y = 2 ke x = y + 1, jadi x = 2 + 1 = <strong>3</strong>.',
            'Cek ke persamaan pertama: 2(3) + 3(2) = 6 + 6 = 12. Cocok!'
          ],
          a: 'x = 3, y = 2'
        },
        {
          q: 'Harga 2 buku dan 1 pensil Rp13.000, sedangkan 1 buku dan 3 pensil Rp14.000. Berapa harga masing-masing?',
          steps: [
            'Misal harga buku = b dan harga pensil = p (dalam ribuan rupiah, biar angka lebih kecil). Modelnya: 2b + p = 13 dan b + 3p = 14.',
            'Dari persamaan kedua, susun ulang: b = 14 − 3p.',
            'Substitusi ke persamaan pertama: 2(14 − 3p) + p = 13.',
            'Buka kurung: 28 − 6p + p = 13.',
            'Gabung: 28 − 5p = 13. Pindahkan 28 ke kanan: −5p = 13 − 28 = −15.',
            'Bagi dengan −5: p = 3. Jadi harga pensil = <strong>Rp3.000</strong>.',
            'Masukkan p = 3 ke b = 14 − 3p = 14 − 9 = 5. Jadi harga buku = <strong>Rp5.000</strong>.',
            'Cek: 2(5) + 3 = 13 ✓, dan 5 + 3(3) = 14 ✓.'
          ],
          a: 'Buku Rp5.000, pensil Rp3.000'
        }
      ]
    },

    {
      id: 'k9-bangunruang', title: 'Bangun Ruang & Lingkaran', tag: 'Geometri',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Bangun ruang itu bentuk 3D — punya volume (isi) dan luas permukaan (kulit). Contohnya: kubus (kotak susu), tabung (kaleng), kerucut (cone es krim), bola (bola bekel). Lingkaran juga masuk sini karena jadi dasar dari tabung dan kerucut.</p>
        <p><strong>Analogi gampangnya:</strong> beda <em>volume</em> dan <em>luas permukaan</em> itu kayak beda isi botol dan stiker yang nempel di botol. Volume = seberapa banyak air yang bisa diisi. Luas permukaan = seberapa banyak kertas kado buat membungkusnya.</p>
        <ul>
          <li><strong>Sisi datar:</strong> kubus, balok, prisma, limas.</li>
          <li><strong>Sisi lengkung:</strong> tabung, kerucut, bola.</li>
          <li><strong>Perubahan skala k:</strong> kalau ukuran bangun dikali k, maka luas permukaan dikali k², dan volume dikali k³. Contoh: kalau rusuk kubus dilipatgandakan 2×, volumenya jadi 8× lebih besar.</li>
        </ul>`,
      formulas: [
        { label: 'Kubus', html: 'L = 6s<sup>2</sup> &nbsp;;&nbsp; V = s<sup>3</sup>' },
        { label: 'Balok', html: 'L = 2(pl + pt + lt) &nbsp;;&nbsp; V = p × l × t' },
        { label: 'Prisma', html: 'L = 2·L<sub>alas</sub> + K<sub>alas</sub>·t &nbsp;;&nbsp; V = L<sub>alas</sub> · t' },
        { label: 'Limas', html: 'V = ⅓ · L<sub>alas</sub> · t' },
        { label: 'Lingkaran', html: 'K = 2πr &nbsp;;&nbsp; L = πr<sup>2</sup>' },
        { label: 'Juring', html: 'Luas juring = (θ / 360°) × L<br>Panjang busur = (θ / 360°) × K' },
        { label: 'Tabung', html: 'L = 2πr(r + t) &nbsp;;&nbsp; V = πr<sup>2</sup>t' },
        { label: 'Kerucut', html: 'L = πr(r + s) &nbsp;;&nbsp; V = ⅓πr<sup>2</sup>t' },
        { label: 'Bola', html: 'L = 4πr<sup>2</sup> &nbsp;;&nbsp; V = 4/3 πr<sup>3</sup>' },
        { label: 'Perubahan skala k', html: 'Luas × k<sup>2</sup> &nbsp;;&nbsp; Volume × k<sup>3</sup>' }
      ],
      examples: [
        {
          q: 'Sebuah juring lingkaran berjari-jari 14 cm dengan sudut pusat 90°. Hitung panjang busur dan luas juringnya (π = 22/7).',
          steps: [
            'Hitung dulu keliling dan luas lingkaran penuh. K = 2πr = 2 × (22/7) × 14 = 88 cm. L = πr² = (22/7) × 14 × 14 = 616 cm².',
            'Juring itu adalah "potongan" lingkaran. Karena sudutnya 90°, ia hanya 90/360 = 1/4 dari lingkaran penuh.',
            'Panjang busur = (90/360) × 88 = (1/4) × 88 = <strong>22 cm</strong>.',
            'Luas juring = (90/360) × 616 = (1/4) × 616 = <strong>154 cm²</strong>.',
            'Jadi panjang busurnya 22 cm dan luas juringnya 154 cm².'
          ],
          a: 'Busur 22 cm; luas juring 154 cm²'
        },
        {
          q: 'Tabung berjari-jari 7 cm dan tinggi 10 cm. Hitung volume dan luas permukaannya (π = 22/7).',
          steps: [
            'Volume tabung = πr²t. Masukkan: (22/7) × 7 × 7 × 10.',
            '22/7 × 49 = 22 × 7 = 154. Lalu 154 × 10 = <strong>1.540 cm³</strong>.',
            'Luas permukaan tabung = 2πr(r + t). Masukkan: 2 × (22/7) × 7 × (7 + 10).',
            '2 × 22 × 17 = 44 × 17 = <strong>748 cm²</strong>.',
            'Jadi volumenya 1.540 cm³ dan luas permukaannya 748 cm².'
          ],
          a: 'V = 1.540 cm³; L = 748 cm²'
        }
      ]
    },

    {
      id: 'k9-transformasi', title: 'Transformasi Geometri & Kekongruenan', tag: 'Geometri',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Transformasi = cara "mindahin" atau "mengubah" bangun geometri tanpa mengubah bentuk aslinya. Ada 4 jenis: translasi (geser), refleksi (cermin), rotasi (putar), dan dilatasi (zoom).</p>
        <p><strong>Analogi gampangnya:</strong></p>
        <ul>
          <li><strong>Translasi</strong> = geser pion monopoli. Bentuknya nggak berubah, cuma pindah tempat.</li>
          <li><strong>Refleksi</strong> = lihat di cermin. Bentuknya sama, tapi posisinya "kebalik".</li>
          <li><strong>Rotasi</strong> = puter jarum jam. Bentuk sama, cuma diputer.</li>
          <li><strong>Dilatasi</strong> = zoom in/out kamera. Bentuk tetap mirip, tapi ukurannya berubah.</li>
        </ul>
        <p><strong>Kekongruenan</strong> = dua bangun yang <em>sama persis</em> bentuk dan ukurannya (bisa ditumpuk-tumpuk pas). Syaratnya: S-S-S (tiga sisi sama), S-Sd-S (dua sisi dan sudut antaranya sama), atau Sd-S-Sd (dua sudut dan sisi antaranya sama).</p>`,
      formulas: [
        { label: 'Translasi (a, b)', html: '(x, y) → (x + a, y + b)' },
        { label: 'Refleksi', html: 'Sumbu-x: (x, −y)<br>Sumbu-y: (−x, y)<br>Titik asal O: (−x, −y)<br>y = x: (y, x)<br>y = −x: (−y, −x)<br>x = k: (2k − x, y)<br>y = h: (x, 2h − y)' },
        { label: 'Rotasi pusat O(0, 0)', html: '+90°: (−y, x)<br>−90°: (y, −x)<br>180°: (−x, −y)' },
        { label: 'Dilatasi', html: 'Pusat O: (kx, ky)<br>Pusat P(a, b): (k(x − a) + a, k(y − b) + b)' },
        { label: 'Syarat kongruen', html: 'S-S-S ; S-Sd-S ; Sd-S-Sd' }
      ],
      examples: [
        {
          q: 'Titik A(3, −2) direfleksikan terhadap garis y = x, lalu (untuk soal terpisah) terhadap sumbu-x. Tentukan kedua bayangannya.',
          steps: [
            '<strong>Refleksi terhadap y = x.</strong> Aturannya: (x, y) → (y, x), yaitu x dan y ditukar posisinya.',
            'A(3, −2) → A′(<strong>−2, 3</strong>).',
            '<strong>Refleksi terhadap sumbu-x.</strong> Aturannya: (x, y) → (x, −y), yaitu tinggal balikin tanda y.',
            'A(3, −2) → A″(<strong>3, 2</strong>).',
            'Jadi bayangan lewat y = x adalah (−2, 3), dan lewat sumbu-x adalah (3, 2).'
          ],
          a: '(−2, 3) dan (3, 2)'
        },
        {
          q: 'Tentukan bayangan titik B(4, 1) oleh rotasi +90° (berlawanan arah jarum jam) dengan pusat O.',
          steps: [
            'Rotasi +90° punya aturan (x, y) → (−y, x). Artinya: x jadi −y, dan y jadi x (posisinya ditukar dan salah satunya dibalik tandanya).',
            'B(4, 1): x = 4, y = 1.',
            'x′ = −y = −1. y′ = x = 4.',
            'Jadi bayangannya B′(<strong>−1, 4</strong>).',
            'Kalau mau cek, bayangkan B ada di kanan-bawah, diputer 90° berlawanan jarum jam → pindah ke kiri-atas. Posisi (−1, 4) memang kiri-atas. Cocok!'
          ],
          a: 'B′(−1, 4)'
        },
        {
          q: 'Tentukan bayangan titik C(4, 3) oleh dilatasi pusat P(1, 2) dengan faktor skala 3.',
          steps: [
            'Dilatasi bukan sekedar "kali 3", tapi diukur dari titik pusat. Jadi pertama cari dulu jarak C dari P.',
            'Jarak horizontal: x − a = 4 − 1 = 3. Jarak vertikal: y − b = 3 − 2 = 1.',
            'Kalikan dengan faktor skala k = 3: 3 × 3 = 9 (horizontal), 3 × 1 = 3 (vertikal).',
            'Tambahkan lagi ke titik pusat. x′ = 9 + 1 = <strong>10</strong>. y′ = 3 + 2 = <strong>5</strong>.',
            'Jadi bayangannya C′(<strong>10, 5</strong>).'
          ],
          a: 'C′(10, 5)'
        }
      ]
    },

    {
      id: 'k9-peluang', title: 'Peluang & Pemilihan Sampel', tag: 'Data',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Peluang itu matematika dari kata "mungkin". Berapa kemungkinan sesuatu terjadi? Bisakah dihitung tanpa harus benar-benar kejadian? Bisa!</p>
        <p><strong>Analogi gampangnya:</strong> kamu lempar koin. Sebelum dilempar, kamu <em>yakin</em> bisa muncul angka atau gambar. Tapi kamu nggak tahu yang mana. Peluang ngasih tahu: "kemungkinan muncul angka itu ½ atau 50%". Kayak cuaca: "besok peluang hujan 60%" — bukan ramalan, tapi perkiraan berdasar data.</p>
        <ul>
          <li><strong>Peluang teoretis:</strong> dihitung dari "seharusnya" secara matematis. Contoh: dadu punya 6 sisi sama mungkin, jadi peluang muncul angka 3 = 1/6.</li>
          <li><strong>Peluang empiris:</strong> dihitung dari percobaan nyata. Contoh: kamu lempar koin 100 kali, gambar muncul 48 kali → peluang empiris = 48/100 = 0,48.</li>
          <li><strong>Frekuensi harapan:</strong> "kalau dicoba n kali, kira-kira berapa kali muncul?" Caranya: peluang × n.</li>
          <li><strong>Pemilihan sampel:</strong> cara memilih sebagian kecil (sampel) dari seluruh (populasi) supaya kesimpulannya mewakili. Harus <em>acak</em>, biar adil.</li>
        </ul>`,
      formulas: [
        { label: 'Peluang teoretis', html: 'P(A) = n(A) ÷ n(S) &nbsp;;&nbsp; 0 ≤ P(A) ≤ 1' },
        { label: 'Peluang komplemen', html: 'P(A′) = 1 − P(A)' },
        { label: 'Peluang empiris', html: 'P(A) = frekuensi muncul A ÷ banyak percobaan' },
        { label: 'Frekuensi harapan', html: 'F<sub>h</sub> = P(A) × banyak percobaan' }
      ],
      examples: [
        {
          q: 'Sebuah dadu dilempar satu kali. Berapa peluang muncul mata dadu prima?',
          steps: [
            'Ruang sampel (semua kemungkinan) dadu: S = {1, 2, 3, 4, 5, 6}. Jadi n(S) = 6.',
            'Kejadian yang diinginkan: mata dadu prima. Bilangan prima di antara 1–6: 2, 3, 5. Jadi A = {2, 3, 5}, n(A) = 3.',
            'Peluang = n(A) ÷ n(S) = 3/6.',
            'Sederhanakan: 3/6 = <strong>1/2</strong>. Jadi peluangnya ½ atau 50%.',
            'Cek logika: dari 6 kemungkinan, ada 3 yang prima. Jadi setengahnya. Masuk akal!'
          ],
          a: '½ atau 50%'
        },
        {
          q: 'Dalam 50 kali lemparan koin, sisi gambar muncul 28 kali. Berapa peluang empirisnya, dan berapa kira-kira gambar muncul jika koin dilempar 200 kali?',
          steps: [
            'Peluang empiris = (frekuensi muncul) ÷ (banyak percobaan) = 28 ÷ 50.',
            '28 ÷ 50 = <strong>0,56</strong>. Ini peluang empirisnya (sedikit di atas 0,5 karena kebetulan lebih sering muncul gambar).',
            'Frekuensi harapan untuk 200 lemparan = peluang × banyak percobaan. Pakai peluang teoretis (0,5) atau empiris (0,56)? Untuk perkiraan biasanya pakai 0,5 karena koin seharusnya adil. Tapi kalau yang diminta meneruskan data percobaan, pakai 0,56.',
            'Dengan 0,5: 0,5 × 200 = 100. Dengan 0,56: 0,56 × 200 = 112.',
            'Biasanya soal jenis ini pakai peluang teoretis, jadi jawabannya <strong>±100 kali</strong>. Kalau diminta pakai data empiris, jawabannya 112 kali. Dua-duanya masuk akal.'
          ],
          a: 'Peluang empiris 0,56; harapan sekitar 100–112 kali'
        }
      ]
    }
  ]
},

/* ============================== KELAS 10 ============================== */
{
  id: 'k10', label: 'Kelas 10', badge: 'Cicilan Materi',
  desc: 'Materi awal SMA/SMK untuk dicicil lebih dulu: eksponen & logaritma, barisan & deret, SPtLDV, dan trigonometri dasar. Pelan-pelan, yang penting paham.',
  chapters: [
    {
      id: 'k10-eksplog', title: 'Eksponen & Logaritma Dasar', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Eksponen itu pangkat (yang sudah kita kenal dari Kelas 8). Logaritma itu <em>kebalikan</em>-nya: kalau eksponen tanya "2 pangkat berapa = 8?", logaritma jawab "3".</p>
        <p><strong>Analogi gampangnya:</strong> bayangin dua arah di jalan tol. Arah "pergi" itu eksponen: dari 2 dan 3 jadi 8 (2³ = 8). Arah "pulang" itu logaritma: dari 8 dan 2 jadi 3 (²log 8 = 3). Dua-duanya ngomongin hal yang sama, cuma beda arah pandang.</p>
        <ul>
          <li><strong>Pangkat pecahan</strong> a<sup>m/n</sup> = <sup>n</sup>√(a<sup>m</sup>). Jadi pangkat ½ artinya akar kuadrat.</li>
          <li><strong>Persamaan eksponen:</strong> kalau a<sup>f(x)</sup> = a<sup>g(x)</sup> dengan a &gt; 0 dan a ≠ 1, maka f(x) = g(x). Intinya: kalau basisnya sama, pangkatnya harus sama.</li>
          <li><strong>Sifat logaritma</strong> yang paling sering dipakai: perkalian jadi tambah, pembagian jadi kurang, pangkat jadi kali.</li>
        </ul>`,
      formulas: [
        { label: 'Pangkat pecahan', html: 'a<sup>m/n</sup> = <sup>n</sup>√(a<sup>m</sup>)' },
        { label: 'Persamaan eksponen', html: 'a<sup>f(x)</sup> = a<sup>g(x)</sup> ⇒ f(x) = g(x) &nbsp;(a &gt; 0, a ≠ 1)' },
        { label: 'Definisi logaritma', html: '<sup>a</sup>log b = c ⇔ a<sup>c</sup> = b &nbsp;(a &gt; 0, a ≠ 1, b &gt; 0)' },
        { label: 'Sifat logaritma', html: '<sup>a</sup>log(b·c) = <sup>a</sup>log b + <sup>a</sup>log c<br><sup>a</sup>log(b/c) = <sup>a</sup>log b − <sup>a</sup>log c<br><sup>a</sup>log b<sup>n</sup> = n · <sup>a</sup>log b' },
        { label: 'Nilai khusus & ganti basis', html: '<sup>a</sup>log a = 1 &nbsp;;&nbsp; <sup>a</sup>log 1 = 0<br><sup>a</sup>log b = (<sup>c</sup>log b) ÷ (<sup>c</sup>log a)' }
      ],
      examples: [
        {
          q: 'Selesaikan 2<sup>x+1</sup> = 32.',
          steps: [
            'Tujuan: samakan basis (angka yang dipangkatkan) di kedua ruas. Kiri basisnya 2, kanan basisnya 32. Kita perlu ubah 32 jadi pangkat 2.',
            '32 = 2 × 2 × 2 × 2 × 2 = 2<sup>5</sup>. Jadi soalnya jadi 2<sup>x+1</sup> = 2<sup>5</sup>.',
            'Karena basis sudah sama (2), pangkatnya harus sama. Jadi x + 1 = 5.',
            'Kurangi 1 di kedua ruas: x = 5 − 1 = <strong>4</strong>.',
            'Cek: 2<sup>4+1</sup> = 2<sup>5</sup> = 32. Cocok!'
          ],
          a: 'x = 4'
        },
        {
          q: 'Hitung <sup>8</sup>log 16.',
          steps: [
            'Ingat definisi: <sup>8</sup>log 16 = c artinya 8<sup>c</sup> = 16.',
            'Kita perlu cari c. Karena 8 dan 16 sama-sama pangkat 2, kita ubah: 8 = 2<sup>3</sup> dan 16 = 2<sup>4</sup>.',
            'Jadi (2<sup>3</sup>)<sup>c</sup> = 2<sup>4</sup>, yang menjadi 2<sup>3c</sup> = 2<sup>4</sup>.',
            'Basis sama, jadi pangkatnya juga sama: 3c = 4.',
            'Bagi kedua ruas dengan 3: c = <strong>4/3</strong>.',
            'Jadi <sup>8</sup>log 16 = 4/3. Boleh juga ditulis 1⅓.'
          ],
          a: '4/3'
        }
      ]
    },

    {
      id: 'k10-barisan', title: 'Barisan & Deret (Aritmetika & Geometri)', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Barisan itu deretan angka yang punya pola. Kalau dijumlahkan semua, itu jadi <em>deret</em>. Ada dua jenis yang paling umum: aritmetika dan geometri.</p>
        <p><strong>Analogi gampangnya:</strong></p>
        <ul>
          <li><strong>Aritmetika</strong> = <em>tangga</em>. Setiap anak tangga naik dengan <em>selisih tetap</em>. Contoh: 3, 7, 11, 15 … tiap naik anak tangga, tingginya tambah 4. Selisih tetap 4 ini disebut <strong>beda (b)</strong>.</li>
          <li><strong>Geometri</strong> = <em>bola salju yang menggelembung</em>. Setiap kali, ukurannya <em>dikali tetap</em>. Contoh: 2, 6, 18, 54 … tiap loncat, dikali 3. Perbandingan tetap 3 ini disebut <strong>rasio (r)</strong>.</li>
        </ul>
        <p><strong>Kapan dipakai?</strong> Untuk prediksi: "kalau pola nabungku tetap naik Rp50.000 tiap bulan, 5 tahun lagi jadi berapa?" Atau "kalau tabungan berbunga 10% per tahun, 10 tahun lagi jadi berapa?"</p>`,
      formulas: [
        { label: 'Aritmetika: suku ke-n', html: 'U<sub>n</sub> = a + (n − 1)b &nbsp;;&nbsp; b = U<sub>2</sub> − U<sub>1</sub>' },
        { label: 'Aritmetika: jumlah n suku', html: 'S<sub>n</sub> = (n/2) × (2a + (n − 1)b) = (n/2) × (a + U<sub>n</sub>)' },
        { label: 'Geometri: suku ke-n', html: 'U<sub>n</sub> = a · r<sup>n−1</sup> &nbsp;;&nbsp; r = U<sub>2</sub> ÷ U<sub>1</sub>' },
        { label: 'Geometri: jumlah n suku', html: 'S<sub>n</sub> = a(r<sup>n</sup> − 1) / (r − 1) &nbsp;(r &gt; 1)<br>S<sub>n</sub> = a(1 − r<sup>n</sup>) / (1 − r) &nbsp;(r &lt; 1)' },
        { label: 'Tak hingga', html: 'S<sub>∞</sub> = a / (1 − r) &nbsp;untuk |r| &lt; 1' }
      ],
      examples: [
        {
          q: 'Barisan aritmetika: 3, 7, 11, … Tentukan U₁₀ dan S₁₀.',
          steps: [
            'Tentukan dulu suku pertama (a) dan beda (b). a = 3 (suku pertama). b = U₂ − U₁ = 7 − 3 = <strong>4</strong>.',
            'Cari U₁₀: U<sub>n</sub> = a + (n − 1)b = 3 + (10 − 1) × 4.',
            '= 3 + 9 × 4 = 3 + 36 = <strong>39</strong>. Jadi U₁₀ = 39.',
            'Cari S₁₀: S<sub>n</sub> = (n/2) × (a + U<sub>n</sub>) = (10/2) × (3 + 39).',
            '= 5 × 42 = <strong>210</strong>. Jadi S₁₀ = 210.',
            'Cek manual sebentar: 3 + 7 + 11 + 15 + 19 + 23 + 27 + 31 + 35 + 39 = 210. Cocok!'
          ],
          a: 'U₁₀ = 39 dan S₁₀ = 210'
        },
        {
          q: 'Barisan geometri: 2, 6, 18, … Tentukan U₅ dan S₅.',
          steps: [
            'Tentukan a dan r. a = 2 (suku pertama). r = U₂ ÷ U₁ = 6 ÷ 2 = <strong>3</strong>.',
            'Cari U₅: U<sub>n</sub> = a · r<sup>n−1</sup> = 2 · 3<sup>4</sup>.',
            '3<sup>4</sup> = 3 × 3 × 3 × 3 = 81. Jadi U₅ = 2 × 81 = <strong>162</strong>.',
            'Cari S₅: S<sub>n</sub> = a(r<sup>n</sup> − 1) / (r − 1) = 2(3<sup>5</sup> − 1) / (3 − 1).',
            '3<sup>5</sup> = 243. Jadi = 2(243 − 1) / 2 = 2 × 242 / 2 = <strong>242</strong>.',
            'Cek manual: 2 + 6 + 18 + 54 + 162 = 242. Cocok!'
          ],
          a: 'U₅ = 162 dan S₅ = 242'
        }
      ]
    },

    {
      id: 'k10-sptldv', title: 'Sistem Pertidaksamaan Linear Dua Variabel', tag: 'Aljabar',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Kalau PLSV itu titik, SPtLDV itu <strong>daerah</strong>. Kayak "mana saja area di peta yang boleh saya masukin?" Jawabannya bukan satu titik, tapi wilayah.</p>
        <p><strong>Analogi gampangnya:</strong> bayangin kamu punya pagar di halaman. Pertidaksamaan itu pagarnya. Daerah penyelesaian itu <em>halaman yang boleh kamu main</em>. Kalau ada beberapa pagar (sistem), yang boleh dimainin itu daerah yang <em>di dalam semua pagar</em> — irisan semua wilayah.</p>
        <ul>
          <li><strong>Garis batas:</strong> ganti tanda pertidaksamaan jadi "=" dulu, lalu cari titik potong dengan sumbu-x dan sumbu-y.</li>
          <li><strong>Garis penuh atau putus-putus?</strong> ≤ atau ≥ → garis penuh (titiknya termasuk). &lt; atau &gt; → garis putus-putus (titiknya tidak termasuk).</li>
          <li><strong>Uji titik:</strong> ambil titik (misal (0,0)). Kalau memenuhi → daerah di sisi titik itu. Kalau tidak → daerah seberangnya.</li>
        </ul>`,
      formulas: [
        { label: 'Titik potong sumbu', html: 'Sumbu-x (y = 0): x = c/a<br>Sumbu-y (x = 0): y = c/b' },
        { label: 'Jenis garis', html: '≤, ≥ → garis penuh<br>&lt;, &gt; → garis putus-putus' },
        { label: 'Uji titik', html: 'Masukkan titik uji ke pertidaksamaan:<br>benar → sisi titik uji<br>salah → sisi seberang' }
      ],
      examples: [
        {
          q: 'Gambarkan daerah penyelesaian sistem 2x + 3y ≤ 12, x ≥ 0, y ≥ 0.',
          steps: [
            'Cari garis batas dulu: 2x + 3y = 12. Karena tanda pertidaksamaannya ≤, garisnya <strong>penuh</strong>.',
            'Titik potong sumbu-x (y = 0): 2x + 0 = 12 → x = 6 → titik (6, 0).',
            'Titik potong sumbu-y (x = 0): 0 + 3y = 12 → y = 4 → titik (0, 4).',
            'Uji titik (0, 0): 2(0) + 3(0) = 0, dan 0 ≤ 12 (benar). Berarti arsir daerah yang mengandung titik asal.',
            'x ≥ 0 artinya arsir di sebelah kanan sumbu-y. y ≥ 0 artinya arsir di atas sumbu-x. Gabungin semua → dapat kuadran I.',
            'Irisan semua = segitiga dengan titik sudut (0, 0), (6, 0), dan (0, 4). Itu daerah penyelesaiannya.'
          ],
          a: 'Segitiga dengan titik sudut (0, 0), (6, 0), dan (0, 4)'
        },
        {
          q: 'Apakah titik (2, 3) termasuk himpunan penyelesaian sistem x + y ≥ 4 dan 2x − y ≤ 3?',
          steps: [
            'Uji pertidaksamaan pertama x + y ≥ 4 dengan (2, 3): 2 + 3 = 5. Apakah 5 ≥ 4? Ya. Jadi memenuhi.',
            'Uji pertidaksamaan kedua 2x − y ≤ 3 dengan (2, 3): 2(2) − 3 = 4 − 3 = 1. Apakah 1 ≤ 3? Ya. Jadi memenuhi.',
            'Karena <em>kedua</em> pertidaksamaan terpenuhi, titik (2, 3) <strong>termasuk</strong> himpunan penyelesaian.',
            'Kalau salah satu saja gagal (misal 5 tidak ≥ 4), maka titik itu tidak termasuk. Ingat: sistem itu harus lolos <em>semua</em> syarat.'
          ],
          a: 'Ya, (2, 3) termasuk himpunan penyelesaian'
        }
      ]
    },

    {
      id: 'k10-trigonometri', title: 'Trigonometri Dasar', tag: 'Geometri',
      summary: `
        <p><strong>Ini materi apa sih?</strong> Trigonometri itu ilmu tentang <em>perbandingan sisi</em> di segitiga siku-siku. Ada tiga yang wajib kenal: sin, cos, dan tan.</p>
        <p><strong>Analogi gampangnya:</strong> sin, cos, tan itu kayak tiga kakak beradik. Mereka semua membandingkan dua sisi segitiga, tapi cara membandingkannya beda.</p>
        <ul>
          <li><strong>sin</strong> = <em>depan ÷ miring</em>. Ingat: <strong>sin-de-mi</strong>.</li>
          <li><strong>cos</strong> = <em>samping ÷ miring</em>. Ingat: <strong>cos-sa-mi</strong>.</li>
          <li><strong>tan</strong> = <em>depan ÷ samping</em>. Ingat: <strong>tan-de-sa</strong>.</li>
        </ul>
        <p>Lalu apa itu "depan", "samping", "miring"?</p>
        <ul>
          <li><strong>Miring</strong> = sisi miring segitiga (selalu di seberang sudut siku-siku). Paling gampang dikenali.</li>
          <li><strong>Depan</strong> = sisi yang <em>berhadapan langsung</em> dengan sudut yang sedang kita lihat.</li>
          <li><strong>Samping</strong> = sisi yang <em>menempel</em> ke sudut itu, tapi bukan sisi miring.</li>
        </ul>
        <p><strong>Sudut istimewa</strong> (0°, 30°, 45°, 60°, 90°) itu nilai yang wajib dihafal. Kenapa istimewa? Karena punya nilai "cantik" yang muncul terus-terusan di soal.</p>`,
      formulas: [
        { label: 'Perbandingan trigonometri', html: 'sin θ = depan ÷ miring<br>cos θ = samping ÷ miring<br>tan θ = depan ÷ samping' },
        { label: 'Identitas dasar', html: 'tan θ = sin θ ÷ cos θ<br>sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1' },
        { label: 'Sudut istimewa', html: '<table class="tbl"><tr><th>θ</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr><tr><th>sin</th><td>0</td><td>½</td><td>½√2</td><td>½√3</td><td>1</td></tr><tr><th>cos</th><td>1</td><td>½√3</td><td>½√2</td><td>½</td><td>0</td></tr><tr><th>tan</th><td>0</td><td>⅓√3</td><td>1</td><td>√3</td><td>–</td></tr></table>' }
      ],
      examples: [
        {
          q: 'Segitiga siku-siku memiliki sisi siku-siku 3 dan 4 serta sisi miring 5. Jika θ berada di hadapan sisi 3, tentukan sin θ, cos θ, dan tan θ.',
          steps: [
            'Identifikasi dulu peran tiap sisi. Sisi miring = 5 (selalu yang paling panjang).',
            'Karena θ berhadapan dengan sisi 3, maka sisi 3 adalah <strong>depan</strong>. Sisi yang tersisa (4) adalah <strong>samping</strong>.',
            'sin θ = depan ÷ miring = <strong>3/5</strong>.',
            'cos θ = samping ÷ miring = <strong>4/5</strong>.',
            'tan θ = depan ÷ samping = <strong>3/4</strong>.',
            'Cek identitas: sin²θ + cos²θ = (3/5)² + (4/5)² = 9/25 + 16/25 = 25/25 = 1. Cocok!'
          ],
          a: 'sin θ = 3/5; cos θ = 4/5; tan θ = 3/4'
        },
        {
          q: 'Dari jarak 10 m dari kaki sebuah pohon, sudut elevasi ke puncak pohon adalah 60°. Berapa tinggi pohon (abaikan tinggi pengamat)?',
          steps: [
            'Gambarkan: pengamat di tanah, pohon di depan. Sudut 60° terbentuk di titik pengamat, antara garis pandang ke atas dan garis datar ke pohon.',
            'Jarak 10 m = <strong>sisi samping</strong> (menempel ke sudut, tapi bukan sisi miring). Tinggi pohon = <strong>sisi depan</strong> (berhadapan dengan sudut).',
            'Perbandingan yang memakai "depan" dan "samping" adalah tan. Jadi pakai tan 60°.',
            'tan 60° = depan ÷ samping = t ÷ 10. Nilai tan 60° = √3.',
            'Jadi √3 = t ÷ 10. Kalikan kedua ruas dengan 10: t = 10√3.',
            'Dengan √3 ≈ 1,73: t ≈ 10 × 1,73 = <strong>17,3 m</strong>.',
            'Jadi tinggi pohon kira-kira 17,3 m. Masuk akal: 17,3 m itu sekitar 6 lantai gedung.'
          ],
          a: 't = 10√3 m ≈ 17,3 m'
        }
      ]
    }
  ]
}
];
