// ==UserScript==
// @name         better-aws.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically switches to the correct role when you're in AWS
// @author       Craig Floyd
// @match        https://console.aws.amazon.com/*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValues
// @grant GM_listValues
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';
    
    var lastUrl = null;
    var lastRun = null;

    setInterval(init, 5000);

    function init(){
        var href = window.location.href;
        if (href != lastUrl){
            lastRun = null;
            lastUrl = href;
        }
        if (lastRun){
            console.log("Ignoring Run");
        } else if (href.indexOf('.com/ec2/') != -1){
            replaceEc2Instances();

            if (href.indexOf('#Instances') != -1){
                ec2InstancesPage();
            } else if (href.indexOf('#NIC') != -1){
                nicPage();
            }
        } else if (href.indexOf('.com/vpc/') != -1){
            if (href.indexOf('#vpcs') != -1){
                vpcPage();
            }
        }
    }

    function replaceEc2Instances(){
        $('a[href^="/ec2/v2/home#Instances:InstanceId="], a[href^="#Instances:search="][href$=";sort=tag:Name"]').each((i, el)=>{
            var val = GM_getValue(el.innerText.trim());
            if (val && val.Name){
                el.innerText = GM_getValue(el.innerText).Name;
            }
        });
    }

    function ec2InstancesPage(){
        var cols = ["Instance ID", "Name"];
        setCache(cols, 'ec2');
    }

    function getColumnNumbers(colNames){
        var ret = {};
        var headerRow = $('tr[__gwt_header_row]').find('th:contains("' + colNames[0] + '")').parent();
        for (var i in colNames){
            var col = colNames[i];
            var colIndex = headerRow.find('th:contains("' + col + '")').filter(function() {
                return $(this).text() === col;
            }).index();

            ret[col] = colIndex;
        }

        return ret;
    }

    function nicPage(){
        //var cols = ["Network interface ID", "Name", "Description"];
        //var colNums = getColumnNumbers(cols);
        //console.log(colNums);
    }

    function setCache(cols, type){
        var columns = getColumnNumbers(cols);

        $('tr[__gwt_row]').each((i, el)=>{
            var cache = {
                type: type
            };

            for (var key in columns){
                var col = columns[key];
                cache[key] = $(el).children()[col].innerText.trim();
            }

            console.log(cache[cols[0]] + " updated to " + JSON.stringify(cache));
            GM_setValue(cache[cols[0]], cache);
            lastRun = type;
        });
    }

    function vpcPage(){
        var cols = ["VPC ID", "Name"];
        setCache(cols, 'vpc');
    }
})();
