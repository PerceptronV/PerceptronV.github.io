const lang = navigator.language;

var UI_text = {
    template: {
        'zh-TW': '',
        'zh-CN': '',
        'en-US': '',
        'en-GB': ''
    },
    title: {
        'zh-TW': '小臭豬',
        'zh-CN': '小臭豬',
        'zh': '小臭豬',
        'en-US': 'Piggy Bank',
        'en-GB': 'Piggy Bank',
        'en': 'Piggy Bank'
    },
    greeter: {
        'zh-TW': '小臭豬登入頁',
        'zh-CN': '小臭豬登入頁',
        'zh': '小臭豬登入頁',
        'en-US': 'Piggy Bank Login',
        'en-GB': 'Piggy Bank Login',
        'en': 'Piggy Bank Login'
    },
    username: {
        'zh-TW': '用戶名',
        'zh-CN': '用戶名',
        'zh': '用戶名',
        'en-US': 'Username',
        'en-GB': 'Username',
        'en': 'Username'
    },
    password: {
        'zh-TW': '密碼',
        'zh-CN': '密碼',
        'zh': '密碼',
        'en-US': 'Password',
        'en-GB': 'Password',
        'en': 'Password'
    },
    placeholder: {
        'zh-TW': '請輸入',
        'zh-CN': '請輸入',
        'zh': '請輸入',
        'en-US': 'Type here',
        'en-GB': 'Type here',
        'en': 'Type here'
    },
    login: {
        'zh-TW': '登入',
        'zh-CN': '登入',
        'zh': '登入',
        'en-US': 'Sign In',
        'en-GB': 'Sign In',
        'en': 'Sign In'
    }
};

function generateData(lst, defaultLang) {
    var ret = {};
    for (var i in lst) {
        ret[lst[i]] = UI_text[lst[i]][lang] == null ? UI_text[lst[i]][defaultLang] : UI_text[lst[i]][lang]
    }
    return ret;
} 

var dat = generateData(Object.keys(UI_text), 'zh');

document.getElementById('usn').placeholder = dat['placeholder'];
document.getElementById('pswd').placeholder = dat['placeholder'];

var loginApp = new Vue({
    el: '#login',
    data: dat
})
