import { type Result, tryCatchAsync } from "../utils/tryCatch";
import shuffle from "just-shuffle";

type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  difficulty: Difficulty;
  category: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export type QuizDataSource = ReturnType<typeof createQuizDataSource>;

export function createQuizDataSource() {
  let questions: Question[] = $state([]);
  let score = $state(0);

  let currentQuestionIndex: null | number = $state(null);
  let currentQuestion: Question | null = $derived(
    currentQuestionIndex === null ? null : questions[currentQuestionIndex],
  );

  return {
    async init(
      options = {
        questions: 10,
      },
    ) {
      questions.length = 0;

      const [error, loadedQuestions] = await loadQuestions(options.questions);

      if (error) {
        return console.error(error);
      }

      questions.push(...shuffle(loadedQuestions));
      currentQuestionIndex = 0;
    },

    updateScore(answer: string): void {
      const isCorrectAnswer = currentQuestion?.correctAnswer === answer;

      if (isCorrectAnswer) {
        score++;
      }
    },

    nextQuestion() {
      currentQuestionIndex = (currentQuestionIndex ?? 0) + 1;
    },

    get questions() {
      return questions;
    },

    get status() {
      if (questions.length === 0) {
        return "pending";
      }

      if (currentQuestionIndex === questions.length) {
        return "finished";
      }

      return "started";
    },

    get score() {
      return score;
    },

    get currentQuestion() {
      return currentQuestion;
    },
  };
}

async function loadQuestions(amount: number): Promise<Result<Question[]>> {
  const [fetchError, response] = await tryCatchAsync(() =>
    fetch(
      `https://opentdb.com/api.php?amount=${Math.floor(amount)}&type=multiple`,
    ),
  );

  if (fetchError) {
    return [fetchError, null];
  }

  if (!response.ok) {
    return [new Error(response.statusText), null];
  }

  const [parseError, parsedJSON] = await tryCatchAsync(() => response.json());

  if (parseError) {
    return [parseError, null];
  }

  return [
    null,
    parsedJSON.results.map((result: Record<string, unknown>) => ({
      difficulty: result.difficulty,
      category: result.category,
      question: result.question,
      correctAnswer: result.correct_answer,
      incorrectAnswers: result.incorrect_answers,
    })),
  ];
}
