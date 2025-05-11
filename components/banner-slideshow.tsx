"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BannerSlideshowProps {
  images: {
    src: string
    alt: string
  }[]
  interval?: number // ミリ秒単位
  className?: string
}

export function BannerSlideshow({ images, interval = 5000, className = "" }: BannerSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // 自動スライド切り替え
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval, isAutoPlaying])

  // 手動で前の画像に切り替え
  const prevSlide = () => {
    setIsAutoPlaying(false) // 手動操作時は自動再生を一時停止
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    // 5秒後に自動再生を再開
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // 手動で次の画像に切り替え
  const nextSlide = () => {
    setIsAutoPlaying(false) // 手動操作時は自動再生を一時停止
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)

    // 5秒後に自動再生を再開
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 画像スライド */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* 左右の矢印ナビゲーション */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="前の画像"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="次の画像"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* インジケーター */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 5000)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`画像 ${index + 1} に移動`}
          />
        ))}
      </div>
    </div>
  )
}
