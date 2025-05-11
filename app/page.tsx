"use client"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Star, Trophy, Award, Users, ExternalLink, Share2 } from "lucide-react"
import { FundingStats } from "@/components/funding-stats"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { BannerSlideshow } from "@/components/banner-slideshow"

export default function CrowdfundingLP() {
  // タブの状態を管理
  const [activeTab, setActiveTab] = useState("overview")
  const tabsRef = useRef<HTMLDivElement>(null)
  const headerHeight = 60 // ヘッダーの高さを設定（実際の高さに合わせて調整）

  // バナー画像の配列
  const bannerImages = [
    {
      src: "/images/josai_topbanner.webp",
      alt: "ONE FOR ALL, ALL FOR ONE, WE ARE TEAM JOSAI - 城西大学駅伝チーム",
    },
    {
      src: "/images/run_ube_topbanner.jpg",
      alt: "RUN! UBE フェスティバルに集まった多くの子どもたち",
    },
  ]

  // Project funding data
  const fundingData = {
    currentAmount: 1234567,
    targetAmount: 5000000,
    supportersCount: 123,
    percentComplete: 25,
    daysLeft: 89,
    campaignPeriod: "2025年5月1日 - 2025年7月31日",
  }

  // 個人寄附タブに切り替える関数
  const switchToIndividualTab = () => {
    setActiveTab("individual")

    // タブ切り替え後、タブが見える位置までスクロール
    setTimeout(() => {
      if (tabsRef.current) {
        const tabsPosition = tabsRef.current.getBoundingClientRect().top + window.pageYOffset
        // ヘッダーの高さ分だけオフセットを引いてスクロール
        window.scrollTo({
          top: tabsPosition - headerHeight,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#fdd000] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 text-black">
          {/* Updated Catchphrase */}
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-[#0068b7]">
            【城西大学男子駅伝部×宇部市】ランニングプロジェクトを支援しよう！
          </h1>

          {/* Added notice */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <p className="text-center text-xs sm:text-sm bg-gray-100/80 py-2 px-4 rounded-md">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0068b7] text-white rounded-full mr-1 text-xs font-bold">
                !
              </span>
              企業版/個人版ふるさと納税を活用した支援になります
            </p>
          </div>

          {/* Main project image - スライドショーに変更 */}
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4 sm:mb-8">
            <BannerSlideshow images={bannerImages} interval={6000} className="h-[200px] sm:h-[300px] md:h-[400px]" />

            {/* SNS Share Buttons - Compact version with updated logos and spacing */}
            <div className="absolute bottom-4 right-4 z-20 flex space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              {/* X (formerly Twitter) */}
              <button className="hover:opacity-80 transition-opacity">
                <Image src="/images/x-logo.png" alt="X でシェア" width={20} height={20} />
              </button>

              {/* Facebook */}
              <button className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* LINE */}
              <button className="hover:opacity-80 transition-opacity">
                <Image src="/images/line-logo.png" alt="LINE でシェア" width={20} height={20} />
              </button>

              {/* Share icon */}
              <button className="text-[#0068b7] hover:text-[#0068b7]/80 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Project stats */}
          <div className="mb-8">
            <FundingStats
              currentAmount={fundingData.currentAmount}
              targetAmount={fundingData.targetAmount}
              supportersCount={fundingData.supportersCount}
              percentComplete={fundingData.percentComplete}
              daysLeft={fundingData.daysLeft}
              campaignPeriod={fundingData.campaignPeriod}
              onSupportClick={switchToIndividualTab}
            />
          </div>

          {/* Project organizers with actual photos */}
          <div className="p-3 sm:p-4 border border-[#0068b7]/20 rounded-lg mb-4 sm:mb-8 bg-white/50">
            <h3 className="font-bold mb-2 sm:mb-4 text-[#0068b7]">プロジェクト主催者</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* First Organizer - Kushibe */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border border-[#0068b7]/20">
                  <Image
                    src="/images/kushibe.jpg"
                    alt="城西大学男子駅伝部 監督 櫛部静二"
                    fill
                    className="object-cover object-[center_top]"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">櫛部 静二</h4>
                  <p className="text-xs sm:text-sm text-black/70">城西大学男子駅伝部 監督</p>
                </div>
              </div>

              {/* Second Organizer - Shinozaki */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border border-[#0068b7]/20">
                  <Image
                    src="/images/shinozaki_2.jpg"
                    alt="宇部市長 篠崎圭二"
                    fill
                    className="object-cover object-[center_top]"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">篠崎 圭二</h4>
                  <p className="text-xs sm:text-sm text-black/70">宇部市長</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs - フローティング機能を削除 */}
          <div ref={tabsRef} className="bg-white text-[#333333] rounded-lg p-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full bg-gray-100 p-0 h-auto overflow-hidden rounded-md">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#0068b7] data-[state=active]:text-white hover:bg-gray-200 transition-none text-xs sm:text-sm py-3 h-full flex flex-col justify-center rounded-none w-full font-bold"
                >
                  <span>概要</span>
                </TabsTrigger>
                <TabsTrigger
                  value="corporate"
                  className="data-[state=active]:bg-[#0068b7] data-[state=active]:text-white hover:bg-gray-200 transition-none text-xs sm:text-sm py-3 h-full flex flex-col justify-center rounded-none w-full font-bold"
                >
                  <span>寄附</span>
                  <span>(法人)</span>
                </TabsTrigger>
                <TabsTrigger
                  value="individual"
                  id="individual-tab"
                  className="data-[state=active]:bg-[#0068b7] data-[state=active]:text-white hover:bg-gray-200 transition-none text-xs sm:text-sm py-3 h-full flex flex-col justify-center rounded-none w-full font-bold"
                >
                  <span>寄附</span>
                  <span>(個人)</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="data-[state=active]:bg-[#0068b7] data-[state=active]:text-white hover:bg-gray-200 transition-none text-xs sm:text-sm py-3 h-full flex flex-col justify-center rounded-none w-full font-bold"
                >
                  <span>活動</span>
                  <span>報告</span>
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-[#0068b7] data-[state=active]:text-white hover:bg-gray-200 transition-none text-xs sm:text-sm py-3 h-full flex flex-col justify-center rounded-none w-full font-bold"
                >
                  <span>応援</span>
                  <span>コメント</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 p-4">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-[#0068b7]">プロジェクト概要</h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#0068b7]">このプロジェクトについて</h3>
                    <p className="text-gray-700">
                      ここにプロジェクトの概要を記載します。プロジェクトの目的、目標、そして影響について説明してください。なぜこのプロジェクトが重要なのか、そして集まった資金がどのように未来を支援するために使われるのかを説明します。
                    </p>
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden my-6">
                      <Image
                        src="/placeholder.svg?key=ckd0t"
                        alt="プロジェクト説明画像"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0068b7]">私たちのミッション</h3>
                    <p className="text-gray-700">
                      ここにミッションを記載します。何を達成しようとしているのか？誰がこのプロジェクトから恩恵を受けるのか？このプロジェクトがどのように未来を支援するのかを説明します。
                    </p>
                    <h3 className="text-xl font-semibold text-[#0068b7]">あなたの支援がどう役立つか</h3>
                    <p className="text-gray-700">
                      寄付金がどのように使われ、どのような影響を与えるかを説明します。資金調達の目標を分解し、各レベルで何が達成できるかを説明します。
                    </p>
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden my-6">
                      <Image src="/placeholder.svg?key=o3z36" alt="影響力の画像" fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0068b7]">タイムライン</h3>
                    <p className="text-gray-700">
                      プロジェクトのタイムラインを提供し、主要なマイルストーンと支援者が結果を期待できる時期を説明します。
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="corporate" className="mt-6 p-4">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0068b7]">法人向け寄附メニュー</h2>
                    <div className="flex items-center gap-2 mt-1 mb-4">
                      <span className="text-sm text-[#0068b7] font-medium">(企業版ふるさと納税)</span>
                      <Link href="/corporate-tax" className="text-sm text-[#0068b7] hover:underline flex items-center">
                        <ExternalLink className="h-3 w-3 ml-1" />
                        <span className="ml-1">詳細</span>
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "ブロンズサポーター",
                        amount: "¥100,000",
                        color: "#CD7F32",
                        benefits: ["ウェブサイトにロゴ掲載", "ニュースレターでの紹介"],
                        popular: false,
                        id: "bronze",
                      },
                      {
                        title: "シルバーサポーター",
                        amount: "¥300,000",
                        color: "#C0C0C0",
                        benefits: ["ウェブサイトにロゴ掲載", "ニュースレターでの紹介", "SNSでの紹介"],
                        popular: false,
                        id: "silver",
                      },
                      {
                        title: "ゴールドサポーター",
                        amount: "¥500,000",
                        color: "#FFD700",
                        benefits: [
                          "ウェブサイトにロゴ掲載",
                          "ニュースレターでの紹介",
                          "SNSでの紹介",
                          "イベントでのスピーチの機会",
                        ],
                        popular: true,
                        id: "gold",
                      },
                    ].map((tier, index) => (
                      <Link key={index} href={`/corporate-donation?plan=${tier.id}`} className="block group">
                        <div
                          className={`border-2 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02] flex flex-col h-full ${
                            tier.popular
                              ? `border-[${tier.color}] shadow-md`
                              : "border-gray-200 group-hover:border-[${tier.color}]/70"
                          }`}
                        >
                          {tier.popular && (
                            <div className="bg-[#0068b7] text-white text-center py-1.5 text-sm font-medium relative overflow-hidden">
                              <span className="relative z-10">おすすめ</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-[#0068b7] to-[#0091ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-45 translate-x-full transition-transform duration-1000 animate-shimmer"></span>
                            </div>
                          )}
                          <div className="p-6 flex-1 flex flex-col">
                            <div>
                              <div
                                className="w-12 h-12 rounded-full mb-2"
                                style={{ background: `linear-gradient(135deg, ${tier.color}, white)` }}
                              ></div>
                              <h3 className="text-xl font-semibold" style={{ color: tier.color }}>
                                {tier.title}
                              </h3>
                              <p className="text-3xl font-bold">{tier.amount}</p>
                              <div className="pt-4 border-t border-gray-100">
                                <p className="font-medium text-gray-700 mb-2">特典内容:</p>
                                <ul className="space-y-2">
                                  {tier.benefits.map((benefit, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 transition-all duration-200 group-hover:translate-x-1"
                                    >
                                      <div className="h-5 w-5 rounded-full bg-[#0068b7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                          className="h-3 w-3 text-[#0068b7]"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <span className="text-sm text-gray-700">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-auto pt-4">
                              <div className="w-full bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 rounded-md text-center relative overflow-hidden shadow-lg">
                                <span className="relative z-10 flex items-center justify-center">選択する</span>
                                <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[
                      {
                        title: "プラチナサポーター",
                        amount: "¥1,000,000",
                        color: "#E5E4E2",
                        benefits: [
                          "ウェブサイトにロゴ掲載",
                          "ニュースレターでの紹介",
                          "SNSでの紹介",
                          "イベントでのスピーチの機会",
                          "従業員向け特別ワークショップ",
                        ],
                        id: "platinum",
                      },
                      {
                        title: "ダイヤモンドサポーター",
                        amount: "¥3,000,000",
                        color: "#B9F2FF",
                        benefits: [
                          "ウェブサイトにロゴ掲載",
                          "ニュースレターでの紹介",
                          "SNSでの紹介",
                          "イベントでのスピーチの機会",
                          "従業員向け特別ワークショップ",
                          "共同ブランディングの機会",
                        ],
                        id: "diamond",
                      },
                    ].map((tier, index) => (
                      <Link key={index} href={`/corporate-donation?plan=${tier.id}`} className="block group">
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02] flex flex-col bg-white h-full">
                          <div className="p-6 flex-1 flex flex-col">
                            <div>
                              <div
                                className="w-12 h-12 rounded-full mb-2"
                                style={{ background: `linear-gradient(135deg, ${tier.color}, white)` }}
                              ></div>
                              <h3 className="text-xl font-semibold text-[#0068b7]">{tier.title}</h3>
                              <p className="text-3xl font-bold">{tier.amount}</p>
                              <div className="pt-4 border-t border-gray-100">
                                <p className="font-medium text-gray-700 mb-2">特典内容:</p>
                                <ul className="space-y-2">
                                  {tier.benefits.map((benefit, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 transition-all duration-200 group-hover:translate-x-1"
                                    >
                                      <div className="h-5 w-5 rounded-full bg-[#0068b7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                          className="h-3 w-3 text-[#0068b7]"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <span className="text-sm text-gray-700">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-auto pt-4">
                              <div className="w-full bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 rounded-md text-center relative overflow-hidden shadow-lg">
                                <span className="relative z-10 flex items-center justify-center">選択する</span>
                                <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="p-6 border-2 border-dashed border-[#0068b7]/30 rounded-lg bg-[#0068b7]/5 transition-all duration-300 hover:border-[#0068b7]/60 hover:bg-[#0068b7]/10 hover:shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-[#0068b7]">カスタム寄附</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      ご自身で寄附金額を設定したい場合は、以下から金額を入力できます。
                    </p>
                    <ul className="text-xs text-gray-600 mb-4 space-y-1 list-disc pl-4">
                      <li>寄附金額は10万円からになります</li>
                      <li>特典内容は入力した寄附金額未満で最も近い金額の内容になります</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">¥</span>
                        </div>
                        <input
                          type="number"
                          min="100000"
                          step="10000"
                          className="block w-full pl-8 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0068b7] focus:border-transparent transition-all duration-300 hover:border-[#0068b7]/50 hover:shadow-sm"
                          placeholder="金額を入力（10万円以上）"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">円</span>
                        </div>
                      </div>
                      <Link href="/corporate-donation?plan=custom" className="block">
                        <div className="bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 px-6 rounded-md text-center relative overflow-hidden shadow-lg min-w-[120px]">
                          <span className="relative z-10 flex items-center justify-center">寄附する</span>
                          <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="individual" className="mt-6 p-4">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0068b7]">個人向け寄附メニュー</h2>
                    <div className="flex items-center gap-2 mt-1 mb-4">
                      <span className="text-sm text-[#0068b7] font-medium">(個人版ふるさと納税)</span>
                      <Link href="/individual-tax" className="text-sm text-[#0068b7] hover:underline flex items-center">
                        <ExternalLink className="h-3 w-3 ml-1" />
                        <span className="ml-1">詳細</span>
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "サポーター",
                        amount: "¥3,000",
                        rewards: ["お礼メール", "デジタル証明書"],
                        icon: "Heart",
                        popular: false,
                        id: "supporter",
                      },
                      {
                        title: "フレンド",
                        amount: "¥5,000",
                        rewards: ["お礼メール", "デジタル証明書", "ウェブサイトにお名前掲載"],
                        icon: "Users",
                        popular: false,
                        id: "friend",
                      },
                      {
                        title: "アドボケイト",
                        amount: "¥10,000",
                        rewards: ["お礼メール", "デジタル証明書", "ウェブサイトにお名前掲載", "プロジェクト最新情報"],
                        icon: "Star",
                        popular: true,
                        id: "advocate",
                      },
                    ].map((tier, index) => (
                      <Link key={index} href={`/individual-donation?plan=${tier.id}`} className="block group">
                        <div
                          className={`border-2 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02] flex flex-col bg-white h-full ${
                            tier.popular ? "border-[#0068b7] shadow-md" : "border-gray-200"
                          }`}
                        >
                          {tier.popular && (
                            <div className="bg-[#0068b7] text-white text-center py-1.5 text-sm font-medium relative overflow-hidden">
                              <span className="relative z-10">人気プラン</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-[#0068b7] to-[#0091ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-45 translate-x-full transition-transform duration-1000 animate-shimmer"></span>
                            </div>
                          )}
                          <div className="p-6 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-[#0068b7]">{tier.title}</h3>
                                <div className="h-10 w-10 rounded-full bg-[#0068b7]/10 flex items-center justify-center">
                                  {tier.icon === "Heart" && <Heart className="h-5 w-5 text-[#0068b7]" />}
                                  {tier.icon === "Users" && <Users className="h-5 w-5 text-[#0068b7]" />}
                                  {tier.icon === "Star" && <Star className="h-5 w-5 text-[#0068b7]" />}
                                </div>
                              </div>
                              <p className="text-3xl font-bold">{tier.amount}</p>
                              <div className="pt-4 border-t border-gray-100">
                                <p className="font-medium text-gray-700 mb-2">特典内容:</p>
                                <ul className="space-y-2">
                                  {tier.rewards.map((reward, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 transition-all duration-200 group-hover:translate-x-1"
                                    >
                                      <div className="h-5 w-5 rounded-full bg-[#0068b7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                          className="h-3 w-3 text-[#0068b7]"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <span className="text-sm text-gray-700">{reward}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-auto pt-4">
                              <div className="w-full bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 rounded-md text-center relative overflow-hidden shadow-lg">
                                <span className="relative z-10 flex items-center justify-center">選択する</span>
                                <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      {
                        title: "チャンピオン",
                        amount: "¥30,000",
                        rewards: [
                          "お礼メール",
                          "デジタル証明書",
                          "ウェブサイトにお名前掲載",
                          "プロジェクト最新情報",
                          "限定デジタルコンテンツ",
                        ],
                        icon: "Trophy",
                        id: "champion",
                      },
                      {
                        title: "ヒーロー",
                        amount: "¥50,000",
                        rewards: [
                          "お礼メール",
                          "デジタル証明書",
                          "ウェブサイトにお名前掲載",
                          "プロジェクト最新情報",
                          "限定デジタルコンテンツ",
                          "バーチャルイベントへの招待",
                        ],
                        icon: "Award",
                        id: "hero",
                      },
                    ].map((tier, index) => (
                      <Link key={index} href={`/individual-donation?plan=${tier.id}`} className="block group">
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02] flex flex-col bg-white h-full">
                          <div className="p-6 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-[#0068b7]">{tier.title}</h3>
                                <div className="h-10 w-10 rounded-full bg-[#0068b7]/10 flex items-center justify-center">
                                  {tier.icon === "Trophy" && <Trophy className="h-5 w-5 text-[#0068b7]" />}
                                  {tier.icon === "Award" && <Award className="h-5 w-5 text-[#0068b7]" />}
                                </div>
                              </div>
                              <p className="text-3xl font-bold">{tier.amount}</p>
                              <div className="pt-4 border-t border-gray-100">
                                <p className="font-medium text-gray-700 mb-2">特典内容:</p>
                                <ul className="space-y-2">
                                  {tier.rewards.map((reward, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 transition-all duration-200 group-hover:translate-x-1"
                                    >
                                      <div className="h-5 w-5 rounded-full bg-[#0068b7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                          className="h-3 w-3 text-[#0068b7]"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                      <span className="text-sm text-gray-700">{reward}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-auto pt-4">
                              <div className="w-full bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 rounded-md text-center relative overflow-hidden shadow-lg">
                                <span className="relative z-10 flex items-center justify-center">選択する</span>
                                <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="p-6 border-2 border-dashed border-[#0068b7]/30 rounded-lg bg-[#0068b7]/5 transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-[#0068b7]">カスタム寄附</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      ご自身で寄附金額を設定したい場合は、以下から金額を入力できます。
                    </p>
                    <ul className="text-xs text-gray-600 mb-4 space-y-1 list-disc pl-4">
                      <li>特典内容は入力した寄附金額未満で最も近い金額の内容になります</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">¥</span>
                        </div>
                        <input
                          type="number"
                          min="2000"
                          step="1000"
                          className="block w-full pl-8 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0068b7] focus:border-transparent"
                          placeholder="金額を入力"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">円</span>
                        </div>
                      </div>
                      <Link href="/individual-donation?plan=custom" className="block">
                        <div className="bg-[#0068b7] hover:bg-[#0091ff] text-white font-bold py-3 px-6 rounded-md text-center relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 min-w-[120px]">
                          <span className="relative z-10 flex items-center justify-center">寄附する</span>
                          <span className="absolute inset-0 bg-white/20 transform -skew-x-45 translate-x-full animate-shimmer"></span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6 p-4">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-[#0068b7]">活動報告</h2>
                  <div className="space-y-6">
                    {[
                      {
                        date: "2025年4月30日",
                        title: "プロジェクト開始のお知らせ",
                        excerpt: "私たちのクラウドファンディングキャンペーンの開始をお知らせします...",
                      },
                      {
                        date: "2025年4月15日",
                        title: "準備状況の更新",
                        excerpt:
                          "今後のクラウドファンディングキャンペーンの準備をしている中で、舞台裏の様子をお伝えします...",
                      },
                      {
                        date: "2025年3月28日",
                        title: "チームミーティングのハイライト",
                        excerpt:
                          "最近、チームがプロジェクトの詳細を最終決定するために会議を行いました。以下がそのハイライトです...",
                      },
                    ].map((report, index) => (
                      <div key={index} className="border rounded-lg p-6 border-gray-200">
                        <div className="text-sm text-gray-500 mb-2">{report.date}</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#0068b7]">{report.title}</h3>
                        <p className="text-gray-700 mb-4">{report.excerpt}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#0068b7] text-[#0068b7] hover:bg-[#0068b7] hover:text-white"
                        >
                          続きを読む
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6 p-4">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-[#0068b7]">応援コメント</h2>
                  <div className="space-y-6">
                    {[
                      {
                        name: "田中 ゆき",
                        date: "2025年5月3日",
                        amount: "¥10,000",
                        comment: "この重要な取り組みを支援できることを嬉しく思います。頑張ってください！",
                      },
                      {
                        name: "鈴木 ひろし",
                        date: "2025年5月2日",
                        amount: "¥5,000",
                        comment: "このプロジェクトは私の価値観と完全に一致しています。目標達成を願っています。",
                      },
                      {
                        name: "山本 あきこ",
                        date: "2025年5月1日",
                        amount: "¥30,000",
                        comment:
                          "同様のプログラムから恩恵を受けた者として、恩返しができて嬉しいです。成功を祈っています！",
                      },
                      {
                        name: "匿名",
                        date: "2025年4月30日",
                        amount: "¥15,000",
                        comment: "素晴らしい取り組みですね！影響を楽しみにしています。",
                      },
                    ].map((comment, index) => (
                      <div key={index} className="border rounded-lg p-6 border-gray-200">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{comment.name}</div>
                          <div className="text-sm text-gray-500">{comment.date}</div>
                        </div>
                        <div className="text-sm text-gray-500 mb-3">寄付金額: {comment.amount}</div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="border-[#0068b7] text-[#0068b7] hover:bg-[#0068b7] hover:text-white"
                    >
                      もっと見る
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
