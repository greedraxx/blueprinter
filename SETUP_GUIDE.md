# Blueprinter Setup Guide

## Gemini API 설정

이 프로젝트는 Google Gemini 2.5 Flash 모델을 사용하여 PRD를 생성합니다.

### 1. Gemini API 키 발급

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속합니다
2. Google 계정으로 로그인합니다
3. "Get API Key" 또는 "Create API Key" 버튼을 클릭합니다
4. API 키를 복사합니다

### 2. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```bash
GEMINI_API_KEY=여기에_발급받은_API_키를_붙여넣기
```

예시:
```bash
GEMINI_API_KEY=AIzaSyBKxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 http://localhost:3000 에서 애플리케이션에 접속할 수 있습니다.

### 4. PRD 생성 테스트

1. 대시보드로 이동 (http://localhost:3000/dashboard)
2. "Generate PRD" 폼을 작성합니다:
   - **Project Title**: 프로젝트 이름 (예: AI-Powered Task Manager)
   - **Your Idea**: 250자 이상의 상세한 설명
   - **Platform**: 플랫폼 선택 (Web, Mobile 등)
   - **Target Audience**: 타겟 사용자 (선택)
   - **Core Features**: 핵심 기능 (선택)
   - **Monetization Model**: 수익화 모델 (선택)
3. "Generate PRD" 버튼 클릭
4. 생성 완료 후 자동으로 PRD 상세 페이지로 이동합니다

### 5. 생성된 PRD 확인

- **MY PRDs** 페이지에서 모든 PRD 목록 확인
- 각 PRD는 영어와 한국어 버전이 함께 생성됩니다
- 편집, 다운로드(Markdown), 삭제 기능 제공

## 데이터 저장

PRD는 로컬 파일 시스템의 `data/prds/` 디렉토리에 JSON 형식으로 저장됩니다.
프로덕션 환경에서는 Supabase 등의 데이터베이스를 사용하는 것을 권장합니다.

## 문제 해결

### "Gemini API key not configured" 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- API 키가 올바르게 입력되었는지 확인
- 개발 서버를 재시작 (`Ctrl+C` 후 `npm run dev`)

### PRD 생성 시간이 오래 걸리는 경우
- Gemini API는 영어와 한국어 버전을 각각 생성하므로 20-40초 정도 소요될 수 있습니다
- 네트워크 상태를 확인하세요

### API 할당량 초과
- Gemini API는 무료 tier에서 하루 제한이 있습니다
- [API 할당량 페이지](https://aistudio.google.com/app/apikey)에서 사용량 확인 가능
