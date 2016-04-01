//var car = $('.car');
$(document).ready(function () {
    obj.init();
});
var obj = {
    position: 0,
    positionCar1: 0,
    positionCar2: 0,
    obstaclePosition:0,
    carScore: 0,
    windowHeight: null,
    init: function () {
        obj.windowHeight = $(window).height();
        obj.carTrackInterval = setInterval(obj.trackInterval, 3);
        obj.pathCalculation();
        obj.randomFirstcarGenerator(120, 0);
        obj.randomSecondcarGenerator(250, 145);
        obj.randomObstacleGenerator(0,250);
        obj.leftRandomCarInterval = setInterval(obj.randomFirstCarInterval, 10);
        obj.rightRandomCarInterval = setInterval(obj.randomSecondCarInterval, 5);
        obj.obstacleCarInterval = setInterval(obj.randomObstacleInterval,3);
        obj.pathCalculation.keyDown = setInterval(obj.pathCalculation.keydownEvent, 20);
    },
    trackInterval: function () {
        obj.position += 1;
        obj.carScore += 10;
        $(".path").css({
            "background-position": "0px " + obj.position + "px"
        });
        var str = "YOUR SCORE" + obj.carScore;
        $(".score").html(str);
        if (obj.position >= 5000) {
            obj.positionCar1 += 0.50;
            obj.positionCar2 += 1.25;
            obj.position += 1.25;
            obj.obstaclePosition += 1.25;
            $(".path").css({
                "background-position": "0px " + obj.position + "px"
            });
            $(".leftRandomCar").css({
                "top": obj.positionCar1 + "px"
            });
            $(".rightRandomCar").css({
                "top": obj.positionCar2 + "px"
            });
            $(".obstacle").css({
                "top": obj.obstaclePosition + "px"
            });
        }
        obj.collision($('.leftRandomCar'), $('.car'));
        obj.collision($('.rightRandomCar'), $('.car'));
    },
    pathCalculation: function () {
        var path = $('.path'),
            car = $('.car'),
            movableArea = path.width() - car.width(),
            keyPressObject = {},
            carPixMove = 3;
        $(window).keydown(function (e) {
            keyPressObject[e.which] = true;
        });
        $(window).keyup(function (e) {
            keyPressObject[e.which] = false;
        });
        obj.keydownEvent = setInterval(function () {
            car.css({
                left: function (i, oldValue) {
                    var a = newPosValue(oldValue, 37, 39);
                    return a;
                },

            });
        }, 20);

        function newPosValue(oldValue, leftKey, rightKey) {
            var newPosition = parseInt(oldValue, 10) - (keyPressObject[leftKey] ? carPixMove : 0) + (keyPressObject[rightKey] ? carPixMove : 0);
            return newPosition < 0 ? 0 : newPosition > movableArea ? movableArea : newPosition;
        }
    },
    randomFirstcarGenerator: function (max, min) {
        var randomLeftPosition = Math.floor(Math.random() * (max - min + 1) + min);
        // console.log(randomLeftPosition)
        var leftCar = '<div class="leftRandomCar"></div>';
        $(".path").append(leftCar);
        //console.log(randomLeftPosition+"random");
        $(".leftRandomCar").css({
            left: randomLeftPosition + "px"
        });
    },
    randomSecondcarGenerator: function (max, min) {
        var randomRightPosition = Math.floor(Math.random() * (max - min + 1) + min);
        var rightCar = '<div class="rightRandomCar"></div>';
        $(".path").append(rightCar);
        $(".rightRandomCar").css({
            left: randomRightPosition + "px"
        });
    },
    randomObstacleGenerator: function (max, min) {
        var randomRightPosition = Math.floor(Math.random() * (max - min + 1) + min);
        var obstacle = '<div class="obstacle"></div>';
        $(".path").append(obstacle);
        $(".obstacle").css({
            left: randomRightPosition + "px"
        });
    },
    randomFirstCarInterval: function () {
        obj.positionCar1 += 1;
        $(".leftRandomCar").css({
            "top": obj.positionCar1 + "px"
        });
        if (obj.positionCar1 >= obj.windowHeight) {
            obj.positionCar1 = 0;
            $(".leftRandomCar").remove();
            obj.randomFirstcarGenerator(120, 0);
            return;
        }
    },
    randomSecondCarInterval: function () {
        obj.positionCar2 += 2;
        $(".rightRandomCar").css({
            "top": obj.positionCar2 + "px"
        });
        if (obj.positionCar2 >= obj.windowHeight) {
            obj.positionCar2 = 0;
            $(".rightRandomCar").remove();
            obj.randomSecondcarGenerator(250, 145);
            return;
        }
    },
    randomObstacleInterval: function () {
        obj.obstaclePosition +=1;
        $(".obstacle").css({
            "top": obj.obstaclePosition + "px"
        });
        if (obj.obstaclePosition >= obj.windowHeight) {
            obj.obstaclePosition = 0;
            $(".obstacle").remove();
            obj.randomObstacleGenerator(0,250);
            return;
        }
    },
    collision: function ($div1, $div2) {
        var randomCarLeft = $div1.offset().left;
        var randomCarTop = $div1.offset().top;
        var randomCarHeight = $div1.outerHeight(true);
        var randomCarWidth = $div1.outerWidth(true);
        var randomCarTotalHeight = randomCarTop + randomCarHeight;
        var randomCarTotalWidth = randomCarLeft + randomCarWidth;
        var myCarLeft = $div2.offset().left;
        var myCarTop = $div2.offset().top;
        var myCarHeight = $div2.outerHeight(true);
        var myCarWidth = $div2.outerWidth(true);
        var myCarTotalHeight = myCarTop + myCarHeight;
        var myCarTotalWidth = myCarLeft + myCarWidth;
        if (randomCarTotalHeight < myCarTop || randomCarTop > myCarTotalHeight || randomCarTotalWidth < myCarLeft || randomCarLeft > myCarTotalWidth) {
            return false;
        } else {
            alert("Game over");
            clearInterval(obj.carTrackInterval);
            clearInterval(obj.leftRandomCarInterval);
            clearInterval(obj.rightRandomCarInterval);
            clearInterval(obj.keydownEvent);
            return;
        }

    }

};