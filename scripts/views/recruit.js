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

  wrap.innerHTML = "";
  
  mine.forEach(r=>{
    const div = document.createElement("div");
    div.className = "recruit-card";
    
    const typeIcon = r.type === 'group' ? '👥' : '👤';
    const typeText = r.type === 'group' ? 'グループ' : '個人';
    const typeClass = r.type === 'group' ? 'group' : 'individual';
    
    div.innerHTML = `
      <div class="recruit-card-header">
        <span class="recruit-type ${typeClass}">
          <span>${typeIcon}</span>
          ${typeText}
        </span>
        <button class="delete-btn" data-recruit-id="${r.id}">🗑️ 削除</button>
      </div>
      <div class="recruit-content">
        <div class="recruit-goals">${escapeHtml(r.goals)}</div>
        <div class="recruit-detail">${escapeHtml(r.detail)}</div>
        ${r.groupName ? `<div class="recruit-group-name">🏷️ ${escapeHtml(r.groupName)}</div>` : ''}
      </div>
      <div class="recruit-meta">
        <div class="recruit-date">
          <span>📅</span>
          <span>${new Date(r.createdAt).toLocaleDateString('ja-JP')}</span>
        </div>
      </div>
    `;
    
    // 削除ボタンのイベントリスナーを追加
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('この募集を削除しますか？')) {
        deleteRecruit(r.id);
      }
    });
    
    wrap.appendChild(div);
  });
}

// 募集削除関数
function deleteRecruit(recruitId) {
  if (!state.recruits) return;
  
  const index = state.recruits.findIndex(r => r.id === recruitId);
  if (index !== -1) {
    state.recruits.splice(index, 1);
    save();
    renderRecruit();
    alert('募集を削除しました。');
  }
}

function escapeHtml(s){
  return (s||"").replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}