var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
var SyncableObject = (function () {
    function SyncableObject() {
    }
    SyncableObject.prototype.Straight = function () {
        var keys = Object.keys(this);
        var straight = {};
        for (var i = 0; i < keys.length; i++) {
            straight[this.ObjectKey() + "_" + keys[i]] = this[keys[i]];
        }
        return straight;
    };
    SyncableObject.prototype.Serialize = function () {
        return JSON.stringify(this.Straight());
    };
    SyncableObject.prototype.Deserialize = function (input) {
        var keys = Object.keys(this);
        var updated = {};
        for (var i = 0; i < keys.length; i++) {
            if (input.Data[this.ObjectKey() + "_" + keys[i]]) {
                this[keys[i]] = input.Data[this.ObjectKey() + "_" + keys[i]].Value;
            }
            else {
                updated[this.ObjectKey() + "_" + keys[i]] = this[keys[i]].toString();
            }
        }
        return updated;
    };
    return SyncableObject;
})();
var PlayerObject = (function (_super) {
    __extends(PlayerObject, _super);
    function PlayerObject() {
        _super.apply(this, arguments);
        this.Exp = "0";
        this.Gold = "0";
        this.Level = "1";
        this.Silver = "0";
        this.Flyes = "5";
        this.Name = "Unnamed";
    }
    PlayerObject.prototype.ObjectKey = function () { return "Player"; };
    return PlayerObject;
})(SyncableObject);
var AirplaneObject = (function (_super) {
    __extends(AirplaneObject, _super);
    function AirplaneObject() {
        _super.apply(this, arguments);
        this.Rank = "0";
        this.Speed = "0";
        this.Durability = "0";
        this.Movement = "0";
        this.AvailablePoint = "0";
    }
    AirplaneObject.prototype.ObjectKey = function () { return "Airplane"; };
    return AirplaneObject;
})(SyncableObject);
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
    // Check defaults
    // 1) Load read only data
    var player = new PlayerObject();
    var request = { PlayFabId: _this };
    var playerReadOnly = server.GetUserReadOnlyData(request);
    var update = player.Deserialize(playerReadOnly);
    var result = player.Straight();
    update["NotFirstTime"] = "1";
    update["ForceReinit"] = "";
    server.UpdateUserReadOnlyData({
        "PlayFabId": id,
        "Data": update
    });
    return result;
};
handlers.Hello = function (args) {
    //var data = PlayerData(currentPlayerId);
    var player = new PlayerObject();
    player.Exp = "1";
    player.Airplanes = "5";
    player.Gold = "1000";
    player.Level = "10";
    player.Name = "xxNAGIBxx";
    player.Silver = "10000";
    return {
        PlayerData: player.Straight()
    };
};
//# sourceMappingURL=app.js.map