'use strict';

const resolve = require('json-refs').resolveRefs;
const YAML = require('yaml-js');
const fs = require('fs');
const jsonfile = require('jsonfile');

const inputFilename = 'index.yaml';

const outputFilename = 'swagger.json';

const root = YAML.load(fs.readFileSync(inputFilename).toString());

const options = {
  filter        : ['relative', 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};

resolve(root, options).then(function (results) {
    jsonfile.writeFile(outputFilename, results.resolved, function (err) {
        if (err != null) {
            console.error(err)
        } else {
            console.log('swagger.json was created');
        }
    })
});
