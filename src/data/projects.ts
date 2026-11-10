import type { SkillId } from './skills';

export interface Project {
  id: string;
  /** Projection-bay file code shown on the panel. */
  code: string;
  title: string;
  kind: 'Client' | 'Personal';
  summary: string;
  /** Longer description shown when the file is opened. */
  detail: string;
  images: string[];
  link?: string;
  github?: string;
  skills: SkillId[];
}

export const projects: Project[] = [
  {
    id: 'leap-into-lessons-2',
    code: 'PRJ-06',
    title: 'Leap Into Lessons 2.0',
    kind: 'Client',
    summary: 'A full-stack booking platform for a swim school.',
    detail:
      'Replaced a WordPress site and a spreadsheet with real online booking: class capacity, time slots held during checkout, an admin calendar, family accounts and automated confirmation and reminder emails.',
    images: [
      '/LeapIntoLessons2_Hero.webp',
      '/LeapIntoLessons2_Features.webp',
      '/LeapIntoLessons2_Testimonials.webp',
      '/LeapIntoLessons2_Instructors.webp',
      '/LeapIntoLessons2_FAQ.webp',
      '/LeapIntoLessons2_Contact.webp',
    ],
    link: 'https://leapintolessons.com',
    skills: ['nextjs', 'react', 'typescript', 'tailwind', 'mongodb', 'node', 'a11y', 'perf'],
  },
  {
    id: 'oawn',
    code: 'PRJ-05',
    title: 'Ontario Animal Welfare Network',
    kind: 'Client',
    summary: 'A fast, accessible home on the web for a coalition of humane societies.',
    detail:
      'A React single-page site with a member directory, membership information and a guide to reporting animal-welfare concerns, built to WCAG 2.1 AA.',
    images: [
      '/oawn-home.webp',
      '/oawn-aboutus.webp',
      '/oawn-members.webp',
      '/oawn-join.webp',
      '/oawn-report.webp',
      '/oawn-animalwelfare.webp',
    ],
    link: 'https://www.oawn.info',
    skills: ['react', 'typescript', 'sass', 'vercel', 'a11y'],
  },
  {
    id: 'bogustore',
    code: 'PRJ-04',
    title: 'BoguStore',
    kind: 'Personal',
    summary: 'A mock e-commerce store built to show off unit testing.',
    detail:
      'Category browsing, sales, a cart and a three-step checkout, with Redux state and a Jest suite covering the product list, cart and checkout flows.',
    images: [
      '/Bogustore_Home_Page.webp',
      '/Bogustore_Category_Page.webp',
      '/Bogustore_Sale_Page.webp',
      '/Bogustore_Cart_Page.webp',
      '/Bogustore_Shipping_Info.webp',
      '/Bogustore_Payment_Info.webp',
      '/Bogustore_Order_Summary.webp',
      '/bogustore_productlist_test.webp',
      '/bogustore_cart_test.webp',
      '/bogustore_checkout_test.webp',
    ],
    link: 'https://bogustore.vercel.app/',
    github: 'https://github.com/CPaskewitz/bogustore',
    skills: ['nextjs', 'typescript', 'redux', 'tailwind', 'jest', 'vercel'],
  },
  {
    id: 'questlist-rpg',
    code: 'PRJ-03',
    title: 'QuestListRPG',
    kind: 'Personal',
    summary: 'A task manager that turns your to-do list into an RPG.',
    detail:
      'Finish tasks to earn XP and gold, level up, and spend it in a shop. Character art is generated with the DALL·E 3 API; data lives in MongoDB behind a REST API on Heroku.',
    images: [
      '/QuestListRPG_Home_Page.webp',
      '/QuestListRPG_Login.webp',
      '/QuestListRPG_Levelup.webp',
      '/QuestListRPG_Shop.webp',
      '/QuestListRPG_Stats.webp',
    ],
    github: 'https://github.com/CPaskewitz/taskmasterrpg',
    skills: ['react', 'typescript', 'sass', 'mongodb', 'node', 'rest', 'openai', 'heroku'],
  },
  {
    id: 'petadoptr',
    code: 'PRJ-02',
    title: 'PetAdoptr',
    kind: 'Personal',
    summary: 'A mobile app for finding animals available for adoption.',
    detail:
      'A React Native app with swipeable pet profiles, real-time direct messages over WebSockets, and a Node and MySQL back end with Knex migrations.',
    images: [
      '/PetAdoptr_Grid_Page.jpeg',
      '/PetAdoptr_Pet_Profile.jpeg',
      '/PetAdoptr_DM.jpeg',
      '/PetAdoptr_LM.jpeg',
      '/PetAdoptr_Web_Sockets.jpeg',
      '/PetAdoptr_Knex.jpeg',
    ],
    skills: ['react-native', 'typescript', 'node', 'mysql', 'sass'],
  },
  {
    id: 'leap-into-lessons',
    code: 'PRJ-01',
    title: 'Leap Into Lessons',
    kind: 'Client',
    summary: 'The original WordPress booking site for summer swim lessons.',
    detail:
      'A custom WordPress build with PHP booking forms and Google Maps lesson locations. Version 2.0 above replaced it.',
    images: ['/leap-home.webp', '/leapintolessons_booking.webp'],
    skills: ['wordpress', 'php', 'rest', 'html', 'css'],
  },
];
