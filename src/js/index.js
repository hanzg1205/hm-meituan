'use strict';

var swiper = new Swiper('.banner', {
    loop: true,
    pagination: {
        el: '.swiper-pagination'
    }
});
var swiper2 = new Swiper('.right', {
    autoplay: true,
    loop: true,
    direction: 'vertical'
});

var bs = new BScroll('.main', {
    probeType: 2,
    click: true
});

var list = document.querySelector('.like-list');

axios.get('/api/list').then(function (res) {
    console.log(res.data.data);
    list.innerHTML = res.data.data.map(function (val) {
        return '<li>\n                    <img src="images/eat_03.png" alt="">\n                    <div class="like-cont">\n                        <h3>' + val.name + '</h3>\n                        <p>[15\u5E97\u901A\u7528]\u9E21\u817F\u5821 + \u85AF\u6761 + \u4E2D\u676F\u53EF\u4E50</p>\n                        <div class="price">\n                            <div>\n                                <span>' + val.price + '\u5143</span>\n                                <em>\u95E8\u5E02\u4EF7\uFF1A' + val.door + '\u5143</em>\n                            </div>\n                            <em>\u5DF2\u552E' + val.num + '</em>\n                        </div>\n                    </div>\n                </li>';
    }).join('');
});