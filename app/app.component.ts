 import { Component } from '@angular/core';

 @Component({
    selector: 'my-app',
    template: `
    	<div class="container">
				<div class="row">
					<div class="col-xs-3">
						<weather-widget></weather-widget>
					</div>
				</div>
			</div>
    `
 })
 export class AppComponent {}