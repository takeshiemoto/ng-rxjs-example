import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { filter, map, switchMap, take, tap, timeout } from 'rxjs/operators';
import { MockApiService } from '../mock-api.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  readonly log$ = new Subject<string>();
  private readonly subject$ = new Subject<number>();

  constructor(private readonly mockApiService: MockApiService) {}

  ngOnInit(): void {
    const TIMEOUT = 5000;
    const INTERVAL = 1000;

    this.subject$
      .pipe(
        tap(id => this.log$.next(`Current id is ${id}`)),
        timeout(TIMEOUT),
        switchMap(id =>
          interval(INTERVAL).pipe(
            switchMap(() => this.mockApiService.getInfo(id)),
            filter(
              ({ status }) => status === 200 || status === 400 // 終了条件
            ),
            map(response => {
              if (response.status === 400) {
                throw new Error('Rejected');
              }
              return response;
            }),
            take(1)
          )
        )
      )
      .subscribe(
        value => console.log(value),
        errors => console.log(`ERR: ${errors}`)
      );
  }

  runStream() {
    const nextId = Math.floor(Math.random() * 6);
    this.subject$.next(nextId);
  }
}
