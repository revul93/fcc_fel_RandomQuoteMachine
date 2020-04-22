const hadithElements = ['sanad', 'matn', 'rawi'];
const bodyColors = [
    '#fc6b03', '#03fc88', '#039dfc', '#2d03fc',
    '#6703fc', '#fc034a', '#a85b5b', '#687a50',
    '#8f7574', '#233d01', '#3c5678', '#2e2829'
];
let currIndex = 0;
let lang = 'ar';

function getRandomInt(limit = Infinity) {
    return Math.floor(Math.random() * 100) % limit;
}

let hadith;
let hadithLength;
const hadithURL = "https://gist.githubusercontent.com/revul93/bb092168540fe7892addd0d25fe2f97f/raw/72642fdd86bce95c17126b630408db784fedd769/fourty_hadith_of_Nawawi.json"

$('document').ready(function() {
    $.ajax({
        url: hadithURL,
        type: 'GET',
        async: false,
        dataType: 'json',
    }).done(function(data) {
        hadith = data;
        hadithLength = Object.keys(hadith).length;
        getHadith(0);
        $('#text').addClass('ar-style');
    }).fail(function() {
        $('body').css('backgroundColor', '#000')
        $('.btn').css('visibility', 'hidden')
        $('#text').text("Error loading data from server!");
    })
})

function getHadith(next = getRandomInt(hadithLength)) {
    if (next >= hadithLength || next < 0) {
        return;
    }
    currIndex = next;

    $('#text').animate(
        {opacity: 0},
        500, function() {
            $('#title').text(lang == 'ar' ? 
                `الأربعون النووية - الحديث رقم ${currIndex + 1}`
                : `Fourty Hadith of Al Nawawi - Hadith ${currIndex + 1}`)
            hadithElements.forEach(elem => { 
                $(`#${elem}`).text(hadith[currIndex][elem][lang])
            })
            $('#author').text(lang == 'ar' ? `الإمام النووي، حديث رقم ${currIndex + 1}` : `Imam Al Nawawi, Hadith No. ${currIndex + 1}`);
        }
    )
    $('#nextButton').attr('title', lang == 'ar' ? "التالي" : "next");
    $('#prevButton').attr('title', lang == 'ar' ? "السابق" : "previous");
    $('#new-quote').attr('title', lang == 'ar' ? "عشوائي" : "random");
    $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent('حديث_شريف')}&text=${encodeURIComponent(hadith[currIndex]['sanad'][lang]) + hadith[currIndex]['matn'][lang]}`)
    $('#text').animate({opacity: 1}, 500);
    var color = bodyColors[getRandomInt(bodyColors.length)]
    $('body, .navButtons, #tweet-quote').animate({backgroundColor: color}, 500);
}

$('#nextButton').on('click', function() {
    getHadith(currIndex + 1);
    $(this).blur();
    return false;
})

$('#prevButton').on('click', function() {
    getHadith(currIndex - 1);
    $(this).blur();
    return false;
})

$('#new-quote').on('click', function() {
    getHadith();
    $(this).blur();
    return false;
})

$('#langButton').on('click', function() {
    lang == 'ar' ? lang = 'en' : lang = 'ar';
    getHadith(currIndex);

    if (lang == 'ar') {
        $('#text').removeClass('en-style');
        $('#text').addClass('ar-style');
        $(this).text('EN');
    } else {
        $('#text').removeClass('ar-style');
        $('#text').addClass('en-style');
        $(this).text('ع');
    }
    $(this).blur();
    return;
})