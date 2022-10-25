const axios = require('axios');

exports.getToken = async function (code){
    try{
        const response = await axios({
            method: "post",
            url: "https://kauth.kakao.com/oauth/token",
            headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            params: {
                grant_type: 'authorization_code',
                client_id: `${process.env.client_id}`,
                redirect_uri: `${process.env.redirect_uri}`,
                code: code
            },
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.getUserInfo = async function(access_token){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            },        
            params: {
                secure_resource: true,
                property_keys: `${process.env.property_keys}`
            },
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.logout = async function(accessToken){
    try{
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v1/user/logout", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        return response;
    }catch(err){
        return Error(err);
    }
}

exports.agree = async function(accessToken){
    try{
        const response = await axios({
            method: "get",
            url: "https://kapi.kakao.com/v2/user/scopes", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        var resData = response.data;
        var talkMsg = resData.scopes.find(data=>{ return data.id =="talk_message";})
        return talkMsg.agreed;
    }catch(err){
        return Error(err);
    }
}
