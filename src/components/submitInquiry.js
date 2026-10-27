const fallback = 'We couldn’t confirm your inquiry was sent. Your entries are still here. Please try again, or email hello@thedigitalbloom.co for help.'

export async function submitInquiry(data, endpoint = import.meta.env?.VITE_FORMSPREE_ENDPOINT, fetcher = globalThis.fetch) {
  if (!endpoint) throw new Error(fallback)
  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
      signal: AbortSignal.timeout(30000),
    })
    const result = await response.json().catch(() => null)
    if (!response.ok || result?.ok === false || result?.errors?.length) {
      const messages = Array.isArray(result?.errors)
        ? result.errors.map(error => error.message).filter(message => typeof message === 'string').join(' ')
        : ''
      throw new Error(messages ? `${messages} Your entries are still here. Please correct them and try again, or email hello@thedigitalbloom.co for help.` : fallback)
    }
  } catch (error) {
    if (error.message?.includes('Your entries are still here.')) throw error
    throw new Error(fallback)
  }
}
