import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | IC&I',
  description: 'Latest insights and updates from IC&I on technology, business, and industry trends.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}