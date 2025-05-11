"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, FileText, Calculator, ArrowRight, CheckSquare, Info } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function IndividualTaxPage() {
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
          <h1 className="text-3xl font-bold text-[#0068b7] mb-6">個人版ふるさと納税について</h1>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">個人版ふるさと納税とは</h2>
            <p>
              ふるさと納税は、自分の選んだ自治体に寄附ができる制度です。
              寄附をすると、所得税の還付と住民税の控除を受けることができ、実質的な自己負担額は2,000円からとなります。
            </p>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">税制上の優遇措置</h2>
            <p>
              ふるさと納税では、寄附金のうち2,000円を超える部分について、所得税と住民税から全額が控除されます（一定の上限あり）。
              控除上限額は、年収や家族構成によって異なります。
            </p>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">寄附の流れ</h2>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
                    description: "寄附証明書（受領証）が発行されます",
                  },
                  {
                    icon: <Calculator className="h-8 w-8 text-[#0068b7]" />,
                    title: "税控除手続き",
                    description: "確定申告または「ワンストップ特例制度」の申請をします",
                  },
                ].map((step, index, array) => (
                  <div key={index} className="flex flex-col items-center text-center relative">
                    <div className="relative">
                      <div className="bg-white p-4 rounded-full border-2 border-[#0068b7] mb-2">{step.icon}</div>

                      {/* ステップ番号 */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0068b7] text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-600">{step.description}</p>

                    {/* 矢印（最後の項目以外に表示） */}
                    {index < array.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/3 transform -translate-y-1/2 translate-x-1/2">
                        <ArrowRight className="h-5 w-5 text-[#0068b7]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100 mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center text-[#0068b7]">
                <Info className="mr-2 h-5 w-5" />
                ワンストップ特例制度について
              </h3>

              <div>
                <p className="text-sm mb-4">
                  確定申告が不要な給与所得者等は、「ワンストップ特例制度」を利用することで、申請書の提出だけで確定申告をせずに税の控除を受けることができます。
                  ただし、年間の寄附先が5自治体以内である必要があります。
                </p>

                <div className="bg-white p-4 rounded border border-yellow-200">
                  <h4 className="font-bold text-sm mb-2">ワンストップ特例制度の条件</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>確定申告を行わない給与所得者等であること</li>
                    <li>寄附先の自治体が年間5団体以内であること</li>
                    <li>寄附を行った翌年の1月10日までに申請書を提出すること</li>
                    <li>マイナンバーカードの写し等の本人確認書類を添付すること</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#0068b7] mt-8 mb-4">よくある質問</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Q: 控除上限額はどのように計算されますか？</h3>
                <p>A: 年収や家族構成によって異なりますが、一般的には年収の約2割程度が目安となります。</p>
              </div>
              <div>
                <h3 className="font-bold">Q: 寄附は複数回行うことができますか？</h3>
                <p>A: はい、年間の控除上限額内であれば複数回の寄附が可能です。</p>
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
