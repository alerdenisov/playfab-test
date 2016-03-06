var DataRequest = (function () {
    function DataRequest(PlayFabId) {
        this.PlayFabId = PlayFabId;
        this.Keys = [];
    }
    DataRequest.prototype.With = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < keys.length; i++) {
            this.Keys.push(keys[i]);
        }
        return this;
    };
    DataRequest.prototype.Build = function () {
        var request = { PlayFabId: this.PlayFabId };
        request.Keys = this.Keys;
        return request;
    };
    return DataRequest;
})();
var PlayerData = function (id) {
    return { "Hi": "hello!" };
    // Check defaults
    // 1) Load read only data
    var playerReadOnly = server.GetUserReadOnlyData(new DataRequest(id).With("Level", "Airplanes", "Exp", "Gold", "Silver", "NotFirstTime", "ForceReinit").Build());
    var playerFieldsDefaults = {
        "Level": "1",
        "Airplanes": "5",
        "Exp": "1",
        "Gold": "1",
        "Silver": "1"
    };
    var result = {};
    var update = {};
    var force = !playerReadOnly.Data["NotFirstTime"] || !!playerReadOnly.Data["ForceReinit"];
    var CheckOrDefault = function (key, value) {
        if (force || !playerReadOnly.Data[key]) {
            result[key] = update[key] = value;
        }
        else if (playerReadOnly.Data[key]) {
            result[key] = playerReadOnly.Data[key].Value;
        }
        else {
            throw "1@!3123";
        }
    };
    var keys = Object.keys(playerFieldsDefaults);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = playerFieldsDefaults[key];
        CheckOrDefault(key, value);
    }
    update["NotFirstTime"] = "1";
    update["ForceReinit"] = "";
    server.UpdateUserReadOnlyData({
        "PlayFabId": id,
        "Data": JSON.stringify(update)
    });
    return result;
};
handlers.Hello = function (args) {
    var data = PlayerData(currentPlayerId);
    return {
        PlayerData: data
    };
};
//# sourceMappingURL=app.js.map