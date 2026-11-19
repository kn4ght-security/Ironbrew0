
function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.side-btn[data-page]').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  const btn = document.querySelector('.side-btn[data-page="' + id + '"]');
  if (btn) btn.classList.add('active');
  // hide greet on non-dashboard
  const greet = document.getElementById('greet');
  if (greet) greet.style.display = id === 'dashboard' ? 'flex' : 'none';
  location.hash = id;
}

document.querySelectorAll('.side-btn[data-page]').forEach(btn => {
  btn.addEventListener('click', () => go(btn.dataset.page));
});

window.addEventListener('hashchange', () => {
  go((location.hash || '#dashboard').slice(1) || 'dashboard');
});
if (location.hash) go(location.hash.slice(1));

const fileInput = document.getElementById('file-input');
const settings = document.getElementById('settings');
const status = document.getElementById('status');
let fileName = '', fileText = '';

function onFile(f) {
  if (!f) return;
  fileName = f.name;
  const reader = new FileReader();
  reader.onload = () => {
    fileText = String(reader.result || '');
    settings.hidden = false;
    status.textContent = 'Loaded ' + fileName + ' (' + fileText.length + ' bytes)';
  };
  reader.readAsText(f);
}

fileInput.addEventListener('change', () => onFile(fileInput.files[0]));
document.getElementById('btn-upload-top').addEventListener('click', () => fileInput.click());

document.getElementById('btn-run').addEventListener('click', () => {
  const node = document.getElementById('opt-node').value;
  const opts = [];
  if (!document.getElementById('opt-at').checked) opts.push('anti tamper off');
  if (document.getElementById('opt-vm').checked) opts.push('VM MAX');
  if (document.getElementById('opt-cff').checked) opts.push('CFF MAX');
  if (document.getElementById('opt-novm').checked) opts.push('LC_NO_VIRTUALIZE');
  status.textContent =
    'Demo UI only — real obfuscation via CLI or Discord bot.\n' +
    'File: ' + fileName + '\nNode: ' + node + '\nOptions: ' + (opts.join(', ') || 'defaults') +
    '\n\nlua cli.lua ' + (fileName || 'input.lua') + ' --preset executor -o out.lua';
  const tbody = document.getElementById('history-body');
  if (tbody.querySelector('.end')) tbody.innerHTML = '';
  const tr = document.createElement('tr');
  tr.innerHTML = '<td>' + new Date().toLocaleString() + '</td><td>demo</td><td>' + fileName + '</td>';
  tbody.prepend(tr);
});
