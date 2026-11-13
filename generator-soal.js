/* Mesin generator soal parametrik — menghasilkan soal & pembahasan acak per bab. */
(function (global) {
  'use strict';

  /* ---------- Utilitas ---------- */
  const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  const fracHTML = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
  const sup = (x) => `<sup>${x}</sup>`;
  const frac = (n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : fracHTML(n, d); };

  /* Bangun pertanyaan dengan 4 opsi unik (correct + 3 pengecoh). */
  function mkQ(chapter, title, difficulty, question, correct, distractors, explain) {
    const set = new Set([String(correct)]);
    for (const d of distractors) {
      if (set.size >= 4) break;
      const s = String(d);
      if (s && s !== 'undefined' && s !== 'NaN') set.add(s);
    }
    let pad = 0;
    while (set.size < 4) set.add(`~${pad++}`);
    let arr = shuffle([...set]).slice(0, 4);
    if (!arr.includes(String(correct))) arr[0] = String(correct);
    arr = shuffle(arr);
    return {
      chapter, chapterTitle: title, difficulty,
      q: question,
      options: arr,
      answer: arr.indexOf(String(correct)),
      explain
    };
  }

  /* =====================================================================
   *  GENERATOR PER BAB — 3 tingkat: easy, medium, hard
   *  Setiap generator mengembalikan {q, options, answer, explain}
   * ===================================================================== */
  const GEN = {};

  /* ---------- KELAS 7 ---------- */
  GEN['k7-bilangan'] = {
    easy() {
      const a = rnd(2, 15), b = rnd(2, 9), c = rnd(2, 9), d = rnd(2, 15);
      const correct = a + b * c - d;
      return mkQ('k7-bilangan', 'Bilangan Bulat & Pecahan', 'easy',
        `Hitung <b>${a} + ${b} × ${c} − ${d}</b>.`,
        correct,
        [a + b * c + d, (a + b) * c - d, a + b * c - d + rnd(1, 3)],
        `Kerjakan perkalian dulu: ${b}×${c} = ${b * c}. Lalu ${a} + ${b * c} − ${d} = <b>${correct}</b>.`);
    },
    medium() {
      const b = pick([2, 3, 4, 6]), d = pick([3, 4, 6, 8].filter(x => x !== b)) || 6;
      const a = rnd(1, b - 1), c = rnd(1, d - 1);
      const l = lcm(b, d);
      const num = a * (l / b) + c * (l / d);
      const correct = frac(num, l);
      const den = num + 1;
      return mkQ('k7-bilangan', 'Bilangan Bulat & Pecahan', 'medium',
        `Hitung <b>${fracHTML(a, b)} + ${fracHTML(c, d)}</b>.`,
        correct,
        [frac(num, l + 1), frac(a + c, b + d), frac(Math.max(1, num - 1), l)],
        `Samakan penyebut dengan KPK(${b},${d}) = ${l}. ${a * (l / b)}/${l} + ${c * (l / d)}/${l} = ${num}/${l} = <b>${correct}</b>.`);
    },
    hard() {
      const a = rnd(12, 60), b = rnd(12, 60);
      const k = lcm(a, b), f = gcd(a, b);
      return mkQ('k7-bilangan', 'Bilangan Bulat & Pecahan', 'hard',
        `Jika KPK(${a},${b}) × FPB(${a},${b}) = ${a} × ${b}, berapa FPB(${a},${b}) bila KPK(${a},${b}) = <b>${k}</b>?`,
        f,
        [a, b, f + 1],
        `Gunakan KPK × FPB = a × b. FPB = (${a}×${b})/${k} = <b>${f}</b>.`);
    }
  };

  GEN['k7-aljabar'] = {
    easy() {
      const p = rnd(2, 9), q = rnd(2, 9);
      const correct = `${p + q}x`;
      return mkQ('k7-aljabar', 'Aljabar Dasar', 'easy',
        `Sederhanakan <b>${p}x + ${q}x</b>.`,
        correct,
        [`${p * q}x`, `${Math.abs(p - q)}x`, `${p + q}`],
        `Suku sejenis, jumlahkan koefisien: (${p}+${q})x = <b>${p + q}x</b>.`);
    },
    medium() {
      const a = rnd(2, 5), b = rnd(1, 6), c = rnd(1, 6);
      // (ax + b)(x + c) = ax² + (ac + b)x + bc
      const q = `<b>(${a}x + ${b})(x + ${c})</b>`;
      const correct = `${a}x² + ${a * c + b}x + ${b * c}`;
      return mkQ('k7-aljabar', 'Aljabar Dasar', 'medium', `Jabarkan ${q}.`,
        correct,
        [`${a}x² + ${a * c + b + 1}x + ${b * c}`, `${a}x² + ${a * c - b}x + ${b * c}`, `${a + 1}x² + ${a * c + b}x + ${b * c}`],
        `(ax)(x) + (ax)(c) + b(x) + b·c = ${a}x² + ${a * c}x + ${b}x + ${b * c} = <b>${correct}</b>.`);
    },
    hard() {
      const a = rnd(2, 8), b = rnd(1, 9), c = rnd(2, 8), d = rnd(1, 9);
      const correct = `${a - c}x + ${b + d}`;
      return mkQ('k7-aljabar', 'Aljabar Dasar', 'hard',
        `Sederhanakan <b>(${a}x + ${b}) − (${c}x − ${d})</b>.`,
        correct,
        [`${a + c}x + ${b + d}`, `${a - c}x + ${b - d}`, `${a - c}x + ${b * d}`],
        `Buka kurung: ${a}x + ${b} − ${c}x + ${d}. Gabung: (${a}−${c})x + (${b}+${d}) = <b>${correct}</b>.`);
    }
  };

  GEN['k7-plsv'] = {
    easy() {
      const a = rnd(2, 9), b = rnd(1, 20), x = rnd(1, 12);
      const c = a * x + b;
      return mkQ('k7-plsv', 'PLSV & PtLSV', 'easy',
        `Selesaikan <b>${a}x + ${b} = ${c}</b>.`,
        `x = ${x}`,
        [`x = ${x + 1}`, `x = ${x - 1}`, `x = ${c}`],
        `Kurangi ${b}: ${a}x = ${c - b}. Bagi ${a}: x = <b>${x}</b>.`);
    },
    medium() {
      const a = rnd(2, 9), b = rnd(1, 15), x = rnd(1, 12);
      const c = a * x - b;
      return mkQ('k7-plsv', 'PLSV & PtLSV', 'medium',
        `Selesaikan <b>${a}x − ${b} = ${c}</b>.`,
        `x = ${x}`,
        [`x = ${x + 1}`, `x = ${x - 1}`, `x = ${c}`],
        `Tambah ${b}: ${a}x = ${c + b}. Bagi ${a}: x = <b>${x}</b>.`);
    },
    hard() {
      const a = rnd(2, 6), x = rnd(1, 8), b = rnd(1, 10);
      const c = a * x + b;
      const q = `Jika <b>${a}x + ${b} > ${c - 3}</b>, maka x > ?`;
      const min = (c - 3 - b) / a;
      const correct = `x > ${min}`;
      return mkQ('k7-plsv', 'PLSV & PtLSV', 'hard', q, correct,
        [`x < ${min}`, `x > ${min + 1}`, `x = ${min}`],
        `${a}x > ${c - 3} − ${b} = ${c - 3 - b}. Bagi ${a} (positif, tanda tetap): x > <b>${min}</b>.`);
    }
  };

  GEN['k7-perbandingan'] = {
    easy() {
      const a = rnd(2, 6), harga = rnd(2, 9) * 1000, x = rnd(2, 8);
      const correct = `Rp${(harga / a * x * 1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
      const total = a * harga;
      return mkQ('k7-perbandingan', 'Perbandingan', 'easy',
        `Harga ${a} kg apel Rp${total.toLocaleString('id-ID')}. Harga ${x} kg?`,
        correct,
        [`Rp${(total * 2).toLocaleString('id-ID')}`, `Rp${(total + 1000).toLocaleString('id-ID')}`, `Rp${(total - 1000).toLocaleString('id-ID')}`],
        `Harga per kg = ${total}/${a} = ${harga}. Untuk ${x} kg = ${harga} × ${x} = <b>${correct}</b>.`);
    },
    medium() {
      const n1 = rnd(4, 12), h1 = rnd(6, 20), n2 = rnd(4, 12);
      const h2 = Math.round(n1 * h1 / n2);
      return mkQ('k7-perbandingan', 'Perbandingan', 'medium',
        `${n1} pekerja selesai dalam ${h1} hari. Jika ${n2} pekerja, berapa hari?`,
        `${h2} hari`,
        [`${h2 + 2} hari`, `${h2 - 1} hari`, `${h1} hari`],
        `Berbalik nilai: ${n1}×${h1} = ${n2}×x. x = ${n1 * h1}/${n2} = <b>${h2}</b> hari.`);
    },
    hard() {
      const skala = pick([100000, 500000, 1000000, 2000000]);
      const cm = rnd(2, 9);
      const km = (cm * skala) / 100000;
      return mkQ('k7-perbandingan', 'Perbandingan', 'hard',
        `Pada peta skala 1 : ${skala.toLocaleString('id-ID')}, jarak dua kota ${cm} cm. Jarak sebenarnya (km)?`,
        `${km} km`,
        [`${km + 10} km`, `${km * 2} km`, `${(km / 2).toFixed(1)} km`],
        `Jarak = ${cm} × ${skala.toLocaleString('id-ID')} cm = ${cm * skala} cm = <b>${km} km</b>.`);
    }
  };

  GEN['k7-aritsosial'] = {
    easy() {
      const beli = rnd(40, 90) * 1000, untung = rnd(5, 25);
      const jual = beli + beli * untung / 100;
      return mkQ('k7-aritsosial', 'Aritmatika Sosial', 'easy',
        `Barang dibeli Rp${beli.toLocaleString('id-ID')} dijual Rp${jual.toLocaleString('id-ID')}. Persentase untung?`,
        `${untung}%`,
        [`${untung + 5}%`, `${untung - 5}%`, `${100 - untung}%`],
        `Untung = ${jual - beli}. % = ${jual - beli}/${beli} × 100% = <b>${untung}%</b>.`);
    },
    medium() {
      const harga = rnd(80, 300) * 1000;
      const diskon = pick([10, 15, 20, 25, 30]);
      const bayar = harga - harga * diskon / 100;
      return mkQ('k7-aritsosial', 'Aritmatika Sosial', 'medium',
        `Harga awal Rp${harga.toLocaleString('id-ID')}, diskon ${diskon}%. Harga bayar?`,
        `Rp${bayar.toLocaleString('id-ID')}`,
        [`Rp${harga.toLocaleString('id-ID')}`, `Rp${(harga - 10000).toLocaleString('id-ID')}`, `Rp${(bayar + 5000).toLocaleString('id-ID')}`],
        `Diskon = ${diskon}% × ${harga.toLocaleString('id-ID')} = ${(harga * diskon / 100).toLocaleString('id-ID')}. Bayar = <b>Rp${bayar.toLocaleString('id-ID')}</b>.`);
    },
    hard() {
      const modal = rnd(1, 5) * 1000000;
      const bunga = pick([4, 5, 6, 8]);
      const bulan = pick([3, 6, 9, 12]);
      const total = modal + modal * bunga / 100 * bulan / 12;
      return mkQ('k7-aritsosial', 'Aritmatika Sosial', 'hard',
        `Tabungan Rp${modal.toLocaleString('id-ID')} bunga tunggal ${bunga}%/tahun selama ${bulan} bulan. Total?`,
        `Rp${total.toLocaleString('id-ID')}`,
        [`Rp${(modal + modal * bunga / 100).toLocaleString('id-ID')}`, `Rp${(total + 50000).toLocaleString('id-ID')}`, `Rp${(modal).toLocaleString('id-ID')}`],
        `Bunga = ${modal.toLocaleString('id-ID')} × ${bunga}% × ${bulan}/12 = ${(modal * bunga / 100 * bulan / 12).toLocaleString('id-ID')}. Total = <b>Rp${total.toLocaleString('id-ID')}</b>.`);
    }
  };

  GEN['k7-geometri'] = {
    easy() {
      const a = rnd(4, 20), t = rnd(3, 15);
      const correct = 0.5 * a * t;
      return mkQ('k7-geometri', 'Garis, Sudut, Bangun Datar', 'easy',
        `Luas segitiga dengan alas ${a} cm dan tinggi ${t} cm?`,
        `${correct} cm²`,
        [`${a * t} cm²`, `${correct + a} cm²`, `${correct * 2} cm²`],
        `L = ½ × ${a} × ${t} = <b>${correct} cm²</b>.`);
    },
    medium() {
      const x = rnd(15, 45);
      const a = 2 * x + 10, b = 3 * x - 5;
      const sudut1 = a, sudut2 = 180 - a;
      // berpelurus: (2x+10) + (3x-5) = 180 → 5x+5=180 → x=35
      const xx = 35;
      const s1 = 2 * xx + 10, s2 = 180 - s1;
      return mkQ('k7-geometri', 'Garis, Sudut, Bangun Datar', 'medium',
        `Dua sudut berpelurus (2x+10)° dan (3x−5)°. Tentukan kedua sudut.`,
        `${s1}° dan ${s2}°`,
        [`${s1 + 5}° dan ${s2 - 5}°`, `90° dan 90°`, `${s1 - 10}° dan ${s2 + 10}°`],
        `(2x+10)+(3x−5) = 180 → 5x+5 = 180 → x = 35. Sudut = <b>${s1}° dan ${s2}°</b>.`);
    },
    hard() {
      const a = rnd(6, 15), b = rnd(a + 2, 25), t = rnd(4, 14);
      const correct = 0.5 * (a + b) * t;
      return mkQ('k7-geometri', 'Garis, Sudut, Bangun Datar', 'hard',
        `Trapesium sisi sejajar ${a} cm & ${b} cm, tinggi ${t} cm. Luas?`,
        `${correct} cm²`,
        [`${a * b} cm²`, `${(a + b) * t} cm²`, `${correct + t} cm²`],
        `L = ½ × (${a}+${b}) × ${t} = <b>${correct} cm²</b>.`);
    }
  };

  /* ---------- KELAS 8 ---------- */
  GEN['k8-pangkat'] = {
    easy() {
      const a = rnd(2, 5), m = rnd(2, 4), n = rnd(2, 4);
      const correct = Math.pow(a, m + n);
      return mkQ('k8-pangkat', 'Bilangan Berpangkat & Akar', 'easy',
        `Hitung <b>${a}${sup(m)} × ${a}${sup(n)}</b>.`,
        String(correct),
        [String(Math.pow(a, m * n)), String(Math.pow(a, Math.abs(m - n))), String(Math.pow(a, m) + Math.pow(a, n))],
        `${a}${sup(m)}×${a}${sup(n)} = ${a}${sup(m + n)} = <b>${correct}</b>.`);
    },
    medium() {
      const a = rnd(2, 4), m = rnd(2, 3), n = rnd(2, 3);
      const correct = Math.pow(a, m * n);
      return mkQ('k8-pangkat', 'Bilangan Berpangkat & Akar', 'medium',
        `Hitung <b>(${a}${sup(m)})${sup(n)}</b>.`,
        String(correct),
        [String(Math.pow(a, m + n)), String(Math.pow(a, m) * n), String(a * m * n)],
        `(${a}${sup(m)})${sup(n)} = ${a}${sup(m * n)} = <b>${correct}</b>.`);
    },
    hard() {
      const a = pick([2, 3, 5]);
      const b = pick([4, 9, 16, 25].filter(x => x !== a));
      const correct = `1/${a}`;
      return mkQ('k8-pangkat', 'Bilangan Berpangkat & Akar', 'hard',
        `Hitung <b>${a}${sup(-2)}</b>.`,
        correct,
        [String(-Math.pow(a, 2)), String(Math.pow(a, -1)), `-1/${a}`],
        `${a}${sup(-2)} = 1/${a}${sup(2)} = <b>1/${a * a}</b>.`);
    }
  };

  GEN['k8-pythagoras'] = {
    easy() {
      const tripel = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      const k = rnd(1, 3);
      const a = tripel[0] * k, b = tripel[1] * k, c = tripel[2] * k;
      return mkQ('k8-pythagoras', 'Teorema Pythagoras', 'easy',
        `Segitiga siku-siku dengan kaki ${a} cm dan ${b} cm. Hipotenusa?`,
        `${c} cm`,
        [`${c + 1} cm`, `${c - 1} cm`, `${a + b} cm`],
        `c² = ${a}² + ${b}² = ${a * a + b * b}, c = <b>${c}</b>.`);
    },
    medium() {
      const x1 = rnd(1, 5), y1 = rnd(1, 5);
      const tripel = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
      const x2 = x1 + tripel[0], y2 = y1 + tripel[1];
      return mkQ('k8-pythagoras', 'Teorema Pythagoras', 'medium',
        `Jarak titik A(${x1},${y1}) ke B(${x2},${y2})?`,
        `${tripel[2]} satuan`,
        [`${tripel[2] + 1}`, `${tripel[2] - 1}`, `${tripel[0] + tripel[1]}`],
        `AB = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${tripel[0]}²+${tripel[1]}²) = <b>${tripel[2]}</b>.`);
    },
    hard() {
      const c = pick([10, 13, 15, 17]);
      const a = pick([5, 7, 8, 9].filter(v => v < c));
      const b = pick([6, 9, 12, 14].filter(v => v < c));
      const c2 = c * c, s = a * a + b * b;
      const jenis = c2 === s ? 'siku-siku' : (c2 < s ? 'lancip' : 'tumpul');
      return mkQ('k8-pythagoras', 'Teorema Pythagoras', 'hard',
        `Segitiga dengan sisi ${a} cm, ${b} cm, ${c} cm termasuk jenis?`,
        jenis,
        ['siku-siku', 'lancip', 'tumpul'].filter(x => x !== jenis).concat(['sama sisi']),
        `c² = ${c2}; a²+b² = ${s}. ${c2} ${c2 === s ? '=' : (c2 < s ? '<' : '>')} ${s} → <b>${jenis}</b>.`);
    }
  };

  GEN['k8-plsv'] = {
    easy() {
      const a = rnd(2, 9), b = rnd(2, 10), x = rnd(2, 15);
      const c = a * x - b;
      return mkQ('k8-plsv', 'PLSV & PtLSV', 'easy',
        `Selesaikan <b>${a}x − ${b} = ${c}</b>.`,
        `x = ${x}`,
        [`x = ${x + 1}`, `x = ${x - 1}`, `x = ${c}`],
        `${a}x = ${c + b}; x = <b>${x}</b>.`);
    },
    medium() {
      const a = rnd(2, 8), b = rnd(1, 5), x = rnd(2, 9);
      const c = a * x - b;
      const kiri = a * x + b;
      return mkQ('k8-plsv', 'PLSV & PtLSV', 'medium',
        `Selesaikan <b>${a}x + ${b} < ${kiri + 5}</b>.`,
        `x < ${x + 1}`,
        [`x > ${x + 1}`, `x < ${x}`, `x = ${x}`],
        `${a}x < ${kiri + 5 - b}; x < <b>${(kiri + 5 - b) / a}</b> = ${x + 1} (karena ${a}x < ${(kiri + 5 - b)} dan ${a} > 0, tanda tetap).`);
    },
    hard() {
      const x = rnd(8, 20), total = x + x * 2;
      return mkQ('k8-plsv', 'PLSV & PtLSV', 'hard',
        `Jumlah umur Ayah dan Budi ${total} tahun. Ayah 2× umur Budi. Umur Budi?`,
        `${x} tahun`,
        [`${x + 1} tahun`, `${x - 1} tahun`, `${x * 2} tahun`],
        `x + 2x = ${total} → 3x = ${total} → x = <b>${x}</b> tahun.`);
    }
  };

  GEN['k8-fungsi'] = {
    easy() {
      const a = rnd(2, 6), b = rnd(1, 9), k = rnd(1, 8);
      const v = a * k + b;
      return mkQ('k8-fungsi', 'Relasi & Fungsi', 'easy',
        `f(x) = ${a}x + ${b}. Nilai f(${k})?`,
        String(v),
        [String(v + a), String(a * k - b), String(k + b)],
        `f(${k}) = ${a}·${k} + ${b} = <b>${v}</b>.`);
    },
    medium() {
      const a = rnd(2, 5), b = rnd(1, 7), k = rnd(2, 6);
      const v = a * k + b;
      return mkQ('k8-fungsi', 'Relasi & Fungsi', 'medium',
        `f(x) = ${a}x + ${b}. Jika f(k) = ${v}, nilai k?`,
        String(k),
        [String(k + 1), String(k - 1), String(v)],
        `${a}k + ${b} = ${v} → ${a}k = ${v - b} → k = <b>${k}</b>.`);
    },
    hard() {
      const nA = 3, nB = pick([2, 3, 4]);
      const correct = Math.pow(nB, nA);
      return mkQ('k8-fungsi', 'Relasi & Fungsi', 'hard',
        `Himpunan A berisi ${nA} anggota, B berisi ${nB} anggota. Banyak pemetaan A → B?`,
        String(correct),
        [String(Math.pow(nA, nB)), String(nA * nB), String(nA + nB)],
        `Banyak pemetaan A→B = n(B)ⁿ⁽ᴬ⁾ = ${nB}${sup(nA)} = <b>${correct}</b>.`);
    }
  };

  GEN['k8-garis'] = {
    easy() {
      const x1 = rnd(1, 4), y1 = rnd(1, 6), m = rnd(1, 4);
      const x2 = x1 + 2, y2 = y1 + m * 2;
      return mkQ('k8-garis', 'Persamaan Garis Lurus', 'easy',
        `Gradien garis melalui A(${x1},${y1}) dan B(${x2},${y2})?`,
        String(m),
        [String(m + 1), String(m - 1), String(m * 2)],
        `m = (${y2}−${y1})/(${x2}−${x1}) = ${y2 - y1}/${x2 - x1} = <b>${m}</b>.`);
    },
    medium() {
      const m = rnd(1, 4), x1 = rnd(1, 5), y1 = rnd(1, 8);
      const c = y1 - m * x1;
      const correct = `y = ${m}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}`;
      return mkQ('k8-garis', 'Persamaan Garis Lurus', 'medium',
        `Garis gradien ${m} melalui (${x1},${y1}). Persamaan?`,
        correct,
        [`y = ${m}x + ${c + 1}`, `y = ${m + 1}x + ${c}`, `y = ${m}x`],
        `y − ${y1} = ${m}(x − ${x1}) → y = ${m}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`);
    },
    hard() {
      const m1 = rnd(2, 5), m2 = -1 / m1;
      // find c from given point
      const x1 = rnd(1, 4), y1 = rnd(1, 5);
      const c = y1 - m2 * x1;
      // Only integer c if m2 * x1 integer -> m1 = 1 impossible (would be m2=-1), pick m1 such that -x1/m1 integer
      // simpler: pick m1=2 or 4
      const m = pick([2, 4]);
      const mPerp = -1 / m;
      const x0 = rnd(1, 3), y0 = rnd(1, 5);
      const c0 = y0 - mPerp * x0;
      const correctStr = Number.isInteger(c0) ? `y = ${mPerp}x ${c0 >= 0 ? '+' : '−'} ${Math.abs(c0)}` : `y = −${fracHTML(1, m)}x + ${(y0 + x0 / m).toFixed(1)}`;
      return mkQ('k8-garis', 'Persamaan Garis Lurus', 'hard',
        `Garis tegak lurus y = ${m}x + ${rnd(1, 5)} melalui (${x0},${y0}). Gradien garis baru?`,
        `−${fracHTML(1, m)}`,
        [`${m}`, `−${m}`, `${fracHTML(1, m)}`],
        `Tegak lurus: m₁·m₂ = −1 → m₂ = −1/${m} = <b>−${fracHTML(1, m)}</b>.`);
    }
  };

  GEN['k8-statistika'] = {
    easy() {
      const n = 5, base = rnd(5, 12);
      const data = [];
      let sum = 0;
      for (let i = 0; i < n; i++) { const v = base + rnd(-2, 2); data.push(v); sum += v; }
      const mean = (sum / n).toFixed(2);
      return mkQ('k8-statistika', 'Statistika', 'easy',
        `Data: ${data.join(', ')}. Mean?`,
        String(mean),
        [String((sum / n + 1).toFixed(2)), String((sum / n - 1).toFixed(2)), String(sum)],
        `Jumlah = ${sum}, n = ${n}. Mean = <b>${mean}</b>.`);
    },
    medium() {
      const data = [rnd(2, 6), rnd(3, 7), rnd(4, 8), rnd(5, 9), rnd(6, 10)].sort((a, b) => a - b);
      const med = data[2];
      return mkQ('k8-statistika', 'Statistika', 'medium',
        `Data: ${data.join(', ')}. Median?`,
        String(med),
        [String(data[1]), String(data[3]), String((data[0] + data[4]) / 2)],
        `Data urut: ${data.join(', ')}. Median (data ke-3) = <b>${med}</b>.`);
    },
    hard() {
      const data = [rnd(1, 4), rnd(2, 5), rnd(3, 6), rnd(4, 7), rnd(5, 8), rnd(6, 9), rnd(7, 10)].sort((a, b) => a - b);
      const q1 = data[1], q2 = data[3], q3 = data[5];
      return mkQ('k8-statistika', 'Statistika', 'hard',
        `Data: ${data.join(', ')}. Nilai Q₁, Q₂, Q₃?`,
        `Q₁=${q1}, Q₂=${q2}, Q₃=${q3}`,
        [`Q₁=${q1 + 1}, Q₂=${q2}, Q₃=${q3}`, `Q₁=${q1}, Q₂=${q2 + 1}, Q₃=${q3}`, `Q₁=${q1}, Q₂=${q2}, Q₃=${q3 + 1}`],
        `n = ${data.length} (ganjil). Q₂ = data ke-4 = ${q2}. Q₁ = median {${data.slice(0, 3).join(',')}} = ${q1}. Q₃ = median {${data.slice(4).join(',')}} = ${q3}.`);
    }
  };

  /* ---------- KELAS 9 ---------- */
  GEN['k9-spldv'] = {
    easy() {
      const x = rnd(1, 8), y = rnd(1, 8);
      const s = x + y, d = x - y;
      return mkQ('k9-spldv', 'SPLDV', 'easy',
        `Sistem x + y = ${s} dan x − y = ${d}. Nilai x?`,
        String(x),
        [String(y), String(s), String(d)],
        `Jumlahkan: 2x = ${s + d} → x = <b>${x}</b>.`);
    },
    medium() {
      const x = rnd(1, 6), y = rnd(1, 6);
      const a1 = 2, b1 = 1, c1 = a1 * x + b1 * y;
      const a2 = 1, b2 = 2, c2 = a2 * x + b2 * y;
      return mkQ('k9-spldv', 'SPLDV', 'medium',
        `Sistem ${a1}x + ${b1}y = ${c1} dan ${a2}x + ${b2}y = ${c2}. Nilai y?`,
        String(y),
        [String(x), String(x + y), String(y + 1)],
        `Eliminasi x: kalikan persamaan kedua dengan ${a1}, kurangkan. Hasil y = <b>${y}</b>.`);
    },
    hard() {
      const hargaB = rnd(3, 8) * 1000;
      const hargaP = rnd(1, 3) * 1000;
      const b1 = 2, p1 = 1, total1 = b1 * hargaB + p1 * hargaP;
      const b2 = 1, p2 = 3, total2 = b2 * hargaB + p2 * hargaP;
      return mkQ('k9-spldv', 'SPLDV', 'hard',
        `2 buku + 1 pensil = Rp${total1.toLocaleString('id-ID')}. 1 buku + 3 pensil = Rp${total2.toLocaleString('id-ID')}. Harga pensil?`,
        `Rp${hargaP.toLocaleString('id-ID')}`,
        [`Rp${hargaB.toLocaleString('id-ID')}`, `Rp${(hargaP + 1000).toLocaleString('id-ID')}`, `Rp${(hargaB - 1000).toLocaleString('id-ID')}`],
        `2b + p = ${total1}; b + 3p = ${total2}. Substitusi → p = <b>Rp${hargaP.toLocaleString('id-ID')}</b>, b = Rp${hargaB.toLocaleString('id-ID')}.`);
    }
  };

  GEN['k9-bangunruang'] = {
    easy() {
      const s = rnd(2, 10);
      return mkQ('k9-bangunruang', 'Bangun Ruang & Lingkaran', 'easy',
        `Kubus dengan rusuk ${s} cm. Volume?`,
        `${s * s * s} cm³`,
        [`${6 * s * s} cm³`, `${s * s} cm³`, `${4 * s} cm³`],
        `V = s³ = ${s}³ = <b>${s * s * s} cm³</b>.`);
    },
    medium() {
      const r = pick([7, 14, 21]), t = rnd(5, 20);
      const v = Math.round(22 / 7 * r * r * t);
      return mkQ('k9-bangunruang', 'Bangun Ruang & Lingkaran', 'medium',
        `Tabung r = ${r} cm, t = ${t} cm. Volume? (π=22/7)`,
        `${v.toLocaleString('id-ID')} cm³`,
        [`${(v * 2).toLocaleString('id-ID')} cm³`, `${(v / 2).toLocaleString('id-ID')} cm³`, `${(v + 100).toLocaleString('id-ID')} cm³`],
        `V = πr²t = 22/7 × ${r}² × ${t} = <b>${v.toLocaleString('id-ID')} cm³</b>.`);
    },
    hard() {
      const r = pick([3, 6, 9]);
      const v = Math.round(4 / 3 * 22 / 7 * r * r * r);
      return mkQ('k9-bangunruang', 'Bangun Ruang & Lingkaran', 'hard',
        `Bola r = ${r} cm. Volume? (π=22/7)`,
        `${v.toLocaleString('id-ID')} cm³`,
        [`${(v / 2).toLocaleString('id-ID')} cm³`, `${(v * 2).toLocaleString('id-ID')} cm³`, `${(v + 50).toLocaleString('id-ID')} cm³`],
        `V = 4/3 πr³ = 4/3 × 22/7 × ${r}³ = <b>${v.toLocaleString('id-ID')} cm³</b>.`);
    }
  };

  GEN['k9-transformasi'] = {
    easy() {
      const x = rnd(-5, 5), y = rnd(-5, 5), a = rnd(-4, 4), b = rnd(-4, 4);
      return mkQ('k9-transformasi', 'Transformasi Geometri', 'easy',
        `Titik A(${x},${y}) ditranslasi (${a},${b}). Bayangan?`,
        `(${x + a}, ${y + b})`,
        [`(${x - a}, ${y - b})`, `(${y + a}, ${x + b})`, `(${x + a + 1}, ${y + b})`],
        `(x+a, y+b) = (${x}+${a}, ${y}+${b}) = <b>(${x + a}, ${y + b})</b>.`);
    },
    medium() {
      const x = rnd(-5, 5), y = rnd(-5, 5);
      return mkQ('k9-transformasi', 'Transformasi Geometri', 'medium',
        `Titik A(${x},${y}) direfleksikan terhadap sumbu-x. Bayangan?`,
        `(${x}, ${-y})`,
        [`(${-x}, ${y})`, `(${-x}, ${-y})`, `(${y}, ${x})`],
        `Refleksi sumbu-x: (x, y) → (x, −y) = <b>(${x}, ${-y})</b>.`);
    },
    hard() {
      const x = rnd(2, 5), y = rnd(2, 5);
      return mkQ('k9-transformasi', 'Transformasi Geometri', 'hard',
        `Titik A(${x},${y}) dirotasi +90° pusat O. Bayangan?`,
        `(${-y}, ${x})`,
        [`(${y}, ${-x})`, `(${-x}, ${-y})`, `(${x}, ${y})`],
        `Rotasi +90°: (x, y) → (−y, x) = <b>(${-y}, ${x})</b>.`);
    }
  };

  GEN['k9-peluang'] = {
    easy() {
      const target = pick([2, 3, 4, 5, 6]);
      const count = [1, 2, 3, 4, 5, 6].filter(v => v % target === 0).length;
      const correct = frac(count, 6);
      return mkQ('k9-peluang', 'Peluang & Sampel', 'easy',
        `Dadu dilempar. Peluang muncul mata kelipatan ${target}?`,
        correct,
        [`${frac(1, 6)}`, `${frac(2, 6)}`, `${frac(3, 6)}`],
        `Kelipatan ${target} pada dadu: {${[1, 2, 3, 4, 5, 6].filter(v => v % target === 0).join(',')}} → P = <b>${correct}</b>.`);
    },
    medium() {
      const percobaan = rnd(40, 100);
      const sukses = rnd(Math.floor(percobaan * 0.3), Math.floor(percobaan * 0.8));
      const p = (sukses / percobaan).toFixed(2);
      const harapan = Math.round(0.5 * 200);
      return mkQ('k9-peluang', 'Peluang & Sampel', 'medium',
        `Dari ${percobaan} lempar koin, muncul gambar ${sukses} kali. Peluang empiris?`,
        p,
        ['0,5', '0,25', '0,75'],
        `P = ${sukses}/${percobaan} = <b>${p}</b>.`);
    },
    hard() {
      const p = 0.6, n = rnd(100, 500);
      const h = Math.round(p * n);
      return mkQ('k9-peluang', 'Peluang & Sampel', 'hard',
        `Peluang hujan 0,6. Dari ${n} hari, frekuensi harapan hujan?`,
        `${h} hari`,
        [`${Math.round(0.4 * n)} hari`, `${Math.round(0.5 * n)} hari`, `${n} hari`],
        `Fₕ = P × n = 0,6 × ${n} = <b>${h}</b> hari.`);
    }
  };

  /* ---------- KELAS 10 ---------- */
  GEN['k10-eksplog'] = {
    easy() {
      const a = pick([2, 3, 5]), x = rnd(2, 4);
      const c = Math.pow(a, x);
      return mkQ('k10-eksplog', 'Eksponen & Logaritma', 'easy',
        `Selesaikan <b>${a}${sup('x')} = ${c}</b>.`,
        `x = ${x}`,
        [`x = ${x + 1}`, `x = ${x - 1}`, `x = ${c}`],
        `${c} = ${a}${sup(x)} → x = <b>${x}</b>.`);
    },
    medium() {
      const a = rnd(2, 4), x = rnd(2, 4);
      const c = Math.pow(a, x);
      return mkQ('k10-eksplog', 'Eksponen & Logaritma', 'medium',
        `Hitung <b>${sup(a)}log ${c}</b>.`,
        String(x),
        [String(x + 1), String(x - 1), String(a * x)],
        `${a}${sup(x)} = ${c}, jadi ${sup(a)}log ${c} = <b>${x}</b>.`);
    },
    hard() {
      const a = rnd(2, 5), m = rnd(1, 3), n = rnd(1, 3);
      const c = Math.pow(a, m) * Math.pow(a, n);
      const correct = m + n;
      return mkQ('k10-eksplog', 'Eksponen & Logaritma', 'hard',
        `Hitung <b>${sup(a)}log ${Math.pow(a, m)} + ${sup(a)}log ${Math.pow(a, n)}</b>.`,
        String(correct),
        [String(m * n), String(m - n), String(correct + 1)],
        `${sup(a)}log ${Math.pow(a, m)} = ${m}, ${sup(a)}log ${Math.pow(a, n)} = ${n}. Jumlah = <b>${correct}</b>.`);
    }
  };

  GEN['k10-barisan'] = {
    easy() {
      const a = rnd(1, 5), b = rnd(2, 5), n = rnd(5, 10);
      const u = a + (n - 1) * b;
      return mkQ('k10-barisan', 'Barisan & Deret', 'easy',
        `Aritmetika a = ${a}, b = ${b}. U${sup(n)}?`,
        String(u),
        [String(u + b), String(u - b), String(a + n * b)],
        `U${sup(n)} = ${a} + (${n}−1)·${b} = <b>${u}</b>.`);
    },
    medium() {
      const a = rnd(1, 4), r = pick([2, 3]), n = rnd(4, 6);
      const u = a * Math.pow(r, n - 1);
      return mkQ('k10-barisan', 'Barisan & Deret', 'medium',
        `Geometri a = ${a}, r = ${r}. U${sup(n)}?`,
        String(u),
        [String(u * r), String(u / r), String(a + (n - 1) * r)],
        `U${sup(n)} = ${a}·${r}${sup(n - 1)} = <b>${u}</b>.`);
    },
    hard() {
      const a = rnd(1, 4), b = rnd(2, 4), n = rnd(6, 10);
      const s = n / 2 * (2 * a + (n - 1) * b);
      return mkQ('k10-barisan', 'Barisan & Deret', 'hard',
        `Aritmetika a = ${a}, b = ${b}. S${sup(n)}?`,
        String(s),
        [String(s + n), String(s - n), String(a + (n - 1) * b)],
        `S${sup(n)} = ${n}/2 × (2·${a} + (${n}−1)·${b}) = <b>${s}</b>.`);
    }
  };

  GEN['k10-sptldv'] = {
    easy() {
      const a = rnd(1, 3), b = rnd(1, 3), c = rnd(4, 12);
      return mkQ('k10-sptldv', 'SPtLDV', 'easy',
        `Garis ${a}x + ${b}y = ${c}. Titik potong sumbu-x?`,
        `(${c / a}, 0)`,
        [`(0, ${c / b})`, `(${c}, 0)`, `(0, ${c})`],
        `y = 0 → ${a}x = ${c} → x = ${c / a}. Titik = <b>(${c / a}, 0)</b>.`);
    },
    medium() {
      const a = rnd(1, 3), b = rnd(1, 3), c = rnd(4, 12);
      return mkQ('k10-sptldv', 'SPtLDV', 'medium',
        `Garis ${a}x + ${b}y = ${c}. Titik potong sumbu-y?`,
        `(0, ${c / b})`,
        [`(${c / a}, 0)`, `(${c}, 0)`, `(0, ${c})`],
        `x = 0 → ${b}y = ${c} → y = ${c / b}. Titik = <b>(0, ${c / b})</b>.`);
    },
    hard() {
      const a = rnd(1, 3), b = rnd(1, 3), c = rnd(4, 12);
      return mkQ('k10-sptldv', 'SPtLDV', 'hard',
        `Garis batas ${a}x + ${b}y = ${c} untuk pertidaksamaan ${a}x + ${b}y ≤ ${c} digambar sebagai…`,
        'Garis penuh',
        ['Garis putus-putus', 'Titik', 'Daerah penuh'],
        `Karena memakai ≤, garis batas digambar <b>penuh</b> (bukan putus-putus).`);
    }
  };

  GEN['k10-trigonometri'] = {
    easy() {
      const deg = pick([0, 30, 45, 60, 90]);
      const val = { 0: '0', 30: '½', 45: '½√2', 60: '½√3', 90: '1' };
      return mkQ('k10-trigonometri', 'Trigonometri', 'easy',
        `Nilai <b>sin ${deg}°</b>?`,
        val[deg],
        Object.values(val).filter(v => v !== val[deg]).slice(0, 3),
        `Sudut istimewa: sin ${deg}° = <b>${val[deg]}</b>.`);
    },
    medium() {
      const tripel = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
      const [a, b, c] = tripel;
      const correct = frac(a, c);
      return mkQ('k10-trigonometri', 'Trigonometri', 'medium',
        `Sisi siku-siku ${a} dan ${b}, miring ${c}. sin θ (θ di hadapan ${a})?`,
        correct,
        [frac(b, c), frac(a, b), frac(b, a)],
        `sin θ = depan/miring = ${a}/${c} = <b>${correct}</b>.`);
    },
    hard() {
      const jarak = rnd(5, 20);
      const deg = 60;
      const tinggi = (jarak * Math.sqrt(3)).toFixed(2);
      return mkQ('k10-trigonometri', 'Trigonometri', 'hard',
        `Sudut elevasi 60° dari jarak ${jarak} m. Tinggi objek? (√3 ≈ 1,73)`,
        `${tinggi} m`,
        [`${jarak} m`, `${(jarak * 2).toFixed(2)} m`, `${(jarak / 2).toFixed(2)} m`],
        `tan 60° = t/${jarak} → t = ${jarak}√3 ≈ <b>${tinggi} m</b>.`);
    }
  };

  /* =====================================================================
   *  API PUBLIK
   * ===================================================================== */
  function pickChapters(gradeIds) {
    const pool = [];
    for (const gid of gradeIds) {
      const g = global.GRADES.find(x => x.id === gid);
      if (g) g.chapters.forEach(ch => pool.push(ch.id));
    }
    return pool;
  }
  function genOne(chapterId, difficulty) {
    const gen = GEN[chapterId];
    if (!gen) return null;
    const fn = gen[difficulty] || gen.easy || gen.medium || gen.hard;
    if (!fn) return null;
    try { return fn(); } catch (e) { console.warn('gen error', chapterId, difficulty, e); return null; }
  }

  function generateTryout(gradeIds, count, opts) {
    opts = opts || {};
    const chapters = pickChapters(gradeIds);
    if (!chapters.length) return [];
    const diffs = ['easy', 'easy', 'medium', 'medium', 'hard'];
    const out = [];
    let guard = 0;
    while (out.length < count && guard < count * 30) {
      guard++;
      const ch = pick(chapters);
      const d = pick(diffs);
      const q = genOne(ch, d);
      if (!q) continue;
      if (q.options.some(x => String(x).startsWith('~'))) continue;
      out.push(q);
    }
    return out;
  }

  global.GeneratorSoal = { generateTryout, genOne, difficultyLabels: { easy: 'Mudah', medium: 'Sedang', hard: 'HOTS' } };
})(window);
