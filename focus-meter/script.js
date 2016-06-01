function subtract_point() {
    var points = document.getElementById('points').value;
    var new_points = parseInt(points, 10) - 1;

    if (new_points < 0) {
        new_points = 0;
    }


    document.getElementById('points').value = new_points;
}

function timer() {
    var points = document.getElementById('points').value;
    var new_points = parseInt(points, 10) + 1;

    if (new_points > 10) {
        return;
    }

    document.getElementById('points').value = new_points;

}

function stopwatch() {
    var time = document.getElementById('stopwatch').value;
    var points = parseInt(document.getElementById('points').value, 10);
    var new_time = parseFloat(time, 10) - 1;

    if (new_time < 0) {
        new_time = 600;
        if (points < 3) {
            document.getElementById('points').value = points + 1;
        }
    }

    document.getElementById('stopwatch').value = new_time;

}