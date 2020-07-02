$(document).ready(function(){
    $('.solutions__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    

     

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
               e.preventDefault();
               $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
               $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          })
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal

   $('[data-modal=consultation]').on('click', function() {
       $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal__close').on('click', function() {
       $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
   });


   $('.button_mini').each(function(i) {
       $(this).on('click', function() {
           $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
           $('.overlay, #order').fadeIn('slow');
       })
   });


   function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required:true,
                minlength:2
            },
            phone: "required",
            email: {
             required:true,
             email:true,
            }
        },
        messages: {
         name: {
             required: "Пожалуйста, введите свое имя",
             minlength: jQuery.validator.format("Введите {0} символов!")
         },
         phone: "Пожалуйста, введите свой телефон",
         email: {
           required: "Пожалуйста, введите свой e-mail",
           email: "Неправильно введен адрес e-mail "
         }
       }
    });
   };

   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   $('input[name=phone]').mask("+7(999) 999-9999");

   $('form').submit(function(e) {
       e.preventDefault();
       $.ajax({
           type:"POST",
           url: "mailer/smart.php",
           data: $(this).serialize()
        }).done(function() {
           $(this).find("input").val("");

           $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})