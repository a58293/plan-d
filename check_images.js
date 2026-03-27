const https = require('https');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
};

async function run() {
  const baseUrl = "https://raw.githubusercontent.com/a58293/panl-d/main/images";
  for (let i = 1; i <= 15; i++) {
    const id = String(i).padStart(2, '0');
    const url = `${baseUrl}/graphic/${id}.webp`;
    const exists = await checkUrl(url);
    console.log(`graphic/${id}.webp: ${exists}`);
  }
}
run();
