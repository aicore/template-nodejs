import {isString} from "@aicore/libcommonutils";

let key = null;

export function init(authKey) {
    if (!isString(authKey)) {
        throw new Error('please set authKey in config file');
    }
    key = authKey;
}

export function isAuthenticated(request, _reply) {
    if (!request.headers) {
        return false;
    }
    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
        return false;
    }
    const split = authHeader.trim().split(' ');
    if (split && split.length === 2) {
        if (split[0] !== 'Basic') {
            return false;
        }
        const reqKey = split[1].trim();
        if (reqKey === key) {
            return true;
        }
    }
    return false;
}

export function getAuthKey() {
    return key;
}
