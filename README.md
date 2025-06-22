# ✨ Personal Portfolio Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

[![Portfolio](https://img.shields.io/badge/Portfolio-View%20Live-orange?style=for-the-badge)](https://rizkiramadhan.web.id)

A modern, responsive portfolio showcasing my work and skills, built with cutting-edge technologies.

</div>

## 🌟 Features

- 🎨 **Modern UI/UX** - Built with Radix UI components and Framer Motion animations
- 🌓 **Dark/Light Mode** - Seamless theme switching with next-themes
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance** - Powered by Turbopack for lightning-fast development
- 🔒 **Authentication** - Secure JWT-based authentication system
- 📊 **Database** - MongoDB integration with Mongoose
- 📝 **Form Handling** - Robust form validation with React Hook Form and Zod
- 🔔 **Notifications** - Elegant toast notifications with Sonner
- 🚀 **SEO Optimized** - Built with search engines in mind
- 📧 **Email Reply System** - Reply to contact messages directly from dashboard

## 📧 Email Reply Feature

The dashboard includes a powerful email reply system that allows you to:

- **Reply directly from dashboard** - No need to switch to Gmail or other email clients
- **Professional email formatting** - HTML emails with original message context
- **Status tracking** - Automatically marks messages as replied
- **Email persistence** - Remembers your email address for convenience
- **Multiple email services** - Support for Gmail, SendGrid, Outlook, etc.

### Email Setup

See `EMAIL_SETUP.md` for detailed configuration instructions.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT](https://jwt.io/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Email Service**: [Nodemailer](https://nodemailer.com/)

### Development

- **Server**: [Turbopack](https://turbo.build/pack)
- **Linting**: [ESLint](https://eslint.org/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

1. Visit the live site: [https://rizkiramadhan.web.id/](https://rizkiramadhan.web.id/)
2. Explore the different sections:
   - 👤 About Me
   - 💼 Projects
   - 🛠️ Skills
   - 📈 Experience
   - 📫 Contact

## 📫 Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-@Rizkiramadhan20-black?style=for-the-badge&logo=github)](https://github.com/Rizkiramadhan20)
[![Portfolio](https://img.shields.io/badge/Portfolio-View%20Live-orange?style=for-the-badge)](https://rizkiramadhan.web.id)

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Rizki Ramadhan

</div>

## WhatsApp Notifications

The website includes automatic WhatsApp notifications when new contact messages are received. This feature uses Ultramsg service for reliable message delivery.

### Quick Setup

1. **Register at Ultramsg**: Visit [ultramsg.com](https://ultramsg.com) and create an account
2. **Create WhatsApp Instance**: Scan QR code with your WhatsApp
3. **Get Credentials**: Copy Instance ID and Token from dashboard
4. **Configure Environment**: Add to `.env.local`:

```env
ULTRAMSG_INSTANCE_ID=your_instance_id_here
ULTRAMSG_TOKEN=your_token_here
ADMIN_WHATSAPP_NUMBER=6281234567890
```

5. **Test**: Use the "Test WhatsApp" button in the admin dashboard

For detailed setup instructions, see [WHATSAPP_SETUP.md](./WHATSAPP_SETUP.md)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- ImageKit account (for image uploads)
- Ultramsg account (for WhatsApp notifications)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd portofolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

```
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# WhatsApp Notifications (Ultramsg)
ULTRAMSG_INSTANCE_ID=your_instance_id
ULTRAMSG_TOKEN=your_token
ADMIN_WHATSAPP_NUMBER=6281234567890
```

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── dashboard/      # Admin dashboard pages
│   └── (auth)/         # Authentication pages
├── components/         # React components
├── hooks/             # Custom hooks and layouts
├── lib/               # Utility libraries
├── models/            # MongoDB models
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

## Features

### Public Pages

- **Home**: Landing page with hero section
- **About**: About me section
- **Projects**: Portfolio projects showcase
- **Skills**: Technical skills display
- **Contact**: Contact form with WhatsApp notifications

### Admin Dashboard

- **Content Management**: Edit home, about, skills content
- **Project Management**: Add, edit, delete projects
- **Contact Messages**: View and reply to contact form submissions
- **WhatsApp Integration**: Test and manage notifications

## API Endpoints

### Public APIs

- `GET /api/home` - Get home content
- `GET /api/about` - Get about content
- `GET /api/skills` - Get skills list
- `GET /api/projects` - Get projects list
- `POST /api/contact` - Submit contact form (triggers WhatsApp notification)

### Admin APIs

- `POST /api/auth/signin` - Admin login
- `POST /api/auth/signout` - Admin logout
- `GET /api/contact` - Get all contact messages
- `PATCH /api/contact/[id]` - Update contact status
- `DELETE /api/contact/[id]` - Delete contact message
- `POST /api/contact/send-reply` - Send email reply

### WhatsApp APIs

- `GET /api/test-whatsapp` - Check WhatsApp configuration
- `POST /api/test-whatsapp` - Send test WhatsApp message

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT tokens
- **Image Upload**: ImageKit
- **WhatsApp**: Ultramsg API
- **UI Components**: Custom components with shadcn/ui

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Check the [WHATSAPP_SETUP.md](./WHATSAPP_SETUP.md) for WhatsApp configuration
- Review the documentation in each component
- Open an issue on GitHub
