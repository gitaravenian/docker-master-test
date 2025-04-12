import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post | IC&I',
  description: 'Read our latest blog post about technology, business, and innovation',
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267]">
      {children}
    </div>
    <Footer />
    </>
  );
}