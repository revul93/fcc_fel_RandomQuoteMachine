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
    fetch(hadithURL).then(response => response.json()
        .then(function(data) {
            hadith = data;
            hadithLength = Object.keys(hadith).length;
        })
        .then(function() {
            getHadith(0);
            $('#hadith').addClass('ar-style');
        })
    ).catch(function(error) {
        $('body').css('backgroundColor', '#000')
        $('.btn').css('visibility', 'hidden')
        $('#hadith').text("Error loading data from server!");
    });
})

function getHadith(next = getRandomInt(hadithLength)) {
    if (next >= hadithLength || next < 0) {
        return;
    }
    currIndex = next;

    $('#hadith').animate(
        {opacity: 0},
        500, function() {
            $('#title').text(lang == 'ar' ? 
                `الأربعون النووية - الحديث رقم ${currIndex + 1}`
                : `Fourty Hadith of Al Nawawi - Hadith ${currIndex + 1}`)
            hadithElements.forEach(elem => { 
                $(`#${elem}`).text(hadith[currIndex][elem][lang])
            })
        }
    )
    $('#nextButton').attr('title', lang == 'ar' ? "التالي" : "next");
    $('#prevButton').attr('title', lang == 'ar' ? "السابق" : "previous");
    $('#randButton').attr('title', lang == 'ar' ? "عشوائي" : "random");
    $('#tweet').attr('href', `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent('حديث_شريف')}&text=${encodeURIComponent(hadith[currIndex]['sanad'][lang]) + hadith[currIndex]['matn'][lang]}`)
    $('#hadith').animate({opacity: 1}, 500);
    var color = bodyColors[getRandomInt(bodyColors.length)]
    $('body, .navButtons, #tweet').animate({backgroundColor: color}, 500);
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

$('#randButton').on('click', function() {
    getHadith();
    $(this).blur();
    return false;
})

$('#langButton').on('click', function() {
    lang == 'ar' ? lang = 'en' : lang = 'ar';
    getHadith(currIndex);

    if (lang == 'ar') {
        $('#hadith').removeClass('en-style');
        $('#hadith').addClass('ar-style');
        $(this).text('EN');
    } else {
        $('#hadith').removeClass('ar-style');
        $('#hadith').addClass('en-style');
        $(this).text('ع');
    }
    $(this).blur();
    return;
})