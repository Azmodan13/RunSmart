


$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { 
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function toggleSlide(item) {
        $(item).each(function(i) { //Вызываем клас при нажатии на который будет происходить действие..each(function(i) перебор елементов.
            $(this).on('click', function(e) {   //$(this).on указывает для какого елемента будет действие. ('click', function(e) уточняет что будет клик.
                e.preventDefault();     //e.preventDefault(); отменяет переход по ссылке и выполняет указаное действие
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //.toggleClass Переключения класа
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');       //.eq(i) Получает индекс ссылки на которую мы кликаем
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal="consultation"]').on('click',function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thenks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i){
        $(this).on('click',function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
            $('.overlay, #order').fadeIn('slow');
        })
    });


    function valideForms(form) {
        $(form).validate({
            rules: {
                name:{
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name:{
                    required:  "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимуи {0} символа!")
                },
                phone:"Пожалуйста, введите свой номер телефона",
                email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
                }
            }
            
        });
    }
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e){    //форма для отправки писем с сайта
        e.preventDefault();          //отменить стандартное поведение браузера, в данном случае перезагразку смтраницы при отправки формы.
        if (!$(this).valid()) {         // Если форма не прошла валидацию, то она не будет отправлена
            return;
        }
        $.ajax({                     //метод jQuery для отправки данных на сервер без перезагрузки страницы
            type:"POST",              //удазываем что данные будут отправляться а не приниматься
            url:"mailer/smart.php", //Указываем куда будут направляться данные 
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");  //Указываем что бы после отправки формы все поля очистились
            $('#consultation, #order').fadeOut();   // указаное окно закрываеться
            $('.overlay, #thenks').fadeIn('slow');  // окно с информацией про оформленный заказ открываеться

            $('form').trigger('reset');
        });
        return false;
    });

    //  Smooth scroll and page up

    $(window).scroll(function(){    // следит за скролом окна
        if ($(this).scrollTop() > 1000 ) { // если отступ сверзу 1600 пикселей
            $('.pageup').fadeIn();          // тогда ссылка отобразиться
        } else {
            $('.pageup').fadeOut();     // иначе она пропадает
        }
    });

    // Скрол страницы
    $("a[href^='#']").click(function(){     // получаем все ссылки c атребутом #
        const _href = $(this).attr("href");     // создаем константу _href и получаем в нее все атрибуты с "href"
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});   // идем этот атрибут в "html, body" и скролим к нему
        return false;
    });

    
    new WOW().init();



});




const slider = tns({
    container: '.carusel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    speed: 800,
    autoHeight: true,
    responsive: {
        769: {
            autoWidth: true,
            edgePadding: 40
        }
    }

});

document.querySelector('.prev').addEventListener( 'click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener( 'click', function () {
    slider.goTo('next');
});

