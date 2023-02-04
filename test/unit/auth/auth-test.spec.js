import {isAuthenticated, init, getAuthKey} from "../../../src/auth/auth.js";
/*global describe, it*/

import * as chai from 'chai';
import {getConfigs} from "../../../src/utils/configs.js";

let expect = chai.expect;

describe('unit tests for auth module', function () {

    it('init should pass', function () {
        const authKey = '1234';
        init(authKey);
        const key = getAuthKey();
        expect(key).eql(authKey);
    });
    it('should throw exception if key is null', function () {
        let exceptionOccurred = false;
        try {
            init(null);
        } catch (e) {
            exceptionOccurred = true;
            expect(e.toString()).eql('Error: please set authKey in config file');
        }
        expect(exceptionOccurred).eql(true);

    });
    it('isAuthenticated should pass', function () {
        init('1');
        const authenticated = isAuthenticated({
            headers: {
                authorization: 'Basic 1'
            }

        }, {});
        expect(authenticated).eql(true);
    });
    it('isAuthenticated should fail if headers are missing', function () {
        init(getConfigs().authKey);
        const authenticated = isAuthenticated({}, {});
        expect(authenticated).eql(false);
    });
    it('isAuthenticated should fail', function () {
        init('1');
        const authenticated = isAuthenticated({
            headers: {
                authorization: 'Basic 10'
            }

        }, {});
        expect(authenticated).eql(false);
    });

    it('isAuthenticated should fail if auth header has invalid entry', function () {
        init('1');
        const authenticated = isAuthenticated({
            headers: {
                authorization: 'Basic 1 1234'
            }

        }, {});
        expect(authenticated).eql(false);
    });
    it('isAuthenticated should fail if auth is not basic', function () {
        init('1');
        const authenticated = isAuthenticated({
            headers: {
                authorization: '123 1'
            }

        }, {});
        expect(authenticated).eql(false);
    });
    it('isAuthenticated should fail if auth header is not defined', function () {
        init(getConfigs().authKey);
        const authenticated = isAuthenticated({
            headers: {
                abc: '123'
            }

        }, {});
        expect(authenticated).eql(false);
    });

});
