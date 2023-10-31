const lang = navigator.language;

var UI_text = {
    template: {
        'zh-TW': '',
        'zh-CN': '',
        'zh': '',
        'en-US': '',
        'en-GB': '',
        'en': ''
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
    },
    download: {
        'zh-TW': '下載',
        'zh-CN': '下載',
        'zh': '下載',
        'en-US': 'Download',
        'en-GB': 'Download',
        'en': 'Download'
    },
    new_log: {
        'zh-TW': '新增記錄',
        'zh-CN': '新增記錄',
        'zh': '新增記錄',
        'en-US': 'New Entry',
        'en-GB': 'New Entry',
        'en': 'New Entry'
    },
    logout: {
        'zh-TW': '登出',
        'zh-CN': '登出',
        'zh': '登出',
        'en-US': 'Logout',
        'en-GB': 'Logout',
        'en': 'Logout'
    },
    time_header: {
        'zh-TW': '時間',
        'zh-CN': '時間',
        'zh': '時間',
        'en-US': 'Time',
        'en-GB': 'Time',
        'en': 'Time'
    },
    systole_header: {
        'zh-TW': '高壓',
        'zh-CN': '高壓',
        'zh': '高壓',
        'en-US': 'Systolic',
        'en-GB': 'Systolic',
        'en': 'Systolic'
    },
    diastole_header: {
        'zh-TW': '低壓',
        'zh-CN': '低壓',
        'zh': '低壓',
        'en-US': 'Diastolic',
        'en-GB': 'Diastolic',
        'en': 'Diastolic'
    },
    pulse_header: {
        'zh-TW': '心率',
        'zh-CN': '心率',
        'zh': '心率',
        'en-US': 'Pulse',
        'en-GB': 'Pulse',
        'en': 'Pulse'
    },
    remarks_header: {
        'zh-TW': '備注',
        'zh-CN': '備注',
        'zh': '備注',
        'en-US': 'Remarks',
        'en-GB': 'Remarks',
        'en': 'Remarks'
    },
    welcome_text: {
        'zh-TW': '歡迎來到小臭豬主頁！',
        'zh-CN': '歡迎來到小臭豬主頁！',
        'zh': '歡迎來到小臭豬主頁！',
        'en-US': 'Piggy Bank Dashboard',
        'en-GB': 'Piggy Bank Dashboard',
        'en': 'Piggy Bank Dashboard'
    },
    modal_header: {
        'zh-TW': '選擇時間段',
        'zh-CN': '選擇時間段',
        'zh': '選擇時間段',
        'en-US': 'Choose Timespan',
        'en-GB': 'Choose Timespan',
        'en': 'Choose Timespan'
    },
    new_val_text: {
        'zh-TW': '小臭豬新增血壓！',
        'zh-CN': '小臭豬新增血壓！',
        'zh': '小臭豬新增血壓！',
        'en-US': 'New Entry',
        'en-GB': 'New Entry',
        'en': 'New Entry'
    },
    exit: {
        'zh-TW': '退出',
        'zh-CN': '退出',
        'zh': '退出',
        'en-US': 'Exit',
        'en-GB': 'Exit',
        'en': 'Exit'
    },
    newval: {
        'zh-TW': '新增',
        'zh-CN': '新增',
        'zh': '新增',
        'en-US': 'Save',
        'en-GB': 'Save',
        'en': 'Save'
    },
    no_data: {
        'zh-TW': '沒有資料',
        'zh-CN': '沒有資料',
        'zh': '沒有資料',
        'en-US': 'No Data',
        'en-GB': 'No Data',
        'en': 'No Data'
    },
    delete_data: {
        'zh-TW': '刪除',
        'zh-CN': '刪除',
        'zh': '刪除',
        'en-US': 'Delete',
        'en-GB': 'Delete',
        'en': 'Delete'
    },
    delete_data_confirmation: {
        'zh-TW': '請問您確定要刪除此資料嗎？',
        'zh-CN': '請問您確定要刪除此資料嗎？',
        'zh': '請問您確定要刪除此資料嗎？',
        'en-US': 'Are you sure you want to delete this entry?',
        'en-GB': 'Are you sure you want to delete this entry?',
        'en': 'Are you sure you want to delete this entry?'
    },
};

function generateData(lst, defaultLang) {
    var ret = {};
    for (var i in lst) {
        ret[lst[i]] = UI_text[lst[i]][lang] == null ? UI_text[lst[i]][defaultLang] : UI_text[lst[i]][lang]
    }
    return ret;
} 

var ui_dat = generateData(Object.keys(UI_text), 'zh');
