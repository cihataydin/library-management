import { Book } from '@/entities';

export class BookLogic {
  public static rateBook(book: Book, score: number) {
    const newTotalRatings = book.totalRatings + 1;
    const newAverageRating =
      (book.averageRating * book.totalRatings + score) / newTotalRatings;

    return { newTotalRatings, newAverageRating };
  }
}
