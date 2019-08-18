const prerequsite = {
    0002: {
        not: {
            or: [],
            all: []
        },
        or: [],
        all: ['0001']
    },
    A0002: {
        not: {
            or: [],
            all: []
        },
        or: ['0001', '0002'],
        all: []
    },
    A0003: {
        not: {
            or: [],
            all: ['0001', '0002']
        },
        or: [],
        all: []
    },
    A0004: {
        not: {
            or: ['0001', '0003'], // none
            all: [] // nor
        },
        or: [],
        all: []
    },
    A0005: {
        not: {
            or: ['0001', '0004'],
            all: []
        },
        or: [],
        all: ['0002', '0003']
    },
}

const questions = [{
    id: '0001',
    kind: '基本信息',
    type: 'text',
    ask: '请问您的姓名是？',
    icon: '',
    remark: '该称呼会出现在营养建议和产品包装上', 
    advise: '推荐您使用真实姓名',
    placeholder: '',
    validate: {
        // 数字输入
        // range: {
        //     min: -1,
        //     max: -1
        // },
        // 文本输入
        length: {
            min: -1,
            max: -1
        },
        // 选择数量
        // options: {
        //     min: -1,
        //     max: -1
        // },
        // 正则匹配
        match: '', //
        // 是否必选
        required: true,
    },
    options: [],
    disabled: false,
}, {
    id: '0002',
    kind: '基本信息',
    type: 'number',
    ask: '请问您的年龄是？',
    icon: '',
    remark: '*暂不对 18 周岁以下的未成年人提供营养服务', 
    advise: '',
    placeholder: '',
    validate: {
        // 数字输入
        range: {
            min: -1,
            max: -1
        },
        // 文本输入
        // length: {
        //     min: -1,
        //     max: -1
        // },
        // 选择数量
        // options: {
        //     min: -1,
        //     max: -1
        // },
        // 正则匹配
        // match: '', //
        // 是否必选
        required: true,
    },
    options: [],
    disabled: false,
}, {
    id: '0003',
    kind: '基本信息',
    type: 'radio',
    ask: '请问您的性别是？',
    icon: '',
    remark: '', 
    advise: '',
    placeholder: '',
    validate: {
        // 数字输入
        // range: {
        //     min: -1,
        //     max: -1
        // },
        // 文本输入
        // length: {
        //     min: -1,
        //     max: -1
        // },
        // 选择数量
        // options: {
        //     min: -1,
        //     max: -1
        // },
        // 正则匹配
        // match: '', //
        // 是否必选
        required: true,
    },
    options: [{
        id: '01',
        value: '男',
        name: '男',
        icon: '',
    }, {
        id: '02',
        value: '女',
        name: '女',
        icon: '',
    }],
    disabled: false,
}, {
    id: '0004',
    kind: '生活习惯',
    type: 'choose',
    ask: '您经常喝的饮料是什么？',
    icon: '',
    remark: '请选择 1~ 3 个', 
    advise: '',
    validate: {
        // 数字输入
        // range: {
        //     min: -1,
        //     max: -1
        // },
        // 文本输入
        // length: {
        //     min: -1,
        //     max: -1
        // },
        // 选择数量
        options: {
            min: 1,
            max: 3
        },
        // 正则匹配
        // match: '', //
        // 是否必选
        required: true,
    },
    options: [{
        id: '01',
        value: '白开水',
        name: '白开水',
        icon: '',
    }, {
        id: '02',
        value: '茶',
        name: '茶',
        icon: '',
    }, {
        id: '03',
        value: '可乐',
        name: '可乐',
        icon: '',
    }, {
        id: '04',
        value: '果汁',
        name: '果汁',
        icon: '',
    }, {
        id: '05',
        value: '咖啡',
        name: '咖啡',
        icon: '',
    }],
    disabled: false,
}, {
    id: '0005',
    kind: '营养目标',
    type: 'checkbox',
    ask: '您的营养目标是？',
    icon: '',
    remark: '不能超过3个', 
    advise: '',
    validate: {
        // 数字输入
        // range: {
        //     min: -1,
        //     max: -1
        // },
        // 文本输入
        // length: {
        //     min: -1,
        //     max: -1
        // },
        // 选择数量
        options: {
            min: 1,
            max: 3
        },
        // 正则匹配
        // match: '', //
        // 是否必选
        required: true,
    },
    options: [{
        id: '01',
        value: '改善易疲劳、乏力或睡眠质量',
        name: '改善易疲劳、乏力或睡眠质量',
        icon: ''
    }, {
        id: '02',
        value: '提高免疫力',
        name: '提高免疫力',
        icon: ''
    }, {
        id: '03',
        value: '改善胃肠道功能',
        name: '改善胃肠道功能',
        icon: ''
    }, {
        id: '04',
        value: '保护骨骼健康',
        name: '保护骨骼健康',
        icon: ''
    }, {
        id: '05',
        value: '保护心脏健康',
        name: '保护心脏健康',
        icon: ''
    }, {
        id: '06',
        value: '提高脑力',
        name: '提高脑力',
        icon: ''
    }],
    disabled: false,
},]

module.exports = {
    prerequsite,
    questions,
}