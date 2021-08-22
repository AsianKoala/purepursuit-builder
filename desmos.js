

function graphSetup() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    $('body').append(`<div id="calculator" style="width: ${vw - 250}px; height: ${vh - 25}px;"></div>`);

    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt, {
        invertedColors: true,
        autosize: false
    });

    calculator.setExpression({
        type: 'table',
        columns: [
            {
                latex: 'x',
                values: ['1', '2', '3', '4', '5']
            },
            {
                latex: 'y',
                values: ['1', '4', '9', '16', '25'],
                dragMode: Desmos.DragModes.XY
            },
        ]
    });

    calculator.setMathBounds({
        left: -72,
        right: 72,
        bottom: -72,
        top: 72
    })

    var finalAngle = 0;

    $('#angle').on('change keydown paste input', function () {
        console.log(this.value)

        if (this.value === "") {
            var table = calculator.getExpressions()[0];
            console.log(table.columns);
            var x_set = table.columns[0].values;
            var y_set = table.columns[1].values;
            var slope = Math.atan2(y_set[y_set.length - 1] - y_set[y_set.length - 2], x_set[x_set.length - 1] - x_set[x_set.length - 2])
            finalAngle = slope;
        } else if (!isNaN(parseFloat(this.value))) {
            finalAngle = this.value * Math.PI / 180.0;
        }

        console.log(finalAngle);
    })

    $('#generate').click(function () {
        var table = calculator.getExpressions()[0];
        console.log(table.columns);
        var x_set = table.columns[0].values;
        var y_set = table.columns[1].values;
        $('.output').remove();
        $('body').append(`<div class="output"></div>`);

        var waypoints = `override fun initialPath(): Path {
            return PathBuilder(1.0).addPoint(Waypoint(${x_set[0]}.0, ${y_set[0]}.0, 0.0))`;

        for (let i = 1; i < x_set.length - 1; i++) {
            waypoints += `
            .addPoint(Waypoint(${x_set[i]}.0, ${y_set[i]}.0, 10.0))`;
        }

        waypoints += `
            .addPoint(StopWaypoint(${x_set[x_set.length - 1]}.0, ${y_set.length - 1}.0, 10.0, Angle(${finalAngle}, AngleUnit.RAD}))).build()`
        $('.output').html(waypoints);
        console.log($('.output').html());
    });
}

$(document).ready(function () {
    graphSetup();
});