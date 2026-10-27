// Owner-provided URLs only. Activation requires a matching public Stripe checkout.
// Store public checkout links here, never Stripe API keys or customer data.
export const stripePaymentLinks = {
  'Website Health Check': {
    category: 'website-design-development',
    price: '$49',
    amount: 4900,
    url: 'https://buy.stripe.com/eVqfZg8rf6Xy8al1mb7AI00',
    scheduled: false,
    verification: {
      "url": "https://buy.stripe.com/eVqfZg8rf6Xy8al1mb7AI00",
      "product": "Website Health Check",
      "amount": 4900,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
  'Meeting Essentials': {
    category: 'virtual-meeting-webinar-support',
    price: '$65',
    amount: 6500,
    url: 'https://buy.stripe.com/8x29ASdLz1Debmx1mb7AI01',
    scheduled: true,
    verification: {
      "url": "https://buy.stripe.com/8x29ASdLz1Debmx1mb7AI01",
      "product": "Meeting Essentials",
      "amount": 6500,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
  'Webinar Pro': {
    category: 'virtual-meeting-webinar-support',
    price: '$125',
    amount: 12500,
    url: 'https://buy.stripe.com/4gM3cuePD95GcqB5Cr7AI02',
    scheduled: true,
    verification: {
      "url": "https://buy.stripe.com/4gM3cuePD95GcqB5Cr7AI02",
      "product": "Webinar Pro",
      "amount": 12500,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
  'Virtual Event Plus': {
    category: 'virtual-meeting-webinar-support',
    price: '$249',
    amount: 24900,
    url: 'https://buy.stripe.com/9B6cN4cHv1De2Q16Gv7AI03',
    scheduled: true,
    verification: {
      "url": "https://buy.stripe.com/9B6cN4cHv1De2Q16Gv7AI03",
      "product": "Virtual Event Plus",
      "amount": 24900,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
  'Starter Mod': {
    category: 'creator-streamer-support',
    price: '$35',
    amount: 3500,
    url: 'https://buy.stripe.com/eVqaEWgXLa9K2Q14yn7AI04',
    scheduled: true,
    verification: {
      "url": "https://buy.stripe.com/eVqaEWgXLa9K2Q14yn7AI04",
      "product": "Starter Mod",
      "amount": 3500,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
  'Dedicated Mod': {
    category: 'creator-streamer-support',
    price: '$85',
    amount: 8500,
    url: 'https://buy.stripe.com/00w5kCazndlW9epfd17AI05',
    scheduled: true,
    verification: {
      "url": "https://buy.stripe.com/00w5kCazndlW9epfd17AI05",
      "product": "Dedicated Mod",
      "amount": 8500,
      "currency": "usd",
      "livemode": true,
      "mode": "payment",
      "checkedAt": "2026-10-27T01:44:36+00:00",
      "source": "Public Stripe-hosted checkout and checkout response metadata; no dashboard access or purchase"
},
  },
}

export function getPackagePayment(category, name, price) {
  const payment = stripePaymentLinks[name]
  return payment?.category === category && payment.price === price ? payment : null
}

export function isVerifiedPayment(payment, name) {
  if (!payment) return false
  const verified = payment.verification
  return Boolean(
    /^https:\/\/buy\.stripe\.com\/[a-zA-Z0-9]+$/.test(payment.url) &&
    verified?.url === payment.url &&
    verified.product === name &&
    verified.amount === payment.amount &&
    verified.currency === 'usd' &&
    verified.livemode === true &&
    verified.mode === 'payment' &&
    verified.checkedAt,
  )
}
