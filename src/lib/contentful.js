import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getPostBySlug(slug) {
  const res = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  });

  if (!res.items.length) return null;

  const fields = res.items[0].fields;
  const authorRef = fields.authorReference?.fields;

  return {
    title: fields.title,
    slug: fields.slug,
    description: fields.description,
    author: authorRef?.name || fields.author,
    authorRole: authorRef?.role || fields.authorRoleExtended || fields.authorRole,
    authorSlug: authorRef?.slug || null,
    authorBio: authorRef?.shortBio || authorRef?.bio || fields.guestAuthorBio || null,
    authorPhotoUrl: authorRef?.photo?.fields?.file?.url
      ? `https:${authorRef.photo.fields.file.url}`
      : null,
    date: fields.date,
    readTime: fields.readTime,
    category: fields.category,
    subCategory: fields.subCategory,
    parentCat: fields.parentCat,
    subcatName: fields.subcatName,
    subcatLink: fields.subcatLink,
    content: fields.content,
    coverImageUrl: fields.coverImage?.fields?.file?.url
      ? `https:${fields.coverImage.fields.file.url}`
      : null,
  };
}

export async function getAllPosts() {
  const res = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
  });

  return res.items.map((item) => {
    const fields = item.fields;
    return {
      title: fields.title,
      slug: fields.slug,
      description: fields.description,
      author: fields.author,
      date: fields.date,
      readTime: fields.readTime,
      category: fields.category,
      subCategory: fields.subCategory,
      coverImageUrl: fields.coverImage?.fields?.file?.url
        ? `https:${fields.coverImage.fields.file.url}`
        : null,
    };
  });
}

export async function getPostsBySubCategory(subCategorySlug) {
  const res = await client.getEntries({
    content_type: 'blogPost',
    'fields.subCategory': subCategorySlug,
    order: '-fields.date',
  });

  return res.items.map((item) => {
    const fields = item.fields;
    return {
      title: fields.title,
      slug: fields.slug,
      description: fields.description,
      author: fields.author,
      date: fields.date,
      readTime: fields.readTime,
      category: fields.category,
      subCategory: fields.subCategory,
      coverImageUrl: fields.coverImage?.fields?.file?.url
        ? `https:${fields.coverImage.fields.file.url}`
        : null,
    };
  });
}

export async function getAllAuthors() {
  const res = await client.getEntries({
    content_type: 'author',
    order: 'fields.order',
  });

  return res.items.map((item) => {
    const fields = item.fields;
    return {
      id: item.sys.id,
      order: fields.order,
      name: fields.name,
      slug: fields.slug,
      role: fields.role,
      bio: fields.bio,
      shortBio: fields.shortBio,
      linkedinUrl: fields.linkedInUrl,
      photoUrl: fields.photo?.fields?.file?.url
        ? `https:${fields.photo.fields.file.url}`
        : null,
    };
  });
}