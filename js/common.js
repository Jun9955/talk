//封装通用的东西

function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

//创建dom‘元素
function $$$(selector){
    return document.createElement(selector);
}