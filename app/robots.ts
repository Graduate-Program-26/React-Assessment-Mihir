import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://react-assessment-mihir-2gi9736oz-mihir-arjun-dvts-projects.vercel.app',
    }
}