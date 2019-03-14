var swiper = new Swiper('.banner', {
    loop: true,
    pagination: {
        el: '.swiper-pagination'
    }
})
var swiper2 = new Swiper('.right', {
    autoplay: true,
    loop: true,
    direction: 'vertical'
})

var bs = new BScroll('.main', {
    probeType: 2,
    click: true
});

const list = document.querySelector('.like-list');

axios.get('/api/list').then(res => {
    console.log(res.data.data);
    list.innerHTML = res.data.data.map((val => {
        return `<li>
                    <img src="images/eat_03.png" alt="">
                    <div class="like-cont">
                        <h3>${val.name}</h3>
                        <p>[15店通用]鸡腿堡 + 薯条 + 中杯可乐</p>
                        <div class="price">
                            <div>
                                <span>${val.price}元</span>
                                <em>门市价：${val.door}元</em>
                            </div>
                            <em>已售${val.num}</em>
                        </div>
                    </div>
                </li>`
    })).join('');
})