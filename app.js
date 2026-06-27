const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ShopK8s</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: #0a0f1e; color: #e2e8f0; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; }
        .container { width: 100%; max-width: 640px; }
        .top-badge { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .badge-text { font-size: 12px; font-weight: 600; color: #10b981; letter-spacing: 1px; text-transform: uppercase; }
        .version { margin-left: auto; font-size: 11px; color: #475569; background: #1e293b; padding: 3px 10px; border-radius: 99px; border: 1px solid #334155; }
        .card { background: linear-gradient(135deg, #1e293b 0%, #162032 100%); border: 1px solid #334155; border-radius: 20px; padding: 36px; margin-bottom: 16px; position: relative; overflow: hidden; }
        .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #6366f1, #10b981, #38bdf8); }
        .app-title { font-size: 32px; font-weight: 700; color: #f8fafc; margin-bottom: 6px; }
        .app-title span { background: linear-gradient(135deg, #6366f1, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .subtitle { color: #64748b; font-size: 14px; margin-bottom: 28px; display: flex; align-items: center; gap: 6px; }
        .subtitle::before { content: ''; display: inline-block; width: 16px; height: 1px; background: #334155; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .info-box { background: #0a0f1e; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; transition: border-color 0.2s; }
        .info-box:hover { border-color: #6366f1; }
        .label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
        .value { font-size: 13px; color: #38bdf8; font-weight: 500; word-break: break-all; font-family: 'Courier New', monospace; }
        .value.green { color: #10b981; }
        .value.purple { color: #a78bfa; }
        .pipeline-card { background: #0a0f1e; border: 1px solid #1e293b; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 12px; }
        .pipeline-icon { width: 36px; height: 36px; background: #1e293b; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .pipeline-info { flex: 1; }
        .pipeline-title { font-size: 13px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
        .pipeline-flow { font-size: 11px; color: #475569; }
        .pipeline-flow span { color: #6366f1; }
        .footer { text-align: center; font-size: 12px; color: #334155; margin-top: 8px; }
        .footer b { color: #475569; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="top-badge">
          <div class="dot"></div>
          <span class="badge-text">Live on Kubernetes</span>
          <span class="version">v2.0.0</span>
        </div>
        <div class="card">
          <div class="app-title">Shop<span>K8s</span> 🚀</div>
          <div class="subtitle">Production deployment — AWS CI/CD Pipeline</div>
          <div class="grid">
            <div class="info-box">
              <div class="label">Pod Name</div>
              <div class="value">${os.hostname()}</div>
            </div>
            <div class="info-box">
              <div class="label">Status</div>
              <div class="value green">● Running</div>
            </div>
            <div class="info-box">
              <div class="label">Platform</div>
              <div class="value purple">${os.platform()} / ${os.arch()}</div>
            </div>
            <div class="info-box">
              <div class="label">Node.js</div>
              <div class="value">${process.version}</div>
            </div>
            <div class="info-box">
              <div class="label">Uptime</div>
              <div class="value green">${Math.floor(process.uptime())}s</div>
            </div>
            <div class="info-box">
              <div class="label">Port</div>
              <div class="value">${PORT}</div>
            </div>
          </div>
        </div>
        <div class="pipeline-card">
          <div class="pipeline-icon">⚡</div>
          <div class="pipeline-info">
            <div class="pipeline-title">Deployed via AWS CodePipeline</div>
            <div class="pipeline-flow">
              <span>GitHub</span> → CodeBuild → 
              <span>ECR</span> → kubectl → 
              <span>K8s</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <b>${new Date().toUTCString()}</b>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', hostname: os.hostname(), uptime: process.uptime(), version: '2.0.0' });
});

app.listen(PORT, () => console.log(`ShopK8s running on port ${PORT}`));
