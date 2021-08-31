(function() {
    let sc = 0;

    const scrollbar = Scrollbar.init(document.querySelector('#wrapper'), { damping: 0.04, });

    gsap.to('.intro .img_box', { duration: 1, opacity: 1, ease: Power3.easeOut, stagger: 0.2, });

    scrollbar.addListener(() => {
        sc = scrollbar.scrollTop;
        // console.log(sc);

        intro_titT = $('.intro_tit').position().top - $(window).height()/2;
        newT = $('.new_arrivals').position().top - $(window).height()/2.5;
        collectT = $('.collection').position().top - $(window).height()/2.5;
        lineUpT = $('.line_up').position().top - $(window).height()/2.5;
        infoWrapT = $('.info_wrap').position().top - $(window).height()/2.5;
        newsT = $('.news').position().top - $(window).height()/2.5;
        footerScT = $('footer').position().top - $(window).height()/2.5;

        if (sc >= 400) {
            $('header .gnb').addClass('on');
            $('.btn_top').addClass('on');
            $('.intro_tit .txt_box').addClass('on');
        } else if (sc < 400 ) {
            $('header .gnb').removeClass('on');
            $('.btn_top').removeClass('on');
            $('.intro_tit .txt_box').removeClass('on');
        }

        if(sc >= intro_titT) { gsap.to('.intro_tit .txt_box *', { duration: 1, y: 10, opacity:1, ease: Power3.easeOut, stagger: 0.07, }); }

        if (sc >= newT) { $('.new_arrivals .img_wrap').addClass('on'); newArrivals.play(); new_1.play(); new_2.play(); new_3.play(); }

        if(sc >= collectT) { collect.play();}

        if (sc >= lineUpT) { lineUp.play(); lineUp_1.play(); lineUp_2.play(); lineUp_3.play();}
        if (sc >= infoWrapT) { infoWrap.play(); infoWrap_1.play(); infoWrap_2.play();}

        if (newsT > sc) { $('header').fadeIn(); } else { $('header').fadeOut(); }
        if (sc >= newsT) { $('.news .news_list li').addClass('on'); news.play();}
        if (sc >= footerScT) {footerSc.play();}

        $('.btn_top').click(function(e){ e.preventDefault(); if(sc <= 400 ) { scrollbar.scrollTo(0, 600, 600); } else { scrollbar.scrollTo(0, 0, 600); } })
    });
    
    // gnb 열기
    $('header .icon_nav').on('click', function(e) { e.preventDefault(); $(this).toggleClass('on'); $('header .nav_inner').toggleClass('on'); $('header .dimm').fadeToggle(); $('header .m_gnb').toggleClass('open'); $('body').toggleClass('hidden'); });

    $('header .dimm').on('click', function(e) {e.preventDefault(); $('header .icon_nav').trigger('click'); });

    // 이미지가 마우스 따라다니는 효과
    $('body').mousemove(function(e) {
        // TweenMax.to($('#custom_cursor'), 0.5, { x: e.clientX, y: e.clientY, ease: Power3.easeOut });

        gsap.to('.intro .img_box', { duration: 2, x: e.clientX / 5, y: e.clientY / 5, ease: Power3.easeOut, });
        gsap.to('.intro .img_box .img_wrap img', { duration: 1, x: -e.clientX / 20, y: -e.clientY / 10, ease: Power3.easeOut, });
        gsap.to('.intro .img_box .bg', { duration: 1, x: e.clientX / 20, y: e.clientY / 30, });
        gsap.to('.intro .txt_box', { duration: 1, x: e.clientX / 15, y: -e.clientY / 15, ease: Power3.easeOut,
        });
    });

    // intro Split text
    const text = new SplitType('.intro .txt_box span span', { types: 'words, chars', absolute: true, });
    gsap.to(text.chars, { duration: 1, y: '-100%', skewX: 0, ease: 'back', stagger: { amount: 1}, delay: 0.08, });


    gsap.registerPlugin(ScrollTrigger);

    let newArrivals = gsap.to('.new_arrivals .inner', { scrollTrigger: { trigger: '.new_arrivals', toggleActions: 'restart pause restart pause', }, duration: 1, opacity:1, paused: true, });
    let new_1 = gsap.to('.new_arrivals .tit', { scrollTrigger: { trigger: '.new_arrivals .tit', start: 'top center', scrub: 1, }, duration: 1, x: 0, paused: true, });
    let new_2 = gsap.to('.new_arrivals .tit_y span', { scrollTrigger: { trigger: '.new_arrivals .img_wrap', start: 'center bottom', }, duration: 1, y: 0, stagger: 0.3, paused: true, });
    let new_3 = gsap.to('.new_arrivals .txt_wrap .txt', { scrollTrigger: { trigger: '.new_arrivals .img_wrap', start: 'center bottom', }, duration: 1, y: 0, opacity: 1, paused: true, delay: 1, });
    
    // collection
    let collect = gsap.fromTo('.collection > *', { scrollTrigger: { trigger: '.collection', start: 'top center', }, y: '20%', opacity: 0, }, { duration: 1, y: 0, opacity: 1, paused: true, })
    
    // line up
    let lineUp = gsap.to('.line_up .lineup_content .tit_y span', { scrollTrigger: { trigger: '.line_up', start: 'top', }, duration: 1, y: '0', stagger: 0.3, paused: true, });
    let lineUp_1 = gsap.to('.line_up .lineup_content .product', { scrollTrigger: { trigger: '.line_up', start: 'top'}, duration: 1, y: '0', delay: 0.5, opacity: 1, paused: true, });
    let lineUp_2 = gsap.to('.line_up .lineup_content .txt_wrap', { scrollTrigger: { trigger: '.line_up', start: 'top', }, duration: 1, opacity:1, y: 0, paused: true, delay: 0.5, });
    let lineUp_3 = gsap.to('.line_up .lineup_content .prod_info', { scrollTrigger: { trigger: '.line_up', start: 'top center', }, duration: 1, opacity: 1, y: 0, paused: true, stagger: 0.3, delay: 1, });

    // info
    let infoWrap = gsap.to('.info_wrap', { scrollTrigger: {trigger: '.info_wrap', start: 'top'}, duration: 1, y:0, opacity: 1, paused: true, });
    let infoWrap_1 = gsap.fromTo('.info_wrap .info_inner .info_01 a > *', { y: '100%', opacity: 0, }, { scrollTrigger: { trigger: '.info_wrap', start: 'top' }, duration: 1, opacity: 1, y: 0, stagger: 0.2, paused: true, });
    let infoWrap_2 = gsap.fromTo('.info_wrap .info_inner .info_02 a > *', { y: '100%', opacity: 0, }, {
        scrollTrigger: {
            trigger: '.info_wrap',
            start: 'top',
        },
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 0.5,
        stagger: 0.2,
        paused: true,
    });

    // news
    let news = gsap.to('.news', { scrollTrigger: {trigger: '.news', start: 'top center', }, duration: 1, y:'0', opacity: 1, paused: true, });

    let footerSc = gsap.to('.footer_inner', {
        scrollTrigger: {trigger: 'footer', start: 'top center', },
        duration: 1, y:'0', opacity: 1, paused: true,
    });
})();