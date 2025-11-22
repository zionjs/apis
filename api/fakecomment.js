export default function handler(req, res) {
  const { text = "😂😂😂😂", user = "citrautami390", time = "19 jam" } = req.query;

  const html = `
  <!doctype html>
  <html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fake Comment</title>
    <style>
      body { background:#111; color:white; font-family:Inter; padding:20px; }
      .comment { 
        background:#1a1a1e; 
        padding:14px; 
        border-radius:12px; 
        display:flex; 
        gap:12px; 
        max-width:420px;
        box-shadow:0 6px 18px rgba(0,0,0,0.4);
      }
      .avatar img { 
        width:44px; 
        height:44px; 
        border-radius:50%; 
        object-fit:cover;
      }
      .user { font-weight:600 }
      .time { color:#aaa; font-size:13px }
      .message { margin-top:6px; font-size:15px }
    </style>
  </head>
  <body>
    <div class="comment">
      <div class="avatar">
        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400">
      </div>
      <div>
        <div class="user">${user}</div>
        <div class="time">${time}</div>
        <div class="message">${text}</div>
      </div>
    </div>
  </body>
  </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}