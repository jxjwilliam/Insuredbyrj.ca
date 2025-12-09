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
      text: 'Speak to Rajan',
      href: 'tel:7788300142',
      variant: 'outline',
    },
    trustMicrocopy: [
      'No obligation quote',
      '2-minute application',
      'Instant estimates',
    ],
    imageUrl: '/origin/hero-image.webp',
    imageAlt:
      'Life insurance and family protection concept. assurance, insurance, car, real estate and property, travel, finances, health, family, life, accident, and logistics insurance. complete insurance,',
  },
  trustIndicators: [
    {
      value: 'A+',
      label: 'Financial Strength',
      credentialId: 'financial-strength-rating',
    },
    {
      value: '10K+',
      label: 'Families Protected',
    },
    {
      value: '15+',
      label: 'Years of Service',
      credentialId: 'years-experience',
    },
  ],
  trustCredentials: [
    {
      id: 'bc-insurance-license',
      type: 'license',
      title: 'BC Insurance License',
      issuer: 'Insurance Council of British Columbia',
      description:
        'Fully licensed and regulated to sell life insurance, health insurance, and other insurance products in British Columbia. License maintained in good standing.',
      verificationUrl: 'https://www.insurancecouncilofbc.com',
      icon: 'shield-check',
      badge: 'Licensed',
    },
    {
      id: 'insureline-franchise',
      type: 'certification',
      title: 'InsureLine Franchise Certification',
      issuer: 'InsureLine Brokers',
      description:
        'Certified InsureLine franchisee providing access to multiple insurance carriers and markets. This affiliation enables us to shop the market to find the best coverage and rates for our clients.',
      icon: 'building',
      badge: 'Certified',
    },
    {
      id: 'financial-strength-rating',
      type: 'award',
      title: 'A+ Financial Strength Rating',
      issuer: 'A.M. Best Company',
      description:
        'Our primary insurance carriers maintain A+ (Superior) financial strength ratings, indicating exceptional ability to meet ongoing insurance obligations.',
      verificationUrl: 'https://www.ambest.com',
      icon: 'award',
      badge: 'A+ Rating',
    },
    {
      id: 'years-experience',
      type: 'certification',
      title: '15+ Years of Insurance Experience',
      issuer: 'Industry Experience',
      description:
        'Over 15 years of dedicated service helping British Columbia families protect what matters most. Extensive experience with term life, whole life, universal life, and critical illness insurance.',
      icon: 'calendar',
    },
    {
      id: 'local-expertise',
      type: 'membership',
      title: 'BC Community Member',
      issuer: 'Local Business',
      description:
        'Deeply rooted in the British Columbia community, serving families across Surrey, Delta, and surrounding areas. Understanding of local needs and BC-specific insurance regulations.',
      icon: 'map-pin',
    },
    {
      id: 'carrier-partnerships',
      type: 'partnership',
      title: 'Multiple Carrier Partnerships',
      issuer: 'Top Insurance Companies',
      description:
        'Partnerships with Canada\'s leading insurance carriers including Manulife, Sun Life, Canada Life, and others. This allows us to compare options and find the best fit for each client.',
      icon: 'handshake',
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
      imageUrl: '/origin/plan-term-life.webp',
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
      imageUrl: '/origin/plan-whole-life.webp',
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
      imageUrl: '/origin/plan-universal-life.webp',
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
      imageUrl: '/origin/plan-critical-illness.webp',
      imageAlt:
        'Concept of life insurance offers essential protection for family financial stability, covering medical and health care services to ensure their well-being. insurance, family, life, protection, money.',
      ctaLink: '/products/critical-illness',
      color: 'red',
    },
  ],
  detailedPlanInfo: [
    {
      planId: 'term-life',
      coverageRange: {
        min: '$100,000',
        max: '$5,000,000',
      },
      eligibility: {
        minAge: 18,
        maxAge: 75,
        healthRequirements: [
          'Medical exam may be required for coverage over $1M',
          'Health questionnaire required',
          'Tobacco use affects rates',
        ],
        occupationRestrictions: ['High-risk occupations may have restrictions'],
      },
      exclusions: [
        'Suicide within first 2 years of policy',
        'Pre-existing conditions not disclosed during application',
        'Death from illegal activities',
        'War or acts of terrorism (varies by insurer)',
      ],
      useCases: [
        'Mortgage protection for homeowners',
        'Income replacement for families with dependents',
        'Debt coverage (student loans, credit cards)',
        'Business partnership protection',
        'Coverage during child-rearing years',
      ],
      comparisonPoints: {
        affordability: 'high',
        flexibility: 'medium',
        cashValue: false,
        termLength: '10, 20, or 30 years',
      },
      additionalFeatures: [
        'Convertible to permanent life insurance',
        'Renewable at end of term',
        'Accelerated death benefit option',
      ],
    },
    {
      planId: 'whole-life',
      coverageRange: {
        min: '$50,000',
        max: '$10,000,000',
      },
      eligibility: {
        minAge: 0,
        maxAge: 85,
        healthRequirements: [
          'Medical exam typically required',
          'Health questionnaire required',
          'Underwriting process more thorough',
        ],
        occupationRestrictions: [],
      },
      exclusions: [
        'Suicide within first 2 years',
        'Pre-existing conditions not disclosed',
        'Death from illegal activities',
        'War or acts of terrorism (varies by insurer)',
      ],
      useCases: [
        'Lifetime protection needs',
        'Estate planning and wealth transfer',
        'Building cash value over time',
        'Guaranteed premiums for life',
        'Coverage for final expenses',
      ],
      comparisonPoints: {
        affordability: 'low',
        flexibility: 'low',
        cashValue: true,
        termLength: undefined,
      },
      additionalFeatures: [
        'Guaranteed cash value accumulation',
        'Dividend potential (participating policies)',
        'Policy loans available',
        'Guaranteed death benefit',
      ],
    },
    {
      planId: 'universal-life',
      coverageRange: {
        min: '$100,000',
        max: '$25,000,000',
      },
      eligibility: {
        minAge: 18,
        maxAge: 80,
        healthRequirements: [
          'Medical exam typically required',
          'Health questionnaire required',
          'Financial underwriting for large amounts',
        ],
        occupationRestrictions: [],
      },
      exclusions: [
        'Suicide within first 2 years',
        'Pre-existing conditions not disclosed',
        'Death from illegal activities',
        'War or acts of terrorism (varies by insurer)',
      ],
      useCases: [
        'Flexible premium payments',
        'Investment component with tax advantages',
        'Estate planning for high-net-worth individuals',
        'Business succession planning',
        'Supplemental retirement savings',
      ],
      comparisonPoints: {
        affordability: 'medium',
        flexibility: 'high',
        cashValue: true,
        termLength: undefined,
      },
      additionalFeatures: [
        'Adjustable death benefit',
        'Flexible premium payments',
        'Investment options within policy',
        'Tax-deferred cash value growth',
        'Policy loans and withdrawals',
      ],
    },
    {
      planId: 'critical-illness',
      coverageRange: {
        min: '$25,000',
        max: '$2,000,000',
      },
      eligibility: {
        minAge: 18,
        maxAge: 65,
        healthRequirements: [
          'Health questionnaire required',
          'Medical exam may be required',
          'Pre-existing conditions may be excluded',
        ],
        occupationRestrictions: [],
      },
      exclusions: [
        'Pre-existing conditions (varies by policy)',
        'Conditions diagnosed within waiting period',
        'Self-inflicted injuries',
        'War or acts of terrorism',
        'Participation in illegal activities',
      ],
      useCases: [
        'Income replacement during recovery',
        'Medical expenses not covered by health insurance',
        'Mortgage payments during illness',
        'Home modifications for accessibility',
        'Debt repayment during treatment',
      ],
      comparisonPoints: {
        affordability: 'medium',
        flexibility: 'medium',
        cashValue: false,
        termLength: 'To age 65, 75, or 100',
      },
      additionalFeatures: [
        'Lump-sum tax-free payment',
        'Covers 25+ critical conditions',
        'Return of premium options available',
        'Survivor benefit options',
      ],
    },
  ],
  pricingScenarios: [
    // Term Life Scenarios
    {
      id: 'term-life-35-excellent',
      planId: 'term-life',
      profile: {
        age: 35,
        gender: 'male',
        healthStatus: 'excellent',
        coverageAmount: '$500,000',
        termLength: '20 years',
      },
      monthlyPremium: '$45/month',
      annualPremium: '$540/year',
      notes: 'Non-smoker, excellent health, no pre-existing conditions',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    {
      id: 'term-life-30-good',
      planId: 'term-life',
      profile: {
        age: 30,
        gender: 'female',
        healthStatus: 'good',
        coverageAmount: '$250,000',
        termLength: '30 years',
      },
      monthlyPremium: '$28/month',
      annualPremium: '$336/year',
      notes: 'Non-smoker, good health, minor conditions',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    {
      id: 'term-life-40-fair',
      planId: 'term-life',
      profile: {
        age: 40,
        gender: 'male',
        healthStatus: 'fair',
        coverageAmount: '$1,000,000',
        termLength: '20 years',
      },
      monthlyPremium: '$120/month',
      annualPremium: '$1,440/year',
      notes: 'Non-smoker, fair health, some health conditions',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    // Whole Life Scenarios
    {
      id: 'whole-life-35-excellent',
      planId: 'whole-life',
      profile: {
        age: 35,
        gender: 'male',
        healthStatus: 'excellent',
        coverageAmount: '$250,000',
      },
      monthlyPremium: '$95/month',
      annualPremium: '$1,140/year',
      notes: 'Non-smoker, excellent health, builds cash value over time',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    {
      id: 'whole-life-45-good',
      planId: 'whole-life',
      profile: {
        age: 45,
        gender: 'female',
        healthStatus: 'good',
        coverageAmount: '$500,000',
      },
      monthlyPremium: '$220/month',
      annualPremium: '$2,640/year',
      notes: 'Non-smoker, good health, lifetime coverage with cash value',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    // Universal Life Scenarios
    {
      id: 'universal-life-40-excellent',
      planId: 'universal-life',
      profile: {
        age: 40,
        gender: 'male',
        healthStatus: 'excellent',
        coverageAmount: '$1,000,000',
      },
      monthlyPremium: '$180/month',
      annualPremium: '$2,160/year',
      notes: 'Non-smoker, excellent health, flexible premiums, investment component',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    {
      id: 'universal-life-35-good',
      planId: 'universal-life',
      profile: {
        age: 35,
        gender: 'female',
        healthStatus: 'good',
        coverageAmount: '$500,000',
      },
      monthlyPremium: '$130/month',
      annualPremium: '$1,560/year',
      notes: 'Non-smoker, good health, adjustable premiums and death benefit',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    // Critical Illness Scenarios
    {
      id: 'critical-illness-35-excellent',
      planId: 'critical-illness',
      profile: {
        age: 35,
        gender: 'male',
        healthStatus: 'excellent',
        coverageAmount: '$100,000',
      },
      monthlyPremium: '$55/month',
      annualPremium: '$660/year',
      notes: 'Non-smoker, excellent health, covers 25+ critical conditions',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
    },
    {
      id: 'critical-illness-40-good',
      planId: 'critical-illness',
      profile: {
        age: 40,
        gender: 'female',
        healthStatus: 'good',
        coverageAmount: '$250,000',
      },
      monthlyPremium: '$125/month',
      annualPremium: '$1,500/year',
      notes: 'Non-smoker, good health, tax-free lump sum payment',
      disclaimer:
        'Pricing is representative and may vary based on individual circumstances, health status, and underwriting results. Actual premiums may differ.',
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
        detailId: 'step-1-details',
      },
      {
        number: 2,
        title: 'Get Instant Quotes',
        description:
          "Receive personalized quotes from Canada's top insurers. Compare plans side-by-side to find your perfect match.",
        timeIndicator: 'Instant results',
        icon: 'calculator',
        detailId: 'step-2-details',
      },
      {
        number: 3,
        title: 'Get Protected',
        description:
          'Complete your application online or speak with Rajan directly. Coverage can start as soon as the same day.',
        timeIndicator: 'Same-day coverage',
        icon: 'shield-check',
        detailId: 'step-3-details',
      },
    ],
  },
  processDetails: [
    {
      stepNumber: 1,
      subSteps: [
        {
          title: 'Complete Online Questionnaire',
          description:
            'Answer a few simple questions about your age, health, coverage needs, and beneficiaries. This takes approximately 2 minutes.',
          timeRequired: '2 minutes',
          requiredDocuments: [],
          questions: [
            'What is your age and gender?',
            'What is your current health status?',
            'How much coverage do you need?',
            'Who are your beneficiaries?',
            'What is your preferred coverage term?',
          ],
        },
        {
          title: 'Speak with Rajan (Optional)',
          description:
            'Schedule a free consultation with Rajan to discuss your specific needs and get personalized recommendations.',
          timeRequired: '15-30 minutes',
          requiredDocuments: [],
        },
      ],
      medicalExamInfo: {
        required: false,
        description:
          'For simplified issue policies, no medical exam is required. We can provide instant quotes based on your health questionnaire.',
        scheduling: 'Not required for simplified issue policies',
        whatToExpect: [],
      },
      postApplication: {
        timeline: 'Immediate',
        nextSteps: [
          'Review your personalized quotes',
          'Compare plans side-by-side',
          'Select the plan that best fits your needs',
        ],
        contactInfo: 'Contact Rajan at 778-830-0142 or infinity@insureline.com',
      },
    },
    {
      stepNumber: 2,
      subSteps: [
        {
          title: 'Receive Personalized Quotes',
          description:
            'Get quotes from multiple top-rated insurance carriers. Compare coverage, premiums, and features side-by-side.',
          timeRequired: 'Instant',
          requiredDocuments: [],
        },
        {
          title: 'Review Plan Options',
          description:
            'Each quote includes detailed information about coverage, premiums, exclusions, and policy features.',
          timeRequired: '5-10 minutes',
          requiredDocuments: [],
        },
        {
          title: 'Ask Questions',
          description:
            'Our team is available to answer any questions about the quotes, help you understand the differences, and recommend the best option for your situation.',
          timeRequired: 'As needed',
          requiredDocuments: [],
        },
      ],
      medicalExamInfo: undefined,
      postApplication: {
        timeline: 'Same day',
        nextSteps: [
          'Choose your preferred plan',
          'Proceed to application',
          'Complete underwriting process',
        ],
        contactInfo: 'Contact Rajan at 778-830-0142 or infinity@insureline.com',
      },
    },
    {
      stepNumber: 3,
      subSteps: [
        {
          title: 'Complete Application',
          description:
            'Fill out the full application form with detailed information about your health, lifestyle, and medical history.',
          timeRequired: '15-20 minutes',
          requiredDocuments: [
            'Government-issued ID (driver\'s license or passport)',
            'Social Insurance Number (SIN)',
            'Medical records (if applicable)',
            'Banking information for premium payments',
          ],
          questions: [
            'Detailed health history',
            'Family medical history',
            'Lifestyle questions (smoking, hobbies, occupation)',
            'Financial information',
            'Beneficiary details',
          ],
        },
        {
          title: 'Medical Exam (If Required)',
          description:
            'For larger coverage amounts or certain health conditions, a medical exam may be required. This is typically scheduled at your convenience.',
          timeRequired: '30-45 minutes',
          requiredDocuments: ['Medical exam appointment confirmation'],
        },
        {
          title: 'Underwriting Review',
          description:
            'The insurance company reviews your application, medical exam results (if applicable), and other information to determine your eligibility and premium rate.',
          timeRequired: '2-4 weeks',
          requiredDocuments: [],
        },
      ],
      medicalExamInfo: {
        required: true,
        description:
          'Medical exams are typically required for coverage amounts over $1 million, certain health conditions, or when requested by the insurer. The exam is conducted by a licensed medical professional at a location convenient for you.',
        scheduling:
          'After submitting your application, we\'ll schedule your medical exam at a time and location convenient for you. Exams can often be done at your home or office.',
        whatToExpect: [
          'Basic health measurements (height, weight, blood pressure)',
          'Blood and urine samples',
          'Health questionnaire review',
          'Discussion of medical history',
          'The entire process takes 30-45 minutes',
        ],
      },
      postApplication: {
        timeline: '2-4 weeks for full underwriting, 24-48 hours for simplified issue',
        nextSteps: [
          'Application submitted to insurance carrier',
          'Medical exam scheduled (if required)',
          'Underwriting review process',
          'Approval and policy delivery',
          'Coverage begins upon first premium payment',
        ],
        contactInfo:
          'Contact Rajan at 778-830-0142 or infinity@insureline.com for status updates',
      },
    },
  ],
  whyBC: {
    title: 'Why British Columbians Choose Insured by Rajan',
    description:
      'As a fellow British Columbian, Rajan Thind understands the unique needs of families across our beautiful province—from Vancouver to Victoria, Kelowna to Surrey.',
    imageUrl: '/origin/why-bc-image.webp',
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
  testimonials: [
    {
      id: 'testimonial-1',
      customerName: 'Sarah M.',
      location: 'Surrey, BC',
      situation: 'New parent looking for term life insurance to protect my family',
      experience:
        'Rajan made the whole process so easy. I was overwhelmed trying to understand life insurance as a new parent, but he took the time to explain everything clearly and helped me find the perfect term life policy. The application was simple and I got approved quickly.',
      outcome:
        'Got $500,000 in term life coverage for just $45/month. Peace of mind knowing my family is protected.',
      rating: 5,
      date: '2024-11-15',
      verified: true,
    },
    {
      id: 'testimonial-2',
      customerName: 'Michael R.',
      location: 'Delta, BC',
      situation: 'Business owner needing coverage for my family and business',
      experience:
        'As a small business owner, I needed coverage that would protect both my family and my business partners. Rajan understood my unique situation and found a universal life policy that works perfectly. He even helped me understand the tax advantages.',
      outcome:
        'Secured $1M in universal life coverage with flexible premium payments that fit my business cash flow.',
      rating: 5,
      date: '2024-10-22',
      verified: true,
    },
    {
      id: 'testimonial-3',
      customerName: 'Jennifer L.',
      location: 'Surrey, BC',
      situation: 'Single parent wanting to ensure my children are protected',
      experience:
        'I was worried about getting life insurance as a single parent with a pre-existing condition. Rajan worked with multiple insurers and found me a great whole life policy despite my health concerns. He was patient, understanding, and never pressured me.',
      outcome:
        'Approved for whole life coverage with reasonable rates. My children are now protected for life.',
      rating: 5,
      date: '2024-09-08',
      verified: true,
    },
    {
      id: 'testimonial-4',
      customerName: 'David K.',
      location: 'Langley, BC',
      situation: 'Looking to replace my existing term policy with better rates',
      experience:
        'My term life policy was about to expire and rates were going up. Rajan shopped the market and found me a better policy with lower premiums and better coverage. The whole process took less than a week.',
      outcome:
        'Switched to a new 20-year term policy saving $30/month with better coverage terms.',
      rating: 5,
      date: '2024-08-12',
      verified: true,
    },
    {
      id: 'testimonial-5',
      customerName: 'Priya S.',
      location: 'Surrey, BC',
      situation: 'Newcomer to Canada needing insurance for Super Visa application',
      experience:
        'As a newcomer, I needed travel insurance for my parents\' Super Visa application. Rajan explained all the requirements and found the perfect policy that met immigration requirements. His knowledge of both insurance and immigration was invaluable.',
      outcome:
        'Parents got Super Visa approved with the right travel insurance coverage. Rajan made it stress-free.',
      rating: 5,
      date: '2024-07-25',
      verified: true,
    },
  ],
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
    {
      id: 'claims-process',
      question: 'How do I file a life insurance claim?',
      answer:
        'Filing a life insurance claim is straightforward. **Step 1**: Contact us immediately at 778-830-0142 or infinity@insureline.com. **Step 2**: We\'ll guide you through the process and provide the necessary claim forms. **Step 3**: Submit the required documents including the death certificate, claim form, and policy information. **Step 4**: The insurance company reviews the claim (typically 2-4 weeks). **Step 5**: Once approved, the death benefit is paid directly to your beneficiaries, tax-free. We provide full support throughout the entire claims process to ensure it goes as smoothly as possible during a difficult time.',
    },
    {
      id: 'claims-timeline',
      question: 'How long does it take to receive a life insurance payout?',
      answer:
        'Most life insurance claims are processed and paid within **2-4 weeks** after all required documents are submitted. Simplified claims (where cause of death is clear and within policy terms) can be paid in as little as **7-10 business days**. Complex claims (involving investigations, contestable period issues, or missing documentation) may take **4-8 weeks**. We work closely with the insurance carrier to expedite the process and keep you informed every step of the way. The payout is made directly to your named beneficiaries and is **completely tax-free** in Canada.',
    },
    {
      id: 'claims-documents',
      question: 'What documents are needed to file a life insurance claim?',
      answer:
        'To file a life insurance claim, you\'ll typically need: **Required Documents**: 1) Original death certificate (certified copy), 2) Completed claim form (we provide this), 3) Original policy documents or policy number, 4) Beneficiary identification (government-issued ID). **Additional Documents** (if applicable): Medical records if death occurred within contestable period (usually first 2 years), Police report if death was accidental, Autopsy report if required by insurer. We help you gather all necessary documents and ensure everything is submitted correctly to avoid delays.',
    },
    {
      id: 'pre-existing-conditions',
      question: 'Can I get life insurance if I have pre-existing health conditions?',
      answer:
        '**Yes, absolutely!** Having pre-existing health conditions doesn\'t automatically disqualify you from getting life insurance. Many people with conditions like diabetes, high blood pressure, heart disease, or cancer history can still get coverage. **What to expect**: You may pay slightly higher premiums, some conditions may have exclusions (e.g., death from that specific condition within first 2 years), or you may be offered a graded benefit policy. **Our approach**: We work with multiple insurance carriers, each with different underwriting guidelines. This allows us to find the best coverage and rates for your specific situation. We\'ve helped many clients with pre-existing conditions secure affordable coverage.',
    },
    {
      id: 'age-restrictions',
      question: 'Is there an age limit for getting life insurance?',
      answer:
        'Age limits vary by policy type and insurer. **Term Life**: Typically available up to age **75-80**, with some carriers offering coverage to age **85**. **Whole Life**: Can be purchased up to age **80-85**, with some no-exam options available to age **85**. **Universal Life**: Generally available up to age **80**. **Critical Illness**: Usually available up to age **65-70**. **Important considerations**: Premiums increase significantly with age, and coverage amounts may be limited for older applicants. However, we can often find coverage options even for seniors. The best time to get life insurance is when you\'re younger and healthier, but it\'s never too late to protect your family.',
    },
    {
      id: 'smoking-impact',
      question: 'How does smoking affect my life insurance rates?',
      answer:
        'Smoking significantly impacts life insurance premiums. **Rate differences**: Smokers typically pay **2-3 times more** than non-smokers for the same coverage. For example, a 35-year-old non-smoker might pay $45/month for $500K term life, while a smoker might pay $90-135/month. **What counts as smoking**: Most insurers consider you a smoker if you\'ve used tobacco products (cigarettes, cigars, chewing tobacco, vaping) within the **last 12 months**. Some carriers require **2-5 years** of being tobacco-free. **Good news**: If you quit smoking, you can often get your rates reduced after being smoke-free for 1-2 years. We can help you understand your options and find the best rates available for your situation.',
    },
    {
      id: 'beneficiary-changes',
      question: 'Can I change my beneficiaries after purchasing a policy?',
      answer:
        '**Yes, you can change beneficiaries at any time** - this is one of the flexible features of life insurance. **How to change**: Simply contact us or your insurance carrier, complete a beneficiary change form, and submit it. The change is typically effective immediately once processed. **Types of beneficiaries**: You can name primary beneficiaries (who receive the payout first) and contingent beneficiaries (who receive it if primary beneficiaries are deceased). You can also specify percentages (e.g., 50% to spouse, 50% to children). **Important**: Keep beneficiary information updated, especially after major life events like marriage, divorce, or births. Outdated beneficiary information can cause complications during claims.',
    },
    {
      id: 'policy-loans',
      question: 'Can I borrow money from my whole life or universal life policy?',
      answer:
        '**Yes, if your policy has built up cash value**, you can typically take out a policy loan. **How it works**: Whole life and universal life policies accumulate cash value over time. Once there\'s sufficient cash value (usually after several years), you can borrow against it. **Loan terms**: Interest rates are usually competitive, you don\'t need to qualify (it\'s your money), and you can repay on your own schedule. **Important considerations**: Unpaid loans reduce the death benefit, interest accrues on the loan, and if the loan exceeds cash value, the policy may lapse. **Tax implications**: Policy loans are generally tax-free, but consult a tax advisor. This feature makes whole/universal life policies flexible financial tools, not just insurance.',
    },
    {
      id: 'conversion-options',
      question: 'Can I convert my term life policy to permanent insurance?',
      answer:
        '**Many term life policies include conversion options** that allow you to convert to permanent life insurance (whole life or universal life) without a medical exam. **Conversion benefits**: No need to prove insurability, guaranteed acceptance (if conversion option exists), lock in rates based on your original age, perfect if your health has changed. **Conversion windows**: Typically available during the term period (e.g., first 10-15 years of a 20-year term) or up to a certain age (usually 65-70). **When to convert**: Consider converting if you want lifetime coverage, need cash value accumulation, or your health has declined. **Important**: Not all term policies have conversion options - we can help you understand your policy\'s specific terms and conversion deadlines.',
    },
    {
      id: 'group-insurance',
      question: 'Should I rely on my employer\'s group life insurance?',
      answer:
        '**Group insurance is a good start, but often insufficient** for complete protection. **Limitations of group insurance**: Coverage is usually limited (often 1-2x salary), coverage ends when you leave the job, premiums may increase with age, you can\'t customize coverage, and you have no control over the policy. **Why personal insurance matters**: Personal policies stay with you regardless of employment, you can get the exact coverage you need, rates are locked in, and you control beneficiaries. **Best approach**: Use group insurance as a base, then supplement with personal term or whole life insurance to meet your total coverage needs. We can help you calculate the gap and find affordable personal coverage to fill it.',
    },
    {
      id: 'riders-benefits',
      question: 'What are insurance riders and should I add them?',
      answer:
        '**Riders are optional add-ons** that enhance your life insurance policy for additional cost. **Common riders include**: **Accelerated Death Benefit** (access death benefit if diagnosed with terminal illness), **Waiver of Premium** (waives premiums if you become disabled), **Child Rider** (covers children), **Accidental Death Benefit** (extra payout for accidental death), **Guaranteed Insurability** (buy more coverage later without medical exam). **Should you add riders?**: Depends on your needs and budget. Accelerated Death Benefit is often valuable, Waiver of Premium protects your policy if disabled, Child Rider is affordable family protection. **Cost**: Riders typically add $5-20/month to premiums. We can help you understand which riders make sense for your situation and budget.',
    },
    {
      id: 'contestable-period',
      question: 'What is the contestable period and why does it matter?',
      answer:
        'The **contestable period is typically the first 2 years** after a life insurance policy is issued. During this time, the insurance company can investigate and potentially deny a claim if they discover material misrepresentations or omissions in the application. **Why it exists**: Protects insurers from fraud (e.g., hiding serious health conditions). **What happens after 2 years**: The policy becomes "incontestable" - the insurer cannot deny a claim except for non-payment of premiums, even if there were errors in the application. **Important**: Always be completely honest on your application. If you\'re unsure about a health condition or detail, disclose it. We\'d rather help you get approved with full disclosure than risk a denied claim later. Honesty protects both you and your beneficiaries.',
    },
  ],
  companyBackground: {
    companyName: 'InsureLine Brokers (Infinity)',
    ownerName: 'Rajan Thind',
    ownerTitle: 'Owner & Insurance Advisor',
    biography:
      'With over 15 years of dedicated service in the insurance industry, Rajan Thind has built InsureLine Brokers (Infinity) on a foundation of trust, transparency, and genuine care for British Columbia families. As a franchisee of InsureLine, one of Canada\'s leading insurance brokerage networks, Rajan brings together the power of market access with the personal touch of a local advisor. His journey in insurance began with a simple belief: every family deserves access to affordable, comprehensive protection without the confusion and pressure often associated with insurance. Today, he serves thousands of families across Surrey, Delta, and surrounding BC communities, helping them navigate life\'s uncertainties with confidence and peace of mind.',
    philosophy:
      'Insurance isn\'t just about policies and premiums—it\'s about protecting what matters most. We believe in honest, transparent advice that puts your family\'s needs first. No pressure, no hidden fees, just genuine guidance to help you make informed decisions about your financial future.',
    experience: {
      years: 15,
      specialties: [
        'Life Insurance (Term, Whole, Universal, Critical Illness)',
        'Estate Planning & Wealth Transfer',
        'Business Succession Planning',
        'Newcomer to Canada Insurance (Super Visa, Travel Insurance)',
      ],
      certifications: [
        'BC Insurance License',
        'InsureLine Franchise Certification',
        '15+ Years Industry Experience',
      ],
    },
    location: {
      address: '7155 120 Street',
      city: 'Delta',
      province: 'BC',
      postalCode: 'V4E 2B1',
      fullAddress: '7155 120 Street, Delta, BC V4E 2B1',
    },
    brandAffiliation: {
      name: 'InsureLine',
      type: 'Franchisee',
      benefits: [
        'Access to multiple top-rated insurance carriers',
        'Ability to shop the market for best rates',
        'High-end technology and tools',
        'Comprehensive product portfolio',
        'Ongoing training and support',
      ],
    },
    values: [
      'Transparency in all interactions',
      'Family-first approach to service',
      'Local community commitment',
      'Honest, pressure-free advice',
      'Lifetime client relationships',
      'Continuous education and industry expertise',
    ],
    differentiators: [
      'BC-licensed expert with deep local knowledge',
      'InsureLine franchisee with market access',
      'Personal service—talk directly to Rajan, not a call center',
      '15+ years of experience serving BC families',
      'No pressure sales—we prioritize your needs over commissions',
      'Comprehensive support from application to claims',
    ],
    imageUrl: '/rajansthind.webp',
  },
  contactDetails: {
    phone: {
      primary: '778-830-0142',
    },
    email: {
      primary: 'infinity@insureline.com',
    },
    address: {
      street: '7155 120 Street',
      city: 'Delta',
      province: 'BC',
      postalCode: 'V4E 2B1',
      fullAddress: '7155 120 Street, Delta, BC V4E 2B1',
    },
    officeHours: {
      weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
      saturday: 'Saturday: 10:00 AM - 2:00 PM (by appointment)',
    },
    responseTimes: {
      phone: 'Within 24 hours',
      email: 'Within 48 hours',
      preferred: 'Phone or email',
    },
  },
  serviceAreas: {
    primary: ['Surrey', 'Delta'],
    secondary: ['Abbotsford', 'Langley'],
    province: 'British Columbia',
    description:
      'Serving families across the Lower Mainland and Fraser Valley with personalized insurance solutions.',
  },
  claimsProcess: {
    howToFile: {
      steps: [
        'Contact us immediately at 778-830-0142 or infinity@insureline.com',
        'We\'ll guide you through the process and provide necessary claim forms',
        'Gather required documents (death certificate, policy information, beneficiary ID)',
        'Submit completed claim form and all required documents',
        'Insurance company reviews the claim (typically 2-4 weeks)',
        'Once approved, death benefit is paid directly to beneficiaries, tax-free',
      ],
      contactMethods: {
        phone: '778-830-0142',
        email: 'infinity@insureline.com',
      },
      requiredDocuments: [
        'Original death certificate (certified copy)',
        'Completed claim form (we provide this)',
        'Original policy documents or policy number',
        'Beneficiary identification (government-issued ID)',
        'Medical records (if death occurred within contestable period)',
        'Police report (if death was accidental)',
      ],
    },
    timeline: {
      initialFiling: 'Contact us immediately after death',
      review: '2-4 weeks for standard claims, 7-10 days for simplified claims',
      approval: 'Once all documents are submitted and verified',
      payout: 'Within 2-4 weeks after approval (tax-free)',
    },
    whatToExpect: [
      'Compassionate support throughout the entire process',
      'Clear guidance on required documents and next steps',
      'Regular updates on claim status',
      'Direct communication with insurance carrier on your behalf',
      'Assistance with any questions or concerns',
      'Tax-free payout directly to your named beneficiaries',
    ],
    support: {
      available: true,
      description:
        'We provide full support throughout the entire claims process. Our team works directly with the insurance carrier to ensure your claim is processed as quickly and smoothly as possible during this difficult time.',
      contactInfo: 'Contact Rajan at 778-830-0142 or infinity@insureline.com for claims support',
    },
  },
  navigation: [
    {
      label: 'Why Us',
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
      label: 'Testimonials',
      href: '#testimonials',
      isAnchor: true,
    },
    {
      label: 'About',
      href: '#about',
      isAnchor: true,
    },
    {
      label: 'FAQ',
      href: '#faq',
      isAnchor: true,
    },
    {
      label: 'Contact',
      href: '#contact',
      isAnchor: true,
    },
  ],
}

// Footer content for all pages
import type { FooterContent } from './types'

export const footerContent: FooterContent = {
  companyInfo: {
    name: 'Insured by Rajan',
    tagline: "British Columbia's Trusted Life Insurance Agency",
  },
  quickLinks: landingPageContent.navigation,
  contactDetails: landingPageContent.contactDetails!,
  socialMediaLinks: [
    {
      platform: 'facebook',
      url: 'https://facebook.com/insuredbyrj',
      label: 'Facebook',
    },
    {
      platform: 'twitter',
      url: 'https://x.com/insuredbyrj',
      label: 'X',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/company/insuredbyrj',
      label: 'LinkedIn',
    },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  newsletterForm: {
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    successMessage: 'Thank you for subscribing!',
    errorMessage: 'Something went wrong. Please try again or contact us directly.',
    duplicateMessage: "You're already subscribed!",
  },
  copyright: {
    text: '© Insured by Rajan. All rights reserved.',
    year: new Date().getFullYear(),
  },
}

