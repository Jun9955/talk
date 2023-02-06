//验证是否登录，如果没有登录，跳转到登录页

(async function(){

    const resp = await API.profile();
    const user = resp.data ;
    
   if(!user){
    alert('未登录或登录已过期，请重新登陆')
    location.href = './login.html';
    return;
   }
   
   //获取dom元素
   const doms = {
    aside:{
        nickname:$('#nickname'),
        loginId:$('#loginId')
    },
    close:$('.close'),
    chatContainer:$('.chat-container'),
    txtMsg:$('#txtMsg'),
    msgContainer:$('.msg-container'),
   }

   //下面的代码环境一定是登录状态
   setUserInfo()


   //注销事件
   doms.close.onclick = function(){
    API.loginOut();
    location.href = './login.html';
   }

   //设置用户的登录信息.
   function setUserInfo(){
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
   }

   await loadHistory();
   //加载历史记录
  async function loadHistory(){
    const resp = await API.getHistory();
   for(const item of resp.data){
   addChat(item);
   }
   scrollBottom();
  }

//    {
//     "_id": "63dddf8d632c213288165dbb",
//     "from": "15824310330",
//     "to": null,
//     "content": "你好·呀",
//     "createdAt": 1675485069425
// }

   //根据消息对象，将其添加到页面中。
   function addChat(chatInfo){
    const div = $$$('div');
    div.classList.add('chat-item');
    if(chatInfo.from){
        div.classList.add('me');
    }
    const img = $$$('img');
    img.className = 'chat-avatar';
    img.src =  chatInfo.from ? './asset/avatar.png':'./asset/robot-avatar.jpg';
    const content = $$$('div') ;
    content.className = 'chat-content';
    content.innerText = chatInfo.content;

    const date = $$$('div');
    date.className = 'chat-date';
    date.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
    //时间戳转时间
    function formatDate(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2,'0');
        const day = date.getDate().toString().padStart(2,'0');
        const hour = date.getHours().toString().padStart(2,'0');
        const minute = date.getMinutes().toString().padStart(2,'0');
        const send = date.getSeconds().toString().padStart(2,'0');
        
        return `${year}-${month}-${day} ${hour}:${minute}:${send}`;
    }
   }

   
//让聊天区域的滚动条滚动到最后
 function scrollBottom(){
   doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
 }


 //发送消息

async function SendChat(){
    const content = doms.txtMsg.value.trim();
    if(!content)return;
    addChat({
        from:user.loginId,
        to:null,
        createdAt:Date.now(),
        content

    })
    doms.txtMsg.value = '';
    scrollBottom();
     const resp = await API.sendChat(content);
     console.log(resp);
     addChat({
        from:null,
        to:user.loginId,
        ...resp.data
     })
     scrollBottom();
 }

 //发送消息事件
 doms.msgContainer.onsubmit = function(e){
    e.preventDefault();
    SendChat();
 }


})();