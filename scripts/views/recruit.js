import { state, save } from "../core/state.js";

let inited = false;
export function initRecruit(){
  if (inited) return;
  inited = true;

  if (!Array.isArray(state.recruits)) state.recruits = [];

  function updateGroupField(){
  var checked = document.querySelector('input[name="recruit-type"]:checked');
  var type = checked ? checked.value : "individual";
  var row = document.getElementById('group-name-row');
  var ta  = document.getElementById('recruit-group');
  var isGroup = (type === 'group');
  if (row) {
    if (isGroup) row.classList.remove('hidden');
    else row.classList.add('hidden');
  }
  if (ta) ta.disabled = !isGroup;
}

  document.querySelectorAll('input[name="recruit-type"]').forEach(r=>{
    r.addEventListener('change', updateGroupField);
  });
  updateGroupField(); 

  document.getElementById("recruit-submit")?.addEventListener("click", ()=>{
    if (!state.me){ alert("ログインしてください。"); return; }

    const type = document.querySelector('input[name="recruit-type"]:checked')?.value || "individual";
    const groupName = (document.getElementById("recruit-group")?.value||"").trim();
    const goals  = (document.getElementById("recruit-goals")?.value||"").trim();
    const detail = (document.getElementById("recruit-detail")?.value||"").trim();

    if (!goals){ alert("目的・スキルを入力してください。"); return; }
    if (type==="group" && !groupName){ alert("グループ名を入力してください。"); return; }

    state.recruits.unshift({
      id: Date.now(), author: state.me.name,
      type, groupName, goals, detail,
      createdAt: new Date().toISOString()
    });
    save();
    ["recruit-group","recruit-goals","recruit-detail"]
      .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=""; });

    renderRecruit();
    alert("募集を投稿しました！");
  });
}

export function renderRecruit(){
  const wrap = document.getElementById("recruit-list");
  if (!wrap) return;
  const meName = state.me?.name || "";
  const mine = (state.recruits||[]).filter(r=>r.author===meName);

  wrap.innerHTML = mine.length ? "" : `<div class="hint">まだ募集はありません。</div>`;
  mine.forEach(r=>{
    const div = document.createElement("div");
    div.className = "card recruit-card";
    div.innerHTML = `
      <div class="rc-title" style="writing-mode:horizontal-tb;white-space:nowrap;font-weight:700;margin-bottom:4px;">
        ${r.type==="group" ? "グループ募集" : "個人募集"}
      </div>
      ${r.groupName ? `<div class="muted">グループ名：${escapeHtml(r.groupName)}</div>` : ""}
      <div class="muted" style="margin:6px 0;"><span class="badge">目的・スキル</span> ${escapeHtml(r.goals)}</div>
      <div class="muted" style="white-space:pre-wrap;">${escapeHtml(r.detail)}</div>
      <div class="tiny muted" style="margin-top:6px;">
        ${new Date(r.createdAt).toLocaleString()}／投稿者：${escapeHtml(r.author)}
      </div>`;
    wrap.appendChild(div);
  });
}

function escapeHtml(s){
  return (s||"").replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}