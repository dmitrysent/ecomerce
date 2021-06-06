$(function(){
    $('.reviews__inner').slick({
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1
                    }
            },
        ]
    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
        });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: 'required',
                event: 'required',
                date: 'required',
                phone: 'required',
            },
            messages: {
                name: "Пожалуйста, введите ваше имя",
                event: "Пожалуйста, введите название вашего мероприятия",
                date: "Введите дату вашего мероприятия",
                phone: "Пожалуйста, введите ваш номер телефона"
            }
        }); 
    }

    validateForm('#form form');

    $('input[name=phone]').mask("+7(999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });
});