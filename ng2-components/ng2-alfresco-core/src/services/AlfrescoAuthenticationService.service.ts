/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AlfrescoSettingsService } from './AlfrescoSettingsService.service';

declare let AlfrescoApi: any;

/**
 * The AlfrescoAuthenticationService provide the login service and store the token in the localStorage
 */
@Injectable()
export class AlfrescoAuthenticationService {

    alfrescoApi: any;

    /**
     * Constructor
     * @param alfrescoSettingsService
     */
    constructor(private alfrescoSettingsService: AlfrescoSettingsService) {
        this.alfrescoApi = new AlfrescoApi({
            host: this.getBaseUrl()
        });
    }

    getBaseUrl(): string {
        return this.alfrescoSettingsService.host;
    }

    getAlfrescoApi(): any {
        return this.alfrescoApi;
    }

    /**
     * The method return tru if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn(): boolean {
        return this.alfrescoApi.isLoggedIn();
    }

    /**
     * Method to delegate to POST login
     * @param username
     * @param password
     * @returns {Observable<R>|Observable<T>}
     */
    login(username: string, password: string) {
        this.alfrescoApi.changeConfig({
            username: username,
            password: password,
            host: this.getBaseUrl()
        });

        return Observable.fromPromise(this.alfrescoApi.login(username, password))
            .map(res => <any> res)
            .do(response => {
                return response;
            })
            .catch(this.handleError);
    }

    /**
     * The method remove the token from the local storage
     * @returns {Observable<T>}
     * @returns {Observable<T>do}
     */
    public logout() {
        return Observable.fromPromise(this.alfrescoApi.logout())
            .map(res => <any> res)
            .do(response => {
                return response;
            })
            .catch(this.handleError);
    }

    /**
     * The method write the error in the console browser
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response) {
        console.error('Error when logging in', error);
        return Observable.throw(error || 'Server error');
    }
}
