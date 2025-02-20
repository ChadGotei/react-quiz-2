import questions from './questions.json';

export const TIMER_DURATION = 15; 
export const TOTAL_QUESTIONS = 10;
export const TOTAL_MCQS = questions.filter((ques) => ques.type === "mcq").length;
export const MAX_TIME = TOTAL_QUESTIONS * TIMER_DURATION / 60;

export const navLinks = [
    { id: "home", name: "Home", link: "/" },
    { id: "history", name: "History", link: "/history" },
];

export const instructionContent = [
    {
        id: 1,
        num: 1,
        content: "For multiple-choice questions, select the one best answer (A, B, C, or D)."
    },
    {
        id: 2,
        num: 2,
        content: "For integer-type questions, write your numerical answer clearly."
    },
    {
        id: 3,
        num: 3,
        content: "No calculators unless specified.",
    },
    {
        id: 4,
        num: 4,
        content: `You have ${MAX_TIME} minutes to complete this quiz.`,
    }
];

// export const socialsLink = [
//     {
//         id: 1,
//         name: 'Linkedin',
//         link: 'https://www.linkedin.com/in/gaurav-sharma-918832165/',
//         svg: linkedin,
//     },
// ]