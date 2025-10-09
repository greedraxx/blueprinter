import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PRDS_DIR = path.join(process.cwd(), "data", "prds")

// GET a specific PRD
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const filePath = path.join(PRDS_DIR, `${id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "PRD not found" }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, "utf-8")
    const prd = JSON.parse(content)

    return NextResponse.json({ prd })
  } catch (error) {
    console.error("Error fetching PRD:", error)
    return NextResponse.json({ error: "Failed to fetch PRD" }, { status: 500 })
  }
}

// PUT update a PRD
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()
    const filePath = path.join(PRDS_DIR, `${id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "PRD not found" }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, "utf-8")
    const prd = JSON.parse(content)

    // Update PRD
    const updatedPrd = { ...prd, ...updates, updatedAt: new Date().toISOString() }
    fs.writeFileSync(filePath, JSON.stringify(updatedPrd, null, 2))

    return NextResponse.json({ success: true, prd: updatedPrd })
  } catch (error) {
    console.error("Error updating PRD:", error)
    return NextResponse.json({ error: "Failed to update PRD" }, { status: 500 })
  }
}

// DELETE a PRD
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const filePath = path.join(PRDS_DIR, `${id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "PRD not found" }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting PRD:", error)
    return NextResponse.json({ error: "Failed to delete PRD" }, { status: 500 })
  }
}
