// src/app/categories/[slug]/page.js
import React from 'react';
import { getPostsBySubCategory } from '../../../lib/contentful';

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

const CATEGORY_DICTIONARY = {
  'education-schools': { title: "Education & Schools", parentCat: "Childhood Realities", description: "Exploring how access to quality education, school environments, and learning opportunities shape a child's future and sense of possibility." },
  'child-rights-protection': { title: "Child Rights and Protection", parentCat: "Childhood Realities", description: "Raising awareness about the rights every child deserves, and the protections families and communities must uphold to keep children safe." },
  'poverty-inequality': { title: "Poverty & Inequality", parentCat: "Childhood Realities", description: "Understanding how economic hardship and social inequality shape a child's opportunities, confidence, and emotional world." },
  'teen-behavior': { title: "Teen Behavior", parentCat: "Teens", description: "Understanding mood shifts, navigating the search for identity, and supporting healthy independence through adolescence." },
  'study-stress': { title: "Study Stress", parentCat: "Teens", description: "Exam strategies, time-management habits, and keeping mental wellness sound during high-pressure academic seasons." },
  'social-media-mental-health': { title: "Social Media & Mental Health", parentCat: "Teens", description: "Guiding healthy smartphone boundaries, building digital resilience, and protecting body image against online comparison." },
  'positive-parenting': { title: "Positive Parenting", parentCat: "Parenting", description: "Encouraging positive behaviors, leading with compassion, and building a household centered on unconditional trust." },
  'discipline-boundaries': { title: "Discipline & Boundaries", parentCat: "Parenting", description: "Establishing firm, constructive household guidelines and fair rules that promote mutual respect." },
  'parenting-realities': { title: "Parenting Realities", parentCat: "Parenting", description: "Honest writing on the realities of parenting in South Asia, financial pressure, exhaustion, and the inherited habits that shape how we raise our children." },
  'family-dynamics': { title: "Family Dynamics", parentCat: "Family", description: "Exploring the everyday patterns, roles, and rhythms that shape how a family functions and supports one another." },
  'relationships-communication': { title: "Relationships and Communication", parentCat: "Family", description: "Replacing friction with productive conversations, practicing deep active listening, and keeping communication channels open across the whole family." },
  'family-culture-social-influences': { title: "Family Culture & Social Influences", parentCat: "Family", description: "Understanding how cultural traditions, community expectations, and social pressures shape family life and values." },
  'mental-emotional-wellbeing': { title: "Mental & Emotional Well-being", parentCat: "Health", description: "Recognizing stress and anxiety, building everyday emotional strength, and finding expert support avenues." },
  'physical-health-nutrition': { title: "Physical Health & Nutrition", parentCat: "Health", description: "Fueling healthy growth with nutrient-dense meal choices and supporting strong physical development." },
  'healthy-living-prevention': { title: "Healthy Living & Prevention", parentCat: "Health", description: "Building preventive care habits and active daily routines that support long-term wellbeing, strengthen health, and help reduce the risk of disease." },
  'wish-parents-knew': { title: "What Teens Wish Parents Knew", parentCat: "Teen Perspectives", description: "An open look into what your children say about their privacy boundaries, hidden pressures, and unvoiced expectations." },
  'real-teen-stories': { title: "Real Teen Stories", parentCat: "Teen Perspectives", description: "A collection of unfiltered, personal essays and reflections written directly by teenagers about their lived experiences." },
  'when-i-was-a-teen': { title: "When I Was a Teen", parentCat: "Teen Perspectives", description: "Direct feedback from teens highlighting where they feel most supported, misunderstood, or validated by their families." }
};

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const category = CATEGORY_DICTIONARY[slug];

  if (!category) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366]">Category Under Construction</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">We are preparing our content streams for this collection. Check back with us shortly!</p>
          <a href="/" className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#009999] px-6 py-3 rounded-xl transition">Return to Homepage</a>
        </div>
      </div>
    );
  }

  const filteredPosts = await getPostsBySubCategory(slug);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <nav className="flex items-center space-x-2 text-xs font-bold tracking-wide text-slate-400 uppercase">
          <a href="/" className="hover:text-[#009999] transition">Home</a>
          <span>&gt;</span>
          <span className="text-slate-500">{category.parentCat}</span>
          <span>&gt;</span>
          <span className="text-[#009999]">{category.title}</span>
        </nav>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#009999] bg-teal-50 border border-teal-100 px-3 py-1 rounded-md">
            {category.parentCat} Collection
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#003366] mt-4 tracking-tight">
            {category.title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mt-4">
            {category.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#003366] mb-6">Articles in {category.title}</h2>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => {
                const formattedDate = post.date
                  ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : '';

                return (
                  <a href={`/blog/${post.slug}`} key={post.slug} className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between block text-left">
                    <div>
                      {post.coverImageUrl && (
                        <img src={post.coverImageUrl} alt={post.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                      )}
                      <span className="text-xs font-bold text-[#009999] tracking-wide uppercase bg-teal-50/60 border border-teal-100/80 px-2.5 py-1 rounded-md inline-block">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#003366] mt-3 group-hover:text-[#009999] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mt-2 text-sm line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                      <span>{formattedDate}</span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <h3 className="text-sm font-bold text-slate-700">Articles Coming Soon</h3>
              <p className="text-xs text-slate-400 mt-1">Our editorial board is preparing deep-dives for this category link!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}