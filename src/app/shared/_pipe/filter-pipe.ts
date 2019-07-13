import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Age' })

export class FilterPipe implements PipeTransform {
    transform(likes: any, term: any): any {
        var liked = [];
        for (var i = 0; i < likes.length ; i++) {
            if (likes[i] === term) {
                liked.push(term);
            }
        }
        return liked;
    }
}
