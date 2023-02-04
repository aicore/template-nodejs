/*global describe, it*/
import * as assert from 'assert';
import * as chai from 'chai';
import {deleteAppConfig, getConfigs} from "../../../src/utils/configs.js";

let expect = chai.expect;

describe('unit Tests', function () {

    it('verify config fail if APP_CONFIG not set properly', function () {
        const backEnv = process.env.APP_CONFIG;
        delete process.env.APP_CONFIG;
        deleteAppConfig();
        let exceptionOccurred = false;
        try {
            getConfigs();
        } catch (e) {
            expect(e.toString()).eql('Error: Please provide valid app config file by setting APP_CONFIG' +
                ' environment variable for example APP_CONFIG=./abc.json');
            exceptionOccurred = true;
        }
        expect(exceptionOccurred).eql(true);
        process.env.APP_CONFIG = backEnv;

    });
    it('getConfigShould pass', function () {
        let configs = getConfigs();
        _verifyConfigs(configs);
        configs = getConfigs();
        // call verify config second time
        _verifyConfigs(configs);

    });
    it('default port should be 5000', function () {
        let configs = getConfigs();
        _verifyConfigs(configs);
        configs = getConfigs();
        // call verify config second time
        _verifyConfigs(configs);
    });
});

function _verifyConfigs(configs) {
    expect(configs.port).to.eql('5000');
    expect(configs.authKey.length).to.eql(24);
    expect(configs.mysql.port).to.eql('3306');
    expect(configs.mysql.user.length).to.gt(0);
    expect(configs.mysql.password.length).to.gt(0);
    expect(configs.mysql.host.length).to.gt(0);
    expect(configs.mysql.database.length).to.gt(0);

}
