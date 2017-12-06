var async = require('async'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testSchema = new Schema({
  "cand_id" : String,
  "name": String,
  "testbool": Boolean
},{ _id : false });

var Test = mongoose.model('Test',testSchema,'test');

mongoose.connect('mongodb://localhost:27017/test');

var data = [
  {"_id" : 123, "name" : "One", "testbool": false },
  {"_id" : 123, "name" : "asf" },
  {"_id" : 1234, "name" : "Two" },

];

async.series(
  [
    // Start fresh
    function(callback) {
      Test.remove({},callback);
    },

    // Ordered will fail on error. Upserts never fail!
    function(callback) {
      var bulk = Test.collection.initializeOrderedBulkOp();
      data.forEach(function(item) {
        bulk.find({ "_id": item._id }).upsert().updateOne({
          "$setOnInsert": { "name": item.name }
        });
      });
      bulk.execute(callback);
    },

    // All as expected
    function(callback) {
      Test.find().exec(function(err,docs) {
        console.log(docs)
        callback(err);
      });
    },


    // Start again
    function(callback) {
      Test.remove({},callback);
    },

    // Unordered will just continue on error and record an error
    function(callback) {
      var bulk = Test.collection.initializeUnorderedBulkOp();
      data.forEach(function(item) {
        bulk.insert(item);
      });
      bulk.execute(function(err,result) {
        callback(); // so what! Could not care about errors
      });
    },


    // Still processed the whole batch
    function(callback) {
      Test.find().exec(function(err,docs) {
        console.log(docs)
        callback(err);
      });
    }
  ],
  function(err) {
    if (err) throw err;
    mongoose.disconnect();
  }
);