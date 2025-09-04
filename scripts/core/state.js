// scripts/core/state.js

export const state = {
  me: null,
  users: [
    { name:"アヤ", goal:"英語学習", skills:["英会話","TOEIC","単語"] },
    { name:"リク", goal:"英語学習", skills:["リスニング","発音","留学準備"] },
    { name:"ユウキ", goal:"英語学習", skills:["IELTS","作文","文法"] },
    { name:"サラ", goal:"英語学習", skills:["TOEFL","会話","単語"] },
    { name:"ケント", goal:"英語学習", skills:["英会話","シャドーイング","発音"] },
    { name:"ミホ", goal:"英語学習", skills:["TOEIC","単語","リスニング"] },
    { name:"マナ", goal:"英語学習", skills:["発音","会話","作文"] },
    { name:"トモヤ", goal:"英語学習", skills:["リスニング","単語","会話"] },
    { name:"ナナ", goal:"英語学習", skills:["留学準備","作文","TOEIC"] },
    { name:"ハル", goal:"英語学習", skills:["TOEFL","単語","作文"] },
    { name:"ミク", goal:"英語学習", skills:["英会話","文法","発音"] },
    { name:"アオイ", goal:"英語学習", skills:["リーディング","Listening","単語"] },
    { name:"ユイ", goal:"英語学習", skills:["シャドーイング","作文","TOEIC"] },
    { name:"タカシ", goal:"英語学習", skills:["TOEFL","文法","リスニング"] },
    { name:"サクラ", goal:"英語学習", skills:["発音","留学準備","作文"] },
    { name:"ケイタ", goal:"英語学習", skills:["英会話","リーディング","単語"] },
    { name:"ミサキ", goal:"英語学習", skills:["文法","TOEIC","会話"] },
    { name:"ダイスケ", goal:"英語学習", skills:["TOEFL","リスニング","単語"] },
    { name:"アヤネ", goal:"英語学習", skills:["IELTS","作文","リーディング"] },
    { name:"シュン", goal:"英語学習", skills:["会話","単語","Listening"] },

    { name:"ケイ", goal:"起業", skills:["マーケ","営業","Pitch"] },
    { name:"モモ", goal:"起業", skills:["資金計画","法務","人脈"] },
    { name:"ジン", goal:"起業", skills:["スタートアップ","PMF","リーン"] },
    { name:"タク", goal:"起業", skills:["営業","チームビルディング","Pitch"] },
    { name:"ユナ", goal:"起業", skills:["SNSマーケ","営業","顧客開発"] },
    { name:"カズマ", goal:"起業", skills:["経営戦略","資金調達","法務"] },
    { name:"リョウ", goal:"起業", skills:["Pitch","営業","SNSマーケ"] },
    { name:"ナオキ", goal:"起業", skills:["リーンキャンバス","Pitch","人脈"] },
    { name:"ハルカ", goal:"起業", skills:["Startup","マーケ","営業"] },
    { name:"ミナ", goal:"起業", skills:["チーム作り","資金計画","Pitch"] },
    { name:"ショウ", goal:"起業", skills:["営業","顧客開発","リーン"] },
    { name:"アヤカ", goal:"起業", skills:["マーケ","SNS運用","Pitch"] },
    { name:"コウタ", goal:"起業", skills:["資金調達","法務","経営"] },
    { name:"ユキ", goal:"起業", skills:["顧客開発","Pitch","マーケ"] },
    { name:"タケル", goal:"起業", skills:["人脈","Pitch","スタートアップ"] },
    { name:"ヒナ", goal:"起業", skills:["マーケ","SNS","顧客開発"] },
    { name:"ソウタ", goal:"起業", skills:["営業","Pitch","経営"] },
    { name:"アカネ", goal:"起業", skills:["資金調達","Pitch","SNSマーケ"] },
    { name:"ユウト", goal:"起業", skills:["リーン","PMF","営業"] },
    { name:"ミキ", goal:"起業", skills:["SNSマーケ","顧客開発","Pitch"] },

    { name:"ユメ", goal:"データ分析", skills:["Python","SQL","可視化"] },
    { name:"レオ", goal:"データ分析", skills:["R","統計","回帰"] },
    { name:"ハナ", goal:"データ分析", skills:["Pandas","EDA","可視化"] },
    { name:"カズ", goal:"データ分析", skills:["NumPy","機械学習","前処理"] },
    { name:"エリ", goal:"データ分析", skills:["統計","回帰","可視化"] },
    { name:"タケシ", goal:"データ分析", skills:["Python","Matplotlib","EDA"] },
    { name:"アリサ", goal:"データ分析", skills:["統計","SQL","データ整形"] },
    { name:"ユウト", goal:"データ分析", skills:["DeepLearning","Python","EDA"] },
    { name:"ミカ", goal:"データ分析", skills:["R","回帰","Pandas"] },
    { name:"ショウ", goal:"データ分析", skills:["可視化","NumPy","機械学習"] },
    { name:"ナナミ", goal:"データ分析", skills:["SQL","Python","EDA"] },
    { name:"リョウタ", goal:"データ分析", skills:["統計","可視化","回帰"] },
    { name:"マイ", goal:"データ分析", skills:["Python","データ整形","可視化"] },
    { name:"タダシ", goal:"データ分析", skills:["EDA","NumPy","機械学習"] },
    { name:"ミユ", goal:"データ分析", skills:["統計","回帰","SQL"] },
    { name:"コウジ", goal:"データ分析", skills:["Python","可視化","EDA"] },
    { name:"サトシ", goal:"データ分析", skills:["R","統計","データ整形"] },
    { name:"ユカ", goal:"データ分析", skills:["回帰","機械学習","EDA"] },
    { name:"ヒロシ", goal:"データ分析", skills:["SQL","Python","可視化"] },
    { name:"アヤ", goal:"データ分析", skills:["統計","回帰","EDA"] },

    { name:"ショウ", goal:"プログラミング", skills:["JavaScript","React","Git"] },
    { name:"ナオ", goal:"プログラミング", skills:["C++","アルゴリズム","競技プログラミング"] },
    { name:"ユリ", goal:"プログラミング", skills:["Java","Spring","MySQL"] },
    { name:"ハルカ", goal:"プログラミング", skills:["Swift","iOS","Xcode"] },
    { name:"タカフミ", goal:"プログラミング", skills:["Python","Flask","API"] },
    { name:"ミユ", goal:"プログラミング", skills:["HTML","CSS","JavaScript"] },
    { name:"リョウ", goal:"プログラミング", skills:["Rust","WebAssembly","Git"] },
    { name:"トモコ", goal:"プログラミング", skills:["C#","Unity","ゲーム開発"] },
    { name:"リサ", goal:"プログラミング", skills:["PHP","Laravel","SQL"] },
    { name:"カイ", goal:"プログラミング", skills:["Go","Docker","Kubernetes"] },
    { name:"ユイ", goal:"プログラミング", skills:["JavaScript","Node.js","MongoDB"] },
    { name:"タツヤ", goal:"プログラミング", skills:["C","C++","アルゴリズム"] },
    { name:"ミホ", goal:"プログラミング", skills:["Ruby","Rails","SQL"] },
    { name:"アキラ", goal:"プログラミング", skills:["Python","AI","TensorFlow"] },
    { name:"ノゾミ", goal:"プログラミング", skills:["HTML","CSS","Bootstrap"] },
    { name:"シュン", goal:"プログラミング", skills:["Java","Android","Kotlin"] },
    { name:"ハル", goal:"プログラミング", skills:["Git","GitHub","CI/CD"] },
    { name:"ユカリ", goal:"プログラミング", skills:["React","Next.js","TypeScript"] },
    { name:"ケイタ", goal:"プログラミング", skills:["Python","Django","API"] },
    { name:"アヤナ", goal:"プログラミング", skills:["C++","競技プログラミング","アルゴリズム"] },

    { name:"サラ", goal:"デザイン", skills:["UI/UX","Figma","Photoshop"] },
    { name:"レン", goal:"デザイン", skills:["イラスト","Webデザイン","Canva"] },
    { name:"ユカ", goal:"デザイン", skills:["Photoshop","Illustrator","色彩"] },
    { name:"リサ", goal:"デザイン", skills:["ポスター","広告","バナー"] },
    { name:"ジュン", goal:"デザイン", skills:["UI/UX","Figma","AdobeXD"] },
    { name:"マイ", goal:"デザイン", skills:["ロゴ","パッケージ","色彩"] },
    { name:"アオイ", goal:"デザイン", skills:["イラスト","広告","Photoshop"] },
    { name:"カレン", goal:"デザイン", skills:["Figma","AdobeXD","UI/UX"] },
    { name:"トモミ", goal:"デザイン", skills:["Webデザイン","配色","タイポグラフィ"] },
    { name:"ミキ", goal:"デザイン", skills:["広告","ポスター","色彩"] },
    { name:"ナツキ", goal:"デザイン", skills:["ロゴ","色彩","パッケージ"] },
    { name:"ヒロミ", goal:"デザイン", skills:["UI/UX","Illustrator","Photoshop"] },
    { name:"ユウ", goal:"デザイン", skills:["イラスト","Webデザイン","配色"] },
    { name:"サキ", goal:"デザイン", skills:["UI","UX","AdobeXD"] },
    { name:"マコト", goal:"デザイン", skills:["配色","広告","ポスター"] },
    { name:"チヒロ", goal:"デザイン", skills:["ロゴ","イラスト","色彩"] },
    { name:"ヒナ", goal:"デザイン", skills:["UI/UX","AdobeXD","Photoshop"] },
    { name:"アキ", goal:"デザイン", skills:["Webデザイン","タイポグラフィ","色彩"] },
    { name:"タカシ", goal:"デザイン", skills:["UI","配色","広告"] },
    { name:"ユリ", goal:"デザイン", skills:["ロゴ","ポスター","Photoshop"] },
  ],
   recruits: [], 
};

export function seedAchievements(){
  const now = Date.now();
  state.users.forEach(u=>{
    if (u.xp != null) return;
    u.xp = Math.floor(200 + Math.random()*800);
    u.messagesSent = Math.floor(Math.random()*150);
    u.groupsJoined = Math.floor(Math.random()*8);
    u.endorsements = (u.skills||[]).reduce((m,s)=>{ m[s]=Math.floor(Math.random()*10); return m; }, {});
    u.lastActive = now - Math.floor(Math.random()*30)*24*60*60*1000;
  });
}
seedAchievements();

export const WEIGHTS = { goal:2.0, skill:1.0, achieve:1.2, recency:0.6 };
export function norm(str){ return (str || "").toLowerCase().trim(); }
export function parseSkills(text){ return (text||"").split(/[,、\s]+/).map(s=>s.trim()).filter(Boolean); }
export function jaccard(aArr,bArr){
  const a=new Set((aArr||[]).map(norm)), b=new Set((bArr||[]).map(norm));
  const inter=[...a].filter(x=>b.has(x)).length;
  const uni=new Set([...a,...b]).size || 1;
  return inter/uni;
}
export const GOAL_CANON = [
  { key: "英語学習", tokens: ["英語","英会話","toeic","toefl","ielts","留学","スピーキング","リスニング","リーディング","ライティング","英検","英語勉強","語学学習","海外","esl"] },
  { key: "起業", tokens: ["起業","スタートアップ","ビジネス","経営","pitch","資金","アントレ","ベンチャー","事業","会社立ち上げ","社長","企業","ビジネスプラン"] },
  { key: "データ分析", tokens: ["データ分析","統計","データ","分析","eda","機械学習","データサイエンス","AI","予測","データ処理","bigdata"] },
  { key: "プログラミング", tokens: ["プログラミング","開発","コーディング","アプリ","エンジニア","coding","ソフトウェア","web開発","システム","アルゴリズム","python","java","javascript","C言語","ハッカソン"] },
  { key: "デザイン", tokens: ["デザイン","ui","ux","figma","グラフィック","イラスト","プロダクトデザイン","webデザイン","ブランディング","photoshop","クリエイティブ","アート","設計"] },
];
export function canonGoal(s){
  const g = norm(s);
  if (!g) return "";
  for (const cat of GOAL_CANON){ if (cat.tokens.some(t => g.includes(norm(t)))) return cat.key; }
  return g;
}
export function achievementScore(u, population = state.users){
  const xs = population;
  const xpMax = Math.max(...xs.map(x=>x.xp||0), 1);
  const msgMax = Math.max(...xs.map(x=>x.messagesSent||0), 1);
  const grpMax = Math.max(...xs.map(x=>x.groupsJoined||0), 1);
  const endSum = s => Object.values(s||{}).reduce((a,b)=>a+b,0);
  const endMax = Math.max(...xs.map(x=>endSum(x.endorsements||{})), 1);
  const sXp  = (u.xp||0) / xpMax;
  const sMsg = (u.messagesSent||0) / msgMax;
  const sGrp = (u.groupsJoined||0) / grpMax;
  const sEnd = endSum(u.endorsements||{}) / endMax;
  return 0.45*sXp + 0.25*sMsg + 0.20*sGrp + 0.10*sEnd;
}
export function recencyScore(u){
  const days = (Date.now() - (u.lastActive||0)) / (24*60*60*1000);
  return 1 - Math.max(0, Math.min(1, days/30));
}
export function matchScore(me, other){
  if (!other || !me || me.name === other.name) return 0;
  const gMe = norm(me.goal), gOt = norm(other.goal);
  const goalScore = !gMe ? 0 : (gMe===gOt ? 1 : (gOt.includes(gMe)||gMe.includes(gOt) ? 0.5 : 0));
  const skillScore = jaccard(me.skills, other.skills);
  const ach = achievementScore(other);
  const rec = recencyScore(other);
  return (
    WEIGHTS.goal*goalScore + WEIGHTS.skill*skillScore + WEIGHTS.achieve*ach + WEIGHTS.recency*rec
  );
}
export function getTopMatches(me, users, topN=12){
  return users
    .map(u=>({user:u, score:matchScore(me,u)}))
    .filter(x=>x.score>0 && x.user.name!==me?.name)
    .sort((a,b)=>b.score-a.score)
    .slice(0, topN);
}
export function groupByGoal(users){
  const map = {};
  users.forEach(u=>{ const g = norm(u.goal); if (!g) return; (map[g] ||= []).push(u); });
  return map;
}
export function makeGroupsByGoal(me, users, maxGroups=3){
  if (!me || !me.goal) return [];
  const meKey = canonGoal(me.goal);
  const others = users.filter(u => u.name !== me.name);
  const same = others.filter(u => canonGoal(u.goal) === meKey);
  if (same.length < 2) return [];
  const ranked = [...same].sort((a,b) => jaccard(me.skills||[], b.skills||[]) - jaccard(me.skills||[], a.skills||[]));
  const groups = [];
  const chunk = 4;
  for (let i=0; i<ranked.length && groups.length<maxGroups; i += chunk){
    const members = [me, ...ranked.slice(i, i+chunk)].filter(Boolean);
    if (members.length >= 3) groups.push({ goal: meKey, members });
  }
  return groups;
}

const STORAGE_KEY = "iverse_state_v1";
export function save(){ const data = { me: state.me, users: state.users,recruits: state.recruits,  }; localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
export function load(){
  const raw = localStorage.getItem(STORAGE_KEY); if(!raw) return;
  try{
    const saved = JSON.parse(raw);

    // users は既存ロジックでマージ（重複名は saved を優先）
    const byName = new Map(state.users.map(u => [u.name, u]));
    (saved.users || []).forEach(u => byName.set(u.name, u));
    state.users = [...byName.values()];

    // me は従来通り
    state.me = saved.me || null;

    // ★ recruits を復元（なければ空配列のまま）
    state.recruits = Array.isArray(saved.recruits) ? saved.recruits : state.recruits;

  }catch(e){
    console.warn("restore failed", e);
  }
}

