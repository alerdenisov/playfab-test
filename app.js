var Hello = (function () {
    function Hello(Message) {
        this.Message = Message;
    }
    return Hello;
})();
handlers.helloFunc = function (args) {
    var message = new Hello("Hello World");
    log.info(message.Message);
    return message;
};
//# sourceMappingURL=app.js.map