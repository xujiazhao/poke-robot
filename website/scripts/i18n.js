/* ========================================
   Poke Robotics — i18n (EN / ZH)
   ======================================== */

const translations = {
  en: {
    'nav.join': 'Join Us',
    'nav.contact': 'Contact',
    'hero.title': '<span class="hero-highlight">Family,</span> not a machine.',
    'hero.subtitle': "We're building the home robot you've always dreamed of <br>— one that understands you, helps you, and belongs in your home.",
    'hero.cta1': 'Discover Poke',
    'vision.label': 'What We Believe',
    'vision.title': 'Robots will enter every home.',
    'vision.subtitle': 'Form, capability, and personality will together define the future of home robotics.',
    'vision.v1.title': 'Form is intention',
    'vision.v1.desc': "We chose a humanoid form — not to impress, but because a home deserves a companion, not an appliance. If it looks like a being, it carries emotional meaning.",
    'vision.v2.title': 'Capability is respect',
    'vision.v2.desc': "What a robot ultimately faces is the real-world housework and tasks. True physical capability matters more than any carefully choreographed demo.",
    'vision.v3.title': 'Personality is connection',
    'vision.v3.desc': "Giving a robot personality isn't a gimmick — it's an indispensable ability that helps humans and robots coexist naturally.",
    'manifesto.quote': '"We don\'t build performing machines. <br>We build home robots that <em>belong to you</em>."',
    'join.label': 'Join Us',
    'join.title': 'Build the future<br>with Poke.',
    'join.subtitle': "We're a small team of engineers and dreamers. We believe robots are more than devices — they can be given a soul.",
    'join.r1.title': 'Industrial Designer',
    'join.r2.title': 'Product Manager',
    'join.r3.title': 'AI / Robotics Engineer',
    'join.hiring': 'Actively Hiring',
    'join.open': 'Actively Hiring',
    'footer.rights': 'All rights reserved.',
    'modal.videoWaiting': 'Video coming soon, stay tuned.',
    'contact.modalTitle': 'Contact Us',
    'contact.subject': 'Subject',
    'contact.subjectPh': 'What is this about?',
    'contact.phone': 'Phone',
    'contact.phonePh': 'Your phone number',
    'contact.body': 'Message',
    'contact.bodyPh': 'Tell us more...',
    'contact.send': 'Send',
  },
  zh: {
    'nav.join': '加入我们',
    'nav.contact': '联系破壳',
    'hero.title': '<span class="hero-highlight">是家人<span class="hero-comma">，</span></span><br class="mobile-br">而非机器',
    'hero.subtitle': '我们正在打造你理想中的家庭机器人 <br>他理解你、帮助你，属于你的家。',
    'hero.cta1': '了解破壳',
    'vision.label': '我们相信',
    'vision.title': '机器人终将走入千家万户',
    'vision.subtitle': '人形、能力与人格，将共同定义家庭机器人的未来。',
    'vision.v1.title': '形态即态度',
    'vision.v1.desc': '选择类人形，不是为了单纯更“像人”，是因为回到家后，我们更需要的是一位“伙伴”，而不是一台冰冷冷的机器。',
    'vision.v2.title': '能力即尊重',
    'vision.v2.desc': '机器人最终要面对的，是现实世界里的家务和工作。真实的行为能力，比任何精心设计的演示都更重要。',
    'vision.v3.title': '人格即链接',
    'vision.v3.desc': '机器人“人格化”不是一种噱头，它是帮助人与机器人自然相处的一种不可或缺的独特能力。',
    'manifesto.quote': '「我们不制造表演机器，<br>我们创造<em>属于你的</em>家庭机器人。」',
    'join.label': '加入我们',
    'join.title': '和破壳一起，<br>创造未来。',
    'join.subtitle': '我们是一支小而精的工程师与梦想家团队。我们相信机器人不只是设备，而是可以被赋予机魂的存在。',
    'join.r1.title': '工业设计师',
    'join.r2.title': '产品经理',
    'join.r3.title': 'AI / 机器人工程师',
    'join.hiring': '热招中',
    'join.open': '热招中',
    'footer.rights': '保留所有权利。',
    'modal.videoWaiting': '视频即将上线，敬请期待。',
    'contact.modalTitle': '联系我们',
    'contact.subject': '标题',
    'contact.subjectPh': '请输入主题',
    'contact.phone': '手机号',
    'contact.phonePh': '你的手机号码',
    'contact.body': '正文',
    'contact.bodyPh': '请输入内容……',
    'contact.send': '发送',
  }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const dict = translations[lang];

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });

  // HTML content (for elements with <br>, <span>, <em>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] != null) el.placeholder = dict[key];
  });

  // Update <html> lang & font class
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-zh', lang === 'zh');

  // Update dropdown current text
  const langName = lang === 'zh' ? '中文' : 'EN';
  document.querySelectorAll('.lang-current').forEach(el => {
    el.textContent = langName;
  });

  // Update active state on options
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Update page title
  document.title = lang === 'zh'
    ? 'Poke Robotics — 属于家的机器人'
    : 'Poke Robotics — The Robot That Belongs at Home';
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}

// Initialize with default language
setLang(currentLang);
