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

import { describe, it, beforeEach } from '@angular/core/testing';
import { ReflectiveInjector } from '@angular/core';
import { AlfrescoSettingsService } from './AlfrescoSettingsService.service';
import { AlfrescoAuthenticationService } from './AlfrescoAuthenticationService.service';
import { AlfrescoContentService } from './AlfrescoContentService.service';

describe('AlfrescoContentService', () => {

    let injector, service: AlfrescoContentService, authService: AlfrescoAuthenticationService;
    const nodeId = 'blah';

    beforeEach(() => {
        injector = ReflectiveInjector.resolveAndCreate([
            AlfrescoContentService,
            AlfrescoAuthenticationService,
            AlfrescoSettingsService
        ]);
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return 'myToken';
        });
        service = injector.get(AlfrescoContentService);
        authService = injector.get(AlfrescoAuthenticationService);
    });

    it('should return a valid content URL', () => {
        expect(service.getContentUrl({
            entry: {
                id: nodeId
            }
        })).toBe(
            AlfrescoSettingsService.DEFAULT_HOST_ADDRESS + AlfrescoSettingsService.DEFAULT_CONTEXT_PATH +
                AlfrescoSettingsService.DEFAULT_BASE_API_PATH + '/nodes/' + nodeId + '/content' +
                '?attachment=false&alf_ticket=' + authService.getToken()
        );
    });

    it('should return a valid thumbnail URL', () => {
        expect(service.getDocumentThumbnailUrl({
            entry: {
                id: nodeId
            }
        })).toBe(
            AlfrescoSettingsService.DEFAULT_HOST_ADDRESS + AlfrescoSettingsService.DEFAULT_CONTEXT_PATH +
            AlfrescoSettingsService.DEFAULT_BASE_API_PATH + '/nodes/' + nodeId + '/renditions/doclib/content' +
            '?attachment=false&alf_ticket=' + authService.getToken()
        );
    });
});
