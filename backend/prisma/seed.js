const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create admin user (matches the existing admin in your SQL)
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'icandicompany@gmail.com' },
    update: {},
    create: {
      email: 'icandicompany@gmail.com',
      name: 'IC&I Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'HR Management',
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'Cybersecurity',
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: 'Digital Transformation',
      },
    }),
    prisma.category.upsert({
      where: { id: 4 },
      update: {},
      create: {
        id: 4,
        name: 'Business Strategy',
      },
    }),
  ]);

  // Create posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        title: '5 Key Strategies for Effective HR Management in 2024',
        content: 'As businesses face new challenges in 2024, effective HR management becomes crucial for maintaining productivity and employee satisfaction. Here are five key strategies that organizations should consider implementing:\r\n\r\n      **1. Embrace Digital HR Solutions**\r\n      \r\n      In today\'s fast-paced business environment, digital HR solutions are no longer optional but essential. Implementing comprehensive HR management systems can streamline processes, improve data accuracy, and enhance decision-making capabilities.\r\n      \r\n      Key benefits include:\r\n      - Automated payroll processing\r\n      - Digital employee records\r\n      - Performance tracking systems\r\n      - Integrated recruitment platforms\r\n      \r\n      **2. Focus on Employee Well-being**\r\n      \r\n      The importance of employee well-being has never been more apparent. Organizations should:\r\n      - Implement flexible work arrangements\r\n      - Provide mental health support\r\n      - Offer comprehensive wellness programs\r\n      - Create a supportive work environment\r\n      \r\n      **3. Develop Strong Learning & Development Programs**\r\n      \r\n      Continuous learning is crucial for both employee growth and organizational success. Consider:\r\n      - Personalized learning paths\r\n      - Skill-based training programs\r\n      - Leadership development initiatives\r\n      - Cross-functional training opportunities\r\n      \r\n      **4. Enhance Performance Management**\r\n      \r\n      Modern performance management should be:\r\n      - Continuous and feedback-driven\r\n      - Focused on development rather than just evaluation\r\n      - Aligned with organizational goals\r\n      - Supported by data and analytics\r\n      \r\n      **5. Prioritize Diversity, Equity, and Inclusion**\r\n      \r\n      A strong DEI strategy is essential for:\r\n      - Attracting top talent\r\n      - Fostering innovation\r\n      - Building a positive workplace culture\r\n      - Improving business outcomes\r\n      \r\n      **Looking Ahead**\r\n      \r\n      As we progress through 2024, HR managers must stay agile and responsive to changing workplace dynamics. By implementing these strategies, organizations can build a more resilient and effective workforce while maintaining high levels of employee engagement and satisfaction.',
        slug: '5-key-strategies-for-effective-hr-management-in-2024',
        categoryId: 1,
        image: '/api/blog/uploads/1742557056277-195870512.webp',
        published: true,
        authorId: 1,
      },
    }),
    prisma.post.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        title: 'The Role of Cybersecurity in Modern Business',
        content: `In today's digital era, cybersecurity is essential for every business, no matter its size or industry. With cyber threats becoming more frequent and sophisticated, companies must implement strong security measures to protect their assets, data, and reputation. A robust cybersecurity framework ensures trust and credibility with clients and stakeholders.\r\n\r\n**Here are Essential Components for Building a Robust Cybersecurity Strategy:**\r\n\r\n__Incident Response Plans:__ Prepare for breaches with a clear action plan to minimize damage, restore operations quickly, and prevent future incidents.\r\n\r\n**Understanding Cyber Threats:** Malware, ransomware, phishing, and insider threats are on the rise, posing significant risks to businesses.\r\n\r\n**Strong Security Protocols:** Implement firewalls, encryption, and multi-factor authentication to secure systems and sensitive data.\r\n\r\n**Employee Training:** Educating staff on best practices reduces human error, which is often exploited in cyberattacks.\r\n\r\n**Endpoint Security:** Protect mobile and remote devices with antivirus software, VPNs, and mobile device management.\r\n\r\n**Cybersecurity in Digital Transformation:**\r\n\r\nAs businesses embrace digital tools, cybersecurity must be a top priority. By proactively addressing threats, companies can protect their data, reputation, and future success. In today's world, cybersecurity is no longer optional—it's critical to thriving in the digital landscape.`,
        slug: 'the-role-of-cybersecurity-in-modern-business',
        categoryId: 2,
        image: '/api/blog/uploads/1742557227785-862764078.webp',
        published: true,
        authorId: 1,
      },
    }),
    prisma.post.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        title: 'How Digital Transformation is Shaping The Future of Business in Syria',
        content: 'As the business landscape evolves, digital transformation is becoming a key enabler of growth and innovation in Syria. Companies are rapidly embracing new technologies to streamline processes, enhance customer engagement, and improve overall efficiency. With advancements like cloud computing, artificial intelligence, and big data, businesses have more opportunities than ever to modernize and remain competitive.\r\n\r\nIn this blog, We will discuss:\r\n\r\n**The Rise of Cloud Services:** How cloud-based infrastructure is reducing costs, improving scalability, and enabling remote collaboration.\r\n\r\n**Automation and Efficiency:** How automating routine tasks is freeing up human resources for more value-added activities.\r\n\r\n**Artificial Intelligence (AI):** AI-powered solutions are enhancing customer service and decision-making across industries.\r\n\r\n**Data-Driven Decisions:** How businesses are leveraging big data analytics to understand market trends and consumer behavior.\r\n\r\n**Overcoming Challenges:** Key barriers to digital adoption, including infrastructure issues and regulatory concerns, and strategies to overcome them.\r\n\r\nAs digital transformation continues to shape the future, businesses in Syria need to remain agile and open to integrating technology into their operations. The companies that succeed will be those that can harness digital tools to create smarter, faster, and more customer-centric business models.',
        slug: 'how-digital-transformation-is-shaping-the-future-of-business-in-syria',
        categoryId: 3,
        image: '/api/blog/uploads/1742557278460-778589149.webp',
        published: true,
        authorId: 1,
      },
    }),
  ]);


  console.log('Database seeded with:');
  console.log(`- ${categories.length} categories`);
  console.log(`- ${posts.length} blog posts`);
  console.log(`- ${submission ? 1 : 0} sample submission`);
  console.log(`- ${admin && user ? 2 : 1} users (admin${user ? ' and regular' : ''})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });