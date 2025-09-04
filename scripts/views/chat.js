// scripts/views/chat.js - モダンなチャット機能
import { state, save } from "../core/state.js";
import { getViews, show, setActiveNav } from "../core/dom.js";

let chatPartnerEl, chatLogEl, chatTextEl, chatSendBtn;
let partnerListEl, chatMainEl, backToPartnersBtn, partnerAvatarEl;
let currentPartner = null;

// ダミーデータ - チャットパートナーと会話履歴
const dummyPartners = [
  {
    id: 1,
    name: "田中 花子",
    avatar: "🌸",
    status: "online",
    lastMessage: "プロジェクトについて相談したいことがあります",
    lastMessageTime: "14:30"
  },
  {
    id: 2,
    name: "佐藤 太郎",
    avatar: "🌟",
    status: "online",
    lastMessage: "次回のミーティングはいつにしましょうか？",
    lastMessageTime: "12:15"
  },
  {
    id: 3,
    name: "鈴木 美咲",
    avatar: "💫",
    status: "away",
    lastMessage: "資料を確認しました。とても分かりやすかったです",
    lastMessageTime: "昨日"
  },
  {
    id: 4,
    name: "高橋 健一",
    avatar: "🚀",
    status: "online",
    lastMessage: "新しいアイデアを思いつきました！",
    lastMessageTime: "10:45"
  }
];

// ダミーの会話履歴
const dummyConversations = {
  1: [
    { text: "こんにちは！田中花子です。よろしくお願いします。", time: "10:00", type: "received" },
    { text: "はじめまして！よろしくお願いします。", time: "10:02", type: "sent" },
    { text: "プロジェクトについて相談したいことがあるのですが、お時間ありますか？", time: "10:05", type: "received" },
    { text: "はい、大丈夫です！どんなことでしょうか？", time: "10:07", type: "sent" },
    { text: "新しい機能のアイデアを考えているのですが、一緒に検討していただけませんか？", time: "10:10", type: "received" },
    { text: "素晴らしいですね！ぜひお聞かせください。", time: "10:12", type: "sent" }
  ],
  2: [
    { text: "佐藤太郎です。よろしくお願いします！", time: "09:30", type: "received" },
    { text: "よろしくお願いします！", time: "09:32", type: "sent" },
    { text: "次回のミーティングはいつにしましょうか？", time: "12:15", type: "received" },
    { text: "来週の水曜日はいかがでしょうか？", time: "12:20", type: "sent" },
    { text: "水曜日は都合が悪いので、木曜日はいかがですか？", time: "12:25", type: "received" }
  ],
  3: [
    { text: "鈴木美咲と申します。よろしくお願いします。", time: "昨日 15:00", type: "received" },
    { text: "よろしくお願いします！", time: "昨日 15:05", type: "sent" },
    { text: "資料を確認しました。とても分かりやすかったです。", time: "昨日 15:30", type: "received" },
    { text: "ありがとうございます！何か質問があればお気軽にどうぞ。", time: "昨日 15:35", type: "sent" }
  ],
  4: [
    { text: "高橋健一です！よろしくお願いします。", time: "10:30", type: "received" },
    { text: "よろしくお願いします！", time: "10:32", type: "sent" },
    { text: "新しいアイデアを思いつきました！", time: "10:45", type: "received" },
    { text: "どんなアイデアでしょうか？興味があります！", time: "10:50", type: "sent" }
  ]
};

// 多様で面白いAI応答の配列
const aiResponses = [
  // 一般的な応答
  "なるほど、とても興味深いですね！",
  "それは素晴らしいアイデアですね。",
  "詳しく教えていただけますか？",
  "一緒に考えてみましょう！",
  "とても参考になります。ありがとうございます。",
  "次回お会いした時に詳しくお聞かせください。",
  
  // 感情的な応答
  "わくわくしますね！✨",
  "すごい！その発想は見たことがありません！",
  "感動しました！素晴らしいです！",
  "これは革命的なアイデアかもしれません！",
  "目から鱗が落ちる思いです！",
  
  // 質問系の応答
  "それって具体的にはどういうことですか？",
  "他にも似たような例はありますか？",
  "どのように実現しようと考えていますか？",
  "誰をターゲットにしていますか？",
  "予算はどのくらいを想定していますか？",
  
  // 励まし系の応答
  "きっと素晴らしい結果になると思います！",
  "あなたなら絶対に成功しますよ！",
  "一歩一歩進んでいきましょう！",
  "失敗を恐れずに挑戦してみてください！",
  "いつでもサポートしますよ！",
  
  // 専門的な応答
  "技術的には実現可能ですね。",
  "マーケティング戦略も重要になりそうです。",
  "ユーザビリティの観点からも検討が必要ですね。",
  "スケーラビリティは大丈夫でしょうか？",
  "セキュリティ面での対策も考えましょう。",
  
  // ユーモアのある応答
  "これは...天才的ですね！🧠",
  "もしかして未来人ですか？😄",
  "その発想力、売ってください！💰",
  "宇宙人に教えてもらったんですか？👽",
  "脳みそが光って見えます！✨",
  
  // 具体的な提案
  "まずは小さく始めてみるのはどうですか？",
  "プロトタイプを作ってみましょう！",
  "ユーザーに聞いてみるのも良いかもしれません。",
  "競合分析もやってみましょう。",
  "MVP（最小限の製品）から始めませんか？",
  
  // 共感系の応答
  "私も同じようなことを考えていました！",
  "それは確かに困りますね。",
  "お疲れ様です。頑張りましょう！",
  "一緒に解決していきましょう。",
  "あなたの気持ち、よく分かります。",
  
  // 予想外の応答
  "実は、私も同じアイデアを思いついていました！",
  "これは偶然でしょうか？それとも運命？",
  "もしかして、テレパシーが使えるんですか？",
  "あなたの脳波、異常に高いですよ！",
  "これは...予言かもしれません！🔮"
];

// 応答の種類に応じた絵文字を追加する関数
function addEmojiToResponse(response) {
  const emojis = ["✨", "🚀", "💡", "🎯", "🌟", "🔥", "💪", "🎉", "🤔", "😊", "👏", "🎊"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  // 30%の確率で絵文字を追加
  if (Math.random() < 0.3) {
    return `${response} ${randomEmoji}`;
  }
  return response;
}

// ランダムな応答を取得する関数
function getRandomResponse() {
  const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
  return addEmojiToResponse(response);
}

export function initChat() {
  // DOM要素の取得
  partnerListEl = document.getElementById("partner-list");
  chatMainEl = document.getElementById("chat-main");
  chatPartnerEl = document.getElementById("chat-partner");
  chatLogEl = document.getElementById("chat-log");
  chatTextEl = document.getElementById("chat-text");
  chatSendBtn = document.getElementById("chat-send");
  backToPartnersBtn = document.getElementById("back-to-partners");
  partnerAvatarEl = document.getElementById("partner-avatar");

  // イベントリスナーの設定
  chatSendBtn?.addEventListener("click", sendChat);
  chatTextEl?.addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });
  backToPartnersBtn?.addEventListener("click", showPartnerSelector);

  // パートナーリストの表示
  renderPartnerList();
}

// パートナーリストの表示
function renderPartnerList() {
  if (!partnerListEl) return;

  partnerListEl.innerHTML = dummyPartners.map(partner => `
    <div class="partner-item" data-partner-id="${partner.id}">
      <div class="avatar">${partner.avatar}</div>
      <div class="info">
        <div class="name">${partner.name}</div>
        <div class="last-message">${partner.lastMessage}</div>
      </div>
      <div class="status">
        <div class="status-indicator"></div>
        <span>${partner.lastMessageTime}</span>
      </div>
    </div>
  `).join("");

  // パートナー選択のイベントリスナー
  partnerListEl.querySelectorAll(".partner-item").forEach(item => {
    item.addEventListener("click", () => {
      const partnerId = parseInt(item.dataset.partnerId);
      const partner = dummyPartners.find(p => p.id === partnerId);
      if (partner) {
        startChatWith(partner);
      }
    });
  });
}

// チャット開始
export function startChatWith(user) {
  currentPartner = user;
  
  // パートナー情報の表示
  chatPartnerEl.textContent = user.name;
  partnerAvatarEl.textContent = user.avatar;
  
  // チャット履歴の表示
  renderChatHistory(user.id);
  
  // 画面切り替え
  showPartnerSelector(false);
  
  // ナビゲーション更新
  const views = getViews();
  show(views.chat);
  setActiveNav("view-chat");
}

// パートナー選択画面の表示/非表示
function showPartnerSelector(show = true) {
  if (show) {
    document.querySelector(".chat-partner-selector").style.display = "block";
    chatMainEl.style.display = "none";
  } else {
    document.querySelector(".chat-partner-selector").style.display = "none";
    chatMainEl.style.display = "flex";
  }
}

// チャット履歴の表示
function renderChatHistory(partnerId) {
  if (!chatLogEl) return;

  const conversation = dummyConversations[partnerId] || [];
  
  chatLogEl.innerHTML = conversation.map(msg => `
    <div class="message ${msg.type}">
      <div class="message-content">${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    </div>
  `).join("");

  // 最新メッセージまでスクロール
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
}

// メッセージ送信
function sendChat() {
  const text = chatTextEl.value.trim();
  if (!text || !currentPartner) return;

  // 送信メッセージの表示
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const messageHtml = `
    <div class="message sent">
      <div class="message-content">${text}</div>
      <div class="message-time">${timeStr}</div>
    </div>
  `;
  
  chatLogEl.insertAdjacentHTML('beforeend', messageHtml);
  chatTextEl.value = "";

  // スクロールを最下部に
  chatLogEl.scrollTop = chatLogEl.scrollHeight;

  // ランダムなAI応答の表示（少し遅延）
  setTimeout(() => {
    const randomResponse = getRandomResponse();
    const responseTime = new Date();
    const responseTimeStr = `${responseTime.getHours().toString().padStart(2, '0')}:${responseTime.getMinutes().toString().padStart(2, '0')}`;
    
    const responseHtml = `
      <div class="message received">
        <div class="message-content">${randomResponse}</div>
        <div class="message-time">${responseTimeStr}</div>
      </div>
    `;
    
    chatLogEl.insertAdjacentHTML('beforeend', responseHtml);
    chatLogEl.scrollTop = chatLogEl.scrollHeight;
  }, 1000 + Math.random() * 2000);

  // 状態更新（既存の機能を維持）
  if (state.me) {
    const me = state.users.find(u => u.name === state.me.name);
    if (me) {
      me.messagesSent = (me.messagesSent || 0) + 1;
      me.xp = (me.xp || 0) + 2;
      me.lastActive = Date.now();
      save();
    }
  }
}
