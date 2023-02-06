var API = (function(){
    const BASE_URL = 'https://study.duyiedu.com'; 
const TOKEN_KEY = 'token';

 function get(path){
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if(token)
    {
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path ,{headers});
}


function post(path,bodyObj){
    const headers = {
        'Content-Type':'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if(token)
    {
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path ,{headers,method:'POST',body:JSON.stringify(bodyObj)});
}


//注册
async function reg(userInfo){
const resp = await post('/api/user/reg',userInfo);
return await resp.json();
}

//登录
async function login(loginInfo){
    const resp = await post('/api/user/login',loginInfo);
    const result =  await resp.json();
    if(result.code === 0){
        //登录成功
        //保存 
        const token = resp.headers.get('authorization');
        localStorage.setItem(TOKEN_KEY,token);
    }
    return result;

}
//验证账号
async function exists(loginId){
 const result = await get('/api/user/exists?loginId='+ loginId);
    return await result.json();

}
//当前登录的用户的信息
async function profile(){
    const  result = await get('/api/user/profile');
    return await result.json();
}
//发送聊天的信息
async function sendChat(content){
    const result  = await post('/api/chat',{
        content
    });
    return await result.json();
}
//获取聊天记录
async function getHistory(){
 const result = await get('/api/chat/history');
 return await result.json();
}

function loginOut(){
    localStorage.removeItem(TOKEN_KEY)
}
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut,
    }
})();