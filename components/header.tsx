import Image from "next/image"
import Link from "next/link"
import { User, ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="bg-[#fdd000] border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Josai University and Ekiden Logo */}
          <Link href="/" className="block">
            <div className="relative h-12 sm:h-14 w-[200px] sm:w-[330px]">
              <Image
                src="/images/josai-logo.png"
                alt="JOSAI EKIDEN OFFICIAL CROWD FUNDING"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Login and Cart Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="flex flex-col items-center text-[#0068b7] hover:text-[#0068b7]/80">
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1">ログイン</span>
            </button>
            <button className="flex flex-col items-center text-[#0068b7] hover:text-[#0068b7]/80">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1">カート</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
