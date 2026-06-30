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

/**
 * Turn this off later when debugging is done.
 */
// TODO: to turn off when deploying 
const DEBUG_FIRESTORE_CONTENT = true

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

const FALLBACK_LISTS = {
  heroSlides: fallbackHeroSlides,
  categoryTiles: fallbackCategoryTiles,
  categories: fallbackCategoryTiles,
  cars: fallbackCars,
  brandTiles: fallbackBrandTiles,
  trustItems: fallbackTrustItems,
  brands: [],
  catalogs: [],
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

/**
 * Small helpers
 */
const text = (value, fallback = '') => String(value || fallback || '').trim()

const normalizeImage = (value) => text(value, FALLBACK_IMAGE)

const removeEditorOnlyFields = (payload = {}) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      return !key.endsWith('File') && key !== 'id' && value !== undefined
    }),
  )
}

/**
 * Debug logger
 *
 * You can comment this whole function out later,
 * or simply set DEBUG_FIRESTORE_CONTENT = false.
 */
const logContentDebug = (label, data) => {
  if (!DEBUG_FIRESTORE_CONTENT) return

  console.groupCollapsed(`[Firestore Debug] ${label}`)
  console.log(data)

  if (Array.isArray(data)) {
    console.table(data)
  }

  console.groupEnd()
}

const logFirestoreError = (collectionName, operation, error) => {
  console.error(`[Firestore] ${collectionName} ${operation} failed`, {
    code: error?.code,
    message: error?.message,
  })
}

/**
 * Normalizers
 */
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

const getCollectionNormalizer = (collectionName) => {
  const normalizers = {
    heroSlides: normalizeHeroSlide,
    cars: normalizeCar,
    categories: normalizeCmsCategory,
    categoryTiles: normalizeCmsCategory,
  }

  return normalizers[collectionName] || normalizeTile
}

const normalizeList = (collectionName, docs = []) => {
  const normalizer = getCollectionNormalizer(collectionName)

  const rawItems = docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }))

  const normalizedItems = activeSorted(rawItems).map(normalizer)

  logContentDebug(`${collectionName} normalized`, normalizedItems)

  return normalizedItems
}

/**
 * Firestore readers
 */
const readList = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName)
    const collectionQuery = query(collectionRef, orderBy('sortOrder', 'asc'))
    const snap = await getDocs(collectionQuery)

    const rawDocs = snap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }))

    logContentDebug(`${collectionName} fetched successfully`, {
      count: snap.size,
      docs: rawDocs,
    })

    return normalizeList(collectionName, snap.docs)
  } catch (error) {
    logFirestoreError(collectionName, 'read', error)
    throw error
  }
}

const readDoc = async (collectionName, id) => {
  try {
    const snap = await getDoc(doc(db, collectionName, id))

    if (!snap.exists()) {
      logContentDebug(`${collectionName}/${id} not found`, null)
      return null
    }

    const data = {
      id: snap.id,
      ...snap.data(),
    }

    logContentDebug(`${collectionName}/${id} fetched successfully`, data)

    return data
  } catch (error) {
    logFirestoreError(collectionName, 'read', error)
    throw error
  }
}

/**
 * Storefront content
 */
const buildCollectionContent = (lists = []) => {
  return Object.fromEntries(
    CONTENT_COLLECTIONS.map((collectionName, index) => [
      collectionName,
      lists[index] || FALLBACK_LISTS[collectionName] || [],
    ]),
  )
}

const resolveCategoryTiles = (content) => {
  if (content.categoryTiles.length > 0) return content.categoryTiles
  if (content.categories.length > 0) return content.categories
  return fallbackCategoryTiles
}

const resolveCategories = (content) => {
  if (content.categories.length > 0) return content.categories
  if (content.categoryTiles.length > 0) return content.categoryTiles
  return fallbackCategoryTiles
}

export async function fetchStorefrontContent() {
  try {
    const [settings, signature, aboutPage, ...lists] = await Promise.all([
      readDoc('siteSettings', 'general'),
      readDoc('signatureShowcase', 'main'),
      readDoc('aboutPage', 'main'),
      ...CONTENT_COLLECTIONS.map(readList),
    ])

    const content = buildCollectionContent(lists)

    const storefrontContent = {
      siteSettings: settings
        ? { ...fallbackSiteSettings, ...settings }
        : fallbackSiteSettings,

      heroSlides: content.heroSlides.length
        ? content.heroSlides
        : fallbackHeroSlides,

      categoryTiles: resolveCategoryTiles(content),
      categories: resolveCategories(content),

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

    logContentDebug('final storefront content', storefrontContent)
    logContentDebug('final heroSlides returned to store', storefrontContent.heroSlides)

    return storefrontContent
  } catch (error) {
    console.error('[Firestore] storefront content failed, using fallbacks', {
      code: error?.code,
      message: error?.message,
    })

    logContentDebug('fallback storefront content', fallbackStorefrontContent)

    return fallbackStorefrontContent
  }
}

/**
 * Admin/content helpers
 */
export const getContentDoc = readDoc

export const listContent = async (collectionName) => {
  return readList(collectionName)
}

export const saveContent = async (collectionName, payload, id = null) => {
  try {
    const data = {
      ...removeEditorOnlyFields(payload),
      updatedAt: serverTimestamp(),
    }

    if (id) {
      await setDoc(doc(db, collectionName, id), data, { merge: true })

      logContentDebug(`${collectionName}/${id} updated successfully`, data)

      return id
    }

    const ref = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    })

    logContentDebug(`${collectionName}/${ref.id} created successfully`, data)

    return ref.id
  } catch (error) {
    logFirestoreError(collectionName, id ? 'update' : 'create', error)
    throw error
  }
}

export const deleteContent = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id))

    logContentDebug(`${collectionName}/${id} deleted successfully`, {
      collectionName,
      id,
    })
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