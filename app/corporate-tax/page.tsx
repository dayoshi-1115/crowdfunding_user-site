"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  CreditCard,
  Building,
  CheckSquare,
  FileText,
  Calculator,
  ArrowRight,
  Mail,
  BanknoteIcon,
  Info,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CorporateTaxPage() {
  // ページ読み込み時に最上部にスクロール
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#fdd000] flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-[#0068b7] hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページに戻る
        </Link>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-[#0068b7] mb-6">企業版ふるさと納税について</h1>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">企業版ふるさと納税とは</h2>
            <p>
              企業版ふるさと納税は、企業が地方公共団体に寄附を行った場合に、法人関係税から税額控除する仕組みです。
              最大で寄附額の約9割が軽減され、実質的な企業の負担は1割程度となります。
            </p>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">税制上の優遇措置</h2>
            <p>
              企業版ふるさと納税では、法人住民税、法人税、法人事業税から税額控除されます。
              具体的には、寄附額の3割が法人住民税から、寄附額の3割が法人税から、寄附額の3割が法人事業税から控除されます。
            </p>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">寄附の流れ</h2>

            <div className="space-y-8">
              {/* クレジットカード決済の場合 */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="font-bold text-lg mb-4 flex items-center text-[#0068b7]">
                  <CreditCard className="mr-2 h-5 w-5" />
                  クレジットカード決済の場合
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    {
                      icon: <CheckSquare className="h-8 w-8 text-[#0068b7]" />,
                      title: "寄附メニュー選択",
                      description: "本サイトから寄附メニューを選択します",
                    },
                    {
                      icon: <FileText className="h-8 w-8 text-[#0068b7]" />,
                      title: "情報入力",
                      description: "必要事項を入力し、クレジットカード情報を登録します",
                    },
                    {
                      icon: <CreditCard className="h-8 w-8 text-[#0068b7]" />,
                      title: "決済完了",
                      description: "申し込み完了と同時に決済が行われます",
                    },
                    {
                      icon: <FileText className="h-8 w-8 text-[#0068b7]" />,
                      title: "証明書発行",
                      description: "入金確認後、寄附証明書が発行されます",
                    },
                    {
                      icon: <Calculator className="h-8 w-8 text-[#0068b7]" />,
                      title: "確定申告",
                      description: "確定申告時に寄附証明書を提出します",
                    },
                  ].map((step, index, array) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="bg-white p-4 rounded-full border-2 border-[#0068b7] mb-2">{step.icon}</div>
                      <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-gray-600">{step.description}</p>

                      {/* 矢印（最後の項目以外に表示） */}
                      {index < array.length - 1 && (
                        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                          <ArrowRight className="h-5 w-5 text-[#0068b7]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-white p-3 rounded border border-blue-200 text-sm">
                  <p className="flex items-start">
                    <span className="text-[#0068b7] mr-2 mt-1 flex-shrink-0">
                      <Info className="h-4 w-4" />
                    </span>
                    <span>
                      クレジットカード決済の場合は、申し込み完了と同時に決済が行われるため、手続きがスムーズです。VISA、Mastercard、JCB、American
                      Express、Dinersがご利用いただけます。
                    </span>
                  </p>
                </div>
              </div>

              {/* 銀行振込の場合 */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <h3 className="font-bold text-lg mb-4 flex items-center text-[#0068b7]">
                  <Building className="mr-2 h-5 w-5" />
                  銀行振込の場合
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {[
                    {
                      icon: <CheckSquare className="h-8 w-8 text-[#0068b7]" />,
                      title: "寄附メニュー選択",
                      description: "本サイトから寄附メニューを選択します",
                    },
                    {
                      icon: <FileText className="h-8 w-8 text-[#0068b7]" />,
                      title: "情報入力",
                      description: "必要事項を入力し、寄附の申し込みをします",
                    },
                    {
                      icon: <Mail className="h-8 w-8 text-[#0068b7]" />,
                      title: "確認連絡",
                      description: "宇部市から確認の連絡があります",
                    },
                    {
                      icon: <BanknoteIcon className="h-8 w-8 text-[#0068b7]" />,
                      title: "振込手続き",
                      description: "指定の口座に寄附金を振り込みます",
                    },
                    {
                      icon: <FileText className="h-8 w-8 text-[#0068b7]" />,
                      title: "証明書発行",
                      description: "入金確認後、寄附証明書が発行されます",
                    },
                    {
                      icon: <Calculator className="h-8 w-8 text-[#0068b7]" />,
                      title: "確定申告",
                      description: "確定申告時に寄附証明書を提出します",
                    },
                  ].map((step, index, array) => (
                    <div key={index} className="flex flex-col items-center text-center relative">
                      <div className="bg-white p-4 rounded-full border-2 border-[#0068b7] mb-2">{step.icon}</div>
                      <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-gray-600">{step.description}</p>

                      {/* 矢印（最後の項目以外に表示） */}
                      {index < array.length - 1 && (
                        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                          <ArrowRight className="h-5 w-5 text-[#0068b7]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-white p-3 rounded border border-green-200 text-sm">
                  <p className="flex items-start">
                    <span className="text-[#0068b7] mr-2 mt-1 flex-shrink-0">
                      <Info className="h-4 w-4" />
                    </span>
                    <span>
                      銀行振込の場合は、宇部市からの連絡後に振込手続きを行います。振込手数料は寄附者様のご負担となります。
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">対象となる企業</h2>
            <p>
              青色申告書を提出する法人が対象となります。
              ただし、寄附先の地方公共団体の区域内に本店や主たる事務所を有する法人は対象外となります。
            </p>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">よくある質問</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Q: 寄附金の上限額はありますか？</h3>
                <p>A: 法人住民税法人税割額の20%が上限となります。</p>
              </div>
              <div>
                <h3 className="font-bold">Q: 寄附は複数回行うことができますか？</h3>
                <p>A: はい、年度内であれば複数回の寄附が可能です。</p>
              </div>
              <div>
                <h3 className="font-bold">Q: 寄附金の使い道は指定できますか？</h3>
                <p>A: 本プロジェクトへの寄附は、宇部市と城西大学男子駅伝部のランニングプロジェクトに活用されます。</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="bg-[#0068b7] hover:bg-[#0068b7]/90 text-white" asChild>
              <Link href="/">トップページに戻る</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
