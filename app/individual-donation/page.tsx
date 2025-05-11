"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function IndividualDonationPage() {
  const router = useRouter()
  const [donationType, setDonationType] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [customAmount, setCustomAmount] = useState("5000")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    furigana: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    oneStopException: true,
    comment: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    termsAgreed: false,
    privacyAgreed: false,
  })

  const donationOptions = [
    { id: "supporter", title: "サポーター", amount: "3,000" },
    { id: "friend", title: "フレンド", amount: "5,000" },
    { id: "advocate", title: "アドボケイト", amount: "10,000" },
    { id: "champion", title: "チャンピオン", amount: "30,000" },
    { id: "hero", title: "ヒーロー", amount: "50,000" },
    { id: "custom", title: "カスタム寄附", amount: customAmount },
  ]

  useEffect(() => {
    // URLからプランパラメータを取得
    const searchParams = new URLSearchParams(window.location.search)
    const planParam = searchParams.get("plan")

    // 有効なプランの場合はそれを設定、なければデフォルト値を設定
    if (planParam && donationOptions.some((option) => option.id === planParam)) {
      setDonationType(planParam)
    } else {
      setDonationType("advocate") // デフォルト値
    }

    // ページ読み込み時に一番上にスクロール
    window.scrollTo(0, 0)

    setIsLoaded(true)
  }, [])

  const selectedDonation = donationOptions.find((option) => option.id === donationType)

  // isLoaded が false の間は何も表示しないようにして、選択が変わるのを見せないようにする
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#fdd000] flex items-center justify-center">
        <div className="text-[#0068b7]">読み込み中...</div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // 実際の実装ではここでフォームデータを送信する処理を行う
    setTimeout(() => {
      setLoading(false)
      router.push("/donation-complete/individual")
    }, 1500)
  }

  const nextStep = () => {
    window.scrollTo(0, 0)
    setStep(step + 1)
  }

  const prevStep = () => {
    window.scrollTo(0, 0)
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-[#fdd000] flex flex-col">
      <Header />

      <div className="flex-grow container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-[#0068b7] hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページに戻る
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="bg-[#0068b7] text-white rounded-t-lg">
              <CardTitle className="text-2xl">個人向け寄附申し込み</CardTitle>
              <CardDescription className="text-white/80">個人版ふるさと納税を活用した寄附のお申し込み</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* ステップ表示 */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#0068b7] text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      1
                    </div>
                    <span className="text-xs mt-1">寄附内容</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-[#0068b7]" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#0068b7] text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      2
                    </div>
                    <span className="text-xs mt-1">個人情報</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-[#0068b7]" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#0068b7] text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      3
                    </div>
                    <span className="text-xs mt-1">確認</span>
                  </div>
                </div>
              </div>

              {/* ステップ1: 寄附内容選択 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-[#0068b7]">寄附内容の選択</h2>

                  <RadioGroup value={donationType} onValueChange={setDonationType} className="space-y-4">
                    {donationOptions.slice(0, 5).map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3 border p-4 rounded-md hover:border-[#0068b7] transition-colors"
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{option.title}</div>
                          <div className="text-lg font-bold">¥{option.amount}</div>
                        </Label>
                      </div>
                    ))}

                    <div
                      className={`flex items-start space-x-3 border p-4 rounded-md ${donationType === "custom" ? "border-[#0068b7]" : "hover:border-[#0068b7]"} transition-colors`}
                    >
                      <RadioGroupItem value="custom" id="custom" className="mt-2" />
                      <div className="flex-1">
                        <Label htmlFor="custom" className="cursor-pointer">
                          <div className="font-medium">カスタム寄附</div>
                          <div className="text-sm text-gray-500 mb-2">ご希望の金額を入力してください</div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">¥</span>
                          </div>
                          <Input
                            type="number"
                            min="2000"
                            step="1000"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            onClick={() => setDonationType("custom")}
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="pt-4">
                    <Label htmlFor="comment" className="mb-2 block">
                      応援メッセージ（任意）
                    </Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      placeholder="応援メッセージがあればご記入ください"
                      value={formData.comment}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700">個人版ふるさと納税について</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      個人版ふるさと納税では、寄附金のうち2,000円を超える部分について、所得税と住民税から全額が控除されます（一定の上限あり）。
                      詳しくは
                      <Link href="/individual-tax" className="underline">
                        こちら
                      </Link>
                      をご覧ください。
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={nextStep} className="bg-[#0068b7] hover:bg-[#0068b7]/90">
                      次へ進む
                    </Button>
                  </div>
                </div>
              )}

              {/* ステップ2: 個人情報入力 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-[#0068b7]">個人情報の入力</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        氏名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="例: 山田 太郎"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="furigana">
                        フリガナ <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="furigana"
                        name="furigana"
                        placeholder="例: ヤマダ タロウ"
                        value={formData.furigana}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">
                        生年月日 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">
                        郵便番号 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="例: 123-4567"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prefecture">
                        都道府県 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.prefecture}
                        onValueChange={(value) => setFormData({ ...formData, prefecture: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "北海道",
                            "青森県",
                            "岩手県",
                            "宮城県",
                            "秋田県",
                            "山形県",
                            "福島県",
                            "茨城県",
                            "栃木県",
                            "群馬県",
                            "埼玉県",
                            "千葉県",
                            "東京都",
                            "神奈川県",
                            "新潟県",
                            "富山県",
                            "石川県",
                            "福井県",
                            "山梨県",
                            "長野県",
                            "岐阜県",
                            "静岡県",
                            "愛知県",
                            "三重県",
                            "滋賀県",
                            "京都府",
                            "大阪府",
                            "兵庫県",
                            "奈良県",
                            "和歌山県",
                            "鳥取県",
                            "島根県",
                            "岡山県",
                            "広島県",
                            "山口県",
                            "徳島県",
                            "香川県",
                            "愛媛県",
                            "高知県",
                            "福岡県",
                            "佐賀県",
                            "長崎県",
                            "熊本県",
                            "大分県",
                            "宮崎県",
                            "鹿児島県",
                            "沖縄県",
                          ].map((pref) => (
                            <SelectItem key={pref} value={pref}>
                              {pref}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">
                        市区町村 <span className="text-red-500">*</span>
                      </Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">
                        番地・建物名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">
                        電話番号 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="例: 090-1234-5678"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        メールアドレス <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">ワンストップ特例制度</h3>

                    <Alert className="mb-4 bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-500" />
                      <AlertDescription className="text-blue-600">
                        確定申告が不要な給与所得者等は、「ワンストップ特例制度」を利用することで、確定申告をせずに税の控除を受けることができます。
                        ただし、年間の寄附先が5自治体以内である必要があります。
                      </AlertDescription>
                    </Alert>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="oneStopException"
                        checked={formData.oneStopException}
                        onCheckedChange={(checked) => handleCheckboxChange("oneStopException", checked)}
                      />
                      <Label htmlFor="oneStopException" className="text-sm leading-tight">
                        ワンストップ特例制度を利用します（後日、必要書類を郵送いたします）
                      </Label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">お支払い方法</h3>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-5 w-5 mr-2 text-[#0068b7]" />
                        <span className="font-medium">クレジットカード決済</span>
                      </div>

                      <p className="text-sm text-gray-500 mb-4">
                        VISA、Mastercard、JCB、American Express、Dinersがご利用いただけます
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">
                            カード番号 <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">
                            カード名義 <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="TARO YAMADA"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">
                              有効期限 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">
                              セキュリティコード <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="cardCvc"
                              name="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">利用規約・プライバシーポリシー</h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="termsAgreed"
                          checked={formData.termsAgreed}
                          onCheckedChange={(checked) => handleCheckboxChange("termsAgreed", checked)}
                        />
                        <Label htmlFor="termsAgreed" className="text-sm leading-tight">
                          <Link href="#" className="text-[#0068b7] hover:underline">
                            利用規約
                          </Link>
                          に同意します
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacyAgreed"
                          checked={formData.privacyAgreed}
                          onCheckedChange={(checked) => handleCheckboxChange("privacyAgreed", checked)}
                        />
                        <Label htmlFor="privacyAgreed" className="text-sm leading-tight">
                          <Link href="#" className="text-[#0068b7] hover:underline">
                            プライバシーポリシー
                          </Link>
                          に同意します
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      戻る
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-[#0068b7] hover:bg-[#0068b7]/90"
                      disabled={
                        !formData.fullName ||
                        !formData.furigana ||
                        !formData.dateOfBirth ||
                        !formData.postalCode ||
                        !formData.prefecture ||
                        !formData.city ||
                        !formData.address ||
                        !formData.phoneNumber ||
                        !formData.email ||
                        !formData.termsAgreed ||
                        !formData.privacyAgreed ||
                        !formData.cardNumber ||
                        !formData.cardName ||
                        !formData.cardExpiry ||
                        !formData.cardCvc
                      }
                    >
                      次へ進む
                    </Button>
                  </div>
                </div>
              )}

              {/* ステップ3: 確認画面 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-[#0068b7]">申し込み内容の確認</h2>

                  <Card className="bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">寄附内容</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">寄附プラン:</span>
                          <span>{selectedDonation?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">寄附金額:</span>
                          <span className="font-bold">
                            ¥
                            {donationType === "custom"
                              ? Number(customAmount).toLocaleString()
                              : selectedDonation?.amount}
                          </span>
                        </div>
                        {formData.comment && (
                          <div className="pt-2 border-t border-gray-200 mt-2">
                            <span className="font-medium block mb-1">応援メッセージ:</span>
                            <p className="text-sm bg-white p-2 rounded">{formData.comment}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Accordion type="single" collapsible defaultValue="personal-info">
                    <AccordionItem value="personal-info">
                      <AccordionTrigger className="text-[#0068b7]">個人情報</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">氏名:</span>
                            <span className="col-span-2">{formData.fullName}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">フリガナ:</span>
                            <span className="col-span-2">{formData.furigana}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">生年月日:</span>
                            <span className="col-span-2">{formData.dateOfBirth}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">郵便番号:</span>
                            <span className="col-span-2">{formData.postalCode}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">住所:</span>
                            <span className="col-span-2">
                              {formData.prefecture}
                              {formData.city}
                              {formData.address}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">電話番号:</span>
                            <span className="col-span-2">{formData.phoneNumber}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">メールアドレス:</span>
                            <span className="col-span-2">{formData.email}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">ワンストップ特例:</span>
                            <span className="col-span-2">{formData.oneStopException ? "利用する" : "利用しない"}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment-info">
                      <AccordionTrigger className="text-[#0068b7]">お支払い情報</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">支払い方法:</span>
                            <span className="col-span-2">クレジットカード決済</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">カード番号:</span>
                            <span className="col-span-2">**** **** **** {formData.cardNumber.slice(-4)}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">カード名義:</span>
                            <span className="col-span-2">{formData.cardName}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">有効期限:</span>
                            <span className="col-span-2">{formData.cardExpiry}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700">申し込み後の流れ</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      申し込み完了後、クレジットカードでの決済が行われます。
                      ワンストップ特例制度を利用される方には、後日必要書類を郵送いたします。
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      戻る
                    </Button>
                    <Button onClick={handleSubmit} className="bg-[#0068b7] hover:bg-[#0068b7]/90" disabled={loading}>
                      {loading ? "送信中..." : "申し込みを確定する"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
