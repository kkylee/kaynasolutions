export const pages = [
  {
    id: 'home',
    html: 'index.html',
    path: '/',
    title: 'Sol Digital — Better Systems for Growing Businesses',
    headline: 'Better business starts with better systems.',
    description:
      'Business technology and automation for Philippine SMEs. Practical software, connected systems, and less manual work.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'services',
    html: 'services/index.html',
    path: '/services/',
    title: 'Services — Software, Automation & Integrations | Sol Digital',
    headline: 'Technology solutions for businesses ready to grow.',
    description:
      'Custom software, business automation, integrations, analytics, cloud support and consulting for growing Philippine companies.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'solutions',
    html: 'solutions/index.html',
    path: '/solutions/',
    title: 'Solutions — HR, Inventory, CRM & Automation | Sol Digital',
    headline: 'Systems built around how your business actually works.',
    description:
      'Systems for HR, inventory, customers, approvals and reporting — built around how your business already works.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'about',
    html: 'about/index.html',
    path: '/about/',
    title: 'About — A Practical Technology Partner | Sol Digital',
    headline: 'Technology that works for your business.',
    description:
      'Sol Digital is a business technology partner helping Philippine companies simplify operations with practical systems.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'portfolio',
    html: 'portfolio/index.html',
    path: '/portfolio/',
    title: 'Portfolio — Demonstration Business Systems | Sol Digital',
    headline: 'Demonstration projects',
    description:
      'Demonstration business systems — employee, inventory, analytics, approval and CRM concepts built to show the approach.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'insights',
    html: 'insights/index.html',
    path: '/insights/',
    title: 'Insights — Technology for SMEs | Sol Digital',
    headline: 'Practical technology, explained plainly.',
    description:
      'Practical guides on automation, custom software and digital transformation for Philippine small and medium businesses.',
    ogImage: '/og/og-default.png',
  },
  {
    id: 'contact',
    html: 'contact/index.html',
    path: '/contact/',
    title: "Contact — Let's Talk About Your Business | Sol Digital",
    headline: "Let's talk about your business.",
    description:
      "Tell us about your business and the processes you want to improve. We'll help you explore practical technology options.",
    ogImage: '/og/og-default.png',
  },
]

export function pageFor(filename) {
  if (!filename) return null
  const norm = String(filename).replace(/\\/g, '/')
  const sorted = [...pages].sort((a, b) => b.html.length - a.html.length)
  return sorted.find((page) => norm.endsWith('/' + page.html) || norm === page.html) ?? null
}
