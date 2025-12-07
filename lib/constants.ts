import type { LandingPageContent } from './types'

export const landingPageContent: LandingPageContent = {
  hero: {
    headline: 'Life Insurance That Stands the Test of Time',
    subheadline:
      'Protecting British Columbia families with transparent, affordable coverage built for the long haul. Get the peace of mind you deserve.',
    primaryCTA: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
      variant: 'primary',
    },
    secondaryCTA: {
      text: 'Speak to a BC Advisor',
      href: '/contact',
      variant: 'outline',
    },
    trustMicrocopy: [
      'No obligation quote',
      '2-minute application',
      'Instant estimates',
    ],
    imageUrl:
      'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/7efb3018-05ca-453e-0d48-cc1b38a44900/public',
    imageAlt:
      'Life insurance and family protection concept. assurance, insurance, car, real estate and property, travel, finances, health, family, life, accident, and logistics insurance. complete insurance,',
  },
  trustIndicators: [
    {
      value: 'A+',
      label: 'Financial Strength',
    },
    {
      value: '10K+',
      label: 'Families Protected',
    },
    {
      value: '15+',
      label: 'Years of Service',
    },
  ],
  whyChoose: {
    title: 'Why Choose Insured by Rajan',
    description:
      "We're not just another insurance broker. We're your BC neighbors committed to protecting what matters most to you and your family.",
    benefits: [
      {
        title: 'BC-Licensed Expert',
        description:
          'Fully licensed and regulated in British Columbia, ensuring you receive expert guidance tailored to provincial regulations.',
        icon: 'heart-pulse',
      },
      {
        title: 'Transparent Pricing',
        description:
          "No hidden fees or surprises. Get clear, upfront pricing and understand exactly what you're paying for.",
        icon: 'hand-holding-dollar',
      },
      {
        title: 'Family-First Approach',
        description:
          'We treat every client like family, taking the time to understand your unique needs and life goals.',
        icon: 'users',
      },
      {
        title: 'Fast & Simple Process',
        description:
          'Get a quote in minutes, not hours. Our streamlined application process makes protecting your family effortless.',
        icon: 'clock',
      },
    ],
  },
  insurancePlans: [
    {
      id: 'term-life',
      type: 'Term Life',
      description: 'Affordable coverage for a specific period',
      startingPrice: 'From $25/month',
      features: [
        '10, 20, or 30-year terms',
        'Coverage up to $5M',
        'Convertible options',
      ],
      imageUrl:
        'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/2e332dcf-96f1-42d9-faf9-250cfd336c00/public',
      imageAlt:
        'A wooden doll under an umbrella holding by agent represent insurance . Family , protection, life.',
      ctaLink: '/products/term-life',
      color: 'primary',
    },
    {
      id: 'whole-life',
      type: 'Whole Life',
      description: 'Lifelong protection with cash value',
      startingPrice: 'From $85/month',
      features: ['Guaranteed premiums', 'Builds cash value', 'Lifetime coverage'],
      imageUrl:
        'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/1f33fc20-aa5b-4764-64a2-41a8496ac000/public',
      imageAlt:
        'Umbrella icon and family model, Security protection and health insurance. The concept of family home, protection, health care day, car insurance.',
      ctaLink: '/products/whole-life',
      color: 'accent',
    },
    {
      id: 'universal-life',
      type: 'Universal Life',
      description: 'Flexible premiums & investment options',
      startingPrice: 'From $120/month',
      features: [
        'Adjustable premiums',
        'Investment component',
        'Tax-advantaged growth',
      ],
      imageUrl:
        'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/a82f3505-69e4-41db-c2fd-2a97c213f100/public',
      imageAlt:
        'Umbrella icon and family model, Security protection and health insurance. The concept of family home, protection, health care day, car insurance.',
      ctaLink: '/products/universal-life',
      isPopular: true,
      color: 'dark',
    },
    {
      id: 'critical-illness',
      type: 'Critical Illness',
      description: 'Lump-sum payment for serious illness',
      startingPrice: 'From $45/month',
      features: ['Covers 25+ conditions', 'Tax-free lump sum', 'Use funds as needed'],
      imageUrl:
        'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/f62823fc-52a5-4ee1-72ff-aa7e002aa800/public',
      imageAlt:
        'Concept of life insurance offers essential protection for family financial stability, covering medical and health care services to ensure their well-being. insurance, family, life, protection, money.',
      ctaLink: '/products/critical-illness',
      color: 'red',
    },
  ],
  howItWorks: {
    title: 'How It Works',
    description:
      "Getting life insurance shouldn't be complicated. Our simple 3-step process makes protecting your family effortless.",
    steps: [
      {
        number: 1,
        title: 'Share Your Needs',
        description:
          'Tell us about yourself, your family, and your coverage goals. Our simple questionnaire takes just 2 minutes.',
        timeIndicator: '2 minutes',
        icon: 'clipboard-list',
      },
      {
        number: 2,
        title: 'Get Instant Quotes',
        description:
          "Receive personalized quotes from Canada's top insurers. Compare plans side-by-side to find your perfect match.",
        timeIndicator: 'Instant results',
        icon: 'calculator',
      },
      {
        number: 3,
        title: 'Get Protected',
        description:
          'Complete your application online or speak with Rajan directly. Coverage can start as soon as the same day.',
        timeIndicator: 'Same-day coverage',
        icon: 'shield-check',
      },
    ],
  },
  whyBC: {
    title: 'Why British Columbians Choose Insured by Rajan',
    description:
      'As a fellow British Columbian, Rajan Thind understands the unique needs of families across our beautiful province—from Vancouver to Victoria, Kelowna to Surrey.',
    imageUrl:
      'https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/28e6b85b-fb33-428e-f7af-7a669a26da00/publicContain',
    imageAlt:
      'Business hands, clients and signature on paper of legal contract, agreement and office consultation. Notary, advisor or people writing on documents for funding, terms and conditions or life insurance',
    valuePropositions: [
      {
        title: 'Local BC Expertise',
        description:
          'Deep understanding of BC regulations, tax advantages, and family needs',
        icon: 'map-location-dot',
      },
      {
        title: 'Personalized Service',
        description:
          'One-on-one consultations, not automated responses—talk to Rajan directly',
        icon: 'handshake',
      },
      {
        title: 'No Pressure, Just Honest Advice',
        description:
          "We prioritize your family's needs over commissions—always",
        icon: 'file-contract',
      },
      {
        title: 'Lifetime Support',
        description:
          "From application to claims, we're here for every step of your journey",
        icon: 'headset',
      },
    ],
    statistics: [
      {
        value: '10,000+',
        label: 'Families Protected',
      },
    ],
  },
  faq: [
    {
      id: 'coverage-amount',
      question: 'How much life insurance do I need?',
      answer:
        'A good rule of thumb is to have coverage worth 10-12 times your annual income. However, the right amount depends on your specific situation—including debts, dependents, income replacement needs, and future goals like college funding. Our free quote tool will help you calculate a personalized recommendation based on your unique circumstances.',
    },
    {
      id: 'term-vs-whole',
      question: "What's the difference between term and whole life insurance?",
      answer:
        '**Term life** covers you for a specific period (10, 20, or 30 years) and is typically more affordable. It\'s perfect for covering temporary needs like a mortgage or raising children. **Whole life** provides lifetime coverage and builds cash value over time, but costs more. Think of term as "renting" and whole life as "buying" your insurance.',
    },
    {
      id: 'health-impact',
      question: 'Will my health affect my life insurance rates?',
      answer:
        'Yes, your health, age, and lifestyle all impact your premium rates. That\'s why it\'s best to apply when you\'re younger and healthier. However, even if you have pre-existing conditions, you can still get coverage—you may just pay slightly higher rates. We work with multiple insurers to find you the best rates regardless of your health situation.',
    },
    {
      id: 'coverage-speed',
      question: 'How quickly can I get covered?',
      answer:
        'For simplified issue policies (no medical exam), you can get coverage in as little as 24-48 hours. For fully underwritten policies that require a medical exam, the process typically takes 2-4 weeks. We\'ll guide you through every step and work to get you approved as quickly as possible.',
    },
    {
      id: 'tax-implications',
      question: 'Are life insurance payouts taxable in Canada?',
      answer:
        'No! Life insurance death benefits are generally tax-free in Canada. Your beneficiaries receive the full payout without owing income tax on it. This makes life insurance one of the most tax-efficient ways to transfer wealth and protect your family\'s financial future.',
    },
    {
      id: 'cancellation',
      question: 'Can I cancel my policy if my situation changes?',
      answer:
        'Yes, you can cancel your life insurance policy at any time. Most policies have a 10-day "free look" period where you can cancel for a full refund. After that, you can still cancel, though you won\'t receive a refund for term policies. For whole life or universal life policies with cash value, you may be entitled to receive the surrender value. We\'re always here to discuss your options if your needs change.',
    },
  ],
  navigation: [
    {
      label: 'Why Choose',
      href: '#why-choose',
      isAnchor: true,
    },
    {
      label: 'Plans',
      href: '#plans',
      isAnchor: true,
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
      isAnchor: true,
    },
    {
      label: 'FAQ',
      href: '#faq',
      isAnchor: true,
    },
    {
      label: 'Contact',
      href: '/contact',
      isAnchor: false,
    },
  ],
}

