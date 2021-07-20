document.addEventListener('DOMContentLoaded', function()
{
    let t = new Date();
    let data_x = [];
    let data_y = [];
    let data_z = [];
    let data_rTemp = [];
    let data_total = [];
    let ws = new WebSocket('ws://10.0.0.8:7890/');

    data_x.push([t, null]);
    data_y.push([t, null]);
    data_z.push([t, null]);
    data_rTemp.push([t, null]);
    data_total.push([t, null]);

    let gx = new Dygraph(document.getElementById("div_g_x"), data_x,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['Time', 'µT']
        });
    let gy = new Dygraph(document.getElementById("div_g_y"), data_y,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    let gz = new Dygraph(document.getElementById("div_g_z"), data_z,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    let gTot = new Dygraph(document.getElementById("div_g_total"), data_total,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 40,
            drawPoints: false,
            labelsUTC: true,
            axisLabelFontSize: 12,
            labels: ['UTC', 'µT']
        });
    let gTemp = new Dygraph(document.getElementById("div_g_rTemp"), data_rTemp,
        {
            showRoller: false,
            rollPeriod: 10,
            panEdgeFraction: 40,
            drawPoints: false,
            labelsUTC: true,
            labels: ['UTC', '°C'],
            axisLabelFontSize: 12,
            color:  '#0000FF',
            fillGraph: true
        });

    ws.onopen = function()
    {
        document.body.style.backgroundColor = '#606060';
    };

    ws.onclose = function()
    {
        document.body.style.backgroundColor = '#dfc';
    };

    ws.onmessage = function(event)
    {
        let res = event.data;
        let resObj = JSON.parse(res);
        //let strObj = 'ts: ' + resObj.ts + ', lt: ' +  resObj.lt + ', rt: ' + resObj.rt + ', x: ' + resObj.x + ', y: ' + resObj.y + ', z: ' + resObj.z;
        //document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + '<br>' + strObj;

        let x = new Date();  // current time
        data_x.push([x, resObj.x]);
        data_y.push([x, resObj.y]);
        data_z.push([x, resObj.z]);
        data_rTemp.push([x, resObj.rt]);
        data_total.push([x, resObj.Tm]);
        gx.updateOptions( { 'file': data_z } );
        gy.updateOptions( { 'file': data_y } );
        gz.updateOptions( { 'file': data_x } );
        gTemp.updateOptions( { 'file': data_rTemp } );
        gTot.updateOptions( { 'file': data_total } );
    };

    //------------------------------------------
    // btnXZoom
    //------------------------------------------
    let btnXZoom = document.getElementById('resetXZoom');
    function fnresetXZoom(e)
    {
        gx.resetZoom();
    }
    btnXZoom.addEventListener('click', fnresetXZoom);

    //------------------------------------------
    // btnYZoom
    //------------------------------------------
    let btnYZoom = document.getElementById('resetYZoom');
    function fnresetYZoom(e)
    {
        gy.resetZoom();
    }
    btnYZoom.addEventListener('click', fnresetYZoom);

    //------------------------------------------
    // btnZZoom
    //------------------------------------------
    let btnZZoom = document.getElementById('resetZZoom');
    function fnresetZZoom(e)
    {
        gz.resetZoom();
    }
    btnZZoom.addEventListener('click', fnresetZZoom);

    //------------------------------------------
    // btnZZoom
    //------------------------------------------
    let btnTotalZoom = document.getElementById('resetTotalZoom');
    function fnresetTotalZoom(e)
    {
        gTot.resetZoom();
    }
    btnTotalZoom.addEventListener('click', fnresetTotalZoom);

    //document.querySelector('.topFrameClass').style.height = 'calc(100vh - 35px)';
    //document.querySelector('.tabsetClass').style.height = 'calc(100vh - 35px)';
    $( "#tabs" ).tabs({heightStyle: 'fill'});

    //makeTabs(".tabsetClass");
    loadConfigPage();
});
