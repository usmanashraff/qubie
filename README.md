# Qubie 📄✨

> **AI-Powered Document Intelligence Platform** - Transform your documents into intelligent conversations powered by cutting-edge AI

[![Next.js](https://img.shields.io/badge/Next.js-15.2+-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0+-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## 🎯 Overview

Qubie is a full-featured document intelligence platform that enables users to upload, organize, and intelligently query their documents using advanced AI technology. Whether you're processing PDFs, Word documents, Excel sheets, or plain text files, Qubie provides an intuitive interface to chat with your documents and extract meaningful insights.

### Key Highlights
- 🤖 **AI-Powered Chat Interface** - Interact with your documents using natural language
- 📁 **Smart File Management** - Organize documents into groups for better workflow
- 🔍 **Vector Search** - Lightning-fast semantic search across your documents
- 💳 **Subscription Tiers** - Flexible pricing plans for individuals and teams
- 🔐 **Enterprise Security** - Secure authentication and encrypted data storage
- 🌓 **Dark Mode Support** - Beautiful dark/light theme toggle
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- **Framework:** Next.js 15.2 with React 19 & TypeScript
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** Radix UI primitives with shadcn/ui components
- **State Management:** TanStack React Query for data synchronization
- **Forms:** React Hook Form with Zod validation
- **RPC:** tRPC for type-safe API communication
- **Animations:** Framer Motion for smooth transitions

**Backend:**
- **Framework:** Next.js API Routes with tRPC
- **Database:** PostgreSQL with Prisma ORM
- **Real-time Updates:** Server-side polling with React Query
- **File Storage:** Google Cloud Storage & UploadThing
- **Authentication:** Kinde Auth
- **Payments:** Stripe integration for subscriptions

**AI & Machine Learning:**
- **LLM:** OpenAI GPT models, Google Generative AI
- **Vector Database:** Pinecone for semantic search
- **Vector Embeddings:** LangChain for RAG (Retrieval-Augmented Generation)
- **Document Processing:** pdf-parse, Mammoth (Word docs), xlsx (Excel files)

---

## 📋 Features

### Document Management
- ✅ Multi-format support: PDF, DOCX, TXT, XLSX, CSV
- ✅ Drag-and-drop file upload
- ✅ Organize files into groups
- ✅ Real-time upload progress tracking
- ✅ PDF preview with zoom and page navigation

### AI Chat Interface
- 💬 Natural language document querying
- 📚 Context-aware responses using RAG
- 🔄 Conversation history preservation
- ⚡ Stream-based response generation
- 🎯 Accurate citations from source documents

### User Management
- 👤 Secure authentication via Kinde
- 📊 Tiered subscription plans (Free, Pro, Premium)
- 💳 Stripe-powered subscription management
- 📈 Usage tracking and limits

### Dashboard
- 📂 File organization and management
- 🗂️ Group-based document categorization
- 📊 Upload status tracking
- ⚙️ Billing and subscription management

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm** or **yarn**
- **PostgreSQL** database
- API Keys for:
  - OpenAI or Google Generative AI
  - Pinecone (vector database)
  - Google Cloud Storage
  - Stripe (for payments)
  - Kinde (authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qubie.git
   cd qubie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/qubie"

   # Authentication (Kinde)
   KINDE_CLIENT_ID="your_kinde_client_id"
   KINDE_CLIENT_SECRET="your_kinde_secret"
   KINDE_ISSUER_URL="https://your-instance.kinde.com"
   KINDE_SITE_URL="http://localhost:3000"
   KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/auth-callback"
   KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"

   # AI & LLM
   OPENAI_API_KEY="sk-..."
   GOOGLE_GENERATIVE_AI_API_KEY="your-key"

   # Vector Database
   PINECONE_API_KEY="your-pinecone-key"
   PINECONE_INDEX_NAME="qubie"

   # Cloud Storage
   GOOGLE_CLOUD_STORAGE_BUCKET="your-bucket-name"
   GOOGLE_CLOUD_PROJECT_ID="your-project-id"
   GOOGLE_APPLICATION_CREDENTIALS="path/to/credentials.json"

   # File Upload
   UPLOADTHING_TOKEN="your-uploadthing-token"

   # Stripe
   STRIPE_API_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npm run build
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
qubie/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes (tRPC, webhooks)
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── pricing/           # Pricing page
│   │   ├── about/             # About page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── chat/              # Chat interface components
│   │   ├── sections/          # Landing page sections
│   │   ├── ui/                # Reusable UI components
│   │   └── ...
│   ├── lib/                   # Utility libraries
│   │   ├── openai.ts          # OpenAI integration
│   │   ├── pinecone.ts        # Pinecone client
│   │   ├── stripe.ts          # Stripe utilities
│   │   └── ...
│   ├── trpc/                  # tRPC configuration
│   ├── db/                    # Database utilities
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Prisma schema & migrations
├── public/                    # Static assets
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Test embeddings
npm run test:embeddings

# Test LLM
npm run test:llm
```

---

## 📊 Database Schema

### Core Models

```
User
├── id: String (primary)
├── email: String (unique)
├── files: File[]
├── messages: Message[]
├── fileGroups: FileGroup[]
└── stripe fields (customerId, subscriptionId, etc.)

FileGroup
├── id: String
├── name: String
├── uploadStatus: PENDING | PROCESSING | FAILED | SUCCESS
├── files: File[]
├── messages: Message[]
└── userId: String

File
├── id: String (cuid)
├── name: String
├── url: String
├── key: String
├── uploadStatus: PENDING | PROCESSING | FAILED | SUCCESS
├── fileGroupId: String?
└── userId: String

Message
├── id: String
├── text: Text
├── isUserMessage: Boolean
├── fileGroupId: String?
└── userId: String
```

---

## 🔌 API Endpoints (tRPC)

### File Operations
- `uploadFile` - Upload a new file
- `getFileUploadStatus` - Track upload progress
- `deleteFile` - Remove a file
- `getFileGroups` - List user's file groups

### Chat Operations
- `sendMessage` - Send a message to chat
- `getMessages` - Retrieve message history
- `generateFileName` - AI-powered file naming

### Subscription
- `getStripeSession` - Create checkout session
- `getSubscriptionPlan` - Get current plan info

---

## 🎨 Design System

### Color Scheme
- **Primary:** Blue (accessible contrast ratio 7:1)
- **Surface:** Light slate with dark mode support
- **Accent:** Cyan for interactive elements
- **Status:** Green (success), Red (error), Yellow (warning)

### Components
- Custom Radix UI primitives
- shadcn/ui component library
- Fully accessible (WCAG 2.1 AA)
- Smooth animations with Framer Motion

---

## 🔐 Security

- ✅ **Authentication:** Kinde Auth with secure sessions
- ✅ **Authorization:** Row-level security with user-based filtering
- ✅ **Data Encryption:** Files encrypted at rest in GCS
- ✅ **Input Validation:** Zod schemas for all inputs
- ✅ **CORS:** Configured for production domains
- ✅ **Rate Limiting:** Stripe webhook verification

---

## 📈 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in project settings
4. Deploy with one click

```bash
# Set up for Vercel
npm run build
```

### Self-Hosted

1. Use `npm run build` to create production bundle
2. Run `npm start` to serve application
3. Ensure PostgreSQL database is accessible
4. Set all environment variables on server

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

For questions, issues, or feedback:
- 📧 Email: support@qubie.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/qubie/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/qubie/discussions)

---

## 🙏 Acknowledgments

Built with cutting-edge technologies:
- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://www.prisma.io) - Database ORM
- [tRPC](https://trpc.io) - Type-safe RPC
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com) - UI primitives
- [LangChain](https://www.langchain.com) - LLM framework
- [OpenAI](https://openai.com) & [Google AI](https://ai.google.com) - LLM providers

---

<div align="center">

**[Live Demo](https://qubie.app)** • **[Documentation](https://docs.qubie.app)** • **[Report Bug](https://github.com/yourusername/qubie/issues)**

Made with ❤️ by the Qubie Team

</div>
