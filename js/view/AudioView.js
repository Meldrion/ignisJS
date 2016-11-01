var player = null;
document.addEventListener("DOMContentLoaded", function(event) {

    var speedSlider = $('#ex1');

    speedSlider.slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    });

    speedSlider.slider()
        .on('slide', function() {
            player.playbackRate = speedSlider.slider().data("slider").getValue() / 100;
        });

    player = document.getElementById("audioPlayer");
    player.playbackRate = 1.0;
    player.loop = true;
    player.play();
});


