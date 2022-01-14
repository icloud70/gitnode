var express = require('express');
var data = require('../model/diary');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
//import dateFormat, {masks} from 'dateformat';
var empty = require('is-empty');
const stringify = require('json-stringify-pretty-compact');
const diary = require('../model/diary');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// 전체 데이터를 불러와서 항목별로 보기: 실제 호출주소 http://~~/api/diary/
router.get('/', function(req, res) {
    data.find(function(error, diary) {
        var resultData = "";

        if (!error && !empty(diary)) {
            resultData = diary;
        }

        res.json({result: empty(error), error:error, data:resultData});
    });
});

router.get('/:id', function(req, res) {
    data.findOne({_id:req.params.id}, function(error, diary){
        var resultData = "";
        if (!error && !empty(diary)) {
            resultData = diary;
        }

        res.json({result: empty(error), error:error, data:resultData});
    });
});

//데이터를 추가하기: 실제 호출주소 http://~~/api/diary/+body데이터
router.post('/', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;

    if (!empty(title) && !empty(content)) {
        var diaryData = new data();
        diaryData.title = title;
        diaryData.content = content;
        var now = new Date();
        diaryData.date = dateFormat(now, "yyyymmdd");
        diaryData.imgList = "";

        //콘솔창을 토앻서 로그를 확인해 볼 수 있다
        console.log("diary content diaryData::" + diaryData);

        diaryData.save(function(error, resultData) {
            res.json({result: empty(error), error:error, data:resultData});
        });
    } else {
        res.json({reuslt: false, error:null, data: null});
    }
});

//id로 데이터를 찾아서 수정: 실제 호출주소 http://~~/api/diary/+body데이터
router.put('/:id', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    const id = req.params.id;

    if (!empty(id)) {
        data.findOneAndUpdate({_id: id}, {$set:
        {title: title, content: content}
        }, {returnNewDocument: true}, (error, doc) => {
            res.json({result: !error, error:error});
        });
    } else {
        res.json({result: false, error: null, data: null});
    }
});


// id로 찾아서 삭제: 실제호출주소 http://~~/api/diary/id값
router.delete('/:id', function(req, res) {
    const id = req.params.id;

    if (!empty(id)) {
        data.remove({_id: id}, function(req, res) {
            res.json({result: empty(error), error:error, data:resultData});
        });
    } else {
        res.json({result: false, error:null, data:null});
    }
});

module.exports = router;
