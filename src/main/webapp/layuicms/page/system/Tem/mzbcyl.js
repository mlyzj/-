layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention:'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool:'tool',
    $api:'api'
}).use(['form', 'layer','$api', 'jquery','ajaxExtention','$tool'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        $tool = layui.$tool,
        $api = layui.$api;


    /**
     * 初始化页面
     * */
    function init() {
        // var queryArgs = $tool.getQueryParam();//获取查询参数
        // var templateId = queryArgs['templateId'];
        //
        // alert(templateId);
        // var req = {
        //     templateId:templateId,


        // $api.Gettemp(req,function (res) {
            var yulan = window.sessionStorage.getItem("yulan");//获取域中的值
            var bb = JSON.parse(yulan);
            console.log(bb);
            $("[name='bigTitle']").val(bb.bigTitle);
            $("[name='explain']").val(bb.explain);
            for(var i=0;i<bb.list.length;i++) {
                var zbt = '';

                var bc = '';

                for (var g = 0; g < bb.list[i].beice.length; g++) {
                    for (var h = 0; h < bb.list[i].beice[g].yuland.length; h++) {
                        var f = h + 1
                        var bz = '';
                        for (var j = 0; j < bb.list[i].bz_coll.length; j++) {
                            var a = 1;
                            var only = '';
                            //子标准

                            for (var z = 0; z < bb.list[i].bz_coll[j].zbz_coll.length; z++) {
                                // alert(res.data.list[i].bz_coll[j].zbz_coll[z].substandardName);
                                var b = a++;
                                if (bb.list[i].bz_coll[j].id === 78) {
                                    only += '<div class="xuanxian">' +
                                        '<input id="item' + b + '" type="radio" title="' + bb.list[i].bz_coll[j].zbz_coll[z].substandardName + '" name="item' + g + '" value="' + bb.list[i].bz_coll[j].id + '" class="radio_">' +
                                        '<label for="item' + b + '"></label>' +
                                        '</div>'
                                } else {
                                    only += '<div class="xuanxian">' +
                                        '<input type="checkbox" id="checkbox' + b + '" class="checkbox_"/>' +
                                        '<label for="checkbox' + b + '"></label>' +
                                        '<input type="text" class="dx" name="substandardName" value="' + bb.list[i].bz_coll[j].zbz_coll[z].substandardName + '">' +
                                        '</div>'
                                }
                            }
                            var u = j + 1;
                            //标准
                            bz += '<div class="timuquyu">\n' +
                                '                    <div class="timu">\n' +
                                '                        <span>' + u + '</span>\n' +
                                '                        <span>\n' +
                                '                            <input type="text" name="standardName" class="rm" value="' + bb.list[i].bz_coll[j].standardName + '" readonly="readonly">\n' +
                                '                        </span>\n' +
                                '                    </div>\n' +
                                '                        <div class="zbz">\n' +
                                only +
                                '                        </div>\n' +
                                '                </div>'

                            layui.form.render("radio");


                        }

                        bc += ' <div class="renmingquyu">\n' +
                            '                    <div class="renming">\n' +
                            '                        <div class="shizi" style="padding: 0px;border-radius:50%" >\n' +
                            '                            <p style="margin: 0px;padding-left: 6px">\n' +
                            '                            <font color="red" >' + f + '</font>\n' +
                            '                        </p>\n' +
                            '                        </div>\n' +
                            '                        <div>\n' +
                            '                            <input type="text" class="rm" name="uname" value="' + bb.list[i].beice[g].yuland[h] + '" readonly="readonly">\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                    <div id="bz_coll">' +
                            bz +
                            '</div>' +
                            '</div>'
                    }

            }


                //子标题
                zbt+= '<div class="zibiaotifenquyu">\n' +
                    '                <div class="hr"></div>\n' +
                    '                <div class="subtitle">\n' +
                    '<div class="zibiaotifenquyu2">'+
                    '                    <div class="tup"><img src="../../../common/images/img6.jpg" alt="" style=""></div>\n' +
                    '                    <div class="sub">\n' +
                    '                        <input class="zbt" type="text"name="subtitleContent" value="'+bb.list[i].subtitleContent+'" readonly="readonly">\n' +
                    '                    </div>\n' +
                    '</div>'+
                    '                </div>'+
                    '<div class="renmingColl">'+
                    bc+
                    '                </div>'+
                '                </div>'
                 $('#zbt_coll').append(zbt);
                layui.form.render("radio");
            }



            form.render();//重新绘制表单，让修改生效
        // });

    }
    init();




});






