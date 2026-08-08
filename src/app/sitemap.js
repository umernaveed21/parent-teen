import { getAllPosts } from '../lib/contentful';

const CATEGORY_SLUGS = [
  'education-schools',
  'child-rights-protection',
  'poverty-inequality',
  'teen-behavior',
  'study-stress',
  'social-media-mental-health',
  'positive-parenting',
  'discipline-boundaries',
  'parenting-realities',
  'family-dynamics',
  'relationships-communication',
  'family-culture-social-influences',
  'mental-emotional-wellbeing',
  'physical-health-nutrition',
  'healthy-living-prevention',
  'wish-parents-knew',
  'real-teen-stories',
  'when-i-was-a-teen',
];

export default async function sitemap() {
  const baseUrl = 'https://www.parentandteen.com.pk';

  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/archive`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/our-team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ];

  const categoryPages = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  let articlePages = [];
  try {
    const posts = await getAllPosts();
    articlePages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Sitemap: failed to fetch posts', error);
  }

  return [...staticPages, ...categoryPages, ...articlePages];
}