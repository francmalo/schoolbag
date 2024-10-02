(function($){
	"use strict";

	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "991"
	});

	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 120){
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Cart Btn
	$(".cartToggleBtn").click(function() {
		$(".cart-btn").toggleClass("active");
	});

	// Mixitup
	try {
        var mixer = mixitup('.shorting', {
            controls: {
                toggleDefault: 'none'
            }
        });
    } catch (err) {}

	// Deals of this Week Slides
	$('.deals-of-this-week-slides').owlCarousel({
		nav: false,
		margin: 25,
		loop: true,
		dots: true,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			},
			1200: {
				items: 3
			}
		}
	});

	// Countdown Timer
	function makeTimer() {
		var endTime = new Date("September 20, 2024 17:00:00 PDT");
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");
	}
	setInterval(function() { makeTimer(); }, 0);

	// Countdown Timer 2
	function makeTimer2() {
		var endTime = new Date("September 20, 2024 17:00:00 PDT");
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days2").html(days + "<span>Days</span>");
		$("#hours2").html(hours + "<span>Hours</span>");
		$("#minutes2").html(minutes + "<span>Minutes</span>");
		$("#seconds2").html(seconds + "<span>Seconds</span>");
	}
	setInterval(function() { makeTimer2(); }, 0);

	// Input Plus & Minus Number JS
	$('.input-counter').each(function() {
		var spinner = jQuery(this),
		input = spinner.find('input[type="text"]'),
		btnUp = spinner.find('.plus-btn'),
		btnDown = spinner.find('.minus-btn'),
		min = input.attr('min'),
		max = input.attr('max');
		btnUp.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
		btnDown.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	});

	// Products Slides
	$('.products-slides').owlCarousel({
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			},
			1200: {
				items: 3
			}
		}
	});

	// scrollCue
    scrollCue.init();

	// Price Range
	$(function() {
		$( "#slider-range" ).slider({
		range: true,
		min: 130,
		max: 500,
		values: [ 130, 500 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	});

	// Products Details Image Slides
	$('.products-details-thumbs-image-slides').slick({
		dots: true,
		speed: 500,
		fade: false,
		slide: 'li',
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		prevArrow: false,
		nextArrow: false,
		responsive: [{
			breakpoint: 800,
			settings: {
				arrows: false,
				centerMode: false,
				centerPadding: '30px',
				variableWidth: false,
				slidesToShow: 1,
				dots: true
			},
			breakpoint: 1200,
			settings: {
				arrows: false,
				centerMode: false,
				centerPadding: '30px',
				variableWidth: false,
				slidesToShow: 1,
				dots: true
			}
		}],
		customPaging: function (slider, i) {
			return '<button class="tab">' + $('.slick-thumbs li:nth-child(' + (i + 1) + ')').html() + '</button>';
		}
	});

	// Products Filter Options
	// $(function(){
  //       $(".products-filter .grid-view").on("click", function(e){
  //           e.preventDefault();
  //           document.getElementById("products-filter-options").classList.add('products-grid-view')
  //           document.getElementById("products-filter-options").classList.remove('products-list-view');
  //       });
  //       $(".products-filter .list-view").on("click", function(e){
  //           e.preventDefault();
  //           document.getElementById("products-filter-options").classList.add('products-list-view')
  //           document.getElementById("products-filter-options").classList.remove('products-grid-view');
  //       });
  //   });
	// $('.products-filter button').on('click', function(){
  //       $('.products-filter button').removeClass("active");
  //       $(this).addClass("active");
  //   });

	// Go to Top
	$(function(){
		// Scroll Event
		$(window).on('scroll', function(){
			var scrolled = $(window).scrollTop();
			if (scrolled > 600) $('.go-top').addClass('active');
			if (scrolled < 600) $('.go-top').removeClass('active');
		});
		// Click Event
		$('.go-top').on('click', function() {
			$("html, body").animate({ scrollTop: "0" },  500);
		});
	});

	// Preloader
	jQuery(window).on('load', function () {
        $('#preloader').fadeOut()
    })






 $(document).ready(function () {
            $('.products-slider').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '40px'
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '40px'
                        }
                    }
                ]
            });


            $('.filter').on('click', function () {
                var filter = $(this).data('filter');
                if (filter == 'all') {
                    $('.products-slider').slick('slickUnfilter');
                } else {
                    $('.products-slider').slick('slickUnfilter').slick('slickFilter', filter);
                }
            });


            $('.category-slider').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });





        });

        const navbar = document.getElementById('navbar');
        const userButton = document.getElementById('user-button');
        const userDropdown = document.getElementById('user-dropdown');
        const cartButton = document.getElementById('cart-button');
        const cartDropdown = document.getElementById('cart-dropdown');
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const menuToggle = document.getElementById('menu-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        const closeMenu = document.getElementById('close-menu');


        // Sample cart data with image paths
        let cart = [
            { name: "Product 1", price: 19.99, quantity: 1, image: "assets/images/products/product29.png" },
            { name: "Product 2", price: 29.99, quantity: 2, image: "assets/images/products/product29.png" }
        ];

        function toggleDropdown(dropdown) {
            dropdown.classList.toggle('active');
        }
        function updateCart() {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                document.querySelector('.cart-buttons').style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeItem(${index})">&times;</button>
            </div>
        `).join('');
                document.querySelector('.cart-buttons').style.display = 'flex';
            }

            cartTotal.textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }

        // Add event listeners for the new buttons
        document.querySelector('.btn-view-cart').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('View Cart clicked');
            // Add your view cart logic here
        });

        document.querySelector('.btn-checkout').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Checkout clicked');
            // Add your checkout logic here
        });
        function removeItem(index) {
            cart.splice(index, 1);
            updateCart();
        }
        userButton.addEventListener('click', () => toggleDropdown(userDropdown));
        cartButton.addEventListener('click', () => toggleDropdown(cartDropdown));

        // Toggle mobile menu overlay
        menuToggle.addEventListener('click', () => {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is active
        });

        closeMenu.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });

        // Close overlay when clicking on a link
        navOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (event) => {
            if (!userButton.contains(event.target)) {
                userDropdown.classList.remove('active');
            }
            if (!cartButton.contains(event.target)) {
                cartDropdown.classList.remove('active');
            }
        });

        // Sticky navbar functionality
        const navbarOffset = navbar.offsetTop;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= navbarOffset) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });

        // Initial cart update
        updateCart();
        // window.onscroll = function() {
        //     makeSticky();
        // };
        //
        // const stickyDiv = document.getElementById('sticky-div');
        // const stickyOffset = stickyDiv.offsetTop;
        //
        // function makeSticky() {
        //     if (window.pageYOffset >= stickyOffset) {
        //         stickyDiv.classList.add("sticky");
        //     } else {
        //         stickyDiv.classList.remove("sticky");
        //     }
        // }







}(jQuery));
