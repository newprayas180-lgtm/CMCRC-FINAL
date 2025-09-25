import groq from 'groq'

export const SITE_SETTINGS = groq`*[_type == "siteSettings"][0]{siteTitle, logo, ctas, contact, social, defaultSeo}`
export const NAV = groq`*[_type == "navigation" && !defined(footer)][0]{items}`
export const FOOTER_NAV = groq`*[_type == "navigation" && footer == true][0]{items}`

export const TEAM = groq`*[_type == "teamMember"] | order(order asc){_id, name, role, bio, email, social, photo, category}`
export const EVENTS = groq`*[_type == "event"] | order(startDate desc){_id, title, slug, startDate, endDate, venue, city, registrationUrl, coverImage, description}`
export const PUBLICATIONS = groq`*[_type == "publication"] | order(publishedOn desc){title, slug, authors, venue, linkUrl, pdf, abstract, coverImage, tags, publishedOn}`
export const ACHIEVEMENTS = groq`*[_type == "achievement"] | order(date desc){title, date, description, image, relatedMember-> {name, role}}`
export const ALBUMS = groq`*[_type == "galleryAlbum"] | order(_createdAt desc){title, slug, description, coverImage, images}`
export const ALBUM_BY_SLUG = groq`*[_type == "galleryAlbum" && slug.current == $slug][0]{title, slug, description, coverImage, images}`
