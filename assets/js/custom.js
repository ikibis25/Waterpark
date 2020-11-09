/*Copyright (c) 2017 */
(function ($) {
	"use strict";
	var Water_Park = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {
			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			/*-------------- Water_Park Functions Calling ----------*/
			this.Sidenav();
			this.Image_filter();
			this.Popup();
			this.Sub_menu();
			this.pie();
			this.Ajax();
		},
		/*-------------- Water_Park Functions definition ------------*/
		Sidenav: function () {	
			if($('.wp_navigation_menu').length > 0){
				$(".wp_toggle_btn").on("click", function() {
					$(".wp_navigation_menu").addClass("wp_menu_show_hide")
				});
				$(".wp_close_btn").on("click", function() {
					$(".wp_navigation_menu").removeClass("wp_menu_show_hide")
				});
			}
		},
		Image_filter: function () {	
			if($('.wp_gallery').length > 0){
				$(".wp_button_group .wp_button").click(function(){
			        var value = $(this).attr('data-filter');
			        if(value == "all"){
			            $('.filter').show('1000');
			       	}else{
			            $(".filter").not('.'+value).hide('3000');
			            $('.filter').filter('.'+value).show('3000');
			        }
				    if ($(".wp_button").removeClass("active")) {
						$(this).removeClass("active");
					}
						$(this).addClass("active");
				});
			}
		},
		Popup: function () {	
			if($('.popup-gallery').length > 0){
			 $('.popup-gallery').magnificPopup({
		        delegate: 'a',
		        type: 'image',
		        gallery:{
		          enabled:true
		        },
		           mainClass: 'mfp-with-zoom', // this class is for CSS animation below
		        zoom: {
		          enabled: true, 
		          duration: 300,
		          easing: 'ease-in-out',
		          opener: function(openerElement) {
		            return openerElement.is('img') ? openerElement : openerElement.find('i');
		          }
		        }
		      });
			}
		},
		Sub_menu: function(){
			if($('.wp_navigation_menu ul li').length > 0){
				$('.sub-menu').slideUp();
				$('.dropdown').on('click',function(){
					$('.sub-menu').slideToggle();
				})
			}
		},
		pie: function(){
			$('.pie').pieChart({
		        barColor:'#fff',
		        trackColor:'#67dafe',
		        lineCap:'round',
		        lineWidth:6,
		        animate:{
				  duration:5000,
				  enabled:true,
				},
		        onStep: function (from, to, percent) {
		            $(this.element).find('.pie-value').text(Math.round(percent) + '%');
		        }
		    });
		},
		Ajax: function(){
				function checkRequire(formId , targetResp){
				targetResp.html('');
				var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
				var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
				var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
				var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
				var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
				var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
				var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
				var check = 0;
				$('#er_msg').remove();
				var target = (typeof formId == 'object')? $(formId):$('#'+formId);
				target.find('input , textarea , select').each(function(){
					if($(this).hasClass('require')){
						if($(this).val().trim() == ''){
							check = 1;
							$(this).focus();
							targetResp.html('You missed out some fields.');
							$(this).addClass('error');
							return false;
						}else{
							$(this).removeClass('error');
						}
					}
					if($(this).val().trim() != ''){
						var valid = $(this).attr('data-valid');
						if(typeof valid != 'undefined'){
							if(!eval(valid).test($(this).val().trim())){
								$(this).addClass('error');
								$(this).focus();
								check = 1;
								targetResp.html($(this).attr('data-error'));
								return false;
							}else{
								$(this).removeClass('error');
							}
						}
					}
				});
				return check;
			}
			$(".submitForm").on("click", function() {
				var _this = $(this);
				var targetForm = _this.closest('.wp_contact_form');	
				var errroTarget = targetForm.find('.response');
				var check = checkRequire(targetForm , errroTarget);
				if(check == 0){
					var formDetail = new FormData(targetForm[0]);
					formDetail.append('form_type' , _this.attr('data-form-type'));
					$.ajax({
						method : 'post',
						url : './assets/ajax.php',
						data:formDetail,
						cache:false,
						contentType: false,
						processData: false
					}).done(function(resp){
						if(resp == 1){
							targetForm.find('input').val('');
							targetForm.find('textarea').val('');
							errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
						}else{
							errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
						}
					});
				}
			});
		}
	};
Water_Park.init();
jQuery(window).on('load', function() {
	jQuery("#status").fadeOut(2500);
	jQuery("#loader").delay(2000).fadeOut();
});
$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 400) {
			$('.wp_header_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.wp_header_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});
}(jQuery));
