export type Locale = "en" | "ko"

export const defaultLocale: Locale = "en"

export const locales: Locale[] = ["en", "ko"]

export const translations = {
  en: {
    // Header
    "header.features": "Features",
    "header.pricing": "Pricing",
    "header.login": "Login",
    "header.signup": "Sign Up",
    "header.language": "English",

    // Hero
    "hero.badge": "AI-Powered PRD Generation",
    "hero.title": "From Idea to Blueprint in Minutes",
    "hero.description":
      "Transform your abstract app ideas into detailed, professional-grade Product Requirements Documents. Perfect for startups, indie hackers, and product managers.",
    "hero.cta.primary": "Start for Free",
    "hero.cta.secondary": "View Pricing",
    "hero.credits": "10 free credits • No credit card required",

    // Features
    "features.ai.title": "AI-Powered Analysis",
    "features.ai.description":
      "Advanced AI analyzes your idea and generates comprehensive PRDs with tech stack recommendations and system architecture.",
    "features.multilang.title": "Multi-Language Support",
    "features.multilang.description":
      "Generate PRDs in English and Korean simultaneously. Perfect for global teams and international markets.",
    "features.export.title": "Export & Edit",
    "features.export.description":
      "Download as Markdown or PDF. Edit with our built-in WYSIWYG editor to perfect your documentation.",

    // Pricing
    "pricing.title": "Simple, Credit-Based Pricing",
    "pricing.description": "Pay only for what you use. 1 credit = 1 PRD generation.",
    "pricing.free.name": "Free",
    "pricing.free.credits": "10 credits",
    "pricing.free.description": "Perfect for trying out BLUE PRINTER",
    "pricing.starter.name": "Starter",
    "pricing.starter.credits": "10 credits",
    "pricing.starter.description": "For occasional PRD generation",
    "pricing.pro.name": "Pro",
    "pricing.pro.credits": "100 credits",
    "pricing.pro.description": "20% discount for power users",
    "pricing.enterprise.name": "Enterprise",
    "pricing.enterprise.credits": "500 credits",
    "pricing.enterprise.description": "30% discount for teams",
    "pricing.popular": "Most Popular",
    "pricing.cta": "Get Started",
    "pricing.cta.free": "Start for Free",

    // Dashboard
    "dashboard.generate": "Generate",
    "dashboard.myPrds": "My PRDs",
    "dashboard.credits": "credits",
    "dashboard.buyCredits": "Buy Credits",
    "dashboard.signOut": "Sign Out",

    // PRD Generation
    "prd.generate.title": "Generate PRD",
    "prd.generate.description": "Transform your idea into a professional Product Requirements Document in minutes.",
    "prd.form.projectInfo": "Project Information",
    "prd.form.projectInfo.description": "Tell us about your project idea",
    "prd.form.title": "Project Title",
    "prd.form.idea": "Your Idea",
    "prd.form.idea.placeholder":
      "Describe your service idea in detail. What problem does it solve? Who is it for? What makes it unique?",
    "prd.form.idea.minLength": "Minimum 250 characters",
    "prd.form.detailedSettings": "Detailed Settings",
    "prd.form.detailedSettings.description": "Help us understand your project better",
    "prd.form.platform": "Platform",
    "prd.form.platform.web": "Web",
    "prd.form.platform.ios": "Mobile App (iOS)",
    "prd.form.platform.android": "Mobile App (Android)",
    "prd.form.platform.crossPlatform": "Cross-Platform",
    "prd.form.targetAudience": "Target Audience",
    "prd.form.coreFeatures": "Core Features",
    "prd.form.coreFeatures.placeholder": "e.g., #login, #chat, #payment, #notifications",
    "prd.form.coreFeatures.hint": "Use hashtags to separate features",
    "prd.form.monetization": "Monetization Model",
    "prd.form.multilang": "Generate in multiple languages",
    "prd.form.multilang.description": "Your PRD will be generated in both English and Korean simultaneously",
    "prd.form.creditUsage": "will be used for this generation",
    "prd.form.submit": "Generate PRD",
    "prd.form.submitting": "Generating PRD...",

    // PRD List
    "prd.list.title": "My PRDs",
    "prd.list.description": "View, edit, and manage your generated Product Requirements Documents",
    "prd.list.generateNew": "Generate New PRD",
    "prd.list.empty.title": "No PRDs yet",
    "prd.list.empty.description":
      "You haven't generated any Product Requirements Documents yet. Start by creating your first PRD.",
    "prd.list.empty.cta": "Generate Your First PRD",
    "prd.list.viewEdit": "View & Edit",
    "prd.list.downloadMd": "Download MD",
    "prd.list.downloadPdf": "Download PDF",
    "prd.list.delete": "Delete",
    "prd.list.delete.confirm": "Are you sure?",
    "prd.list.delete.description":
      "This action cannot be undone. This will permanently delete your PRD and remove it from our servers.",
    "prd.list.delete.cancel": "Cancel",

    // Auth
    "auth.login.title": "Welcome back",
    "auth.login.description": "Sign in to your BLUE PRINTER account",
    "auth.signup.title": "Create your account",
    "auth.signup.description": "Start generating professional PRDs in minutes",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.signIn": "Sign in",
    "auth.continueWith": "Continue with",
    "auth.orContinueWith": "Or continue with email",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot password?",
    "auth.agreeToTerms": "I agree to the",
    "auth.termsOfService": "Terms of Service",
    "auth.and": "and",
    "auth.privacyPolicy": "Privacy Policy",
    "auth.freeCredits": "You'll receive 10 free credits upon signup",
  },
  ko: {
    // Header
    "header.features": "기능",
    "header.pricing": "가격",
    "header.login": "로그인",
    "header.signup": "회원가입",
    "header.language": "한국어",

    // Hero
    "hero.badge": "AI 기반 PRD 생성",
    "hero.title": "아이디어에서 청사진까지 몇 분 만에",
    "hero.description":
      "추상적인 앱 아이디어를 상세하고 전문적인 제품 요구사항 문서로 변환하세요. 스타트업, 인디 해커, 제품 관리자에게 완벽합니다.",
    "hero.cta.primary": "무료로 시작하기",
    "hero.cta.secondary": "가격 보기",
    "hero.credits": "10개의 무료 크레딧 • 신용카드 불필요",

    // Features
    "features.ai.title": "AI 기반 분석",
    "features.ai.description":
      "고급 AI가 아이디어를 분석하고 기술 스택 권장사항 및 시스템 아키텍처가 포함된 포괄적인 PRD를 생성합니다.",
    "features.multilang.title": "다국어 지원",
    "features.multilang.description": "영어와 한국어로 동시에 PRD를 생성합니다. 글로벌 팀과 국제 시장에 완벽합니다.",
    "features.export.title": "내보내기 및 편집",
    "features.export.description": "마크다운 또는 PDF로 다운로드하세요. 내장된 WYSIWYG 편집기로 문서를 완성하세요.",

    // Pricing
    "pricing.title": "간단한 크레딧 기반 가격",
    "pricing.description": "사용한 만큼만 지불하세요. 1 크레딧 = 1 PRD 생성.",
    "pricing.free.name": "무료",
    "pricing.free.credits": "10 크레딧",
    "pricing.free.description": "BLUE PRINTER를 체험하기에 완벽합니다",
    "pricing.starter.name": "스타터",
    "pricing.starter.credits": "10 크레딧",
    "pricing.starter.description": "가끔 PRD 생성을 위한",
    "pricing.pro.name": "프로",
    "pricing.pro.credits": "100 크레딧",
    "pricing.pro.description": "파워 유저를 위한 20% 할인",
    "pricing.enterprise.name": "엔터프라이즈",
    "pricing.enterprise.credits": "500 크레딧",
    "pricing.enterprise.description": "팀을 위한 30% 할인",
    "pricing.popular": "가장 인기있는",
    "pricing.cta": "시작하기",
    "pricing.cta.free": "무료로 시작하기",

    // Dashboard
    "dashboard.generate": "생성",
    "dashboard.myPrds": "내 PRD",
    "dashboard.credits": "크레딧",
    "dashboard.buyCredits": "크레딧 구매",
    "dashboard.signOut": "로그아웃",

    // PRD Generation
    "prd.generate.title": "PRD 생성",
    "prd.generate.description": "몇 분 만에 아이디어를 전문적인 제품 요구사항 문서로 변환하세요.",
    "prd.form.projectInfo": "프로젝트 정보",
    "prd.form.projectInfo.description": "프로젝트 아이디어에 대해 알려주세요",
    "prd.form.title": "프로젝트 제목",
    "prd.form.idea": "아이디어",
    "prd.form.idea.placeholder":
      "서비스 아이디어를 자세히 설명하세요. 어떤 문제를 해결하나요? 누구를 위한 것인가요? 무엇이 독특한가요?",
    "prd.form.idea.minLength": "최소 250자",
    "prd.form.detailedSettings": "상세 설정",
    "prd.form.detailedSettings.description": "프로젝트를 더 잘 이해할 수 있도록 도와주세요",
    "prd.form.platform": "플랫폼",
    "prd.form.platform.web": "웹",
    "prd.form.platform.ios": "모바일 앱 (iOS)",
    "prd.form.platform.android": "모바일 앱 (Android)",
    "prd.form.platform.crossPlatform": "크로스 플랫폼",
    "prd.form.targetAudience": "타겟 고객",
    "prd.form.coreFeatures": "핵심 기능",
    "prd.form.coreFeatures.placeholder": "예: #로그인, #채팅, #결제, #알림",
    "prd.form.coreFeatures.hint": "해시태그를 사용하여 기능을 구분하세요",
    "prd.form.monetization": "수익화 모델",
    "prd.form.multilang": "다국어로 생성",
    "prd.form.multilang.description": "PRD가 영어와 한국어로 동시에 생성됩니다",
    "prd.form.creditUsage": "이 생성에 사용됩니다",
    "prd.form.submit": "PRD 생성",
    "prd.form.submitting": "PRD 생성 중...",

    // PRD List
    "prd.list.title": "내 PRD",
    "prd.list.description": "생성된 제품 요구사항 문서를 보고, 편집하고, 관리하세요",
    "prd.list.generateNew": "새 PRD 생성",
    "prd.list.empty.title": "아직 PRD가 없습니다",
    "prd.list.empty.description": "아직 제품 요구사항 문서를 생성하지 않았습니다. 첫 번째 PRD를 만들어 시작하세요.",
    "prd.list.empty.cta": "첫 번째 PRD 생성",
    "prd.list.viewEdit": "보기 및 편집",
    "prd.list.downloadMd": "MD 다운로드",
    "prd.list.downloadPdf": "PDF 다운로드",
    "prd.list.delete": "삭제",
    "prd.list.delete.confirm": "확실합니까?",
    "prd.list.delete.description": "이 작업은 취소할 수 없습니다. PRD가 영구적으로 삭제되고 서버에서 제거됩니다.",
    "prd.list.delete.cancel": "취소",

    // Auth
    "auth.login.title": "다시 오신 것을 환영합니다",
    "auth.login.description": "BLUE PRINTER 계정에 로그인하세요",
    "auth.signup.title": "계정 만들기",
    "auth.signup.description": "몇 분 만에 전문적인 PRD 생성 시작",
    "auth.noAccount": "계정이 없으신가요?",
    "auth.hasAccount": "이미 계정이 있으신가요?",
    "auth.signIn": "로그인",
    "auth.continueWith": "계속하기",
    "auth.orContinueWith": "또는 이메일로 계속하기",
    "auth.email": "이메일",
    "auth.password": "비밀번호",
    "auth.confirmPassword": "비밀번호 확인",
    "auth.forgotPassword": "비밀번호를 잊으셨나요?",
    "auth.agreeToTerms": "동의합니다",
    "auth.termsOfService": "서비스 약관",
    "auth.and": "및",
    "auth.privacyPolicy": "개인정보 보호정책",
    "auth.freeCredits": "가입 시 10개의 무료 크레딧을 받습니다",
  },
}

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key as keyof (typeof translations)[typeof locale]] || key
}
