"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Upload, AlertCircle, Info, CreditCard, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CorporateDonationPage() {
  const router = useRouter()
  const [donationType, setDonationType] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [customAmount, setCustomAmount] = useState("100000")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    companyName: "",
    corporateNumber: "",
    representative: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
    website: "",
    contactPerson: "",
    contactPersonTitle: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    documentUploaded: false,
    termsAgreed: false,
    privacyAgreed: false,
    antiSocialCheck: false,
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const donationOptions = [
    { id: "bronze", title: "ブロンズサポーター", amount: "100,000" },
    { id: "silver", title: "シルバーサポーター", amount: "300,000" },
    { id: "gold", title: "ゴールドサポーター", amount: "500,000" },
    { id: "platinum", title: "プラチナサポーター", amount: "1,000,000" },
    { id: "diamond", title: "ダイヤモンドサポーター", amount: "3,000,000" },
    { id: "custom", title: "カスタム寄附", amount: customAmount },
  ]

  // 以下を useEffect の前に追加
  useEffect(() => {
    // URLからプランパラメータを取得
    const searchParams = new URLSearchParams(window.location.search)
    const planParam = searchParams.get("plan")

    // 有効なプランの場合はそれを設定、なければデフォルト値を設定
    if (planParam && donationOptions.some((option) => option.id === planParam)) {
      setDonationType(planParam)
    } else {
      setDonationType("gold") // デフォルト値
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

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
    setFormData({
      ...formData,
      paymentMethod: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // 実際の実装ではここでフォームデータを送信する処理を行う
    setTimeout(() => {
      setLoading(false)
      router.push("/donation-complete/corporate")
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
              <CardTitle className="text-2xl">法人向け寄附申し込み</CardTitle>
              <CardDescription className="text-white/80">企業版ふるさと納税を活用した寄附のお申し込み</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* ステップ表示 - 4ステップに変更 */}
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
                    <span className="text-xs mt-1">企業情報</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-[#0068b7]" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#0068b7] text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      3
                    </div>
                    <span className="text-xs mt-1">決済情報</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${step >= 4 ? "bg-[#0068b7]" : "bg-gray-200"}`}></div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? "bg-[#0068b7] text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      4
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
                          <div className="text-sm text-gray-500 mb-2">ご希望の金額を入力してください（10万円以上）</div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">¥</span>
                          </div>
                          <Input
                            type="number"
                            min="100000"
                            step="10000"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            onClick={() => setDonationType("custom")}
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700">企業版ふるさと納税について</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      企業版ふるさと納税では、寄附額の最大約9割が税額控除されます。 詳しくは
                      <Link href="/corporate-tax" className="underline">
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

              {/* ステップ2: 企業情報入力 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-[#0068b7]">企業情報の入力</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        企業名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="corporateNumber">
                        法人番号 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="corporateNumber"
                        name="corporateNumber"
                        placeholder="例: 1234567890123"
                        value={formData.corporateNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="representative">
                        代表者名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="representative"
                        name="representative"
                        value={formData.representative}
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

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">
                        住所 <span className="text-red-500">*</span>
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
                        placeholder="例: 03-1234-5678"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">会社ホームページ</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="例: https://www.example.com"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">担当者情報</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">
                          担当者名 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPersonTitle">役職</Label>
                        <Input
                          id="contactPersonTitle"
                          name="contactPersonTitle"
                          value={formData.contactPersonTitle}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPersonPhone">
                          電話番号 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPersonPhone"
                          name="contactPersonPhone"
                          value={formData.contactPersonPhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPersonEmail">
                          メールアドレス <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPersonEmail"
                          name="contactPersonEmail"
                          type="email"
                          value={formData.contactPersonEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">書類のアップロード</h3>

                    <Alert className="mb-4 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <AlertTitle className="text-amber-700">反社会的勢力でないことの確認</AlertTitle>
                      <AlertDescription className="text-amber-600">
                        企業版ふるさと納税の手続きには、反社会的勢力でないことの確認が必要です。
                        以下の書類をアップロードしてください。
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">登記簿謄本または履歴事項全部証明書をアップロード</p>
                          <p className="text-xs text-gray-400 mb-4">PDF、JPG、PNG形式（10MB以内）</p>
                          <Button
                            variant="outline"
                            className="relative"
                            onClick={() => handleCheckboxChange("documentUploaded", true)}
                          >
                            ファイルを選択
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </Button>
                          {formData.documentUploaded && (
                            <p className="text-green-600 text-sm mt-2">ファイルがアップロードされました</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="antiSocialCheck"
                          checked={formData.antiSocialCheck}
                          onCheckedChange={(checked) => handleCheckboxChange("antiSocialCheck", checked)}
                        />
                        <Label htmlFor="antiSocialCheck" className="text-sm leading-tight">
                          当社は、反社会的勢力（暴力団、暴力団員、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロ、特殊知能暴力集団等）ではなく、また、反社会的勢力と関係を有していないことを誓約します。
                        </Label>
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
                        !formData.companyName ||
                        !formData.corporateNumber ||
                        !formData.representative ||
                        !formData.postalCode ||
                        !formData.address ||
                        !formData.phoneNumber ||
                        !formData.contactPerson ||
                        !formData.contactPersonPhone ||
                        !formData.contactPersonEmail ||
                        !formData.documentUploaded ||
                        !formData.antiSocialCheck ||
                        !formData.termsAgreed ||
                        !formData.privacyAgreed
                      }
                    >
                      次へ進む
                    </Button>
                  </div>
                </div>
              )}

              {/* ステップ3: 決済情報入力（新規追加） */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-[#0068b7]">決済情報の入力</h2>

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">お支払い方法</h3>

                    <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
                      <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-[#0068b7] transition-colors">
                        <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                            <CreditCard className="h-5 w-5 mr-2 text-[#0068b7]" />
                            <div className="font-medium">クレジットカード決済</div>
                          </Label>
                          <p className="text-sm text-gray-500 mt-1 ml-7">
                            VISA、Mastercard、JCB、American Express、Dinersがご利用いただけます
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-[#0068b7] transition-colors">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                            <Building className="h-5 w-5 mr-2 text-[#0068b7]" />
                            <div className="font-medium">銀行振込</div>
                          </Label>
                          <p className="text-sm text-gray-500 mt-1 ml-7">口座番号は追って宇部市職員からご連絡します</p>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "credit-card" && (
                      <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
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
                    )}

                    {paymentMethod === "bank-transfer" && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <Alert className="bg-blue-50 border-blue-200">
                          <Info className="h-4 w-4 text-blue-500" />
                          <AlertDescription className="text-blue-600">
                            銀行振込を選択された場合、申し込み完了後に宇部市職員から振込先情報をご連絡いたします。
                            お振込の際は、お申込み番号を振込依頼人名の前に記載してください。
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      戻る
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="bg-[#0068b7] hover:bg-[#0068b7]/90"
                      disabled={
                        paymentMethod === "credit-card" &&
                        (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvc)
                      }
                    >
                      次へ進む
                    </Button>
                  </div>
                </div>
              )}

              {/* ステップ4: 確認画面（旧ステップ3） */}
              {step === 4 && (
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
                        <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                          <span className="font-medium">お支払い方法:</span>
                          <span>{formData.paymentMethod === "credit-card" ? "クレジットカード決済" : "銀行振込"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Accordion type="single" collapsible defaultValue="company-info">
                    <AccordionItem value="company-info">
                      <AccordionTrigger className="text-[#0068b7]">企業情報</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">企業名:</span>
                            <span className="col-span-2">{formData.companyName}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">法人番号:</span>
                            <span className="col-span-2">{formData.corporateNumber}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">代表者名:</span>
                            <span className="col-span-2">{formData.representative}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">郵便番号:</span>
                            <span className="col-span-2">{formData.postalCode}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">住所:</span>
                            <span className="col-span-2">{formData.address}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">電話番号:</span>
                            <span className="col-span-2">{formData.phoneNumber}</span>
                          </div>
                          {formData.website && (
                            <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                              <span className="font-medium">会社ホームページ:</span>
                              <span className="col-span-2">{formData.website}</span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contact-info">
                      <AccordionTrigger className="text-[#0068b7]">担当者情報</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">担当者名:</span>
                            <span className="col-span-2">{formData.contactPerson}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">役職:</span>
                            <span className="col-span-2">{formData.contactPersonTitle}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">電話番号:</span>
                            <span className="col-span-2">{formData.contactPersonPhone}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                            <span className="font-medium">メールアドレス:</span>
                            <span className="col-span-2">{formData.contactPersonEmail}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {formData.paymentMethod === "credit-card" && (
                      <AccordionItem value="payment-info">
                        <AccordionTrigger className="text-[#0068b7]">お支払い情報</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
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
                    )}
                  </Accordion>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-700">申し込み後の流れ</AlertTitle>
                    <AlertDescription className="text-blue-600">
                      {formData.paymentMethod === "credit-card" ? (
                        <>
                          申し込み完了後、宇部市の担当者が企業情報を確認し、1週間以内にご連絡いたします。
                          クレジットカード決済は申し込み完了時に処理されます。
                        </>
                      ) : (
                        <>
                          申し込み完了後、宇部市の担当者が企業情報を確認し、1週間以内にご連絡いたします。
                          その後、寄附金の振込先情報をお伝えします。
                        </>
                      )}
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
