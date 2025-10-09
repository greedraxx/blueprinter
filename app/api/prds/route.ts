import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Simple file-based storage for PRDs (in production, use a database like Supabase)
const PRDS_DIR = path.join(process.cwd(), "data", "prds")

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(PRDS_DIR)) {
    fs.mkdirSync(PRDS_DIR, { recursive: true })
  }
}

// GET all PRDs
export async function GET() {
  try {
    ensureDataDir()

    const files = fs.readdirSync(PRDS_DIR).filter((file) => file.endsWith(".json"))
    const prds = files.map((file) => {
      const content = fs.readFileSync(path.join(PRDS_DIR, file), "utf-8")
      return JSON.parse(content)
    })

    // Sort by createdAt descending
    prds.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ prds })
  } catch (error) {
    console.error("Error fetching PRDs:", error)
    return NextResponse.json({ error: "Failed to fetch PRDs" }, { status: 500 })
  }
}

// POST save a PRD
export async function POST(request: NextRequest) {
  try {
    ensureDataDir()

    const prd = await request.json()

    // Validate required fields
    if (!prd.id || !prd.title) {
      return NextResponse.json({ error: "ID and title are required" }, { status: 400 })
    }

    // Save PRD to file
    const filePath = path.join(PRDS_DIR, `${prd.id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(prd, null, 2))

    return NextResponse.json({ success: true, prd })
  } catch (error) {
    console.error("Error saving PRD:", error)
    return NextResponse.json({ error: "Failed to save PRD" }, { status: 500 })
  }
}
