import { Question } from './types';

export const COLORS = {
  deepTeal: '#006D77',
  mustard: '#E9C46A',
  coral: '#E76F51',
  offWhite: '#F8F9FA'
};

export const QUIZ_QUESTIONS: Question[] = [
  // Category A: Movement & Navigation
  {
    id: 1,
    text: "You are running late. What’s your instinct?",
    options: [
      { id: '1a', text: "Move first, pivot later", trait: "navigator" },
      { id: '1b', text: "Call someone for the fastest route", trait: "community" },
      { id: '1c', text: "Optimize my steps for speed", trait: "hustle" },
      { id: '1d', text: "Look for an unmapped shortcut", trait: "bender" }
    ]
  },
  {
    id: 2,
    text: "Public transport to you feels like:",
    options: [
      { id: '2a', text: "A puzzle to be solved for speed", trait: "hustle" },
      { id: '2b', text: "A chance to connect with the city pulse", trait: "community" },
      { id: '2c', text: "A chaotic flow I just drift through", trait: "navigator" },
      { id: '2d', text: "A schedule I expect to work as promised", trait: "seeker" }
    ]
  },
  {
    id: 3,
    text: "When directions are unclear, you:",
    options: [
      { id: '3a', text: "Ask a local for the unwritten rules", trait: "community" },
      { id: '3b', text: "Wait for someone else to show the way", trait: "regulator" },
      { id: '3c', text: "Ignore the map and trust my gut", trait: "bender" },
      { id: '3d', text: "Search for a guide to find my way", trait: "seeker" }
    ]
  },
  // Category B: Money & Value
  {
    id: 4,
    text: "Buying food, you care most about:",
    options: [
      { id: '4a', text: "Getting the best value for every cent", trait: "hustle" },
      { id: '4b', text: "Customizing my order to fit my needs", trait: "bender" },
      { id: '4c', text: "The quality and routine of the process", trait: "seeker" },
      { id: '4d', text: "Whatever is fastest and closest to me", trait: "navigator" }
    ]
  },
  {
    id: 5,
    text: "Negotiating makes you feel:",
    options: [
      { id: '5a', text: "In my element. Everything has a price", trait: "hustle" },
      { id: '5b', text: "Anxious. I'd rather avoid conflict", trait: "regulator" },
      { id: '5c', text: "Uncomfortable. I prefer the listed price", trait: "seeker" },
      { id: '5d', text: "Relationships matter more than a discount", trait: "community" }
    ]
  },
  {
    id: 6,
    text: "Your relationship with cash:",
    options: [
      { id: '6a', text: "Emergency backup for when digital fails", trait: "navigator" },
      { id: '6b', text: "I trust favors more than currency", trait: "community" },
      { id: '6c', text: "I track every transaction using digital", trait: "seeker" },
      { id: '6d', text: "I handle it with caution to avoid error", trait: "regulator" }
    ]
  },
  // Category C: Authority & Rules
  {
    id: 7,
    text: "Rules are:",
    options: [
      { id: '7a', text: "Contextual. They exist to be bent", trait: "bender" },
      { id: '7b', text: "Negotiable if there is a better outcome", trait: "hustle" },
      { id: '7c', text: "Essential for a safe and stable society", trait: "seeker" },
      { id: '7d', text: "Obstacles I'll bypass when I get there", trait: "navigator" }
    ]
  },
  {
    id: 8,
    text: "When faced with bureaucracy, you:",
    options: [
      { id: '8a', text: "Study the system to find loopholes", trait: "bender" },
      { id: '8b', text: "Call 'a guy' who knows someone inside", trait: "community" },
      { id: '8c', text: "Follow the official process step-by-step", trait: "seeker" },
      { id: '8d', text: "Follow the queue to avoid being noticed", trait: "regulator" }
    ]
  },
  {
    id: 9,
    text: "If a system breaks, you:",
    options: [
      { id: '9a', text: "Immediately find a workaround", trait: "hustle" },
      { id: '9b', text: "Check how the people around me are doing", trait: "community" },
      { id: '9c', text: "Stay safe while the chaos unfolds", trait: "regulator" },
      { id: '9d', text: "Abandon the path and find a new route", trait: "navigator" }
    ]
  },
  // Category D: Social Systems
  {
    id: 10,
    text: "Your comfort zone is:",
    options: [
      { id: '10a', text: "A familiar group where everyone helps", trait: "community" },
      { id: '10b', text: "Reading the vibe so everyone feels okay", trait: "regulator" },
      { id: '10c', text: "Places where usual rules don't apply", trait: "bender" },
      { id: '10d', text: "A quiet space with clear boundaries", trait: "seeker" }
    ]
  },
  {
    id: 11,
    text: "Asking for help feels:",
    options: [
      { id: '11a', text: "Natural. It's how communities function", trait: "community" },
      { id: '11b', text: "Like I'm imposing on someone's peace", trait: "regulator" },
      { id: '11c', text: "Like a failure of my own systems", trait: "seeker" },
      { id: '11d', text: "A strategic move to get results faster", trait: "hustle" }
    ]
  },
  {
    id: 12,
    text: "You trust:",
    options: [
      { id: '12a', text: "Reputation and network strength", trait: "community" },
      { id: '12b', text: "Proven methods that work consistently", trait: "seeker" },
      { id: '12c', text: "My ability to execute and get results", trait: "hustle" },
      { id: '12d', text: "My instincts in the heat of the moment", trait: "navigator" }
    ]
  },
  // Category E: Emotional Conditioning
  {
    id: 13,
    text: "When plans change suddenly, you feel:",
    options: [
      { id: '13a', text: "Excited by the challenge of the unknown", trait: "navigator" },
      { id: '13b', text: "Frustrated by the loss of order", trait: "seeker" },
      { id: '13c', text: "Alert to how this impacts the mood", trait: "regulator" },
      { id: '13d', text: "Interested in what new openings appear", trait: "bender" }
    ]
  },
  {
    id: 14,
    text: "Silence in a group feels:",
    options: [
      { id: '14a', text: "A comfortable space of belonging", trait: "community" },
      { id: '14b', text: "A tension I need to manage or break", trait: "regulator" },
      { id: '14c', text: "A missed opportunity to exchange value", trait: "hustle" },
      { id: '14d', text: "A rare moment of much-needed structure", trait: "seeker" }
    ]
  },
  {
    id: 15,
    text: "You learned early that emotions should be:",
    options: [
      { id: '15a', text: "Managed carefully to keep the peace", trait: "regulator" },
      { id: '15b', text: "Shared only with the inner circle", trait: "community" },
      { id: '15c', text: "Tools to navigate through a situation", trait: "navigator" },
      { id: '15d', text: "Kept out of the way of the objective", trait: "bender" }
    ]
  },
  {
    id: 16,
    text: "Comfort looks like:",
    options: [
      { id: '16a', text: "Being able to leave whenever I want", trait: "navigator" },
      { id: '16b', text: "Surrounded by people who have my back", trait: "community" },
      { id: '16c', text: "A hack that makes life easier", trait: "bender" },
      { id: '16d', text: "Knowing exactly what to expect today", trait: "regulator" }
    ]
  }
];