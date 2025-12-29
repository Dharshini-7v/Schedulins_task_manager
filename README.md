# 🎁 Schedulins

**Gamified Productivity App - Turn Tasks Into Rewards**

Schedulins transforms boring task management into an exciting collecting game. Complete your daily tasks and earn themed collectible rewards to stay motivated and productive!

## ✨ Features

- **📋 Task Planning**: Organize your daily tasks with time limits and deadlines
- **⚡ Task Execution**: Focus mode with timer and progress tracking
- **🎁 Reward System**: Earn collectible stickers and badges from 22+ themed categories
- **🎮 Gamification**: Daily reward rotation keeps the experience fresh
- **🎨 Clean UI**: Modern, aesthetic design with smooth animations
- **📱 Responsive**: Works perfectly on desktop and mobile devices

## 🏆 Reward Categories

Collect themed rewards from diverse categories:
- 🚀 Space • 🍕 Food • 🎌 Anime • 🎵 Music • 🐱 Cute Animals
- 🎮 Gaming • 📚 Books • ✈️ Travel • 💪 Fitness • 🎨 Art
- ⚽ Sports • 👗 Fashion • 💻 Coding • 📖 Study • 🌱 Gardening
- 🧘 Wellbeing • 🎬 Movies • 📸 Photography • 🔨 DIY • 🗣️ Language
- ✂️ Crafts • 🏔️ Outdoors

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion, Canvas Confetti
- **Audio**: Howler.js
- **Assets**: Custom SVG generation system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharshini-7v/Schedulins_task_manager.git
   cd Schedulins_task_manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate reward assets**
   ```bash
   npm run generate:assets
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
schedulins/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication
│   ├── plan/             # Task planning
│   ├── execute/          # Task execution
│   ├── reward/           # Reward system
│   └── settings/         # User settings
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── execute/          # Task execution UI
│   ├── layout/           # Layout components
│   ├── reward/           # Reward system UI
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and types
├── public/               # Static assets
│   └── rewards/          # Generated reward assets
└── scripts/              # Build scripts
```

## 🎮 How It Works

1. **Plan**: Create tasks with time limits and deadlines
2. **Execute**: Complete tasks in focus mode with timer
3. **Reward**: Earn surprise collectibles from themed categories
4. **Collect**: Build your personal collection of achievements
5. **Repeat**: Daily rotation keeps rewards fresh and exciting

## 🎨 Design Philosophy

- **Aesthetic First**: Clean, modern interface that's pleasant to use
- **Motivation Through Gamification**: Collectible rewards provide intrinsic motivation
- **Surprise & Delight**: Mystery rewards create anticipation and joy
- **Accessibility**: Responsive design works for everyone

## 🚀 Deployment

The app is deployed on Vercel with automatic deployments from the main branch.

**Live Demo**: [Your Vercel URL]

## 🤝 Contributing

This is a solo project, but feedback and suggestions are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Dharshini** - Full-stack developer and designer

- Designed and developed the complete application
- Created the gamification system and reward mechanics  
- Built all UI/UX components and animations
- Implemented the technical architecture and deployment

---