$(document).ready(function(){
    //** notice we are including jquery and the color plugin at
    //** http://code.jquery.com/color/jquery.color-2.1.0.js

    var scroll_pos = 0;
    var animation_begin_pos = 0;
    var animation_end_pos = 1000;
    var beginning_color = new $.Color( 'rgb(0,255,0)' );
    var mid_color = new $.Color( 'rgb(255,255,0)' );
    var ending_color = new $.Color( 'rgb(255,0,0)' );

    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        var percentScrolled = scroll_pos / (animation_end_pos - animation_begin_pos);
        // Green to yellow
        if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos && percentScrolled < 0.5) {
            var newRed =  mid_color.red() * percentScrolled * 2;
            var newColor = new $.Color(newRed, 255, 0);
            $('body').animate({ backgroundColor: newColor }, 0);
        }
        // Yellow to Red
        else if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos && percentScrolled > 0.5) {
            var newGreen = mid_color.green() - (mid_color.green() * (percentScrolled - 0.5) * 2);
            var newColor = new $.Color(255, newGreen, 0);
            $('body').animate({ backgroundColor: newColor }, 0);
        } else if ( scroll_pos > animation_end_pos ) {
            $('body').animate({ backgroundColor: ending_color }, 0);
        } else if ( scroll_pos < animation_begin_pos ) {
            $('body').animate({ backgroundColor: beginning_color }, 0);
        }
    });
});
