import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'pa-top-search-bar',
    templateUrl: './top-search-bar.component.html', 
    styles: ['top-search.component.scss']
})

export class TopSearchBarComponent implements OnInit {

    ngOnInit() {
        console.log('init top search bar')
    }

}