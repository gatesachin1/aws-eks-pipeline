const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

const VERSION = 'v3.0.0';
const BUILD_TIME = new Date().toUTCString();

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ShopK8s — EKS Live</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;background:#050a14;color:#e2e8f0;min-height:100vh;overflow-x:hidden;}

    /* animated bg */
    body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;
      background:radial-gradient(ellipse at 20% 50%,rgba(99,102,241,0.08) 0%,transparent 60%),
                 radial-gradient(ellipse at 80% 20%,rgba(16,185,129,0.06) 0%,transparent 50%),
                 radial-gradient(ellipse at 60% 80%,rgba(56,189,248,0.05) 0%,transparent 50%);
      pointer-events:none;z-index:0;}

    .page{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:40px 24px;}

    /* header */
    .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:48px;}
    .logo{display:flex;align-items:center;gap:12px;}
    .logo-icon{width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#38bdf8);
      border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;}
    .logo-text{font-size:22px;font-weight:700;background:linear-gradient(135deg,#6366f1,#38bdf8);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .live-badge{display:flex;align-items:center;gap:8px;background:rgba(16,185,129,0.1);
      border:1px solid rgba(16,185,129,0.3);padding:6px 14px;border-radius:99px;}
    .live-dot{width:7px;height:7px;background:#10b981;border-radius:50%;
      animation:blink 1.5s ease-in-out infinite;}
    @keyframes blink{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,0.4);}
      50%{opacity:0.6;box-shadow:0 0 0 6px rgba(16,185,129,0);}}
    .live-text{font-size:12px;font-weight:600;color:#10b981;letter-spacing:0.5px;}

    /* hero */
    .hero{text-align:center;margin-bottom:56px;}
    .version-pill{display:inline-block;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.3);
      color:#a78bfa;font-size:12px;font-weight:500;padding:4px 12px;border-radius:99px;margin-bottom:20px;}
    .hero-title{font-size:52px;font-weight:700;line-height:1.1;margin-bottom:16px;}
    .hero-title .gradient{background:linear-gradient(135deg,#6366f1 0%,#38bdf8 50%,#10b981 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .hero-sub{font-size:17px;color:#64748b;max-width:500px;margin:0 auto 32px;}
    .hero-tags{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}
    .tag{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
      color:#94a3b8;font-size:12px;padding:5px 12px;border-radius:6px;}

    /* stats row */
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
    .stat-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
      border-radius:14px;padding:20px;text-align:center;transition:border-color 0.2s;}
    .stat-card:hover{border-color:rgba(99,102,241,0.4);}
    .stat-value{font-size:28px;font-weight:700;margin-bottom:4px;}
    .stat-label{font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:1px;}
    .c-purple{color:#a78bfa;}
    .c-green{color:#10b981;}
    .c-blue{color:#38bdf8;}
    .c-amber{color:#f59e0b;}

    /* main grid */
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}

    /* cards */
    .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
      border-radius:16px;padding:24px;transition:all 0.2s;}
    .card:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.12);}
    .card-header{display:flex;align-items:center;gap:10px;margin-bottom:20px;}
    .card-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;
      justify-content:center;font-size:16px;}
    .icon-purple{background:rgba(99,102,241,0.15);}
    .icon-green{background:rgba(16,185,129,0.15);}
    .icon-blue{background:rgba(56,189,248,0.15);}
    .icon-amber{background:rgba(245,158,11,0.15);}
    .card-title{font-size:13px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;}

    /* info rows */
    .info-row{display:flex;justify-content:space-between;align-items:center;
      padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
    .info-row:last-child{border-bottom:none;padding-bottom:0;}
    .info-key{font-size:13px;color:#64748b;}
    .info-val{font-size:13px;font-weight:500;font-family:'SF Mono','Fira Code',monospace;}

    /* pipeline flow */
    .pipeline-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
      border-radius:16px;padding:28px;margin-bottom:20px;}
    .pipeline-title{font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;
      letter-spacing:0.5px;margin-bottom:20px;}
    .pipeline-steps{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;}
    .step{display:flex;flex-direction:column;align-items:center;gap:6px;}
    .step-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;
      justify-content:center;font-size:20px;position:relative;}
    .step-icon::after{content:'✓';position:absolute;top:-4px;right:-4px;width:16px;height:16px;
      background:#10b981;border-radius:50%;font-size:9px;display:flex;align-items:center;
      justify-content:center;border:2px solid #050a14;}
    .step-name{font-size:11px;color:#64748b;font-weight:500;}
    .step-arrow{font-size:18px;color:#334155;margin:0 8px;margin-bottom:18px;}
    .s1{background:rgba(34,197,94,0.12);}
    .s2{background:rgba(99,102,241,0.12);}
    .s3{background:rgba(245,158,11,0.12);}
    .s4{background:rgba(56,189,248,0.12);}
    .s5{background:rgba(168,85,247,0.12);}
    .s6{background:rgba(16,185,129,0.12);}

    /* health bar */
    .health-item{display:flex;align-items:center;gap:12px;padding:10px 0;
      border-bottom:1px solid rgba(255,255,255,0.05);}
    .health-item:last-child{border-bottom:none;}
    .health-label{font-size:13px;color:#94a3b8;flex:1;}
    .health-bar-wrap{flex:2;background:rgba(255,255,255,0.05);border-radius:99px;height:6px;overflow:hidden;}
    .health-bar{height:100%;border-radius:99px;transition:width 1s ease;}
    .bar-green{background:linear-gradient(90deg,#10b981,#34d399);}
    .bar-blue{background:linear-gradient(90deg,#38bdf8,#7dd3fc);}
    .bar-purple{background:linear-gradient(90deg,#6366f1,#a78bfa);}
    .health-pct{font-size:12px;font-weight:600;min-width:36px;text-align:right;}

    /* footer */
    .footer{text-align:center;padding:32px 0 16px;color:#334155;font-size:12px;}
    .footer span{color:#475569;}

    @media(max-width:640px){
      .stats{grid-template-columns:repeat(2,1fr);}
      .grid{grid-template-columns:1fr;}
      .hero-title{font-size:36px;}
      .pipeline-steps{gap:4px;}
      .step-arrow{margin:0 4px;}
    }
  </style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="logo">
      <div class="logo-icon">🚀</div>
      <span class="logo-text">ShopK8s</span>
    </div>
    <div class="live-badge">
      <div class="live-dot"></div>
      <span class="live-text">LIVE ON EKS</span>
    </div>
  </div>

  <div class="hero">
    <div class="version-pill">${VERSION} — Latest Deploy</div>
    <h1 class="hero-title">Running on <span class="gradient">Amazon EKS</span></h1>
    <p class="hero-sub">Production-grade Kubernetes deployment with automated CI/CD pipeline via AWS CodePipeline</p>
    <div class="hero-tags">
      <span class="tag">⚡ AWS EKS</span>
      <span class="tag">🐳 Docker</span>
      <span class="tag">📦 Amazon ECR</span>
      <span class="tag">🔄 CodePipeline</span>
      <span class="tag">🏗 CodeBuild</span>
      <span class="tag">☸ Kubernetes 1.30</span>
    </div>
  </div>

  <div class="stats">
    <div class="stat-card">
      <div class="stat-value c-green">● UP</div>
      <div class="stat-label">Status</div>
    </div>
    <div class="stat-card">
      <div class="stat-value c-purple">${Math.floor(process.uptime())}s</div>
      <div class="stat-label">Uptime</div>
    </div>
    <div class="stat-card">
      <div class="stat-value c-blue">${PORT}</div>
      <div class="stat-label">Port</div>
    </div>
    <div class="stat-card">
      <div class="stat-value c-amber">${process.version}</div>
      <div class="stat-label">Node.js</div>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-header">
        <div class="card-icon icon-purple">☸</div>
        <span class="card-title">Pod Info</span>
      </div>
      <div class="info-row">
        <span class="info-key">Pod name</span>
        <span class="info-val c-blue">${os.hostname()}</span>
      </div>
      <div class="info-row">
        <span class="info-key">Platform</span>
        <span class="info-val c-purple">${os.platform()} / ${os.arch()}</span>
      </div>
      <div class="info-row">
        <span class="info-key">CPUs</span>
        <span class="info-val c-green">${os.cpus().length} vCPU</span>
      </div>
      <div class="info-row">
        <span class="info-key">Memory</span>
        <span class="info-val c-amber">${Math.round(os.totalmem()/1024/1024)} MB</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-icon icon-green">📦</div>
        <span class="card-title">Deployment</span>
      </div>
      <div class="info-row">
        <span class="info-key">Version</span>
        <span class="info-val c-purple">${VERSION}</span>
      </div>
      <div class="info-row">
        <span class="info-key">Registry</span>
        <span class="info-val c-blue">Amazon ECR</span>
      </div>
      <div class="info-row">
        <span class="info-key">Cluster</span>
        <span class="info-val c-green">eks-shopk8s</span>
      </div>
      <div class="info-row">
        <span class="info-key">Region</span>
        <span class="info-val c-amber">us-east-1</span>
      </div>
    </div>
  </div>

  <div class="card" style="margin-bottom:20px">
    <div class="card-header">
      <div class="card-icon icon-blue">📊</div>
      <span class="card-title">System Health</span>
    </div>
    <div class="health-item">
      <span class="health-label">CPU load</span>
      <div class="health-bar-wrap"><div class="health-bar bar-green" style="width:${Math.min(Math.round(os.loadavg()[0]*100/os.cpus().length),100)}%"></div></div>
      <span class="health-pct c-green">${Math.min(Math.round(os.loadavg()[0]*100/os.cpus().length),100)}%</span>
    </div>
    <div class="health-item">
      <span class="health-label">Memory used</span>
      <div class="health-bar-wrap"><div class="health-bar bar-blue" style="width:${Math.round((os.totalmem()-os.freemem())/os.totalmem()*100)}%"></div></div>
      <span class="health-pct c-blue">${Math.round((os.totalmem()-os.freemem())/os.totalmem()*100)}%</span>
    </div>
    <div class="health-item">
      <span class="health-label">Process uptime</span>
      <div class="health-bar-wrap"><div class="health-bar bar-purple" style="width:${Math.min(Math.round(process.uptime()/3600*100),100)}%"></div></div>
      <span class="health-pct c-purple">${Math.floor(process.uptime())}s</span>
    </div>
  </div>

  <div class="pipeline-card">
    <div class="pipeline-title">CI/CD Pipeline — AWS CodePipeline</div>
    <div class="pipeline-steps">
      <div class="step"><div class="step-icon s1">🐙</div><span class="step-name">GitHub</span></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-icon s2">⚡</div><span class="step-name">CodePipeline</span></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-icon s3">🏗</div><span class="step-name">CodeBuild CI</span></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-icon s4">📦</div><span class="step-name">ECR</span></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-icon s5">🔧</div><span class="step-name">CodeBuild CD</span></div>
      <div class="step-arrow">→</div>
      <div class="step"><div class="step-icon s6">☸</div><span class="step-name">EKS Live</span></div>
    </div>
  </div>

  <div class="footer">
    Last deployed: <span>${BUILD_TIME}</span> &nbsp;·&nbsp; Current time: <span>${new Date().toUTCString()}</span>
  </div>

</div>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    hostname: os.hostname(),
    uptime: process.uptime(),
    version: VERSION,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem()
    }
  });
});

app.listen(PORT, () => console.log(`ShopK8s ${VERSION} running on port ${PORT}`));
