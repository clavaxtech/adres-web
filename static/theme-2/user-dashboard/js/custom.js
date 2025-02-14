$(document).ready(function () {

    function getScrollBarWidth() {
        var c = document.createElement("p");
        c.style.width = "100%";
        c.style.height = "200px";
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.top = "0px";
        d.style.left = "0px";
        d.style.visibility = "hidden";
        d.style.width = "200px";
        d.style.height = "150px";
        d.style.overflow = "hidden";
        d.appendChild(c);
        document.body.appendChild(d);
        var b = c.offsetWidth;
        d.style.overflow = "scroll";
        var a = c.offsetWidth;
        if (b == a) {
            a = d.clientWidth
        }
        document.body.removeChild(d);
        return (b - a)
    }
    
    $('#select, #state, #domain').chosen();
    


});


/* Header Scroll */
$(window).scroll(function () {
    if ($(window).scrollTop() > 20) {
        $('.header-main').addClass('fixed-header');
    } else {
        $('.header-main').removeClass('fixed-header');
    }
});


$(window).load(function(){
    $(".scroll").mCustomScrollbar();
});

// toggleclass

function toggleClass(){
	let sidebar = document.getElementById('sidebar');
	let mainCon = document.getElementById('main-container');
	sidebar.classList.toggle('open');
	mainCon.classList.toggle('openSidebar');
}

function toggleRes(){
    if ($(window).width() < 960) {
        $(".sidebar").removeClass("open");
        $(".dashboard-wrap").removeClass("openSidebar");
    }
    else {
        $(".sidebar").addClass("open");
        $(".dashboard-wrap").addClass("openSidebar");
    }
}

$(window).resize(function() {
    toggleRes();
});
$(window).load(function(){
    toggleRes();
});