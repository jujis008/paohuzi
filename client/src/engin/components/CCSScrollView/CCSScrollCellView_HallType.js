/**
 * 房间类型选项
 *  比如 三人场  单机场
 * Created by Administrator on 2014/7/10.
 */
var CCSScrollCellView_HallType = cc.Node.extend({


    init:function(data){
        var image = data.image;
        var spt = display.newSprite(image)
        this.spt = spt
        this.addChild(spt);
    }
})