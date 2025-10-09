import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Confirm payment with Toss Payments and add credits
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { paymentKey, orderId, amount, credits, orderName } = body || {}

    if (!paymentKey || !orderId || !amount || !credits) {
      return NextResponse.json({ error: "Missing payment parameters" }, { status: 400 })
    }

    const secretKey = process.env.TOSS_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "Toss secret key not configured" }, { status: 500 })
    }

    // Confirm payment with Toss Payments v2
    const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Toss confirm failed:", errText)
      return NextResponse.json({ error: "Payment confirmation failed", details: errText }, { status: 402 })
    }

    const payment = await res.json()

    // Optional: validate payment fields (status, currency, etc.)
    if (payment.status !== "DONE") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 })
    }

    // Add credits for the user via Supabase RPC
    const { data: addResult, error: addError } = await supabase.rpc("add_credits", {
      p_user_id: user.id,
      p_amount: credits,
      p_description: orderName ? `Toss Purchase: ${orderName}` : "Toss Credit Purchase",
    })

    if (addError) {
      console.error("Failed to add credits:", addError)
      return NextResponse.json({ error: "Failed to add credits" }, { status: 500 })
    }

    return NextResponse.json({ success: true, payment, creditsAdded: credits })
  } catch (error) {
    console.error("Error confirming Toss payment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}