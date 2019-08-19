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
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var qid = queryArgs['qid'];
        var req = {
            qid:qid
        };
        $api.GetForm2(req,function (res) {
            var data = res.data;
            $("[name='title']").val(data.title);
            $("[name='explain']").val(data.explain);
            var b = 1;//定义变量=1，让变量进入一下循环后自增
            for (var i = 0 ; i < res.data.timus.length ; i++){
                var rule = '';
                    for (var z = 0 ; z < res.data.timus[i].xuanxiang.length ; z++) {
                        var c = b++;//定义自增变量，让radio或checkbox的id不重复
                        if (res.data.timus[i].option == "单选") {
                            rule +=
                                "<div class='male'>" +
                                "   <input id='item" + c + "' type='radio' name='option"+i+"' value='" + res.data.timus[i].xuanxiang[z].oid + "' class='radio_'>" +
                                "   <label for='item" + c + "'></label>" +
                                "   <span style='margin-left: 10px'>" +
                                "       <input type='text' class='layui-input options' value='" + res.data.timus[i].xuanxiang[z].options + "' style='border:none;' name='options' readonly='true'>" +
                                "   </span>" +
                                "</div>"
                        } else {
                            rule +=
                                "<div class='male'>" +
                                "   <input id='item" + c + "' type='checkbox' name='option' value='" + res.data.timus[i].xuanxiang[z].oid + "' class='checkbox_'>" +
                                "   <label for='item" + c + "'></label>" +
                                "   <span style='margin-left: 10px'>" +
                                "       <input type='text' class='layui-input options' value='" + res.data.timus[i].xuanxiang[z].options + "' style='border:none;' name='options' readonly='true'>" +
                                "   </span>" +
                                "</div>"
                        }
                    }

                var timu=
                "   <div class=\"title2\">" +
                "       <div class='xx' style='padding-top: 30px;width: 40px;padding-left:50px'>"+
                "           <div class='widget circle_rect hcenter vmiddle' style='border-radius: 50%; width: 30px; height: 30px; left: 280px; top: 452px; background-color: rgb(43, 117, 242); font-size: 18px; text-align: center; line-height: 26px;'>"+
                "               <div class='text' style='padding-top:0px;'>"+
                "                   <p><font color='#ffffff' style='line-height: 30px'>"+(i+1)+"</font></p>"+
                "               </div>"+
                "               <div class='region gesture'></div>"+
                "           </div>"+
                "       </div>"+
                "       <div class='rich-text ss'>"+
                "           <p style='line-height:0; margin-bottom:5px;'>"+
                "               <span class='--mb--rich-text' style='font-family:SourceHanSansSC; font-weight:400; font-size:18px; color:rgb(16, 16, 16);line-height:27px;'>"+
                            <!--题目-->
                "                   <input type='text' class='layui-input question' value='"+res.data.timus[i].question+"' style='border:none;' name='question' readonly='true'>"+
                "               </span>"+
                "           </p>"+
                "       </div>"+
                "       <div class='aa'>"+
                rule +
                "       </div>\n"+
                "  </div>\n";
                $('.timu').append(timu);
            }
            var uu = "<div style='height: 50px;background-color:#ffffff'></div>"
            $(".title2").after(uu);//所有题目最后结尾预留一个空白区域
            layui.form.render("radio");
            form.render();//重新绘制表单，让修改生效
        });
        //
        var s = queryArgs['status'];
        var status=decodeURI(s);//将已编码的字符串进行解码
        if (status=="发布中") {
            var oo = "<button class='layui-btn layui-btn-normal' style=\"width: 100px\" lay-submit='' lay-filter='previewSubmit_btn'>提交</button>"
            $(".submitBtn").append(oo);
        }else {
            var ii = "<div style=\"height: 50px\"></div>";
            $(".submitBtn").append(ii);
        }
    }
    init();

    //提交统计
    form.on("submit(previewSubmit_btn)", function (data) {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var qid = queryArgs['qid'];
        //获取被选中的oid
        var obj = document.getElementsByClassName("checkbox_");
        var oids = [];
        for (var k in obj){
            if (obj[k].checked){
                oids.push(obj[k].value);
            }
        }
        var obj1 = document.getElementsByClassName("radio_");
        for (var k in obj1){
            if (obj1[k].checked){
                oids.push(obj1[k].value);
            }
        }
        // 获取history传过来的账号
        var con = window.sessionStorage.getItem("con");//在另一个页面的js中接收(获取)域中的对象
        var content = JSON.parse(con);//将域中取出的JSON字符串转化为对象
        var req = {
            qid:qid,
            oids:oids,
            content:content
        };
        //弹出loading(遮罩层已经统一放在了ajaxExtention里面了)
        //var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        $api.AddTotal(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("提交成功！", {time: 1000}, function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });
        return false;
    })

});