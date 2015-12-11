

//5-use Jquery to select the element that will be animated then store it in var
var $box  = $('#coccinnelle1');
var $box2 = $('#coccinnelle2');
var $box3 = $('#coccinnelle3');
var $4Coxilogo = $('.about-inset');


//4-this function will be triggered whenever the user scroll
$(document).scroll(function(event){


    //6-animate he selected element Dynamically according to user scroll
    //using the window.pageYOffset value wich is = how much pixel a user
    //has scrolled
    TweenLite.to($box,3, { right : window.pageYOffset });
    TweenLite.to($box2,2, { right : window.pageYOffset-50 });
    TweenLite.to($box3,0.5, { right : window.pageYOffset-100 });
    TweenLite.to($4Coxilogo ,3, { left : window.pageYOffset });
    TweenLite.to($4Coxilogo ,3, { top : window.pageYOffset  });




});




