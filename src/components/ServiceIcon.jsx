export default function ServiceIcon({ index }) {
  const paths = [
    <><rect x="5" y="5" width="30" height="22" rx="2" /><path d="M2 33h36M15 27v6m10-6v6" /></>,
    <><circle cx="20" cy="10" r="5" /><circle cx="7" cy="14" r="4" /><circle cx="33" cy="14" r="4" /><path d="M12 34V25a8 8 0 0 1 16 0v9M2 34v-9a5 5 0 0 1 7-5m29 14v-9a5 5 0 0 0-7-5M20 28v6" /></>,
    <><rect x="15" y="3" width="10" height="23" rx="5" /><path d="M10 18v4a10 10 0 0 0 20 0v-4M20 32v5m-7 0h14" /></>,
    <><path d="M20 35C8 27 9 12 20 3c11 9 12 24 0 32Zm0 0C6 35 2 24 3 14c10 1 17 8 17 21Zm0 0c14 0 18-11 17-21-10 1-17 8-17 21Z" /><path d="M20 35C9 40 2 33 1 26m19 9c11 5 18-2 19-9" /></>,
  ]
  return <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>
}
