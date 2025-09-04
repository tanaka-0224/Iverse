// scripts/views/ai.js
import { state, getTopMatches, canonGoal, makeGroupsByGoal } from "../core/state.js";
import { startChatWith } from "./chat.js";
import { openProfileModal } from "./profile-modal.js";

let aiList;
let cardContainer;
let currentCardIndex = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let currentCard = null;
let shuffledUsers = []; // シャッフルされたユーザー配列
let isProcessingSwipe = false; // スワイプ処理中のフラグ

export function initAI(){
  aiList = document.getElementById("ai-list");
  cardContainer = document.getElementById("cardContainer");
  
  // スワイプ機能の初期化
  initSwipeFunctionality();
  
  // リフレッシュボタンは廃止
}

export function renderAI(){
  if (!state.me || !state.me.goal){
    if (cardContainer) {
      cardContainer.innerHTML = '<div class="no-more-cards">まずはマイページで「目的」と「スキル」を保存してください。</div>';
    }
    if (aiList) {
      aiList.innerHTML = '<div class="hint">まずはマイページで「目的」と「スキル」を保存してください。</div>';
    }
    return;
  }

  // ユーザーデータをシャッフル
  shuffleUsers();
  
  // カード表示を優先
  if (cardContainer) {
    renderCards();
  }
  
  // 従来のリスト表示も保持（非表示）
  if (aiList) {
    renderTraditionalList();
  }
}

// ユーザーデータをシャッフルする関数
function shuffleUsers() {
  // 現在のユーザーを除外
  const otherUsers = state.users.filter(user => user.name !== state.me.name);
  
  // フィッシャー・イェーツのシャッフルアルゴリズム
  shuffledUsers = [...otherUsers];
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
  }
  
  // マッチングスコアも計算して並び替え（オプション）
  // 完全ランダムにしたい場合はこの部分をコメントアウト
  shuffledUsers.sort((a, b) => {
    const scoreA = getTopMatches(state.me, [a], 1)[0]?.score || 0;
    const scoreB = getTopMatches(state.me, [b], 1)[0]?.score || 0;
    return scoreB - scoreA; // スコア順で並び替え
  });
}

function renderCards() {
  if (!cardContainer) return;
  
  cardContainer.innerHTML = '';
  currentCardIndex = 0;
  
  if (shuffledUsers.length === 0) {
    cardContainer.innerHTML = '<div class="no-more-cards">おすすめのユーザーが見つかりませんでした。</div>';
    return;
  }
  
  // 常に2枚のカードを表示（現在 + 次の1枚）
  renderCurrentAndNextCards();
  
  // 操作ボタンのイベントを再設定
  bindActionButtons();
}

function createCard(user, isTop) {
  const card = document.createElement('div');
  card.className = 'card';
  
  // カードの重なり表示を改善（トップ:3、背景:2）
  card.style.zIndex = isTop ? 3 : 2;
  
  // スコアを計算
  const score = getTopMatches(state.me, [user], 1)[0]?.score || 0;
  
  // ランダムな色のグラデーションを生成
  const colors = [
    ['#667eea', '#764ba2'], // 青紫
    ['#f093fb', '#f5576c'], // ピンク
    ['#4facfe', '#00f2fe'], // 青
    ['#43e97b', '#38f9d7'], // 緑
    ['#fa7093', '#fee140'], // ピンク黄
    ['#a8edea', '#fed6e3'], // 水色ピンク
    ['#ffecd2', '#fcb69f'], // オレンジ
    ['#ff9a9e', '#fecfef']  // ピンク紫
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  card.innerHTML = `
    <div class="card-image" style="background: linear-gradient(135deg, ${randomColor[0]} 0%, ${randomColor[1]} 100%);">
      <span class="avatar">${(user.name || "?").slice(0, 1)}</span>
    </div>
    <div class="card-content">
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-goal">${canonGoal(user.goal)}</div>
        <div class="user-score">マッチ度: ${score.toFixed(2)}</div>
        <div class="user-skills">
          ${(user.skills || []).slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join("")}
        </div>
        <div class="user-comment">一緒に${canonGoal(user.goal)}を頑張りましょう！</div>
      </div>
    </div>
    <div class="swipe-indicator">
      ${isTop ? '<span id="swipeText"></span>' : ''}
    </div>
  `;
  
  // カードクリックでプロフィール詳細を表示
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.action-btn')) {
      openProfileModal(user);
    }
  });
  
  return card;
}

function renderTraditionalList() {
  if (!aiList) return;
  
  aiList.innerHTML = '';
  
  // シャッフルされたユーザーから上位5名を表示
  const personal = shuffledUsers.slice(0, 5).map(user => ({
    user,
    score: getTopMatches(state.me, [user], 1)[0]?.score || 0
  }));
  
  if (personal.length) {
    const sec = document.createElement("div");
    sec.style.gridColumn = "1 / -1";
    sec.innerHTML = `<h3>今日のおすすめ（ランダム）</h3>`;
    aiList.appendChild(sec);

    personal.forEach(({user, score}) => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <div class="score-pill">${score.toFixed(2)}</div>
        <div class="avatar">${(user.name || "?").slice(0, 1)}</div>
        <div class="body">
          <div class="head">
            <div class="user-name"> ${user.name}</div>
          </div>
          <div class="user-goal">目的：<span class="badge">${canonGoal(user.goal)}</span></div>
          <div class="meta">${(user.skills || []).map(s => `<span class="skill">${s}</span>`).join("")}</div>
          <div style="margin-top:8px;">
            <button class="connect" type="button">つながる</button>
          </div>
        </div>
      `;
      card.addEventListener("click", (e) => { 
        if (!e.target.classList.contains("connect")) openProfileModal(user); 
      });
      card.querySelector(".connect").addEventListener("click", (e) => { 
        e.stopPropagation(); 
        startChatWith(user); 
      });
      aiList.appendChild(card);
    });
  }

  const groups = makeGroupsByGoal(state.me, state.users, 3);
  if (groups.length) {
    const sec = document.createElement("div");
    sec.style.gridColumn = "1 / -1";
    sec.innerHTML = `<h3>おすすめグループ（目的一致）</h3>`;
    aiList.appendChild(sec);

    groups.forEach((g, i) => {
      const div = document.createElement("div");
      div.className = "group-card";
      div.innerHTML = `
        <h4>👥 ${g.goal} チーム #${i + 1}（${g.members.length}人）</h4>
        <div class="member">${g.members.map(m => m.name).join("、")}</div>
        <div class="meta">例スキル：${(g.members[0]?.skills || []).slice(0, 3).map(s => `<span class="skill">${s}</span>`).join("")}</div>
        <button class="connect" type="button">このグループで参加</button>
      `;
      div.querySelector(".connect").addEventListener("click", () => {
        alert("🎉 グループに参加しました！（デモ）");
      });
      aiList.appendChild(div);
    });
  }
}

function initSwipeFunctionality() {
  // タッチイベント
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);

  // マウスイベント
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function bindActionButtons() {
  const btnSkip = document.getElementById('btnSkip');
  const btnLike = document.getElementById('btnLike');
  
  if (btnSkip) {
    btnSkip.addEventListener('click', () => swipeCard('left'));
  }
  if (btnLike) {
    btnLike.addEventListener('click', () => swipeCard('right'));
  }
}

function handleTouchStart(e) {
  if (!currentCard) return;
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  currentCard.classList.add('dragging');
}

function handleTouchMove(e) {
  if (!isDragging || !currentCard) return;
  e.preventDefault();
  
  currentX = e.touches[0].clientX - startX;
  currentY = e.touches[0].clientY - startY;
  
  updateCardPosition();
}

function handleTouchEnd(e) {
  if (!isDragging || !currentCard) return;
  isDragging = false;
  currentCard.classList.remove('dragging');
  
  handleSwipeEnd();
}

function handleMouseDown(e) {
  if (!currentCard || e.target.closest('.action-btn')) return;
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  currentCard.classList.add('dragging');
}

function handleMouseMove(e) {
  if (!isDragging || !currentCard) return;
  
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  
  updateCardPosition();
}

function handleMouseUp(e) {
  if (!isDragging || !currentCard) return;
  isDragging = false;
  currentCard.classList.remove('dragging');
  
  handleSwipeEnd();
}

function updateCardPosition() {
  if (!currentCard) return;
  
  const rotate = currentX * 0.1;
  const scale = 1 - Math.abs(currentX) * 0.001;
  
  // 中央基準を維持（CSSの translateX(-50%) を前提に合成）
  currentCard.style.transform = `translateX(-50%) translate(${currentX}px, ${currentY}px) rotate(${rotate}deg) scale(${scale})`;
  
  // スワイプ方向のインジケーター
  const swipeText = currentCard.querySelector('#swipeText');
  if (swipeText) {
    if (currentX > 50) {
      swipeText.textContent = 'LIKE!';
      currentCard.classList.add('swipe-right');
      currentCard.classList.remove('swipe-left');
    } else if (currentX < -50) {
      swipeText.textContent = 'SKIP';
      currentCard.classList.add('swipe-left');
      currentCard.classList.remove('swipe-right');
    } else {
      swipeText.textContent = '';
      currentCard.classList.remove('swipe-left', 'swipe-right');
    }
  }
}

function handleSwipeEnd() {
  if (!currentCard) return;
  
  const threshold = 100;
  
  if (Math.abs(currentX) > threshold) {
    if (currentX > 0) {
      swipeCard('right');
    } else {
      swipeCard('left');
    }
  } else {
    // カードを元の位置に戻す
    currentCard.style.transform = '';
    currentCard.classList.remove('swipe-left', 'swipe-right');
  }
  
  currentX = 0;
  currentY = 0;
}

function swipeCard(direction) {
  if (!currentCard || isProcessingSwipe) return;
  
  console.log('swipeCard called with direction:', direction);
  console.log('currentCardIndex before:', currentCardIndex);
  
  // 処理中フラグを立てる
  isProcessingSwipe = true;
  
  const swipeClass = direction === 'left' ? 'swipe-left' : 'swipe-right';
  // インライン transform を一旦クリアしてクラスのアニメーションを反映
  currentCard.style.transform = '';
  currentCard.classList.add(swipeClass);
  
  // アニメーション完了後に一度だけ実行
  setTimeout(() => {
    // 次のカードに進む
    currentCardIndex++;
    
    // カードがなくなった場合はシャッフルしてリセット
    if (currentCardIndex >= shuffledUsers.length) {
      shuffleUsers();
      currentCardIndex = 0;
    }
    
    // 現在と次のカードを再描画（一度だけ）
    renderCurrentAndNextCards();
    
    // 処理完了フラグを下げる
    isProcessingSwipe = false;
  }, 300);
}

// super like 機能は削除（UX簡素化のため）

function bindRefreshButton() {
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      // リフレッシュボタンのアニメーション
      refreshBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        refreshBtn.style.transform = '';
      }, 150);
      
      // 新しいランダムデータを生成
      shuffleUsers();
      currentCardIndex = 0;
      renderCards();
      
      // 成功メッセージ
      showRefreshMessage();
    });
  }
}

function showRefreshMessage() {
  // 一時的な成功メッセージを表示
  const message = document.createElement('div');
  message.className = 'refresh-message';
  message.textContent = '✨ 新しいおすすめを生成しました！';
  message.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    z-index: 1000;
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(message);
  
  // 3秒後にメッセージを削除
  setTimeout(() => {
    message.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}

function renderCurrentAndNextCards() {
  if (!cardContainer) return;
  
  // 既存のカードを全てクリア
  cardContainer.innerHTML = '';
  
  // 現在のカードを表示
  if (currentCardIndex < shuffledUsers.length) {
    const currentUser = shuffledUsers[currentCardIndex];
    const currentCardElement = createCard(currentUser, true);
    cardContainer.appendChild(currentCardElement);
    currentCard = currentCardElement;
    
    // 次のカードを背景に表示
    const nextIndex = (currentCardIndex + 1) % shuffledUsers.length;
    const nextUser = shuffledUsers[nextIndex];
    const nextCardElement = createCard(nextUser, false);
    cardContainer.appendChild(nextCardElement);
  }
  
  // 操作ボタンのイベントを再設定
  bindActionButtons();
}
