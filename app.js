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
    return DataRequest;
})();
var PlayerData = function (id) {
    // Check defaults
    // 1) Load read only data
    var playerReadOnly = server.GetUserReadOnlyData(new DataRequest(id).With("Level", "Airplanes", "Exp", "Gold", "Silver", "NotFirstTime", "ForceReinit"));
    var playerFieldsDefaults = {
        "Level": "1",
        "Airplanes": "5",
        "Exp": "1",
        "Gold": "1",
        "Silver": "1"
    };
    var result = {
        "Level": playerReadOnly.Data["Level"].Value,
        "Airplanes": playerReadOnly.Data["Airplanes"].Value,
        "Exp": playerReadOnly.Data["Exp"].Value,
        "Gold": playerReadOnly.Data["Gold"].Value,
        "Silver": playerReadOnly.Data["Silver"].Value
    };
    var update = {};
    var CheckOrDefault = function (key, value) {
        if (!playerReadOnly.Data[key] || !playerReadOnly.Data[key].Value)
            result[key] = update[key] = value;
    };
    if (!playerReadOnly.Data["NotFirstTime"] || playerReadOnly.Data["ForceReinit"]) {
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
    }
    return result;
};
handlers.Hello = function () {
    var data = PlayerData(currentPlayerId);
    return {
        PlayerData: data
    };
};
//# sourceMappingURL=app.js.map