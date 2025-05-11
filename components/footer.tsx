import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div className="space-y-4">
            <div className="relative h-12 w-full max-w-[200px]">
              <Image
                src="/images/header-logo-new.webp"
                alt="JOSAI EKIDEN OFFICIAL CROWD FUNDING"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-gray-600">
              城西大学男子駅伝部と宇部市が連携して行うランニングプロジェクトを支援するクラウドファンディングサイトです。
            </p>
          </div>

          {/* リンク集 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#0068b7]">ふるさと納税について</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/corporate-tax"
                  className="text-gray-600 hover:text-[#0068b7] flex items-center gap-1 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  企業版ふるさと納税について
                </Link>
              </li>
              <li>
                <Link
                  href="/individual-tax"
                  className="text-gray-600 hover:text-[#0068b7] flex items-center gap-1 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  個人版ふるさと納税について
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#0068b7]">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>宇部市 移住定住推進課</li>
              <li>TEL: 0836-34-8480</li>
              <li>Email: iju@city.ube.yamaguchi.jp</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 城西大学×宇部市 ランニングプロジェクト. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
