/* 
* @Author: zhengjian
* @Date:   2018-04-03 21:43:34
* @Last Modified by:   Marte
* @Last Modified time: 
*/
var  EventUtil = {
        // 事件处理程序
        addHandler : function(element, type, handler ){
            if( element.addEventListener ){
                element.addEventListener(type, handler, false);
            }else if(element.attachEvent){
                element.attachEvent('on' + type, handler);
            }else{
                element['on' + type] = handler
            }
        },
        // 跨浏览器事件对象
        getEvent : function(event){
            return  event ? event  : window.event;
        },
        getTarget : function(event){
            return  event.target  || event.srcElement;
        },
        // 阻止默认事件
        preventDefault : function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        // 移除事件处理程序
        removeHandler : function(element, type, handler){
            if(element.removeEventListener){
                element.removeEventListener(type, handler, false);
            }else if(element.detachEvent){
                element.detachEvent('on' + type, handler);
            }else{
                element['on' + type] = null;
            }
        },
        // 阻止事件冒泡
        stopPropagation : function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        } ,
}