import fs from 'fs';
const stats1 = fs.statSync('public/fonts/Genkaimincho.ttf');
const stats2 = fs.statSync('public/fonts/NamiLaoSong-A.ttf');
console.log('Genkaimincho.ttf size:', stats1.size);
console.log('NamiLaoSong-A.ttf size:', stats2.size);
