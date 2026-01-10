import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "3D Web Specialist",
    icon: mobile,
  },
  {
    title: "Cloud Architecture",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Junior Frontend Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2022 - September 2022",
    points: [
      "Developed responsive web applications using React.js, TypeScript, and Tailwind CSS, improving page load times by 40%.",
      "Collaborated with UX designers to implement pixel-perfect designs and ensure accessibility standards (WCAG 2.1).",
      "Integrated RESTful APIs and GraphQL endpoints to deliver dynamic content across multiple platforms.",
      "Mentored junior developers and conducted code reviews to maintain high code quality standards.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "October 2022 - June 2024",
    points: [
      "Architected and deployed scalable microservices using Node.js, Express, and PostgreSQL handling 100K+ daily users.",
      "Built real-time data visualization dashboards with React, D3.js, and WebSocket connections for live telemetry monitoring.",
      "Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time by 60%.",
      "Optimized database queries and implemented Redis caching, improving API response times from 800ms to 120ms.",
    ],
  },
  {
    title: "Senior Full-Stack Engineer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "July 2024 - December 2025",
    points: [
      "Led development of e-commerce platform features using Next.js 14, React Server Components, and Prisma ORM.",
      "Designed and implemented payment processing systems integrating Stripe, PayPal, and crypto payment gateways.",
      "Built custom Shopify apps using Polaris design system, serving 10,000+ merchants with 99.9% uptime.",
      "Established testing infrastructure with Jest, React Testing Library, and Playwright achieving 85% code coverage.",
    ],
  },
  {
    title: "Lead Full-Stack Developer & 3D Specialist",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "January 2026 - Present",
    points: [
      "Spearheading development of immersive 3D web experiences using Three.js, React Three Fiber, and WebGL shaders.",
      "Building metaverse prototypes and AR/VR web applications with cutting-edge spatial computing technologies.",
      "Leading a team of 5 developers in agile environment, conducting sprint planning and technical architecture reviews.",
      "Implementing AI-powered features using OpenAI APIs, LangChain, and custom ML models for enhanced user experiences.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Joshua's expertise in 3D web development transformed our product showcase. The immersive experience increased user engagement by 200% and conversion rates by 45%. Absolutely phenomenal work!",
    name: "Sarah Mitchell",
    designation: "VP of Product",
    company: "TechVision Inc",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Working with Joshua was a game-changer. His full-stack expertise and attention to detail delivered a scalable platform that handles millions of transactions seamlessly. A true professional!",
    name: "Marcus Chen",
    designation: "CTO",
    company: "FinTech Solutions",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Joshua's ability to blend cutting-edge technology with stunning design is unmatched. Our website performance improved by 60%, and client feedback has been overwhelmingly positive. Highly recommend!",
    name: "Emily Rodriguez",
    designation: "CEO",
    company: "Digital Innovations",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "3D Portfolio Universe",
    description:
      "An immersive 3D portfolio website featuring interactive planets, space navigation, and real-time particle systems. Built with Three.js and React Three Fiber, showcasing advanced WebGL techniques and custom shaders for stunning visual effects.",
    tags: [
      {
        name: "threejs",
        color: "blue-text-gradient",
      },
      {
        name: "react-three-fiber",
        color: "green-text-gradient",
      },
      {
        name: "webgl",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/joshictech/3d-portfolio",
  },
  {
    name: "AI Code Assistant Platform",
    description:
      "Full-stack SaaS platform leveraging OpenAI GPT-4 and custom ML models to provide intelligent code suggestions, bug detection, and automated documentation. Features real-time collaboration, syntax highlighting, and multi-language support for 20+ programming languages.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "openai",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/joshictech/ai-code-assistant",
  },
  {
    name: "Decentralized NFT Marketplace",
    description:
      "A cutting-edge Web3 NFT marketplace built on Ethereum blockchain with smart contracts for secure trading. Features include wallet integration (MetaMask, WalletConnect), IPFS storage, real-time auction bidding, and gasless transactions using meta-transactions.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "ethers.js",
        color: "green-text-gradient",
      },
      {
        name: "ipfs",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/joshictech/nft-marketplace",
  },
];

export { services, technologies, experiences, testimonials, projects };
