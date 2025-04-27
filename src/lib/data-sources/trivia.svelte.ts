import {type Result, tryCatchAsync} from "../utils/tryCatch";
import shuffle from 'just-shuffle'

type Difficulty = "easy" | "medium" | "hard";

interface Question {
  difficulty: Difficulty;
  category: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export function createTriviaDataSource() {
  const questions: Question[] = $state([]);

  return {
    async init(options = {
      easy: 5,
      medium: 3,
      hard: 2
    }) {
      questions.length = 0;

      const questionResults = await Promise.all([
        loadQuestions("easy", 5),
        loadQuestions("medium", 3),
        loadQuestions("hard", 2)
      ])

      questionResults.map(([error, loadedQuestions]) => {
        if(error) {
          return console.error(error);
        }

        questions.push(...loadedQuestions);
      })

      shuffle(questions);
    },
    get questions() {
      return questions
    },
    get status() {
      if(questions.length === 0) {
        return 'pending';
      }

      return 'loaded';
    }
  }
}

async function loadQuestions(difficulty: Difficulty, amount: number): Promise<Result<Question[]>> {
  const [fetchError, response] = await tryCatchAsync(() => fetch(`https://opentdb.com/api.php?amount=${Math.floor(amount)}&difficulty=${difficulty}&type=multiple`));

  if(fetchError) {
    return [fetchError, null];
  }

  if(!response.ok) {
    return [new Error(response.statusText), null]
  }

  const [parseError, parsedJSON] = await tryCatchAsync(() => response.json());

  if(parseError) {
    return [parseError, null];
  }

  return parsedJSON.results.map((result: Record<string, unknown>) => ({
    difficulty: result.difficulty,
    category: result.category,
    question: result.question,
    correctAnswer: result.correct_answer,
    incorrectAnswers: result.incorrect_answers
  }))
}