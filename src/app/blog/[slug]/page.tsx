import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getValue } from '../../../lib/db';
import { getBlogPostBySlug } from '../../../lib/blogDb';
import { INITIAL_DOCTOR_PROFILE, INITIAL_SERVICES, INITIAL_CLINICS } from '../../../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation } from '../../../types';
import { BlogPostPageClient } from '../../../components/BlogPostPageClient';

// Same freshness convention as the homepage — admin edits show up immediately, without a rebuild.
export const dynamic = 'force-dynamic';

interface BlogPostRouteProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug, { includeDrafts: false });
  if (!post) return {};

  const description = post.metaDescription || post.summary;
  return {
    title: post.metaTitle || `${post.title} | Dr. Rachit Raj`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostRouteProps) {
  const post = await getBlogPostBySlug(params.slug, { includeDrafts: false });
  if (!post) notFound();

  const [profile, services, clinics] = await Promise.all([
    getValue<DoctorProfile>('profile').then((v) => v ?? INITIAL_DOCTOR_PROFILE),
    getValue<Service[]>('services').then((v) => v ?? INITIAL_SERVICES),
    getValue<ClinicLocation[]>('clinics').then((v) => v ?? INITIAL_CLINICS),
  ]);

  return <BlogPostPageClient profile={profile} services={services} clinics={clinics} post={post} />;
}
