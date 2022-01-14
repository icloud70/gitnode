const mongoose = require('mongoose');

//디비 연결
let url = "mongodb+srv://icloud70:sksms7361@cluster0.tnc8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, {dbName: 'test'}, function(err) {
    console.log('err ::' + err);
});

//모델 생성
var Schema = mongoose.Schema;

var diarySchema = new Schema(
    { date: String, title: String, imgList:String, content:String}
);

module.exports = mongoose.model('diary',diarySchema, 'diary');