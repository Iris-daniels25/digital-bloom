export const serviceBase = '/services'
export const serviceCatalog = [
  {
    slug: 'website-design-development',
    image: '/images/services/hero-website-design.webp',
    imageAlt: 'Desktop monitor and smartphone displaying a pink-accented business website',
    imageWidth: 500,
    imageHeight: 346,
    title: 'Website Design & Development',
    intro:
      'A clear, confident online presence. Choose a template-based website, a custom-coded build, or practical help with the website you already have.',
  },
  {
    slug: 'virtual-meeting-webinar-support',
    image: '/images/services/hero-virtual-meetings.webp',
    imageAlt: 'Laptop with a webcam showing a host and participants in a virtual meeting',
    imageWidth: 506,
    imageHeight: 346,
    title: 'Virtual Meeting & Webinar Support',
    intro:
      'Focus on your participants. We help coordinate the technology, conversations, and everyday administration behind your meetings and webinars.',
  },
  {
    slug: 'creator-streamer-support',
    image: '/images/services/hero-creator-streamer.webp',
    imageAlt: 'Creator streaming workspace with a microphone, ring light, camera, and live chat monitor',
    imageWidth: 550,
    imageHeight: 346,
    title: 'Creator & Streamer Support',
    intro:
      'Stay present on stream with a Stream Mod who helps keep live chat welcoming, organized, and on topic.',
  },
  {
    slug: 'senior-digital-safety-academy',
    image: '/images/services/hero-senior-academy.webp',
    imageAlt: 'Smiling older woman wearing glasses and using her smartphone',
    imageWidth: 459,
    imageHeight: 294,
    title: 'Senior Digital Safety Academy',
    intro: 'Technology Made Simple. Safety Made Essential.',
  },
]
export const packages = {
  website: [
    [
      'Bloom Starter',
      '$249',
      'One page · up to five sections · one revision · estimated 3–5 business days',
    ],
    [
      'Bloom Business',
      '$699',
      'Up to five pages · two revisions · estimated 7–10 business days',
    ],
    [
      'Bloom Growth',
      '$1,199',
      'Up to eight pages · three revisions · estimated 10–15 business days',
    ],
  ],
  custom: [
    [
      'Custom Starter',
      '$499',
      'One page · one revision · estimated 5–7 business days',
    ],
    [
      'Custom Business',
      '$1,299',
      'Up to five pages · two revisions · estimated 2–3 weeks',
    ],
    [
      'Custom Growth',
      '$2,499+',
      'Up to eight pages · three revisions · estimated 3–5 weeks',
    ],
  ],
  repairs: [
    [
      'Website Health Check',
      '$49',
      'Review of up to five pages and a written findings report. Audit only; no repairs.',
    ],
    ['Quick Website Fix', '$75+', 'One defined minor issue.'],
    ['Website Refresh', '$199+', 'Up to two pages, subject to scope.'],
    [
      'Full Website Redesign',
      '$499+',
      'Custom quote based on your website and project scope.',
    ],
    [
      'Bloom Care',
      '$49/month',
      'Up to 30 minutes of minor content changes and monthly functionality checks.',
    ],
  ],
  meetings: [
    [
      'Meeting Essentials',
      '$65',
      'Up to 60 minutes live · technical checks, participant admission, and chat monitoring.',
    ],
    [
      'Webinar Pro',
      '$125',
      'Up to two hours live · technical checks, admission, speaker coordination, chat/Q&A moderation, and polls.',
    ],
    [
      'Virtual Event Plus',
      '$249',
      'Up to four hours live · webinar support plus breakout assistance, authorized recording support, and event reporting.',
    ],
    [
      'Meeting Partner',
      '$229/month',
      'Four one-hour meetings · Meeting Essentials support for recurring sessions.',
    ],
    [
      'Webinar Partner',
      '$449/month',
      'Four two-hour webinars · Webinar Pro support for recurring sessions.',
    ],
    [
      'Organization Partner',
      '$799+/month',
      'Up to 16 live support hours · coordinated meeting and webinar support with reporting, scoped to your organization.',
    ],
  ],
  admin: [
    ['Admin On-Demand', '$40/hour', 'Two-hour minimum.'],
    ['Admin Essentials', '$175/month', 'Five admin hours.'],
    ['Admin Partner', '$325/month', 'Ten admin hours.'],
    ['Business Operations Partner', '$600/month', 'Twenty admin hours.'],
    [
      'Bloom Virtual Operations',
      '$399/month',
      'Four one-hour meetings plus four additional admin hours.',
    ],
  ],
  creators: [
    ['Starter Mod', '$35', 'One-hour stream with a Live Chat Moderator.'],
    ['Dedicated Mod', '$85', 'Up to three hours of scheduled live moderation.'],
    ['Creator Partner', '$299/month', 'Up to 12 scheduled moderation hours.'],
  ],
  academy: [
    [
      'Individual 90-minute class',
      '$49/person',
      'Stay Safe on Your Smartphone · request information; dates to be announced.',
    ],
    [
      'Four-course series',
      '$149/person',
      'Four proposed courses · coming soon.',
    ],
    [
      'Private coaching',
      '$45/hour',
      'Personal smartphone safety and digital-confidence support by inquiry.',
    ],
    ['Group workshop', '$299', 'Up to ten participants.'],
    [
      'Community organization workshop',
      '$399+',
      'Discuss your organization’s needs and workshop scope.',
    ],
  ],
}
export const websiteExtras = [
  'Additional template pages from $100',
  'Additional custom pages from $200',
  'Booking integrations from $75',
  'Additional work from $35/hour when applicable',
]
export const meetingExtras = [
  'Extra event support $45/hour',
  'Extra 30-minute rehearsal $25',
  'Registration form setup $49',
  'Invitation/reminder setup $49',
  'Attendance report only $25',
  'Basic recording trimming from $45',
]
export const creatorExtras = [
  'Additional moderation $30/hour',
  'Chatbot command setup $35',
  'Stream moderation rules setup $35',
  'Creator link-in-bio webpage $99',
  'Creator portfolio website $249',
]
export const categoryPackages = [
  [...packages.website, ...packages.custom, ...packages.repairs],
  [
    ...packages.meetings,
    ...packages.admin,
    ...meetingExtras.map((label) => [label, '', '']),
  ],
  [...packages.creators, ...creatorExtras.map((label) => [label, '', ''])],
  packages.academy,
]
export function inquiryHref(category, selected = '') {
  return `/contact?service=${encodeURIComponent(selected === 'Website Health Check' ? 'website-health-check' : category)}${selected ? `&package=${encodeURIComponent(selected)}` : ''}#inquiry`
}
