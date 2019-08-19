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
    function init() {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var templateId = queryArgs['templateId'];


        var req = {
            templateId:templateId,

        };
        $api.Gettemp(req,function (res) {
            var data = res.data;
            console.log(data);
            $("[name='bigTitle']").val(data.bigTitle);
            $("[name='explain']").val(data.explain);

            for(var i=0;i<data.list.length;i++){
                var zbt='';

                var bc='';

                for(var g = 0;g<data.list[i].beice.length;g++){
                    var  f= g+1
                    var bz='';
                    for(var j=0;j<data.list[i].bz_coll.length;j++){
                        var  a=1;
                        var only='';
                        //子标准
                        for(var z=0;z<data.list[i].bz_coll[j].zbz_coll.length;z++){
                            // alert(res.data.list[i].bz_coll[j].zbz_coll[z].substandardName);
                            var b= a++;
                            if(res.data.list[i].bz_coll[j].id===78){
                                only+=  '<div class="xuanxian">'+
                                    '<input id="item'+b+'" type="radio" title="'+res.data.list[i].bz_coll[j].zbz_coll[z].substandardName+'" name="item'+g+'" value="'+res.data.list[i].bz_coll[j].id+'" class="radio_">'+
                                    '<label for="item'+b+'"></label>'+
                                    '</div>'
                            }else{
                                only+= '<div class="xuanxian">'+
                                    '<input type="checkbox" id="checkbox'+b+'" class="checkbox_"/>'+
                                    '<label for="checkbox'+b+'"></label>'+
                                    '<input type="text" class="dx" name="substandardName" value="'+res.data.list[i].bz_coll[j].zbz_coll[z].substandardName+'" readonly="readonly">'+
                                    '</div>'
                            }
                        }
                        var u = j+1;
                        //标准
                        bz+='<div class="timuquyu">\n' +
                            '                    <div class="timu">\n' +
                            '                        <span>'+u+'</span>\n' +
                            '                        <span>\n' +
                            '                            <input type="text" name="standardName" class="rm" value="'+res.data.list[i].bz_coll[j].standardName+'" readonly="readonly" >\n' +
                            '                        </span>\n' +
                            '                    </div>\n' +
                            '                        <div class="zbz">\n' +
                                                    only+
                            '                        </div>\n' +
                            '                </div>'

                        layui.form.render("radio");


                    }

                    bc+=  ' <div class="renmingquyu">\n' +
                        '                    <div class="renming">\n' +
                        '                        <div class="shizi" style="padding: 0px;border-radius:50%" >\n' +
                        '                            <p style="margin: 0px;padding-left: 6px">\n' +
                        '                            <font color="red" >'+f+'</font>\n' +
                        '                        </p>\n' +
                        '                        </div>\n' +
                        '                        <div>\n' +
                        '                            <input type="text" class="rm" name="uname" value="'+res.data.list[i].beice[g].tpphotoUser.uname+'" readonly="readonly">\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                    <div id="bz_coll">' +
                                        bz +
                        '</div>'
                    '</div>'
                }



                //子标题
                zbt+= '<div class="zibiaotifenquyu">\n' +
                    '                <div class="hr"></div>\n' +
                    '                <div class="subtitle">\n' +
                    '<div class="zibiaotifenquyu2">'+
                    '                    <div class="tup"><img src="../../../common/images/img6.jpg" alt="" style=""></div>\n' +
                    '                    <div class="sub">\n' +
                    '                        <input class="zbt" type="text"name="subtitleContent" value="'+res.data.list[i].subtitleContent+'" readonly="readonly">\n' +
                    '                    </div>\n' +
                    '</div>'+
                    '                </div>'+
                    '<div class="renmingColl">'+
                    bc+
                    '                </div>'+
                '                </div>';

                 $('#zbt_coll').append(zbt);
                layui.form.render("radio");
            }



            form.render();//重新绘制表单，让修改生效
        });
    }
    init();



});






