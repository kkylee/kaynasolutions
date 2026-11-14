import manifest from '../../scripts/images.manifest.json'

const sources = import.meta.glob('../assets/images/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byKey = new Map(manifest.map((entry) => [entry.key, entry]))

export const imageKeys = manifest.map((entry) => entry.key)

export function img(key) {
  const entry = byKey.get(key)
  if (!entry) throw new Error(`Unknown image key: ${key}`)

  const url = (width) => sources[`../assets/images/${key}-${width}.webp`]
  const width = 1024
  const height = Math.round((width * entry.aspect[1]) / entry.aspect[0])

  return {
    key,
    src: url(1024),
    srcset: `${url(640)} 640w, ${url(1024)} 1024w, ${url(1600)} 1600w`,
    width,
    height,
    alt: entry.alt,
    aspect: entry.aspect,
  }
}
