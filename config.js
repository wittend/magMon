let jsonConfig = `                          
            {
                "numThreads"        :   2,
                "threadOffsetUS"    :   150,
                "i2cBusNumber"      :   1,
                "i2c_fd"            :   0,
                "modeOutputFlag"    :   0,
                "baseFilePath"      :   "/PSWS",
                "outputFilePath"    :   "/Srawdata",
                "outputFileName"    :   "",
                "gridSqr"           :   "EM38uw",
                "sitePrefix"        :   "N0000023",
                "city"              :   "Columbia",
                "state"             :   "Missouri",
                "country"           :   "USA",
                "postalCode"        :   "65201",
                "lattitude"         :   "",
                "longitude"         :   "",
                "elevation"         :   "",
                "system"            :   ""
            }`;

function loadConfigPage()
{
    'use strict';

    let jsonObj = JSON.parse(jsonConfig);

    // let pageLayout = `
    //                 <div id='topFrame' class='tabbedContainerClass'>
    //                     <ul>
    //                         <li><a href='#Images'>  <span>Image</span>  </a></li>
    //                         <li><a href='#Config'>  <span>Config</span> </a></li>
    //                     </ul>
    //                     <div id='Images' class='tabPageClass'>
    //                     </div>
    //                     <div id='Config' class='tabPageClass' >
    //                         <div id='configPage' class='pageClass'></div>
    //                     </div>
    //                 </div>`;
    //
    // let thebody = document.getElementById('theBody');
    // thebody.innerHTML = pageLayout;

    let formTop = `
                        <fieldset id='fsSettings'>
                            <legend>Settings:</legend>
                            <table id='config-tbl'>
                               <tbody id='cfg-tbody'>
                                    <tr id='cfg-tr-0' class='cfg-row-class'>
                                        <td id='td-0-0' class='cfg-space-class'>
                                            &nbsp;
                                        </td>
                                        <td id='td-0-1' class='cfg-space-class'>
                                            &nbsp;
                                        </td>
                                        <td id='td-0-2' class='cfg-space-class'>
                                            &nbsp;
                                        </td>
                                        <td id='td-0-3' class='cfg-space-class'>
                                            &nbsp;
                                        </td>
                                    </tr>`;

    let formTail =
            `<tr id='cfg-tr-1' class='cfg-row-class'>
                                    <td id='td-1-0' class='cfg-space-class'>
                                        &nbsp;
                                    </td>
                                    <td id='td-1-1' class='cfg-label-class'>
                                        &nbsp;
                                    </td>
                                    <td id='td-1-2' class='cfg-input-class' style='text-align: right'>
                                        <button id='btnSave' class='stdBtnClass' type='button' autofocus> Save </button>
                                    </td>
                                    <td id='td-1-2' id='td-13-3' class='cfg-space-class'>
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>`;

    let HTMLTxt = formTop;
    let x;
    for(x in jsonObj)
    {
        if(jsonObj != null)
        {
            HTMLTxt = HTMLTxt + "<tr id='cfg-tr-1' class='cfg-row-class'>";
            HTMLTxt = HTMLTxt + "   <td id='td-0-0' class='cfg-space-class'>";
            HTMLTxt = HTMLTxt + "       &nbsp;";
            HTMLTxt = HTMLTxt + "   </td>";
            HTMLTxt = HTMLTxt + "   <td id='td-1-1' class='cfg-label-class'>";
            HTMLTxt = HTMLTxt + "       <label>" + x + ":</label>";
            HTMLTxt = HTMLTxt + "   </td>";
            HTMLTxt = HTMLTxt + "   <td id='td-1-0' class='cfg-space-class'>";
            HTMLTxt = HTMLTxt + "       <input type='text' value='" + jsonObj[x] + "' />";
            HTMLTxt = HTMLTxt + "   </td>";
            HTMLTxt = HTMLTxt + "   <td id='td-0-0' class='cfg-space-class'>";
            HTMLTxt = HTMLTxt + "      &nbsp;";
            HTMLTxt = HTMLTxt + "   </td>";
            HTMLTxt = HTMLTxt + "</tr>";
        }
    }
    HTMLTxt = HTMLTxt + formTail;
//    document.getElementById('theBody').innerHTML = HTMLTxt;
    document.getElementById('tab2').innerHTML = HTMLTxt;
    let onSaveBtnClick = function()
    {
        alert('Save clicked');
    };
    document.getElementById('btnSave').onclick = onSaveBtnClick;
}

