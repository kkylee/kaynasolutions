import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../src/components/common/BaseButton.vue'
import Tag from '../src/components/common/Tag.vue'
import SectionHeading from '../src/components/common/SectionHeading.vue'
import PageHeader from '../src/components/common/PageHeader.vue'
import PhotoFigure from '../src/components/common/PhotoFigure.vue'
import Banner from '../src/components/common/Banner.vue'
import CtaSection from '../src/components/common/CtaSection.vue'
import ProcessTimeline from '../src/components/common/ProcessTimeline.vue'
import { img } from '../src/lib/images'

describe('BaseButton', () => {
  it('renders a link when given an href', () => {
    const wrapper = mount(BaseButton, { props: { href: '/contact/', label: 'Start a Conversation' } })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('/contact/')
    expect(link.text()).toBe('Start a Conversation')
  })

  it('renders a real button otherwise', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Submit' } })
    const button = wrapper.get('button')
    expect(button.attributes('type')).toBe('button')
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('marks the primary variant by default', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Go', href: '/services/' } })
    expect(wrapper.get('a').classes().join(' ')).toContain('bg-blue')
  })
})

describe('Tag', () => {
  it('renders its label as a small uppercase tag', () => {
    const wrapper = mount(Tag, { props: { label: 'Demonstration project' } })
    const el = wrapper.get('span')
    expect(el.text()).toBe('Demonstration project')
    expect(el.classes().join(' ')).toContain('uppercase')
  })
})

describe('SectionHeading', () => {
  it('defaults to a level-two heading', () => {
    const wrapper = mount(SectionHeading, { props: { title: 'From challenges to solutions' } })
    expect(wrapper.get('h2').text()).toBe('From challenges to solutions')
  })

  it('supports a custom heading level', () => {
    const wrapper = mount(SectionHeading, { props: { title: 'Smaller', level: 3 } })
    expect(wrapper.get('h3').exists()).toBe(true)
  })
})

describe('PageHeader', () => {
  it('renders exactly one h1 with the page title', () => {
    const wrapper = mount(PageHeader, { props: { title: 'Our services', lead: 'What we do.' } })
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Our services')
  })
})

describe('PhotoFigure', () => {
  const image = img('hero-consultation')

  it('renders a responsive, lazily loaded image with dimensions', () => {
    const wrapper = mount(PhotoFigure, { props: { image } })
    const el = wrapper.get('img')
    expect(el.attributes('srcset')).toContain('640w')
    expect(el.attributes('loading')).toBe('lazy')
    expect(el.attributes('width')).toBe('1024')
    expect(Number(el.attributes('height'))).toBeGreaterThan(0)
    expect(el.attributes('alt')).toBe(image.alt)
  })

  it('loads eagerly and at high priority when asked', () => {
    const wrapper = mount(PhotoFigure, { props: { image, priority: true } })
    const el = wrapper.get('img')
    expect(el.attributes('loading')).toBe('eager')
    expect(el.attributes('fetchpriority')).toBe('high')
  })

  it('applies the requested aspect ratio', () => {
    const wrapper = mount(PhotoFigure, { props: { image, ratio: '4:5' } })
    expect(wrapper.get('img').classes().join(' ')).toContain('aspect-[4/5]')
  })
})

describe('Banner', () => {
  it('renders a note with its text', () => {
    const wrapper = mount(Banner, { props: { tone: 'note', title: 'About this work', text: 'Sample content.' } })
    expect(wrapper.text()).toContain('About this work')
    expect(wrapper.text()).toContain('Sample content.')
  })
})

describe('CtaSection', () => {
  it('renders a heading and a call-to-action link', () => {
    const wrapper = mount(CtaSection, {
      props: { title: "Let's make running your business easier.", href: '/contact/', label: 'Start a Conversation' },
    })
    expect(wrapper.get('h2').text()).toBe("Let's make running your business easier.")
    expect(wrapper.get('a').attributes('href')).toBe('/contact/')
  })
})

describe('ProcessTimeline', () => {
  it('renders every step as an ordered list item', () => {
    const steps = [
      { title: 'Understand', body: 'We listen.' },
      { title: 'Plan', body: 'We scope.' },
      { title: 'Build', body: 'We deliver.' },
      { title: 'Support', body: 'We stay.' },
    ]
    const wrapper = mount(ProcessTimeline, { props: { steps } })
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(4)
    for (const [index, step] of steps.entries()) {
      expect(items[index].text()).toContain(step.title)
      expect(items[index].text()).toContain(step.body)
    }
  })
})
