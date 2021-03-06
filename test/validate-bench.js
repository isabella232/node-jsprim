/*
 * test/validate.js: microbenchmark JSON object validation
 *
 * Using "JSV" implementation:
 *
 *      100 iterations
 *     6340 milliseconds
 *   63.400 ms per iteration on average
 *
 * Using "json-schema" implementation:
 *
 *      100 iterations
 *       31 milliseconds
 *    0.310 ms per iteration on average
 */

var sprintf = require('extsprintf').sprintf;
var jsprim = require('../lib/jsprim');
var jsprimjsv = require('../lib/jsprim-jsv');

/* BEGIN JSSTYLED */
var schema = {
    "type": "object",
    "properties": {
        "gid": {
            "type": "string",
            "required": true,
            "minLength": 1
        },
        "uid": {
            "type": "string",
            "required": true,
            "minLength": 1
        },
        "ord": {
            "type": "integer",
            "required": true,
            "minimum": 0
        },
        "state": {
            "type": "string",
            "required": true,
            "enum": [ "dispatched", "running", "done", "cancelled", "aborted" ]
        },
        "machine": {
            "type": "string"
        },
        "zonename": {
            "type": "string"
        },
        "server": {
            "type": "string"
        },
        "result": {
            "type": "string",
            "enum": [ "ok", "fail" ]
        },
        "error": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "string",
                    "required": true,
                    "minLength": 1
                },
                "message": {
                    "type": "string",
                    "required": true
                }
            }
        },
        "crtime": {
            "type": "string",
            "format": "date-time",
            "required": true
        },
        "qtime": {
            "type": "string",
            "format": "date-time"
        },
        "mtime": {
            "type": "string",
            "format": "date-time"
        },
        "atime": {
            "type": "string",
            "format": "date-time"
        },
        "ctime": {
            "type": "string",
            "format": "date-time"
        },
        "ptime": {
            "type": "string",
            "format": "date-time"
        },
        "nresults": {
            "type": "integer",
            "minimum": 0
        },
        "results": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "entry": {
                        "type": "string",
                        "required": true,
                        "minLength": 1
                    },
                    "crtime": {
                        "type": "string",
                        "format": "date-time",
                        "required": true
                    }
                }
            }
        },
        "entry": {
            "type": "string"
        },
        "oid": {
            "type": "string"
        }
    }
};

var template =   {
    "gid": "ecf8bc81-a454-4e5d-ab30-c328df3f5fc9",
    "uid": "748a319d-65e4-49e4-b097-dbf87296bc9e",
    "oid": "e4515c50-3b57-44c5-895e-f93516132266",
    "server": "564d7268-5617-dba7-ad0d-ca714f0050c9",
    "zonename": "9e4e7c3d-dd4d-4cbd-b234-ffdfa3bc5fa2",
    "machine": "0c90171b-1830-469a-b42f-2fde8f9b7574",
    "crtime": "2012-09-05T22:00:58.112Z",
    "ctime": "2012-09-05T22:01:07.080Z",
    "mtime": "2012-09-05T22:01:04.534Z",
    "atime": "2012-09-05T22:01:04.730Z",
    "ord": 0,
    "state": "done",
    "entry": "wiggum",
    "result": "ok",
    "nresults": 1,
    "results": [ {
        "entry": "wiggum",
        "crtime": "2012-09-05T22:01:04.568Z"
    } ]
};
/* END JSSTYLED */

var start = Date.now();
var count = 1000;
var validate = jsprim.validateJsonObjectJS;
/* Or use: var validate = jsprimjsv.validateJsonObjectJSV; */
var i;

for (i = 0; i < count; i++)
	validate(schema, template);

var done = Date.now();

console.log(sprintf('%6d iterations', count));
console.log(sprintf('%6d milliseconds', done - start));
console.log(sprintf('%6s ms per iteration on average',
    ((done - start) / count).toFixed(3)));
