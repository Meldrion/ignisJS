"use strict";
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');

var player = null;
document.addEventListener("DOMContentLoaded", function(event) {

    buildTable();

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


function closeButtonClicked() {
    windowManager.getCurrent().close();
}

function buildTable() {

    var bgmTable = $('#bgm');
    bgmTable.bootstrapTable({
        data: [],
        striped: true
    });

}
