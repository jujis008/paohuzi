/**
 * 登陆场景
 */


var pomelo = window.pomelo;
var users = null;
var username = null;
var rid = null;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";

util = {
    urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
    //  html sanitizer
    toStaticHTML: function (inputHtml) {
        inputHtml = inputHtml.toString();
        return inputHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    //pads n with zeros on the left,
    //digits is minimum length of output
    //zeroPad(3, 5); returns "005"
    //zeroPad(2, 500); returns "500"
    zeroPad: function (digits, n) {
        n = n.toString();
        while (n.length < digits)
            n = '0' + n;
        return n;
    },
    //it is almost 8 o'clock PM here
    //timeString(new Date); returns "19:49"
    timeString: function (date) {
        var minutes = date.getMinutes().toString();
        var hours = date.getHours().toString();
        return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes);
    },

    //does the argument only contain whitespace?
    isBlank: function (text) {
        var blank = /^\s*$/;
        return(text.match(blank) !== null);
    }
};



// query connector
function queryEntry(uid, callback) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        //host: window.location.hostname,
        host: "127.0.0.1",
        //host: " 192.168.43.45",
        port: 3014,
        log: true
    }, function () {
        pomelo.request(route, {
            uid: uid
        }, function (data) {
            pomelo.disconnect();
            callback(data);
        });
    });
};






var LoginLayer = cc.Layer.extend({
    loginUi: null,

    textField_Name: null,
    textField_Room: null,
    label_Error: null,


    ctor: function () {

        this._super();

        var size = cc.director.getWinSize();


        var username = "aaa";

        queryEntry(username, function (data) {
            if (data.code === 500) {
                print(LOGIN_ERROR);
                return;
            }
            pomelo.init({
                host: data.host,
                port: data.port,
                log: true
            }, function () {
                var route = "connector.entryHandler.enter";
                pomelo.request(route, {
                    username: username,
                    rid: rid
                }, function (data) {
                    if (data.error) {
                        print(DUPLICATE_ERROR);
                        return
                    }


                    ////成功进入下一个场景
                    //users = data.users;
                    //cc.director.pushScene(new MainScene());
                });
            });
        });













//        this.loginUi = ccs.uiReader.widgetFromJsonFile(res.LoginUi_json);
//        this.addChild(this.loginUi);
//
//        this.textField_Name = this.loginUi.getChildByName("TextField_Name");
//        this.textField_Room = this.loginUi.getChildByName("TextField_Room");
//        this.label_Error = this.loginUi.getChildByName("Label_Error");
//
//        var button_Exit = this.loginUi.getChildByName("Button_Exit");
//        button_Exit.addTouchEventListener(this.buttonExitEvent, this);
//
//        var button_Clear = this.loginUi.getChildByName("Button_Clear");
//        button_Clear.addTouchEventListener(this.buttonClearEvent, this);
//
//        var button_Lonin = this.loginUi.getChildByName("Button_Login");
//        button_Lonin.addTouchEventListener(this.buttonLoninEvent, this);


        return true;
    }

//    buttonExitEvent: function (sender, type) {
//        switch (type) {
//            case ccui.Widget.TOUCH_BAGAN:
//                switch (cc.sys.os){
//                    case cc.sys.BROWSER_TYPE_CHROME:
//                        cc.log("Chrome");
//                    //cc.director.end();
//
//                        break;
//                    default :
//                        break;
//
//                }
//                cc.log("Exit!");
//                break;
//
//            default :
//                break;
//        }
//    },
//
//    buttonClearEvent: function (sender, type) {
//        switch (type) {
//            case ccui.Widget.TOUCH_BAGAN:
//                this.textField_Name.setText(" ");
//                this.textField_Room.setText(" ");
//                cc.log("Clear!");
//                break;
//
//            default :
//                break;
//        }
//    },
//
//    buttonLoninEvent: function (sender, type) {
//        var self = this;
//        switch (type) {
//            case ccui.Widget.TOUCH_BAGAN:
//                username = this.textField_Name.getStringValue();
//                rid = this.textField_Room.getStringValue();
//
//                if (username.length > 20 || username.length == 0 || rid.length > 20 || rid.length == 0) {
//                    this.label_Error.setText(LENGTH_ERROR);
//                    return false;
//                }
//
//                if (!reg.test(username) || !reg.test(rid)) {
//                    this.label_Error.setText(NAME_ERROR);
//                    return false;
//                }
//
//                cc.log("Name:" + username + " | Room:" + rid);
//
//                queryEntry(username, function (data) {
//                    if (data.code === 500) {
//                        this.label_Error.setText(LOGIN_ERROR);
//                        return;
//                    }
//                    pomelo.init({
//                        host: data.host,
//                        port: data.port,
//                        log: true
//                    }, function () {
//                        var route = "connector.entryHandler.enter";
//                        pomelo.request(route, {
//                            username: username,
//                            rid: rid
//                        }, function (data) {
//                            if (data.error) {
//                                self.label_Error.setText(DUPLICATE_ERROR);
//                                return
//                            }
//
//                            users = data.users;
//                            cc.director.pushScene(new MainScene());
//                        });
//                    });
//                });
//
//
//                break;
//            default :
//                break;
//        }
//    }
});



var LoginScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});