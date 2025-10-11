// Animation configurations for consistent animations across the application

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// Specific animations for AnimatedDescription
export const descriptionAnimations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.4 },
  },
  word: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
};

// Specific animations for AnimatedCard
export const cardAnimations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  avatar: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
  name: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 },
  },
  badges: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.3 },
  },
};

// Home component animations
export const homeAnimations = {
  mouseBlob: {
    animate: (mousePosition: { x: number; y: number }, isHovered: boolean) => ({
      x: mousePosition.x - 800,
      y: mousePosition.y - 400,
      scale: isHovered ? [0.8, 1.1, 0.8] : 0,
      opacity: isHovered ? 0.15 : 0,
    }),
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 25 },
      y: { type: "spring" as const, stiffness: 300, damping: 25 },
      scale: { duration: 2, repeat: Infinity },
      opacity: { duration: 0.4 },
    },
  },
  mouseBlobSmall: {
    animate: (mousePosition: { x: number; y: number }, isHovered: boolean) => ({
      x: mousePosition.x - 650,
      y: mousePosition.y - 350,
      scale: isHovered ? [0.6, 0.9, 0.6] : 0,
      opacity: isHovered ? 0.1 : 0,
    }),
    transition: {
      x: { type: "spring" as const, stiffness: 250, damping: 20 },
      y: { type: "spring" as const, stiffness: 250, damping: 20 },
      scale: { duration: 2.5, repeat: Infinity },
      opacity: { duration: 0.4 },
    },
  },
  mouseBlobTiny: {
    animate: (mousePosition: { x: number; y: number }, isHovered: boolean) => ({
      x: mousePosition.x - 750,
      y: mousePosition.y - 450,
      scale: isHovered ? [0.4, 0.7, 0.4] : 0,
      opacity: isHovered ? 0.08 : 0,
    }),
    transition: {
      x: { type: "spring" as const, stiffness: 200, damping: 15 },
      y: { type: "spring" as const, stiffness: 200, damping: 15 },
      scale: { duration: 3, repeat: Infinity },
      opacity: { duration: 0.4 },
    },
  },
  title: {
    initial: { opacity: 0, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.2,
    }),
  },
  span: {
    initial: { opacity: 0, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    whileHover: (isInitialLoading: boolean) => ({
      scale: isInitialLoading ? 1 : 1.2,
      color: "var(--color-primary)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    }),
    transition: (isInitialLoading: boolean, index: number) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.6 + index * 0.1,
    }),
  },
  button: {
    initial: { opacity: 0, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.8,
    }),
  },
  description: {
    initial: { opacity: 0, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 1.0,
    }),
  },
};

// Skills component animations
export const skillsAnimations = {
  title: {
    initial: { opacity: 0, y: 30 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 30,
    }),
    transition: { duration: 0.6 },
  },
  container: {
    initial: { opacity: 0 },
    animate: (isInView: boolean) => ({ opacity: isInView ? 1 : 0 }),
    transition: { duration: 0.3, delay: 0.1 },
  },
  skill: {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      scale: isInView ? 1 : 0.8,
      y: isInView ? 0 : 30,
    }),
    transition: (index: number) => ({
      duration: 0.4,
      delay: 0.1 + index * 0.03,
    }),
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.95, transition: { duration: 0.1 } },
  },
  skillIcon: {
    initial: { scale: 0 },
    animate: (isInView: boolean) => ({ scale: isInView ? 1 : 0 }),
    transition: (index: number) => ({
      duration: 0.3,
      delay: 0.2 + index * 0.03,
    }),
  },
  skillText: {
    initial: { opacity: 0, x: -10 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      x: isInView ? 0 : -10,
    }),
    transition: (index: number) => ({
      duration: 0.3,
      delay: 0.25 + index * 0.03,
    }),
  },
};

// YouTube component animations
export const youtubeAnimations = {
  heading: {
    initial: { opacity: 0, y: 50 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 50,
    }),
    transition: { duration: 0.8 },
  },
  subtitle: {
    initial: { opacity: 0, y: 30 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 30,
    }),
    transition: { duration: 0.6, delay: 0.2 },
  },
  category: {
    initial: { opacity: 0, scale: 0.9 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      scale: isInView ? 1 : 0.9,
    }),
    transition: (index: number) => ({ duration: 0.4, delay: index * 0.1 }),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  categoryActive: {
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },
  content: {
    initial: { opacity: 0, y: 30 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 30,
    }),
    transition: (index: number) => ({ duration: 0.6, delay: index * 0.1 }),
  },
  contentTitle: {
    initial: { opacity: 0, y: 20 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 20,
    }),
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1 + 0.2,
    }),
    whileHover: { scale: 1.02 },
  },
  contentDescription: {
    initial: { opacity: 0, y: 15 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 15,
    }),
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1 + 0.3,
    }),
  },
  contentButton: {
    initial: { opacity: 0, y: 20 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 20,
    }),
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1 + 0.4,
    }),
  },
  pagination: {
    initial: { opacity: 0, y: 30 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 30,
    }),
    transition: { duration: 0.6, delay: 0.5 },
  },
};

// Projects component animations
export const projectsAnimations = {
  header: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  category: {
    whileInView: { scale: [0.9, 1] },
    transition: { duration: 0.3 },
  },
  categoryActive: {
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },
  project: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (index: number) => ({ duration: 0.5, delay: index * 0.1 }),
  },
};

// Articles component animations
export const articlesAnimations = {
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  seeAll: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 },
  },
  article: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (index: number) => ({ duration: 0.5, delay: index * 0.1 }),
    whileHover: { scale: 1.02 },
  },
  articleImage: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: (index: number) => ({ duration: 0.5, delay: index * 0.1 }),
  },
  articleIcon: {
    initial: { opacity: 0, x: 20, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: (index: number) => ({
      duration: 0.4,
      delay: index * 0.1 + 0.3,
    }),
  },
  articleContent: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1 + 0.2,
    }),
  },
  articleCategory: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: (index: number) => ({
      duration: 0.4,
      delay: index * 0.1 + 0.3,
    }),
  },
  articleMeta: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: (index: number) => ({
      duration: 0.4,
      delay: index * 0.1 + 0.4,
    }),
  },
  articleTitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1 + 0.5,
    }),
  },
};

// Achievements component animations
export const achievementsAnimations = {
  title: {
    initial: { opacity: 0, y: 50 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 50,
    }),
    transition: { duration: 0.8 },
  },
  achievementTitle: {
    initial: { opacity: 0, y: 20 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      y: isInView ? 0 : 20,
    }),
    transition: (index: number) => ({ duration: 0.6, delay: index * 0.1 }),
    whileHover: { scale: 1.02 },
  },
  achievementButton: {
    initial: { opacity: 0, x: 20 },
    animate: (isInView: boolean) => ({
      opacity: isInView ? 1 : 0,
      x: isInView ? 0 : 20,
    }),
    transition: (index: number) => ({
      duration: 0.6,
      delay: index * 0.1 + 0.2,
    }),
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
};

// Header component animations
export const headerAnimations = {
  header: {
    initial: { opacity: 0, y: -20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? -20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.2,
    }),
  },
  logo: {
    whileHover: { scale: 1.01 },
    transition: { duration: 0.2 },
  },
  logoChar: {
    initial: { opacity: 0, y: 10 },
    animate: (
      isInitialLoading: boolean,
      hoveredIndex: number | null,
      index: number
    ) => ({
      opacity: isInitialLoading ? 0 : 1,
      y: isInitialLoading ? 20 : hoveredIndex === index ? -5 : 0,
      scale: isInitialLoading ? 0.8 : hoveredIndex === index ? 1.2 : 1,
    }),
    transition: (isInitialLoading: boolean, index: number) => ({
      opacity: { delay: isInitialLoading ? 0 : 0.3 + index * 0.05 },
      y: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
        delay: isInitialLoading ? 0 : 0.3 + index * 0.05,
      },
      scale: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    }),
  },
  themeToggle: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      scale: isInitialLoading ? 0.8 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.5,
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    }),
  },
  menuButton: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: (isInitialLoading: boolean) => ({
      opacity: isInitialLoading ? 0 : 1,
      scale: isInitialLoading ? 0.8 : 1,
      y: isInitialLoading ? 20 : 0,
    }),
    transition: (isInitialLoading: boolean) => ({
      duration: 0.5,
      delay: isInitialLoading ? 0 : 0.6,
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    }),
  },
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    },
    content: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  },
  menuItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: (index: number) => ({
      delay: index * 0.1,
      duration: 0.3,
    }),
  },
  menuButtonItem: {
    whileHover: { scale: 1.02 },
  },
  menuArrow: {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.95 },
  },
  closeButton: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  footer: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4, duration: 0.3 },
  },
  socialLink: {
    whileHover: { x: 5 },
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: (index: number) => ({ delay: 0.6 + index * 0.1 }),
  },
  emailInput: {
    whileFocus: { scale: 1.02 },
  },
  emailArrow: {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.95 },
  },
};

// Footer component animations
export const footerAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  },
  social: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
  },
  nav: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  },
  brand: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2 },
  },
  copyright: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.8, duration: 0.5 },
  },
  heart: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
};

// BlurText component animations
export const blurTextAnimations = {
  defaultFrom: (direction: "top" | "bottom") =>
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -50 }
      : { filter: "blur(10px)", opacity: 0, y: 50 },
  defaultTo: (direction: "top" | "bottom") => [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      y: direction === "top" ? 5 : -5,
    },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ],
};

// Spring configurations for 3D effects
export const springConfig = {
  damping: 30,
  stiffness: 80,
  mass: 1.5,
};

// Mouse tracking ranges for 3D transforms
export const mouseRanges = {
  x: [-150, 150],
  y: [-150, 150],
  rotateX: [5, -5],
  rotateY: [-5, 5],
};

// Transition configurations
export const transitions = {
  smooth: { duration: 0.2 },
  spring: { type: "spring" as const, damping: 25, stiffness: 300 },
  bounce: { type: "spring" as const, damping: 10, stiffness: 200 },
};
