import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

import { db } from '../firebase/config'
import {
  fallbackAboutPage,
  fallbackBrandTiles,
  fallbackCars,
  fallbackCategoryTiles,
  fallbackHeroSlides,
  fallbackSignatureShowcase,
  fallbackSiteSettings,
  fallbackTrustItems,
} from './contentFallbacks'
import { FALLBACK_IMAGE } from './catalog'
import { activeSorted, normalizeCar, normalizeCmsCategory } from './cmsUtils'

const CONTENT_COLLECTIONS = [
  'heroSlides',
  'categoryTiles',
  'categories',
  'cars',
  'brandTiles',
  'trustItems',
  'brands',
  'catalogs',
]

const EMPTY_LIST_FALLBACKS = {
  heroSlides: fallbackHeroSlides,
  categoryTiles: fallbackCategoryTiles,
  categories: fallbackCategoryTiles,
  cars: fallbackCars,
  brandTiles: fallbackBrandTiles,
  trustItems: fallbackTrustItems,
  brands: [],
  catalogs: [],
}

const text = (value, fallback = '') => String(value || fallback || '').trim()

const normalizeImage = (value) => text(value, FALLBACK_IMAGE)

const logFirestoreError = (collectionName, operation, error) => {
  console.error(`[Firestore] ${collectionName} ${operation} failed`, {
    code: error?.code,
    message: error?.message,
  })
}

export const normalizeHeroSlide = (slide = {}) => ({
  ...slide,
  title: text(slide.title, 'Haxon automotive'),
  eyebrow: text(slide.eyebrow, 'Haxon select'),
  subtitle: text(
    slide.subtitle,
    'Premium automotive accessories with fitment support.',
  ),
  backgroundWord: text(slide.backgroundWord, 'HAXON'),
  image: normalizeImage(slide.image),
  imageAlt: text(slide.imageAlt, slide.title || 'Haxon hero'),

  primaryCtaLabel: text(slide.primaryCtaLabel, 'Shop now'),
  primaryCtaLink: text(slide.primaryCtaLink, '/products'),
  secondaryCtaLabel: text(slide.secondaryCtaLabel, 'Fitment help'),
  secondaryCtaLink: text(slide.secondaryCtaLink, '/contact'),

  statOneLabel: text(slide.statOneLabel, 'Ready Dispatch'),
  statOneValue: text(slide.statOneValue, 'Fast'),
  statTwoLabel: text(slide.statTwoLabel, 'Fitment Checked'),
  statTwoValue: text(slide.statTwoValue, 'Verified'),
  statThreeLabel: text(slide.statThreeLabel, 'Premium Imports'),
  statThreeValue: text(slide.statThreeValue, 'Curated'),

  sortOrder: Number(slide.sortOrder || 0),
  active: slide.active !== false,
})

export const normalizeTile = (tile = {}) => {
  const title = text(tile.title || tile.name, 'Haxon Collection')
  const name = text(tile.name || tile.title, title)

  return {
    ...tile,
    title,
    name,
    description: text(tile.description, 'Curated premium accessories.'),
    image: normalizeImage(tile.image),
    imageAlt: text(tile.imageAlt, title),
    link: text(
      tile.link || tile.clickDestination || tile.externalUrl,
      tile.slug
        ? `/products?category=${encodeURIComponent(title)}`
        : '/products',
    ),
    sortOrder: Number(tile.sortOrder || 0),
    featured: tile.featured !== false,
    active: tile.active !== false,
  }
}

export const normalizeSignature = (item = {}) => ({
  ...fallbackSignatureShowcase,
  ...item,
  image: normalizeImage(item.image),
  active: item.active !== false,
})

const getNormalizer = (collectionName) => {
  if (collectionName === 'heroSlides') return normalizeHeroSlide
  if (collectionName === 'cars') return normalizeCar
  if (collectionName === 'categories') return normalizeCmsCategory
  if (collectionName === 'categoryTiles') return normalizeCmsCategory

  return normalizeTile
}

const normalizeList = (collectionName, docs = []) => {
  const normalizer = getNormalizer(collectionName)

  return activeSorted(
    docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })),
  ).map(normalizer)
}

const readList = async (collectionName) => {
  try {
    const snap = await getDocs(
      query(collection(db, collectionName), orderBy('sortOrder', 'asc')),
    )

    return normalizeList(collectionName, snap.docs)
  } catch (error) {
    logFirestoreError(collectionName, 'read', error)
    throw error
  }
}

const readDoc = async (collectionName, id) => {
  try {
    const snap = await getDoc(doc(db, collectionName, id))

    return snap.exists()
      ? {
          id: snap.id,
          ...snap.data(),
        }
      : null
  } catch (error) {
    logFirestoreError(collectionName, 'read', error)
    throw error
  }
}

const normalizeContentPayload = (payload = {}) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      return !key.endsWith('File') && key !== 'id' && value !== undefined
    }),
  )
}

const fallbackStorefrontContent = {
  siteSettings: fallbackSiteSettings,
  heroSlides: fallbackHeroSlides,
  categoryTiles: fallbackCategoryTiles,
  categories: fallbackCategoryTiles,
  cars: fallbackCars,
  aboutPage: fallbackAboutPage,
  signatureShowcase: fallbackSignatureShowcase,
  brandTiles: fallbackBrandTiles,
  trustItems: fallbackTrustItems,
  brands: [],
  catalogs: [],
  usingFallback: true,
}

export async function fetchStorefrontContent() {
  try {
    const [settings, signature, aboutPage, ...lists] = await Promise.all([
      readDoc('siteSettings', 'general'),
      readDoc('signatureShowcase', 'main'),
      readDoc('aboutPage', 'main'),
      ...CONTENT_COLLECTIONS.map(readList),
    ])

    const content = Object.fromEntries(
      CONTENT_COLLECTIONS.map((collectionName, index) => [
        collectionName,
        lists[index] || [],
      ]),
    )

    const categoryTiles =
      content.categoryTiles.length > 0
        ? content.categoryTiles
        : content.categories.length > 0
          ? content.categories
          : fallbackCategoryTiles

    const categories =
      content.categories.length > 0
        ? content.categories
        : content.categoryTiles.length > 0
          ? content.categoryTiles
          : fallbackCategoryTiles

    return {
      siteSettings: settings
        ? { ...fallbackSiteSettings, ...settings }
        : fallbackSiteSettings,

      heroSlides: content.heroSlides.length
        ? content.heroSlides
        : fallbackHeroSlides,

      categoryTiles,
      categories,

      cars: content.cars.length ? content.cars : fallbackCars,

      aboutPage: aboutPage
        ? { ...fallbackAboutPage, ...aboutPage }
        : fallbackAboutPage,

      signatureShowcase: signature
        ? normalizeSignature(signature)
        : fallbackSignatureShowcase,

      brandTiles: content.brandTiles.length
        ? content.brandTiles
        : fallbackBrandTiles,

      trustItems: content.trustItems.length
        ? content.trustItems
        : fallbackTrustItems,

      brands: content.brands || [],
      catalogs: content.catalogs || [],

      usingFallback: false,
    }
  } catch (error) {
    console.error('[Firestore] storefront content failed, using fallbacks', {
      code: error?.code,
      message: error?.message,
    })

    return fallbackStorefrontContent
  }
}

export const getContentDoc = readDoc

export const listContent = async (collectionName) => {
  return readList(collectionName)
}

export const saveContent = async (collectionName, payload, id = null) => {
  try {
    const data = {
      ...normalizeContentPayload(payload),
      updatedAt: serverTimestamp(),
    }

    if (id) {
      await setDoc(doc(db, collectionName, id), data, { merge: true })
      return id
    }

    const ref = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    })

    return ref.id
  } catch (error) {
    logFirestoreError(collectionName, id ? 'update' : 'create', error)
    throw error
  }
}

export const deleteContent = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id))
  } catch (error) {
    logFirestoreError(collectionName, 'delete', error)
    throw error
  }
}

export const saveSiteSettings = (payload) => {
  return saveContent('siteSettings', payload, 'general')
}

export const saveSignatureShowcase = (payload) => {
  return saveContent('signatureShowcase', payload, 'main')
}
