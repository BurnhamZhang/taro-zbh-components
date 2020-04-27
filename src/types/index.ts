interface LabeledMeta {
  label: string
  text: string
  image: string
}

//商家信息
export interface MerchantProfile {
  _id: string
  name: string
  enterprise?: string
  walletAddress?: string
  subMerchant: string
  contact: {
    sectionName: string
    address: LabeledMeta
    phone: LabeledMeta
    email: LabeledMeta
    website: LabeledMeta
    wxsub: LabeledMeta
  }
  portfolio: {
    sectionName: string
    USCI: LabeledMeta
    type: LabeledMeta
    capital: LabeledMeta
    since: LabeledMeta
    businessDate: LabeledMeta
    legalEntity: LabeledMeta
    businessState: LabeledMeta
  }
  impression: {
    slogan: LabeledMeta
    intro: LabeledMeta
  }
  logo: string
  photos: Array<{
    caption: string
    image: string
  }>
}

export interface TokenTempletProfileTheme {
  background: string
}
export interface TokenTempletProfile {
  theme: TokenTempletProfileTheme
  minTransfer: number
}
// 卡券信息
export interface TokenTemplet {
  _id: string
  name: string
  fullname: string
  limit: number
  description: string
  price: number
  duration: number
  function: 'pay' | 'coupon' | 'proxy'
  issuer: MerchantProfile
  reward: {
    ratio: string
    templet: number
  }
  profile: TokenTempletProfile
}

// 购买的卡券信息
export interface Token {
  _id: string
  issuer: MerchantProfile
  amount: number
  owner: string
  expire: number
  transferFee: number
  templet: TokenTemplet
  theme?: TokenThemeObject
  transferOut: boolean
  nonce: any
  marketingTempletShare?: {
    total: number
  }
}

interface TokenThemeObject {
  themeId: string
  theme: TokenTheme
}

interface TokenTheme {
  background: string
}

