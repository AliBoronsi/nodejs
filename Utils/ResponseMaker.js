const ResponseModel = require('../Model/ResponseModel');
class ResponseMaker {
    static Success (data, message) {
        return new ResponseModel(true,data,message || 'با موفقیت انجام شد');
    };

    static Error (message) {
        return new ResponseModel(false,null,message || 'خطا');
    };
}

module.exports = ResponseMaker;