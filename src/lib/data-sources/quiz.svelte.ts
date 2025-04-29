import { type Result, tryCatchAsync } from "../utils/tryCatch";
import shuffle from "just-shuffle";

type Difficulty = "easy" | "medium" | "hard";

interface Question {
  difficulty: Difficulty;
  category: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export function createQuizDataSource() {
  const questions: Question[] = $state([]);
  let score = 0;

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
    },
    checkAnswerAndUpdateScore(
      questionIndex: number,
      answer: string,
    ): boolean {
      const question = questions[questionIndex];
      if (question?.correctAnswer === answer) {
        score++;
        return true;
      }

      return false;
    },
    get questions() {
      return questions;
    },
    get status() {
      if (questions.length === 0) {
        return "pending";
      }

      return "loaded";
    },
    get score() {
      return score;
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
