/*
   
    Template Name : DevBlog - Personal Blog Template
    Author : UiPasta Team
    Website : http://www.uipasta.com/
    Support : http://www.uipasta.com/support/
	
	
*/



/*
   
   Table Of Content
   
   1. Preloader
   2. Smooth Scroll
   3. Scroll To Top
   4. Tooltip
   5. Popover
   6. Ajaxchimp for Subscribe Form
   7. Video and Google Map Popup
   8. Magnific Popup
   9. Image Carousel/Slider
  10. Load More Post
  11. Load More Portfolio
  12. End Box (Popup When Scroll Down)
 

*/


(function ($) {
    'use strict';

    jQuery(document).ready(function () {

      $('.inputtext').hide(); 

  //var editto=document.getElementById('#edit');
  $(".edit").click(function(){
        $(this).prevAll('.inputtext').show();
    $(this).prevAll('.currenttext').hide();
     $(this).prevAll('.del').hide();
    $(this).prevAll('.edit').hide();
   

    /*
      $('div[data-stateNames]').show(); 
        $('div[currenttext]').hide();
        $('a[data-stateNames]').hide();
        //$('#delete').hide();
        */
  });

	  
       /* Load More Post */	
	   	
        $("div.blog-post").slice(0, 4).show();
          $("#load-more-post").on('click', function (e) {
             e.preventDefault();
             $("div.blog-post:hidden").slice(0, 1).slideDown(300);
             if ($("div.blog-post:hidden").length == 0) {
             $('#post-end-message').html('<div class="end">End</div>').fadeIn(800);
             $("#load-more-post").fadeOut(100);
              }
             });
			 


       /* Load More Portfolio */	
	   	
        $("div.portfolio").slice(0, 2).show();
          $("#load-more-portfolio").on('click', function (e) {
             e.preventDefault();
             $("div.portfolio:hidden").slice(0, 1).slideDown(300);
             if ($("div.portfolio:hidden").length == 0) {
             $('#portfolio-end-message').html('<div class="end">End</div>').fadeIn(800);
             $("#load-more-portfolio").fadeOut(100);
              }
             });
			 
		
		
		
       /* End Box (Popup When Scroll Down) */
	   
        $("#scroll-down-popup").endpage_box({
           animation: "flyInLeft",
           from: "70%",
           to: "100%"
          });
              
		   
            });

   })(jQuery);