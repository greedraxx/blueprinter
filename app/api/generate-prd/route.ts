import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { deductCredits, savePrdGeneration } from "@/lib/credits"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { title, idea, platform, targetAudience, coreFeatures, monetization } = body

    // Validate required fields
    if (!title || !idea) {
      return NextResponse.json({ error: "Title and idea are required" }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Create detailed prompt for PRD generation
    const prompt = `You are an expert product manager. Generate a comprehensive Product Requirements Document (PRD) based on the following information:

Project Title: ${title}
Project Idea: ${idea}
Platform: ${platform || "Not specified"}
Target Audience: ${targetAudience || "Not specified"}
Core Features: ${coreFeatures || "Not specified"}
Monetization Model: ${monetization || "Not specified"}

Please generate a detailed PRD in Markdown format with the following sections:
1. Executive Summary
2. Product Overview
3. Target Users & Personas
4. User Stories
5. Key Features (detailed breakdown)
6. User Flow & Journey
7. Functional Requirements
8. Non-Functional Requirements (Performance, Security, Scalability)
9. Recommended Tech Stack (specific versions and justifications)
10. System Architecture (include architecture diagram description and component interactions)
11. Project Folder Structure (provide detailed folder/file tree structure using markdown code blocks)
12. Database Schema (if applicable, with tables and relationships)
13. API Endpoints (if applicable, with request/response examples)
14. UI/UX Considerations
15. Success Metrics & KPIs
16. Monetization Strategy
17. Development Phases & Timeline
18. Risk Assessment
19. Future Enhancements

**IMPORTANT for Section 11 (Project Folder Structure):**
- Provide a detailed, realistic folder/file structure
- Use markdown code block with tree-like structure
- Include all major folders, subfolders, and key files
- Add brief comments for important files
- Example format:
\`\`\`
project-root/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   ├── services/
│   └── utils/
├── public/
├── package.json
└── README.md
\`\`\`

Make the PRD comprehensive, professional, and actionable. Use Markdown formatting with headers, lists, code blocks where appropriate.`

    const promptKo = `당신은 전문 프로덕트 매니저입니다. 다음 정보를 바탕으로 포괄적인 제품 요구사항 문서(PRD)를 생성하세요:

프로젝트 제목: ${title}
프로젝트 아이디어: ${idea}
플랫폼: ${platform || "지정되지 않음"}
타겟 사용자: ${targetAudience || "지정되지 않음"}
핵심 기능: ${coreFeatures || "지정되지 않음"}
수익화 모델: ${monetization || "지정되지 않음"}

다음 섹션을 포함한 상세한 PRD를 마크다운 형식으로 생성하세요:
1. 요약
2. 제품 개요
3. 타겟 사용자 & 페르소나
4. 사용자 스토리
5. 주요 기능 (상세 분석)
6. 사용자 플로우 & 여정
7. 기능적 요구사항
8. 비기능적 요구사항 (성능, 보안, 확장성)
9. 권장 기술 스택 (구체적인 버전과 선택 이유)
10. 시스템 아키텍처 (아키텍처 다이어그램 설명 및 컴포넌트 상호작용)
11. 프로젝트 폴더 구조 (상세한 폴더/파일 트리 구조를 마크다운 코드 블록으로)
12. 데이터베이스 스키마 (해당되는 경우, 테이블 및 관계)
13. API 엔드포인트 (해당되는 경우, 요청/응답 예시 포함)
14. UI/UX 고려사항
15. 성공 지표 & KPI
16. 수익화 전략
17. 개발 단계 & 타임라인
18. 리스크 평가
19. 향후 개선사항

**섹션 11 (프로젝트 폴더 구조) 중요:**
- 상세하고 현실적인 폴더/파일 구조 제공
- 마크다운 코드 블록으로 트리 구조 표현
- 주요 폴더, 하위 폴더, 핵심 파일 모두 포함
- 중요 파일에 대한 간단한 설명 추가
- 예시 형식:
\`\`\`
project-root/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   ├── services/
│   └── utils/
├── public/
├── package.json
└── README.md
\`\`\`

PRD를 포괄적이고, 전문적이며, 실행 가능하게 작성하세요. 헤더, 리스트, 코드 블록 등 마크다운 형식을 적절히 사용하세요.`

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Generate English PRD
    console.log("Generating English PRD...")
    const resultEn = await model.generateContent(prompt)
    const contentEn = resultEn.response.text()

    // Generate Korean PRD
    console.log("Generating Korean PRD...")
    const resultKo = await model.generateContent(promptKo)
    const contentKo = resultKo.response.text()

    // Deduct 1 credit for PRD generation
    try {
      await deductCredits(user.id, 1, "PRD Generation")
    } catch (creditError) {
      console.error("Credit deduction failed:", creditError)
      return NextResponse.json(
        { error: "Insufficient credits. Please purchase more credits to continue." },
        { status: 402 }
      )
    }

    // Create PRD object
    const prd = {
      id: Date.now().toString(),
      title,
      idea,
      platform: platform || "Not specified",
      targetAudience: targetAudience || "Not specified",
      coreFeatures: coreFeatures || "Not specified",
      monetization: monetization || "Not specified",
      contentEn,
      contentKo,
      createdAt: new Date().toISOString(),
      userId: user.id, // Associate PRD with user
    }

    // Save generation log to Supabase (credits_used = 1)
    try {
      await savePrdGeneration(
        user.id,
        title,
        idea || null,
        {
          contentEn,
          contentKo,
          platform: platform || null,
          targetAudience: targetAudience || null,
          coreFeatures: coreFeatures || null,
          monetization: monetization || null,
        },
        1
      )
    } catch (logError) {
      console.error("Failed to log PRD generation:", logError)
      // continue without blocking user; credits already deducted
    }

    return NextResponse.json({ success: true, prd })
  } catch (error) {
    console.error("Error generating PRD:", error)
    return NextResponse.json(
      { error: "Failed to generate PRD", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
