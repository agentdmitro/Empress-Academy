/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

isWebp();

import './modules/base.js';

// // Динамический адаптив
// // Документация: https://github.com/FreelancerLifeStyle/dynamic_adapt#readme
import './libs/dynamicAdapt.js';
import './libs/countDown.js';

$(document).ready(function () {
	$('.header__burger').on('click', function() {
		if(!$('body').hasClass('menu-open')) {
			$('body').addClass('menu-open');
			//$('.header__menu').slideDown();
		} else {
			$('body').removeClass('menu-open');
			//$('.header__menu').slideUp();
		}
	});

	$('.header__menu-list a').on('click', function() {
		$('.header__burger').removeClass('active');
		$('body').removeClass('menu-open');
		//$('.header__menu').slideUp();
	});
});


$(function(){	
	var column = 0;
	$('.spec__slide').each(function(){
		h = $(this).height();
		if (h > column) {
			column = h;
		}
	}).height(column);
});


const swiper = new Swiper(".spec__slider", {
	slidesPerView: 1,
	spaceBetween: 30,
	slidesPerGroup: 1,
	loop: true,
	pagination: {
		el: ".spec__pagination",
		clickable: true,
        dynamicBullets: true,
	},
    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        956: {
            slidesPerView: 3,
        },
        1260: {
            slidesPerView: 4,
        },
        1640: {
            slidesPerView: 5,
        },
    },
});

const swiper2 = new Swiper(".video__slider", {
	slidesPerView: 1,
	spaceBetween: 30,
	slidesPerGroup: 1,
	loop: true,
	pagination: {
		el: ".video__pagination",
		clickable: true,
        dynamicBullets: true,
	},
    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        956: {
            slidesPerView: 3,
        },
        1260: {
            slidesPerView: 4,
        },
        1640: {
            slidesPerView: 5,
        },
    },
});


const swiper3 = new Swiper(".tarif__slider", {
	slidesPerView: 1,
	spaceBetween: 30,
	slidesPerGroup: 1,
    enabled: true,
	pagination: {
		el: ".tarif__pagination",
		clickable: true,
        dynamicBullets: true,
	},
    breakpoints: {
        1120: {
            enabled: false
        },
    },
});



(function($) {
    $(document).on('click', '.next-form-slide', function(e) {
    e.preventDefault();

    var $this = $(this),
        id = $this.data('id');

    $('.form__groups .active').removeClass('active');
    $('.next-form-slide').removeClass('selected');

    $(this).addClass('selected');
    $('#group-' + id).addClass('active');
    });

})(jQuery);



Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();


const myData =  new AirDatepicker('#datepicker', {
    inline: true,
    minDate: date.addDays(7),
    navTitles: {
        days(dp) {
            if (dp.selectedDates.length) {
                let date = dp.selectedDates[0];
                let format_date = `${dp.formatDate(date, 'dd MMMM yyyy')}`;
                $('.book__total-text--date').text(format_date);
                $('input[name="your-date"').val(format_date);

                return `<div class="date__title">
                    ${dp.formatDate(date, 'dd MMMM yyyy')}
                </div>`;

                
            }
            
            return 'Выберите дату';
        }
    },
    // onSelect(dp) {
    //     if (dp.selectedDates.length) {
    //         let date = dp.selectedDates[0];
    //         let format_date = `${dp.formatDate(date, 'dd MMMM yyyy')}`;
    //         $('.book__total-text').text(format_date);
    //     }
    // }
});

$('.book__open-item').on('click', function(){
    if(!$(this).hasClass('selected')) {
        $('.book__open-item').removeClass('selected');
        $(this).addClass('selected');

        $('.book__total-text--time').text($(this).text());
        $('input[name="your-time"').val($(this).text());
    }
});







$('.book__item-selector').each(function(){
    // Variables
    var $this = $(this),
        selectOption = $this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        dur = 500;

    $this.hide();
    // Wrap all in select box
    $this.wrap('<div class="select"></div>');
    // Style box
    $('<div>',{
        class: 'select__gap book__item-input',
        text: 'Выбрать'
    }).insertAfter($this);
    
    var selectGap = $this.next('.select__gap'),
        caret = selectGap.find('.caret');
    // Add ul list
    $('<ul>',{
        class: 'select__list'
    }).insertAfter(selectGap);		

    var selectList = selectGap.next('.select__list');
    // Add li - option items
    for(var i = 0; i < selectOptionLength; i++){
        $('<li>',{
            class: 'select__item',
            html: $('<span>',{
                text: selectOption.eq(i).text()
            })				
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
    // Find all items
    var selectItem = selectList.find('li');

    selectList.slideUp(0);
    selectGap.on('click', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            selectList.slideDown(dur);

            selectItem.on('click', function(){
                var chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectGap.text($(this).find('span').text());

                selectList.slideUp(dur);
                selectGap.removeClass('on');
            });
            
        } else {
            $(this).removeClass('on');
            selectList.slideUp(dur);
        }
    });		

});


$('.d__selector').each(function(){
    // Variables
    var $this = $(this),
        selectOption = $this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        dur = 500;

    $this.hide();
    // Wrap all in select box
    $this.wrap('<div class="select"></div>');
    // Style box
    $('<div>',{
        class: 'select__gap book__item-input',
        text: this.dataset.placeholder
    }).insertAfter($this);
    
    var selectGap = $this.next('.select__gap'),
        caret = selectGap.find('.caret');
    // Add ul list
    $('<ul>',{
        class: 'select__list'
    }).insertAfter(selectGap);		

    var selectList = selectGap.next('.select__list');
    // Add li - option items
    for(var i = 0; i < selectOptionLength; i++){
        $('<li>',{
            class: 'select__item',
            html: $('<span>',{
                text: selectOption.eq(i).text()
            })				
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
    // Find all items
    var selectItem = selectList.find('li');

    selectList.slideUp(0);
    selectGap.on('click', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            selectList.slideDown(dur);

            selectItem.on('click', function(){
                var chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectGap.text($(this).find('span').text());

                selectList.slideUp(dur);
                selectGap.removeClass('on');
            });
            
        } else {
            $(this).removeClass('on');
            selectList.slideUp(dur);
        }
    });		

});

$('.form__selector').each(function(){
    // Variables
    var $this = $(this),
        selectOption = $this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        dur = 500;

    $this.hide();
    // Wrap all in select box
    $this.wrap('<div class="select"></div>');
    // Style box
    $('<div>',{
        class: 'select__gap book__item-input form__selector-menu',
        text: selectOption.eq(0).text()
    }).insertAfter($this);
    
    var selectGap = $this.next('.select__gap'),
        caret = selectGap.find('.caret');
    // Add ul list
    $('<ul>',{
        class: 'select__list form__selector-list'
    }).insertAfter(selectGap);		

    var selectList = selectGap.next('.select__list');
    // Add li - option items
    for(var i = 0; i < selectOptionLength; i++){
        $('<li>',{
            class: 'select__item',
            html: $('<span>',{
                text: selectOption.eq(i).text()
            })				
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }
    // Find all items
    var selectItem = selectList.find('li');

    selectList.slideUp(0);
    selectGap.on('click', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            selectList.slideDown(dur);

            selectItem.on('click', function(){
                var chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectGap.text($(this).find('span').text());

                selectList.slideUp(dur);
                selectGap.removeClass('on');
            });
            
        } else {
            $(this).removeClass('on');
            selectList.slideUp(dur);
        }
    });		

});



$(document).ready(function(){
	$('.faq__box-title').click(function(event){
		if($('.faq__box').siblings().removeClass('active')){
			$('.faq__box-title').not($(this)).removeClass('active');
			$('.faq__box-text').not($(this).next()).slideUp(0);
		}
		$(this).toggleClass('active').next().slideToggle(0);
	})
});





// Открыть попап окно по якорной ссылке

$(document).on("click", "a", function (e) {
	const popup_id = $(this).attr("href");

	if ($(popup_id).hasClass('popup')) {
		e.preventDefault();
		$('.popup').removeClass('show');
		$('body').addClass('noscroll');
		$('html').addClass('noscroll');
		$('.popup-bg').addClass('show').hide().show();
		$(popup_id).toggleClass('show');
	}
});

$(document).ready(function () {
	const popup_id = window.location.hash;

	if ($(popup_id).hasClass('popup')) {
		$('.popup').removeClass('show');
		$('body').addClass('noscroll');
		$('html').addClass('noscroll');
		$('.popup-bg').addClass('show').hide().show();
		$(popup_id).toggleClass('show');
	}


    // $('.countdown').data('time')
    $('.countdown').downCount({
        date: '06/10/2022 00:00:00',
        offset: +3
    }, function () {
        console.log('Countdown done!');
    });
});

$(document).on("click", ".popup__bttn-close, .popup__close", function (e) {
	e.preventDefault();
	$('body').removeClass('noscroll');
	$('html').removeClass('noscroll');
	$('.popup-bg').fadeOut().removeClass('show');
	$('.popup').removeClass('show');
});

$(document).mousedown(function (e) {
	if ($('.popup-bg').hasClass('show')) {
		const popup = $('.popup');

		if (!popup.is(e.target) && popup.has(e.target).length === 0) {
			$('body').removeClass('noscroll');
			$('html').removeClass('noscroll');
			$('.popup-bg').fadeOut().removeClass('show');
			$('.popup').removeClass('show');
			$('.popup__video #video').each(function (index) {
				$(this).attr('src', $(this).attr('src'));
				return false;
			});

			// const $video = $('.popup__video #video'),
			// 	src = $video.attr('src');


			// $video.attr('src', src);
			// console.log(src);
		};
	}
});

$('.d__item-top').on('click', function(e) {
    $(this).parent().toggleClass("active");

    
    $(this).parent().children('.d__form').slideToggle()

    // $(this).parent().$('.d__form').slideToggle();
})


$('.d__form-item').on('click', function(e) {

    $(this).toggleClass("active");  
    $(this).siblings("").removeClass("active");

    $(this).parent().children('.d__form-btn').removeClass('noselect')

})




var options = {
    onComplete: function(cep, event, currentField) {
        currentField.removeClass('error invalid');
    },
    onChange: function(cep, event, currentField) {
        currentField.addClass('error invalid');
    }
};


$('#phone-mask').mask(`+380 00 000 00 00`, options);

$('#phoneInput').mask('+380 00 000 00 00', options);

$('#cardNumber').mask('0000 - 0000 - 0000 - 0000', options);




// const phoneMask =  IMask(
// 	document.getElementById('phone-mask'), {
// 		mask: '+38\\0 00 000 00 00 '
// });

// const basketForm =  IMask(
// 	document.getElementById('maskInput'), {
// 		mask: '+38\\0 00 000 00 00 '
// });

// const cardNumber =  IMask(
// 	document.getElementById('cardNumber'), {
// 		mask: '0000 - 0000 - 0000 - 0000 '
// });




