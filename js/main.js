document.addEventListener('DOMContentLoaded', function()
{
    let t = new Date();
    let data_x = [];
    let data_y = [];
    let data_z = [];
    let data_total = [];
    let data_rTemp = [];

    // Create the Websocket connection.
    let ws = new WebSocket('ws://10.0.0.8:7890/');

    // Fill the buffer with bogus data so the plot will begin at zero.
    for (let i = 10; i >= 0; i--)
    {
        let x = new Date(t.getTime() - i * 1000);
        data_x.push([x, -30]);
        data_y.push([x, -3.0]);
        data_z.push([x, -60]);
        data_total.push([x, 70]);
        data_rTemp.push([x, 20]);
    }

    // Initialize the pan slider.
    $( "#slider" ).slider();

    // create the 'X' vector graph object.
    let gx = new Dygraph(document.getElementById("div_g_x"), data_x,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 0.40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['Time', 'µT']
        });
    // create the 'Y' vector graph object.
    let gy = new Dygraph(document.getElementById("div_g_y"), data_y,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 0.40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    // create the 'Z' vector graph object.
    let gz = new Dygraph(document.getElementById("div_g_z"), data_z,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 0.40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    // create the 'Total field' graph object.
    let gTot = new Dygraph(document.getElementById("div_g_total"), data_total,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 0.40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    // create the 'Remote Temperature' graph object.
    let gTemp = new Dygraph(document.getElementById("div_g_rTemp"), data_rTemp,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 0.40,
            drawPoints: false,
            labelsUTC: true,
            labels: ['UTC', '°C'],
            axisLabelFontSize: 12,
            color:  '#0000FF',
            fillGraph: true
        });

    // Function that fires when the WebSocket opens.
    ws.onopen = function()
    {
        document.body.style.backgroundColor = '#606060';
    };

    // Function that fires when the WebSocket closes.
    ws.onclose = function()
    {
        document.body.style.backgroundColor = '#dfc';
    };

    // Function that fires every time a new block of data arrives on the WebSocket.
    ws.onmessage = function(event)
    {
        // get the event data.
        let res = event.data;
        // Parse the JOSN object received.
        let resObj = JSON.parse(res);

        let x = new Date();             // get current time

        // push the decoded JSON onto the data stacks.
        data_x.push([x, resObj.x]);
        data_y.push([x, resObj.y]);
        data_z.push([x, resObj.z]);
        data_rTemp.push([x, resObj.rt]);
        data_total.push([x, resObj.Tm]);

        // Update the graphing elements.
        gx.updateOptions( { 'file': data_z } );
        gy.updateOptions( { 'file': data_y } );
        gz.updateOptions( { 'file': data_x } );
        gTot.updateOptions( { 'file': data_total } );
        gTemp.updateOptions( { 'file': data_rTemp } );
    };

    //------------------------------------------
    // btnXZoom Reset.
    //------------------------------------------
    let btnXZoom = document.getElementById('resetXZoom');
    function fnresetXZoom(e)
    {
        gx.resetZoom();
    }
    btnXZoom.addEventListener('click', fnresetXZoom);

    //------------------------------------------
    // btnYZoom Reset.
    //------------------------------------------
    let btnYZoom = document.getElementById('resetYZoom');
    function fnresetYZoom(e)
    {
        gy.resetZoom();
    }
    btnYZoom.addEventListener('click', fnresetYZoom);

    //------------------------------------------
    // btnZZoom Reset.
    //------------------------------------------
    let btnZZoom = document.getElementById('resetZZoom');
    function fnresetZZoom(e)
    {
        gz.resetZoom();
    }
    btnZZoom.addEventListener('click', fnresetZZoom);

    //------------------------------------------
    // btnTotalZoom Reset.
    //------------------------------------------
    let btnTotalZoom = document.getElementById('resetTotalZoom');
    function fnresetTotalZoom(e)
    {
        gTot.resetZoom();
    }
    btnTotalZoom.addEventListener('click', fnresetTotalZoom);

    // style the page to have tabs with Jquery-UI.1
    $( "#tabs" ).tabs({heightStyle: 'fill'});
    $('.ui-tabs .ui-tabs-panel').css('padding', '5px');
    //$('.ui-ui-slider-handle').css('top', '-10px');
    $('.ui-slider-handle').css('height', '15px');
    $('.ui-slider-handle').css('top', '-5px');
    // Load thepage for configuration parameters into the second tab.
    loadConfigPage();
});
