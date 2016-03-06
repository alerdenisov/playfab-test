var Hello = (function () {
    function Hello(Message) {
        this.Message = Message;
    }
    Hello.prototype.ToResponse = function () {
        return { message: this.Message };
    };
    return Hello;
})();
handlers.helloFunc = function (args) {
    var message = new Hello(args.message);
    log.info(message.Message);
    return message.ToResponse();
};
//# sourceMappingURL=app.js.map