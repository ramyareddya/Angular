/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Card, IPagedResults} from '../model/card';

@Injectable()
export class ProfileService {


    // Resolve HTTP using the constructor
    constructor (private http: Http) {}
    // private instance variable to hold base url
    private installationUrl = 'http://localhost:3000';

    // Fetch all existing comments
    getComments() : Observable<Card[]> {
        console.log('inside getcomments');
        // ...using get request
        // return this.http.get(this.installationUrl)
        return this.http.get(`${this.installationUrl}/people`)
        // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<Card[]>> {
        return this.http.get(`${this.installationUrl}/peoples/?_embed=planets&_page=${page}&_limit=${pageSize}`)
            .map((res: Response) => {
                const totalRecords = 12;
                const  cards = res.json();

                return {
                    results: cards,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }

    filterCustomers(filterString: string): Observable<IPagedResults<Card[]>> {
        return this.http.get(`${this.installationUrl}/peoples/?_embed=planets&q=${filterString}`)
            .map((res: Response) => {
                //const totalRecords = +res.headers.get('X-InlineCount');
                const totalRecords = 12;
                const cards = res.json();

                return {
                    results: cards,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }


    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch(err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }


}
