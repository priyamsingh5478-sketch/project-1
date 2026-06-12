// ========================
// DATA MODELS
// ========================

const subsData = [
  { name: 'Lena Schmidt', email: 'lena@buildco.io', plan: 'pro', status: 'active', mrr: '$79', billing: 'monthly', next: 'Jul 1' },
  { name: 'Tariq Osei', email: 'tariq@dataloop.ai', plan: 'enterprise', status: 'active', mrr: '$249', billing: 'annual', next: 'Jan 1 2026' },
  { name: 'Mei Nakamura', email: 'mei@pixel.design', plan: 'starter', status: 'trialing', mrr: '$0', billing: 'monthly', next: 'Jun 20' },
  { name: 'Jorge Silva', email: 'jorge@clarimex.com', plan: 'pro', status: 'past_due', mrr: '$79', billing: 'monthly', next: 'Retry Jun 8' },
  { name: 'Aisha Patel', email: 'aisha@healthloop.io', plan: 'enterprise', status: 'active', mrr: '$249', billing: 'annual', next: 'Mar 1 2026' },
  { name: 'Ben Larsson', email: 'ben@frostlab.se', plan: 'starter', status: 'active', mrr: '$29', billing: 'monthly', next: 'Jul 5' },
  { name: 'Sara Kim', email: 'sara@queueup.io', plan: 'pro', status: 'active', mrr: '$79', billing: 'monthly', next: 'Jul 3' },
  { name: 'Dmitri Volkov', email: 'd.volkov@infrasec.ru', plan: 'starter', status: 'canceled', mrr: '$0', billing: '—', next: '—' }
];

const invoices = [
  { id: 'INV-2024', customer: 'Tariq Osei', amt: '$249', status: 'paid', date: 'Jun 1' },
  { id: 'INV-2023', customer: 'Aisha Patel', amt: '$249', status: 'paid', date: 'Jun 1' },
  { id: 'INV-2022', customer: 'Lena Schmidt', amt: '$79', status: 'paid', date: 'Jun 1' },
  { id: 'INV-2021', customer: 'Jorge Silva', amt: '$79', status: 'open', date: 'Jun 1' },
  { id: 'INV-2020', customer: 'Sara Kim', amt: '$79', status: 'paid', date: 'Jun 1' },
  { id: 'INV-2019', customer: 'Ben Larsson', amt: '$29', status: 'paid', date: 'Jun 5' }
];

const usageTop = [
  { name: 'Buildco.io', plan: 'pro', calls: '2.4M', pct: 96, storage: '42 GB', overage: '$18.40' },
  { name: 'DataLoop AI', plan: 'enterprise', calls: '1.8M', pct: 18, storage: '340 GB', overage: '—' },
  { name: 'Healthloop', plan: 'enterprise', calls: '1.5M', pct: 15, storage: '210 GB', overage: '—' },
  { name: 'QueueUp', plan: 'pro', calls: '980K', pct: 98, storage: '88 GB', overage: '$7.20' },
  { name: 'FrostLab', plan: 'starter', calls: '8.1K', pct: 81, storage: '3.1 GB', overage: '—' }
];

const rolesArr = [
  { name: 'Super Admin', icon: 'ti-shield-lock', color: 'var(--violet)', count: 1, perms: ['Full access', 'Billing mgmt', 'Role assignment'] },
  { name: 'Admin', icon: 'ti-settings', color: 'var(--sky)', count: 3, perms: ['Manage subs', 'Analytics', 'Team mgmt'] },
  { name: 'Billing Manager', icon: 'ti-credit-card', color: 'var(--emerald)', count: 2, perms: ['Invoices', 'Refunds', 'Exports'] },
  { name: 'Viewer', icon: 'ti-eye', color: 'var(--amber)', count: 5, perms: ['Read-only', 'View analytics'] }
];

const team = [
  { name: 'Arjun Patel', email: 'arjun@substack.io', role: 'Super Admin', mfa: true, last: 'Now', status: 'active' },
  { name: 'Maria Gomes', email: 'maria@substack.io', role: 'Admin', mfa: true, last: '2h ago', status: 'active' },
  { name: 'Felix Chen', email: 'felix@substack.io', role: 'Billing Manager', mfa: true, last: '1d ago', status: 'active' },
  { name: 'Priya Mehta', email: 'priya@substack.io', role: 'Admin', mfa: false, last: '3d ago', status: 'active' },
  { name: "Sam O'Brien", email: 'sam@substack.io', role: 'Viewer', mfa: false, last: '1w ago', status: 'inactive' }
];

const auditLog = [
  { icon: 'ti-user-plus', text: 'Invited priya as Admin', time: '2h ago' },
  { icon: 'ti-credit-card', text: 'Refunded $79 for INV-2019', time: '5h ago' },
  { icon: 'ti-settings', text: 'Changed Pro plan price', time: 'Yesterday' },
  { icon: 'ti-plug-connected', text: 'Added webhook endpoint', time: '2d ago' }
];

const webhooksData = [
  { url: 'https://api.substack.io/stripe/events', events: 'All events', last: 'Just now', rate: '99.8%', status: 'active' },
  { url: 'https://api.substack.io/stripe/billing', events: 'invoice.*', last: '2m ago', rate: '100%', status: 'active' }
];

const stripeEventsList = [
  'customer.subscription.created', 'customer.subscription.updated',
  'invoice.payment_succeeded', 'invoice.payment_failed',
  'payment_intent.succeeded', 'checkout.session.completed'
];

const recentEvents = [
  { icon: 'ti-user-plus', text: 'Mei Nakamura started trial', time: '5m ago' },
  { icon: 'ti-credit-card', text: 'Tariq Osei renewed Enterprise', time: '1h ago' },
  { icon: 'ti-arrow-up', text: 'Sara Kim upgraded to Pro', time: '3h ago' }
];

// ============================================
// PLAN CONFIGURATION
// ============================================

let billingMode = 'monthly';
const prices = {
  monthly: { starter: 29, pro: 79, enterprise: 249 },
  annual: { starter: 23, pro: 63, enterprise: 199 }
};

const planFeatures = [
  { key: 'starter', name: 'Starter', color: '#94A3B8', features: ['3 users', '10K API calls', '5GB', 'Email support'] },
  { key: 'pro', name: 'Pro', color: '#7C3AED', badge: 'Most popular', features: ['25 users', '500K calls', '100GB', 'Priority support', 'Custom domains'] },
  { key: 'enterprise', name: 'Enterprise', color: '#059669', features: ['Unlimited users', 'Unlimited API', 'Unlimited storage', '24/7 support', 'SSO'] }
];

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderSubs(filterPlan = 'all', filterStatus = 'all', searchTerm = '') {
  let filtered = subsData.filter(s => 
    (filterPlan === 'all' || s.plan === filterPlan) && 
    (filterStatus === 'all' || s.status === filterStatus)
  );
  if (searchTerm) {
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(searchTerm) || 
      s.email.toLowerCase().includes(searchTerm)
    );
  }
  
  document.getElementById('subs-tbody').innerHTML = filtered.map(s => `
    <tr>
      <td>
        <div style="font-weight:500">${s.name}</div>
        <div style="font-size:11px;color:var(--color-text-tertiary)">${s.email}</div>
      </td>
      <td><span class="badge badge-g">${s.plan}</span></td>
      <td><span class="badge ${getStatusBadgeClass(s.status)}">${s.status}</span></td>
      <td>${s.mrr}</td>
      <td><span class="badge badge-g">${s.billing}</span></td>
      <td>${s.next}</td>
      <td><button class="btn btn-outline btn-sm" onclick="window.sendPrompt('View subscription for ${s.email}')">View</button></td>
    </tr>
  `).join('');
  
  document.getElementById('sub-count').innerHTML = `Showing ${filtered.length} of ${subsData.length}`;
}

function getStatusBadgeClass(status) {
  const map = { active: 'badge-e', trialing: 'badge-s', past_due: 'badge-a', canceled: 'badge-r' };
  return map[status] || 'badge-g';
}

function renderPlanCards() {
  const p = prices[billingMode];
  document.getElementById('plan-grid').innerHTML = planFeatures.map(f => `
    <div class="plan-card">
      ${f.badge ? `<div style="background:var(--violet);color:white;border-radius:30px;padding:2px 12px;font-size:10px;display:inline-block;margin-bottom:8px">${f.badge}</div>` : ''}
      <div style="font-weight:700;font-size:16px;color:${f.color}">${f.name}</div>
      <div style="font-size:28px;font-weight:700;margin:10px 0">
        $${p[f.key]}
        <span style="font-size:12px;font-weight:normal">/${billingMode === 'monthly' ? 'mo' : 'mo (annual)'}</span>
      </div>
      <ul style="list-style:none;margin:12px 0">
        ${f.features.map(feat => `<li style="display:flex;gap:6px;margin:6px 0"><i class="ti ti-check" style="color:var(--emerald)"></i>${feat}</li>`).join('')}
      </ul>
      <button class="btn btn-violet" style="width:100%" onclick="window.sendPrompt('Create ${f.name} subscription at $${p[f.key]}/month')">Select →</button>
    </div>
  `).join('');
}

function renderPlanTable() {
  document.getElementById('plan-table').innerHTML = [
    { name: 'Starter', subs: 648, mrr: '$16,392', conv: 52 },
    { name: 'Pro', subs: 412, mrr: '$37,104', conv: 33 },
    { name: 'Enterprise', subs: 188, mrr: '$30,688', conv: 15 }
  ].map(r => `
    <tr>
      <td><span class="badge badge-g">${r.name}</span></td>
      <td style="font-family:monospace">price_${r.name.toLowerCase()}_id</td>
      <td>${r.subs}</td>
      <td style="color:var(--emerald)">${r.mrr}</td>
      <td>${r.conv}%</td>
      <td><span class="badge badge-e">active</span></td>
    </tr>
  `).join('');
}

function renderInvoices() {
  document.getElementById('inv-list').innerHTML = invoices.map(i => `
    <div class="inv-row">
      <div><i class="ti ti-file-invoice"></i></div>
      <div style="flex:1">
        <div>${i.id} · ${i.customer}</div>
        <div style="font-size:11px">${i.date} 2025</div>
      </div>
      <span class="badge ${i.status === 'paid' ? 'badge-e' : 'badge-a'}">${i.status}</span>
      <div>${i.amt}</div>
    </div>
  `).join('');
}

function renderUsage() {
  document.getElementById('usage-tbody').innerHTML = usageTop.map(u => `
    <tr>
      <td>${u.name}</td>
      <td><span class="badge badge-g">${u.plan}</span></td>
      <td>${u.calls}</td>
      <td>
        <div style="width:70px">
          <div class="usage-bar">
            <div class="usage-fill" style="width:${u.pct}%;background:${u.pct > 85 ? 'var(--rose)' : 'var(--emerald)'}"></div>
          </div>
          ${u.pct}%
        </div>
      </td>
      <td>${u.storage}</td>
      <td>${u.overage}</td>
    </tr>
  `).join('');
}

function renderRoles() {
  document.getElementById('role-grid').innerHTML = rolesArr.map(r => `
    <div style="background:var(--color-background-primary);border-radius:16px;padding:14px;border:1px solid var(--color-border-tertiary)">
      <div style="background:${r.color}20;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:10px">
        <i class="ti ${r.icon}" style="color:${r.color};font-size:18px"></i>
      </div>
      <div style="font-weight:600">${r.name}</div>
      <div style="font-size:11px;color:var(--color-text-tertiary)">${r.count} members</div>
      ${r.perms.map(p => `<div style="font-size:11px;margin-top:6px"><i class="ti ti-check" style="color:var(--emerald)"></i> ${p}</div>`).join('')}
    </div>
  `).join('');
}

function renderTeam() {
  document.getElementById('team-tbody').innerHTML = team.map(t => `
    <tr>
      <td>
        <div>${t.name}</div>
        <div style="font-size:11px">${t.email}</div>
      </td>
      <td>${t.role}</td>
      <td>${t.mfa ? '<span class="badge badge-e">On</span>' : '<span class="badge badge-r">Off</span>'}</td>
      <td>${t.last}</td>
      <td><span class="badge ${t.status === 'active' ? 'badge-e' : 'badge-g'}">${t.status}</span></td>
    </tr>
  `).join('');
}

function renderAudit() {
  document.getElementById('audit-list').innerHTML = auditLog.map(a => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--color-border-tertiary)">
      <i class="ti ${a.icon}"></i>
      <div>
        <div>${a.text}</div>
        <div style="font-size:10px">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function renderWebhooks() {
  document.getElementById('webhook-tbody').innerHTML = webhooksData.map(w => `
    <tr>
      <td style="font-size:12px">${w.url}</td>
      <td><span class="badge badge-g">${w.events}</span></td>
      <td>${w.last}</td>
      <td>${w.rate}</td>
      <td><span class="badge badge-e">${w.status}</span></td>
    </tr>
  `).join('');
  
  document.getElementById('events-grid').innerHTML = stripeEventsList.map(e => `
    <div style="background:var(--color-background-secondary);padding:8px 12px;border-radius:12px;font-size:12px">
      <i class="ti ti-check" style="color:var(--emerald)"></i> ${e}
    </div>
  `).join('');
}

function renderEvents() {
  document.getElementById('events-list').innerHTML = recentEvents.map(e => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--color-border-tertiary)">
      <i class="ti ${e.icon}"></i>
      <div>
        <div>${e.text}</div>
        <div style="font-size:10px">${e.time}</div>
      </div>
    </div>
  `).join('');
}

// ============================================
// NAVIGATION & HELPERS
// ============================================

function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.getElementById(`page-${pageId}`).classList.add('on');
  
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('on'));
  document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('on');
  
  const titles = { dash: 'Overview', plans: 'Plans & Pricing', subs: 'Subscriptions', invoices: 'Invoices', usage: 'Usage Analytics', admin: 'Admin Panel', webhook: 'Webhooks' };
  document.getElementById('tb-title').innerText = titles[pageId] || 'Dashboard';
  
  const ctaMap = { dash: 'New Subscription', plans: 'Create Plan', subs: 'Add Subscriber', invoices: 'Generate Invoice', usage: 'Export Report', admin: 'Invite Member', webhook: 'Add Endpoint' };
  document.getElementById('cta-txt').innerText = ctaMap[pageId];
}

function applyFiltersAndSearch() {
  const plan = document.getElementById('planFilter')?.value || 'all';
  const status = document.getElementById('statusFilter')?.value || 'all';
  const search = document.getElementById('globalSearch')?.value.toLowerCase() || '';
  renderSubs(plan, status, search);
}

window.sendPrompt = (msg) => {
  alert(`⚡ Stripe Action: ${msg}\n(Simulated webhook / API call)`);
};

// ============================================
// CHARTS INITIALIZATION
// ============================================

function initCharts() {
  new Chart(document.getElementById('mrrChart'), {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ data: [74900, 76800, 78100, 80400, 82600, 84200], borderColor: '#7C3AED', backgroundColor: 'rgba(124,58,237,0.05)', fill: true, tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }
  });
  
  new Chart(document.getElementById('planDonut'), {
    type: 'doughnut',
    data: { labels: ['Starter', 'Pro', 'Enterprise'], datasets: [{ data: [648, 412, 188], backgroundColor: ['#94A3B8', '#7C3AED', '#059669'], borderWidth: 0 }] },
    options: { cutout: '70%', plugins: { legend: { display: false } }, responsive: true }
  });
  
  new Chart(document.getElementById('revBar'), {
    type: 'bar',
    data: { labels: ['Starter', 'Pro', 'Enterprise'], datasets: [{ data: [16392, 37104, 30688], backgroundColor: ['#94A3B8', '#7C3AED', '#059669'], borderRadius: 6 }] },
    options: { plugins: { legend: { display: false } } }
  });
  
  new Chart(document.getElementById('collectionChart'), {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ data: [93.2, 94.1, 95.4, 96, 96.3, 96.7], borderColor: '#059669', fill: true }] },
    options: { plugins: { legend: { display: false } } }
  });
  
  new Chart(document.getElementById('usageChart'), {
    type: 'bar',
    data: { labels: Array.from({ length: 20 }, (_, i) => i + 1), datasets: [{ data: Array.from({ length: 20 }, () => Math.floor(300000 + Math.random() * 450000)), backgroundColor: '#7C3AED60' }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================

function init() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => goToPage(link.getAttribute('data-page')));
  });
  
  // Filters
  document.getElementById('planFilter')?.addEventListener('change', applyFiltersAndSearch);
  document.getElementById('statusFilter')?.addEventListener('change', applyFiltersAndSearch);
  document.getElementById('globalSearch')?.addEventListener('input', applyFiltersAndSearch);
  
  // Billing toggle
  document.querySelector('.toggle-month')?.addEventListener('click', () => {
    billingMode = 'monthly';
    renderPlanCards();
    document.querySelector('.toggle-month').classList.add('btn-violet');
    document.querySelector('.toggle-year').classList.remove('btn-violet');
  });
  
  document.querySelector('.toggle-year')?.addEventListener('click', () => {
    billingMode = 'annual';
    renderPlanCards();
    document.querySelector('.toggle-year').classList.add('btn-violet');
    document.querySelector('.toggle-month').classList.remove('btn-violet');
  });
  
  // Main CTA
  document.getElementById('main-cta').onclick = () => sendPrompt('Create new subscription via Stripe Checkout');
  
  // Render all sections
  renderPlanCards();
  renderPlanTable();
  renderSubs();
  renderInvoices();
  renderUsage();
  renderRoles();
  renderTeam();
  renderAudit();
  renderWebhooks();
  renderEvents();
  initCharts();
  
  // Set active toggle style
  document.querySelector('.toggle-month')?.classList.add('btn-violet');
}

// Start the app
init();
