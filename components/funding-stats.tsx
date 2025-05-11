"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface FundingStatsProps {
  currentAmount: number
  targetAmount: number
  supportersCount: number
  percentComplete: number
  daysLeft: number
  campaignPeriod: string
  className?: string
  onSupportClick?: () => void
}

export function FundingStats({
  currentAmount,
  targetAmount,
  supportersCount,
  percentComplete,
  daysLeft,
  campaignPeriod,
  className,
  onSupportClick,
}: FundingStatsProps) {
  const [animatedAmount, setAnimatedAmount] = useState(0)
  const [animatedPercent, setAnimatedPercent] = useState(0)

  // Animation effect for the amount and percentage - much faster now
  useEffect(() => {
    // Set a very short timeout to ensure the component is mounted
    const timer = setTimeout(() => {
      setAnimatedAmount(currentAmount)
      setAnimatedPercent(percentComplete)
    }, 50)

    return () => clearTimeout(timer)
  }, [currentAmount, percentComplete])

  // Format number with commas
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString("ja-JP")
  }

  return (
    <div className={cn("bg-white rounded-lg p-4 sm:p-6 shadow-sm", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Progress bar and amount */}
        <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0068b7]">寄附総額</h3>
            <div className="flex justify-between items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0068b7]">
                ¥{formatNumber(animatedAmount)}
              </span>
              <span className="text-sm text-black/70">目標: ¥{formatNumber(targetAmount)}</span>
            </div>
          </div>
          <Progress value={animatedPercent} className="h-3 bg-black/10" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">達成率 {percentComplete}%</span>
            <span>支援者数 {supportersCount}人</span>
          </div>
        </div>

        {/* Right column - Time details */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#0068b7]/5 rounded-lg">
            <div className="bg-[#0068b7] rounded-full p-2 text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">キャンペーン期間</p>
              <p className="font-medium">{campaignPeriod}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#0068b7]/5 rounded-lg">
            <div className="bg-[#0068b7] rounded-full p-2 text-white">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">残り日数</p>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-[#0068b7]">{daysLeft}</span>
                <span className="font-medium">日</span>
              </div>
            </div>
          </div>

          <button
            onClick={onSupportClick}
            className="mt-2 w-full bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 rounded-md text-center relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center justify-center">
              このプロジェクトを支援する
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
          </button>
        </div>
      </div>
    </div>
  )
}
