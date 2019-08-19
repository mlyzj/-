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
var index=0;
    var a = 1;
    function init() {

        var queryArgs = $tool.getQueryParam();//获取查询参数
        var recordId = queryArgs['recordId'];
        var req = {
            recordId:recordId,
        };

            $api.Getchakan(req, function (res) {
                var data = res.data;
                console.log(data);

                $("[name='bigTitle']").val(data.bigTitle);
                $("[name='explain']").val(data.explain);

                for (var i = 0; i < data.list.length; i++) {
                    var zbt = '';

                    var bc = '';

                    for (var g = 0; g < data.list[i].beice.length; g++) {
                        var f = g + 1
                        var bz = '';

                        for (var j = 0; j < data.list[i].beice[g].bz_coll.length; j++) {

                            var only = '';
                            //子标准
                            a++;
                            for (var z = 0; z < data.list[i].beice[g].bz_coll[j].zbz_coll.length; z++) {
                                //判断单选or多选
                                if (res.data.list[i].bz_coll[j].id === 78) {

                                    only += '<div class="xuanxian">' +
                                        '<input id="item0" type="radio" title="' + res.data.list[i].beice[g].bz_coll[j].zbz_coll[z].substandardName + '" name="item' + a + '" value="' + data.list[i].bz_coll[j].zbz_coll[z].substandardId + '" class="radio_">' +
                                        '<label for="item0"></label>' +

                                        "   <span style='margin-left: 10px'>" +
                                        "       <input type='text' class='sum' value='" +"已选人数:" + res.data.list[i].beice[g].bz_coll[j].zbz_coll[z].sum + "' style='border:none;' name='sum' readonly='true'>" +
                                        "   </span>" +
                                        '</div>'
                                } else {
                                    only += '<div class="xuanxian">' +
                                        '<input type="checkbox" id="checkbox' + a + '" value="' + data.list[i].beice[g].bz_coll[j].zbz_coll[z].substandardId + '" class="checkbox_"/>' +
                                        '<label for="checkbox' + a + '"></label>' +
                                        '<input type="text" class="dx" name="substandardName" value="' + res.data.list[i].bz_coll[j].beice[g].zbz_coll[z].substandardName + '">' +
                                        '<div >'+
                                        "   <span style='margin-left: 10px'>" +
                                        "       <input type='text' class='sum' value='" +"已选人数:" + res.data.list[i].bz_coll[j].beice[g].zbz_coll[z].sum + "' style='border:none;' name='sum' readonly='true'>" +
                                        "   </span>" +
                                        '</div>'+
                                        '</div>'
                                }
                            }
                            var u = j + 1;
                            //标准
                            bz += '<div class="timuquyu">\n' +
                                '                    <div class="timu">\n' +
                                '                        <span>' + u + '</span>\n' +
                                '                        <span>\n' +
                                '                            <input type="text" name="standardName" class="rm" value="' + res.data.list[i].beice[g].bz_coll[j].standardName + '" >\n' +
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
                            '                        <div class="beic">\n' +
                            '                            <input type="text" id="' + res.data.list[i].beice[g].uid + '" class="rm" name="uname" value="' + res.data.list[i].beice[g].tpphotoUser.uname + '">\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                    <div id="bz_coll">' +
                            bz +
                            '</div>' +
                            '</div>'

                    }

                    //子标题
                    zbt += '<div class="zibiaotifenquyu">\n' +
                        '                <div class="hr"></div>\n' +
                        '                <div class="subtitle">\n' +
                        '<div class="zibiaotifenquyu2">' +
                        '                    <div class="tup"><img src="../../../common/images/img6.jpg" alt="" style=""></div>\n' +
                        '                    <div class="sub">\n' +
                        '                        <input id="' + res.data.list[i].subtitleId + '" class="zbt" type="text"name="subtitleContent" value="' + res.data.list[i].subtitleContent + '">\n' +
                        '                    </div>\n' +
                        '</div>' +
                        '                </div>' +
                        '<div class="renmingColl">' +
                        bc +
                        '                </div>' +
                        '                </div>';

                    $('#zbt_coll').append(zbt);
                    layui.form.render("radio");
                }

                form.render();//重新绘制表单，让修改生

            })


    }


    init();
    form.on("submit(tijiao)", function (data) {
        var a =$($($(".zibiaotiquyu")[0]).children("#zbt_coll")[0]).children(".zibiaotifenquyu")
        var updataColl = [];
        for(var i = 0;i<a.length;i++){
            var subtitleId = $($($($($(a[i]).children(".subtitle")[0]).children(".zibiaotifenquyu2")[0]).children(".sub")[0]).children("input")[0]).attr("id");

            var b = $($(a[i]).children(".renmingColl")[0]).children(".renmingquyu");
            for(var z = 0;z<b.length;z++){
                var uid = $($($($(b[z]).children(".renming")[0]).children(".beic")[0]).children("input")[0]).attr("id");


                var Obj =$(b[z]).find('.radio_');
                var checkVal = null;
                for(g = 0; g < Obj.length; g++){
                    if(Obj[g].checked){
                        checkVal = Obj[i].value;
                        updata = {substandardId:checkVal,uid:uid,subtitleId:subtitleId};
                        updataColl.push(updata);
                    }
                }

                obj = $(b[z]).find('.checkbox_');
                for(k = 0; k < obj.length; k++) {
                    if (obj[k].checked) {

                        //zbz_coll.push(obj[k].value);
                        updata = {substandardId: obj[k].value, uid: uid, subtitleId: subtitleId};
                        updataColl.push(updata);
                    }
                }
            }
        }

        $api.TijiaoDemo(JSON.stringify(updataColl),{contentType:"application/json;charset=UTF-8"},function (updata) {
                //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
                layer.msg("提交成功！",{time:1000},function () {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });
        });

        return false;
    })



});






