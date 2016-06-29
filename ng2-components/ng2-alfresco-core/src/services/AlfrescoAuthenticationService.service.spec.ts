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

import { describe, expect, beforeEach, it, async, inject } from '@angular/core/testing';
import { ReflectiveInjector } from '@angular/core';
import { AlfrescoAuthenticationService } from './AlfrescoAuthenticationService.service';
import { AlfrescoSettingsService } from './AlfrescoSettingsService.service';
import { AlfrescoApiMock } from  '../assets/AlfrescoApi.mock';
declare var AlfrescoApi: any;

describe('AlfrescoAuthentication', () => {

    let authService;

    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            AlfrescoAuthenticationService,
            AlfrescoSettingsService
        ]);

        authService = this.injector.get(AlfrescoAuthenticationService);
    });

    it('test AlfrescoAuthenticationService', () => {
        expect(authService instanceof AlfrescoAuthenticationService).toBe(true);
    });

    it('should return false if the user is not logged in', () => {
        expect(authService.isLoggedIn()).toEqual(false);
    });

    it('should return the ticket after login', async(inject([],
        () => {
            authService.alfrescoApi = new AlfrescoApiMock();

            authService.login('admin', 'admin')
                .subscribe((data) => {
                    expect(data).toEqual('TICKET_4479f4d3bb155195879bfbb8d5206f433488a1b1');
                });
        })
    ));

    it('should be resolver the subdcriberafter log out', () => {
        authService.alfrescoApi = new AlfrescoApiMock();

        authService.login('admin', 'admin')
            .subscribe(() => {
                    authService.logout()
                        .subscribe((data) => {
                                expect(data).toEqual('logout');
                            }
                        );
                }
            );
    });
});
