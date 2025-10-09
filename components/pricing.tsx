import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase">
              THE #1 AI PRD
              <br />
              GENERATION
              <br />
              PLATFORM
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            name="FREE"
            subtitle="Basic plan"
            price="$0"
            period="/mo"
            userInfo="1 user"
            features={["10 free credits", "English & Korean", "Markdown export", "Basic editing"]}
            cta="Coming Soon"
            href="/signup"
            variant="light"
          />

          {/* Starter Pack */}
          <PricingCard
            name="STARTER"
            subtitle="Starter package plan"
            price="$2.9"
            period=""
            userInfo="1 user"
            features={["All free features", "PDF export", "Advanced editing", "Priority support"]}
            cta="Start 14-day Trial"
            href="/signup"
            variant="light"
          />

          {/* Pro Pack - Featured */}
          <PricingCard
            name="PRO"
            subtitle="Premium package plan"
            price="$8.9"
            period=""
            userInfo="1 user"
            features={["All starter features", "20% cost savings", "Bulk generation", "Custom templates"]}
            cta="Start 14-day Trial"
            href="/signup"
            variant="dark"
            featured
          />
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  name: string
  subtitle: string
  price: string
  period: string
  userInfo: string
  features: string[]
  cta: string
  href: string
  variant: "light" | "dark"
  featured?: boolean
}

function PricingCard({
  name,
  subtitle,
  price,
  period,
  userInfo,
  features,
  cta,
  href,
  variant,
  featured,
}: PricingCardProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
        isDark ? "bg-black text-white shadow-2xl" : "bg-gray-50 hover:bg-white border-2 border-gray-200"
      }`}
    >
      <div className="space-y-2 mb-6">
        <h3 className={`text-lg font-bold uppercase tracking-wide ${isDark ? "text-[#0066FF]" : "text-black"}`}>
          {name}
        </h3>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black">{price}</span>
          <span className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>{period}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className={`h-2 w-2 rounded-full ${isDark ? "bg-[#0066FF]" : "bg-black"}`} />
        <span className="text-sm font-medium">{userInfo}</span>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <div className={`mt-0.5 flex-shrink-0 ${isDark ? "text-[#0066FF]" : "text-black"}`}>
              <Check className="h-5 w-5" />
            </div>
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full rounded-full py-6 text-base font-bold ${
          isDark
            ? "bg-[#0066FF] hover:bg-[#0052CC] text-white"
            : "bg-white hover:bg-gray-50 text-black border-2 border-black"
        }`}
        asChild
      >
        <Link href={href}>{cta}</Link>
      </Button>

      {featured && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <p className="text-xs text-gray-500">Features in-line & in-room</p>
        </div>
      )}
    </div>
  )
}
