import { createCanvas, loadImage } from "canvas";

export default async function handler(req, res) {
  try {
    const text = req.query.text || "KASA NOT DEV";
    const avatar = req.query.avatar || "https://i.imgur.com/6QfK4hG.png";

    // Canvas size (1080x1080)
    const canvas = createCanvas(1080, 1080);
    const ctx = canvas.getContext("2d");

    // Background warna hitam
    ctx.fillStyle = "#0E0E0E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load avatar
    const avatarImg = await loadImage(avatar);

    // Buat lingkaran avatar
    const radius = 200;
    const centerX = 540;
    const centerY = 540;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Gambarkan avatar
    ctx.drawImage(avatarImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.restore();

    // Tambah border putih
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // ⭐ Teks melengkung di bawah avatar ⭐
    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    const curveRadius = 300; // melengkung bawah
    const chars = text.split("");
    const angleStep = Math.PI / (chars.length + 2);

    chars.forEach((char, i) => {
      const angle = Math.PI + angleStep * (i + 1);

      const x = centerX + curveRadius * Math.cos(angle);
      const y = centerY + curveRadius * Math.sin(angle);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });

    // Output PNG
    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());
  } catch (e) {
    console.log(e);
    res.status(500).send("Error generating image");
  }
}