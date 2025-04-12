import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | IC&I',
  description: 'Explore our comprehensive range of ICT solutions and business outsourcing services.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}