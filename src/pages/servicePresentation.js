export const presentations = {
  'website-design-development': {
    theme: 'website',
    headline: 'Websites That Work as Hard as You Do.',
    tagline: 'Modern. Professional. Built to Grow.',
    benefits: [
      ['screen', 'Mobile Responsive', 'Designed for all devices.'],
      ['search', 'Basic SEO', 'A foundation for being found online.'],
      ['launch', 'Launch Assistance', 'Support for getting your website live.'],
    ],
  },
  'virtual-meeting-webinar-support': {
    theme: 'meetings',
    headline: 'Seamless Meetings. Engaging Webinars.',
    benefits: [
      ['people', 'Participant Admission', 'Help welcoming participants.'],
      ['chat', 'Chat & Q&A Moderation', 'Keep conversations organized.'],
      ['check', 'Technical Checks', 'Preparation before your event.'],
    ],
  },
  'creator-streamer-support': {
    theme: 'creators',
    headline: 'Keep Your Stream Engaging, Positive and On Track.',
    benefits: [
      ['chat', 'Chat Moderation', 'Live chat monitoring and viewer questions.'],
      ['shield', 'Spam Management', 'Support for your agreed chat rules.'],
      ['people', 'Community Engagement', 'Announcements and helpful reminders.'],
    ],
  },
  'senior-digital-safety-academy': {
    theme: 'academy',
    headline: 'Technology Made Simple. Safety Made Essential.',
    benefits: [
      ['check', 'Easy to Follow', 'Clear explanations and practical steps.'],
      ['shield', 'Real-World Topics', 'Smartphone safety, scams, and privacy.'],
      ['heart', 'Learn at Your Pace', 'Tell us your access needs when you inquire.'],
    ],
  },
}

export function detailTheme(slug) {
  return presentations[slug]?.theme || 'website'
}
