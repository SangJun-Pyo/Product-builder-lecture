// Internationalization (i18n) Module
const i18n = {
  currentLocale: 'en',

  messages: {
    en: {
      // Navigation
      nav_analyze: "Analyze",
      nav_about: "About",
      nav_archetypes: "Archetypes",
      nav_faq: "FAQ",
      nav_contact: "Contact",

      // Hero
      hero_title: "Discover Your Roblox Playstyle",
      hero_subtitle: "Find out what type of Roblox player you are with our free analysis tool. Like MBTI for gamers!",
      hero_cta: "Start Free Analysis",

      // Quick Analysis
      title: "Roblox Archetype",
      subtitle: "Discover Your Playstyle",
      quick_title: "Quick Analysis",
      no_login: "No Login Required",
      quick_desc: "Enter your Roblox username to get a quick playstyle estimate based on public data.",
      username_placeholder: "Roblox Username",
      analyze: "Analyze",
      loading: "Analyzing your playstyle...",
      quick_guess: "Quick Guess",
      primary_type: "Primary Type",
      confidence: "Confidence",
      all_scores: "All Archetype Scores",
      want_accurate: "Want more accurate results?",
      login_roblox: "Login with Roblox",

      // Full Analysis CTA
      full_analysis: "Full Analysis",
      full_desc: "Login with Roblox OAuth and complete a survey for personalized, high-confidence results.",
      feature_1: "8-question personality survey",
      feature_2: "Primary & Secondary archetype",
      feature_3: "Detailed score breakdown",
      feature_4: "Shareable result card",
      get_started: "Get Started",

      // About Section
      about_title: "About Roblox Archetype",
      about_what_title: "What is Roblox Archetype?",
      about_what_desc: "Roblox Archetype is a free tool that analyzes your Roblox gaming behavior and categorizes your playstyle into one of 8 distinct archetypes. Think of it as MBTI for Roblox players! Our algorithm examines your public profile data, badges, and group memberships to understand how you enjoy playing Roblox.",
      about_how_title: "How Does It Work?",
      about_how_desc: "Simply enter your Roblox username, and our system will analyze publicly available data from your profile. We look at patterns in your badges, the types of groups you've joined, and other public signals to determine your dominant playstyle. The analysis takes just a few seconds and requires no login.",
      about_privacy_title: "Your Privacy Matters",
      about_privacy_desc: "We only access publicly available information from Roblox. We never store your personal data, passwords, or any private information. Our analysis is based solely on public profile data that anyone can see on Roblox.",

      // Archetypes Section
      archetypes_title: "The 8 Player Archetypes",
      archetypes_intro: "Every Roblox player has a unique way of enjoying the platform. Discover which archetype best describes your playstyle.",

      // Archetypes
      explorer: "Explorer",
      explorer_desc: "Enjoys discovering new games and genres.",
      explorer_full: "Explorers love discovering new games and genres. They're always looking for the next adventure and enjoy variety in their gaming experience. If you find yourself constantly trying new games, you might be an Explorer!",
      grinder: "Grinder",
      grinder_desc: "Focuses on long-term progression and repetition.",
      grinder_full: "Grinders thrive on progression and achievement. They enjoy simulator games, tycoons, and any game where dedication leads to visible progress. Hours of gameplay? No problem for a Grinder!",
      socializer: "Socializer",
      socializer_desc: "Plays mainly for social interaction.",
      socializer_full: "Socializers play Roblox primarily for the community. They love hangout games, making friends, and being part of groups. For them, the social experience is the main attraction.",
      competitor: "Competitor",
      competitor_desc: "Enjoys PvP, ranking, and skill improvement.",
      competitor_full: "Competitors live for the thrill of victory. PvP games, rankings, and skill-based challenges are their domain. They constantly strive to improve and prove themselves against others.",
      builder: "Builder",
      builder_desc: "Interested in creating, building, and customization.",
      builder_full: "Builders are the creative souls of Roblox. They enjoy construction games, customization, and expressing themselves through creation. Roblox Studio might be their favorite tool!",
      trader: "Trader",
      trader_desc: "Focused on item value and trading.",
      trader_full: "Traders have a keen eye for value. They enjoy the economic aspects of Roblox, from limited items to in-game trading. Making smart deals is their specialty.",
      roleplayer: "Roleplayer",
      roleplayer_desc: "Immerses in story, character, and roleplay.",
      roleplayer_full: "Roleplayers immerse themselves in stories and characters. They love roleplay games, creating narratives, and living out virtual lives. Imagination is their greatest asset.",
      casual: "Casual",
      casual_desc: "Light, short play sessions without deep focus.",
      casual_full: "Casuals enjoy Roblox without pressure. They play for fun, relaxation, and don't worry about rankings or achievements. Quick sessions and simple enjoyment define their style.",

      // FAQ Section
      faq_title: "Frequently Asked Questions",
      faq_q1: "Is this service free?",
      faq_a1: "Yes! Roblox Archetype is completely free to use. Simply enter your username and get your results instantly.",
      faq_q2: "Is my account safe?",
      faq_a2: "Absolutely. We only read publicly available information from your Roblox profile. We never ask for or store passwords, and we cannot access any private data.",
      faq_q3: "How accurate is the analysis?",
      faq_a3: "Our quick analysis provides an estimate based on public data. For more accurate results, we recommend the full analysis which includes a personality survey. The quick analysis typically has 25-60% confidence.",
      faq_q4: "Can I have multiple archetypes?",
      faq_a4: "Yes! Most players have traits from multiple archetypes. We show your primary archetype along with scores for all 8 types, so you can see your complete gaming personality profile.",
      faq_q5: "Why can't you find my account?",
      faq_a5: "Make sure you're entering your exact Roblox username (not display name). If your profile is set to private, some features may be limited.",
      faq_q6: "Is this affiliated with Roblox?",
      faq_a6: "No, Roblox Archetype is an independent fan project and is not affiliated with, endorsed by, or sponsored by Roblox Corporation.",

      // Contact Form
      partnership: "Contact & Partnership",
      contact_desc: "Have questions, feedback, or partnership inquiries? We'd love to hear from you!",
      form_name: "Name / Company",
      form_name_placeholder: "John Doe / ABC Inc.",
      form_email: "Email",
      form_subject: "Subject",
      subject_general: "General Inquiry",
      subject_feedback: "Feedback",
      subject_bug: "Bug Report",
      subject_partnership: "Partnership",
      form_message: "Message",
      form_message_placeholder: "Tell us about your inquiry...",
      form_submit: "Send Message",

      // Footer
      footer_desc: "Free playstyle analysis tool for Roblox players. Discover your gaming personality today!",
      footer_links: "Quick Links",
      footer_legal: "Legal",
      privacy_policy: "Privacy Policy",
      terms_of_service: "Terms of Service",
      footer_note: "This is a fan project, not affiliated with Roblox Corporation.",

      // Errors
      error_not_found: "User not found. Please check the username.",
      error_api: "Failed to fetch data. Please try again."
    },
    ko: {
      // Navigation
      nav_analyze: "분석",
      nav_about: "소개",
      nav_archetypes: "유형",
      nav_faq: "FAQ",
      nav_contact: "문의",

      // Hero
      hero_title: "나의 Roblox 플레이스타일 찾기",
      hero_subtitle: "무료 분석 도구로 어떤 유형의 Roblox 플레이어인지 알아보세요. 게이머를 위한 MBTI!",
      hero_cta: "무료 분석 시작",

      // Quick Analysis
      title: "Roblox Archetype",
      subtitle: "나의 플레이스타일 찾기",
      quick_title: "빠른 분석",
      no_login: "로그인 불필요",
      quick_desc: "Roblox 사용자명을 입력하면 공개 데이터 기반으로 빠르게 플레이스타일을 분석합니다.",
      username_placeholder: "Roblox 사용자명",
      analyze: "분석하기",
      loading: "플레이스타일 분석 중...",
      quick_guess: "빠른 추측",
      primary_type: "대표 유형",
      confidence: "신뢰도",
      all_scores: "전체 유형 점수",
      want_accurate: "더 정확한 결과를 원하시나요?",
      login_roblox: "Roblox로 로그인",

      // Full Analysis CTA
      full_analysis: "상세 분석",
      full_desc: "Roblox OAuth 로그인 후 설문을 완료하면 개인화된 고신뢰도 결과를 받을 수 있습니다.",
      feature_1: "8문항 성향 설문",
      feature_2: "주요 & 보조 유형 분석",
      feature_3: "상세 점수 분석",
      feature_4: "공유 가능한 결과 카드",
      get_started: "시작하기",

      // About Section
      about_title: "Roblox Archetype 소개",
      about_what_title: "Roblox Archetype이란?",
      about_what_desc: "Roblox Archetype은 여러분의 Roblox 게임 행동을 분석하여 8가지 플레이스타일 유형 중 하나로 분류하는 무료 도구입니다. Roblox 플레이어를 위한 MBTI라고 생각하세요! 우리의 알고리즘은 공개 프로필 데이터, 뱃지, 그룹 멤버십을 분석하여 여러분이 Roblox를 어떻게 즐기는지 파악합니다.",
      about_how_title: "어떻게 작동하나요?",
      about_how_desc: "Roblox 사용자명을 입력하면 시스템이 프로필의 공개 데이터를 분석합니다. 뱃지 패턴, 가입한 그룹 유형 및 기타 공개 신호를 확인하여 지배적인 플레이스타일을 결정합니다. 분석은 몇 초 만에 완료되며 로그인이 필요 없습니다.",
      about_privacy_title: "개인정보 보호",
      about_privacy_desc: "우리는 Roblox에서 공개적으로 사용 가능한 정보만 접근합니다. 개인 데이터, 비밀번호 또는 비공개 정보를 저장하지 않습니다. 분석은 Roblox에서 누구나 볼 수 있는 공개 프로필 데이터만을 기반으로 합니다.",

      // Archetypes Section
      archetypes_title: "8가지 플레이어 유형",
      archetypes_intro: "모든 Roblox 플레이어는 플랫폼을 즐기는 고유한 방식이 있습니다. 어떤 유형이 여러분의 플레이스타일을 가장 잘 설명하는지 알아보세요.",

      // Archetypes
      explorer: "탐험형",
      explorer_desc: "새로운 게임과 장르를 찾아다니는 성향.",
      explorer_full: "탐험형은 새로운 게임과 장르를 발견하는 것을 좋아합니다. 항상 다음 모험을 찾고 다양한 게임 경험을 즐깁니다. 끊임없이 새로운 게임을 시도한다면 탐험형일 수 있어요!",
      grinder: "파밍형",
      grinder_desc: "반복 루프와 장기 성장을 즐기는 성향.",
      grinder_full: "파밍형은 성장과 성취에서 보람을 느낍니다. 시뮬레이터, 타이쿤 등 노력이 눈에 보이는 진전으로 이어지는 게임을 좋아합니다. 긴 플레이 시간? 파밍형에게는 문제없죠!",
      socializer: "사교형",
      socializer_desc: "사람들과 어울리는 것이 중심인 성향.",
      socializer_full: "사교형은 주로 커뮤니티를 위해 Roblox를 플레이합니다. 행아웃 게임, 친구 사귀기, 그룹 활동을 좋아합니다. 이들에게 소셜 경험이 가장 큰 매력입니다.",
      competitor: "경쟁형",
      competitor_desc: "승부/랭킹/실력 향상을 즐기는 성향.",
      competitor_full: "경쟁형은 승리의 스릴을 위해 살아갑니다. PvP 게임, 랭킹, 실력 기반 도전이 그들의 영역입니다. 끊임없이 발전하고 다른 사람들에게 자신을 증명하려 합니다.",
      builder: "창작형",
      builder_desc: "만들기/건축/커스터마이징에 관심이 큰 성향.",
      builder_full: "창작형은 Roblox의 창의적인 영혼입니다. 건설 게임, 커스터마이징, 창작을 통한 자기 표현을 즐깁니다. Roblox Studio가 가장 좋아하는 도구일 수 있어요!",
      trader: "경제형",
      trader_desc: "아이템 가치/거래에 관심이 큰 성향.",
      trader_full: "경제형은 가치를 보는 날카로운 눈을 가지고 있습니다. 리미티드 아이템부터 인게임 거래까지 Roblox의 경제적 측면을 즐깁니다. 현명한 거래가 그들의 특기입니다.",
      roleplayer: "몰입형",
      roleplayer_desc: "스토리/캐릭터/역할놀이에 몰입하는 성향.",
      roleplayer_full: "몰입형은 스토리와 캐릭터에 푹 빠집니다. 롤플레이 게임, 내러티브 만들기, 가상의 삶을 사는 것을 좋아합니다. 상상력이 가장 큰 자산입니다.",
      casual: "라이트형",
      casual_desc: "부담 없이 가볍게 즐기는 성향.",
      casual_full: "라이트형은 부담 없이 Roblox를 즐깁니다. 재미와 휴식을 위해 플레이하며 랭킹이나 성취에 연연하지 않습니다. 짧은 세션과 단순한 즐거움이 그들의 스타일입니다.",

      // FAQ Section
      faq_title: "자주 묻는 질문",
      faq_q1: "이 서비스는 무료인가요?",
      faq_a1: "네! Roblox Archetype은 완전 무료입니다. 사용자명을 입력하면 즉시 결과를 받을 수 있습니다.",
      faq_q2: "내 계정은 안전한가요?",
      faq_a2: "물론입니다. Roblox 프로필의 공개 정보만 읽습니다. 비밀번호를 요청하거나 저장하지 않으며, 비공개 데이터에 접근할 수 없습니다.",
      faq_q3: "분석은 얼마나 정확한가요?",
      faq_a3: "빠른 분석은 공개 데이터를 기반으로 추정치를 제공합니다. 더 정확한 결과를 원하시면 성격 설문이 포함된 상세 분석을 권장합니다. 빠른 분석의 신뢰도는 보통 25-60%입니다.",
      faq_q4: "여러 유형을 가질 수 있나요?",
      faq_a4: "네! 대부분의 플레이어는 여러 유형의 특성을 가지고 있습니다. 주요 유형과 함께 8가지 유형 모두의 점수를 보여드려 완전한 게임 성격 프로필을 확인할 수 있습니다.",
      faq_q5: "왜 내 계정을 찾을 수 없나요?",
      faq_a5: "정확한 Roblox 사용자명(표시 이름이 아님)을 입력했는지 확인하세요. 프로필이 비공개로 설정되어 있으면 일부 기능이 제한될 수 있습니다.",
      faq_q6: "Roblox와 제휴되어 있나요?",
      faq_a6: "아니요, Roblox Archetype은 독립적인 팬 프로젝트이며 Roblox Corporation과 제휴, 보증 또는 후원 관계가 없습니다.",

      // Contact Form
      partnership: "문의 & 제휴",
      contact_desc: "질문, 피드백 또는 제휴 문의가 있으신가요? 연락 주세요!",
      form_name: "이름 / 회사명",
      form_name_placeholder: "홍길동 / ABC 주식회사",
      form_email: "이메일",
      form_subject: "문의 유형",
      subject_general: "일반 문의",
      subject_feedback: "피드백",
      subject_bug: "버그 신고",
      subject_partnership: "제휴",
      form_message: "문의 내용",
      form_message_placeholder: "문의 내용을 작성해주세요...",
      form_submit: "메시지 보내기",

      // Footer
      footer_desc: "Roblox 플레이어를 위한 무료 플레이스타일 분석 도구. 오늘 당신의 게임 성격을 발견하세요!",
      footer_links: "빠른 링크",
      footer_legal: "법적 고지",
      privacy_policy: "개인정보처리방침",
      terms_of_service: "이용약관",
      footer_note: "이 서비스는 팬 프로젝트이며, Roblox Corporation과 무관합니다.",

      // Errors
      error_not_found: "사용자를 찾을 수 없습니다. 사용자명을 확인해주세요.",
      error_api: "데이터를 가져오지 못했습니다. 다시 시도해주세요."
    }
  },

  init() {
    const saved = localStorage.getItem('locale');
    if (saved && this.messages[saved]) {
      this.currentLocale = saved;
    }
    this.updateUI();
    this.setupListeners();
  },

  setLocale(locale) {
    if (this.messages[locale]) {
      this.currentLocale = locale;
      localStorage.setItem('locale', locale);
      this.updateUI();
    }
  },

  t(key) {
    return this.messages[this.currentLocale][key] || this.messages['en'][key] || key;
  },

  updateUI() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `lang-${this.currentLocale}`);
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLocale;
  },

  setupListeners() {
    document.getElementById('lang-en')?.addEventListener('click', () => this.setLocale('en'));
    document.getElementById('lang-ko')?.addEventListener('click', () => this.setLocale('ko'));
  }
};

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
