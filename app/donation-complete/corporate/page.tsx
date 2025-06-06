"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, ArrowRight, Building } from "lucide-react"
import confetti from "canvas-confetti"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CorporateDonationCompletePage() {
  useEffect(() => {
    // 紙吹雪エフェクト
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#fdd000] flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4 w-16 h-16 bg-[#0068b7]/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-[#0068b7] rounded-full flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-[#0068b7]">寄附申し込みが完了しました</CardTitle>
              <CardDescription className="text-base mt-2">
                企業版ふるさと納税のお申し込みありがとうございます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#0068b7]/10 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <Heart className="h-10 w-10 text-[#0068b7]" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <div className="w-10 h-10 bg-[#fdd000] rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-[#0068b7]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">今後の流れ</h3>
                <ol className="text-left space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0068b7] rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">企業情報の確認</p>
                      <p className="text-gray-600 mt-1">
                        宇部市の担当者が企業情報を確認します。1週間以内にご連絡いたします。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0068b7] rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">寄附金の振込</p>
                      <p className="text-gray-600 mt-1">担当者からの連絡後、指定の口座に寄附金をお振込みください。</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#0068b7] rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">寄附証明書の発行</p>
                      <p className="text-gray-600 mt-1">
                        寄附金の入金確認後、寄附証明書を発行します。確定申告の際にご利用ください。
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-[#0068b7]">ご支援いただきありがとうございます</p>
                <p className="text-sm text-gray-600 mt-2">
                  いただいた寄附金は、城西大学男子駅伝部と宇部市のランニングプロジェクトに大切に活用させていただきます。
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/">トップページに戻る</Link>
              </Button>
              <Button asChild className="bg-[#0068b7] hover:bg-[#0068b7]/90">
                <Link href="/corporate-tax">
                  企業版ふるさと納税について詳しく見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
