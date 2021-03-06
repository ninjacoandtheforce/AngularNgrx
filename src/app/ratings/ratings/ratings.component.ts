import { Component, OnInit } from '@angular/core';
import { TRating } from '@app/core/model/TRating';
import { finalize } from 'rxjs/operators';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  selected: TRating;
  ratings: TRating[];
  loading: boolean;

  constructor(private ratingService: RatingService) {}

  ngOnInit() {
    this.getRatings();
  }

  add(rating: TRating) {
    this.loading = true;
    this.ratingService
      .add(rating)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        addedRating => (this.ratings = this.ratings.concat(addedRating))
      );
  }

  close() {
    this.selected = null;
  }

  delete(rating: TRating) {
    this.loading = true;
    this.close();
    this.ratingService
      .delete(rating)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => (this.ratings = this.ratings.filter(h => h.id !== rating.id))
      );
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getRatings() {
    this.loading = true;
    this.ratingService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(ratings => (this.ratings = ratings));
    this.close();
  }

  select(rating: TRating) {
    this.selected = rating;
  }

  update(rating: TRating) {
    this.loading = true;
    this.ratingService
      .update(rating)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () =>
          (this.ratings = this.ratings.map(h =>
            h.id === rating.id ? rating : h
          ))
      );
  }
}
