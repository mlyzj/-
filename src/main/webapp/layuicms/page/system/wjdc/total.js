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
                                "   <input id='item" + c + "' type='radio' name='option"+i+"' value='" + res.data.timus[i].option + "' class='radio_' disabled>" +
                                "   <label for='item" + c + "'></label>" +
                                "   <span style='margin-left: 10px'>" +
                                "       <input type='text' class='layui-input options' value='" + res.data.timus[i].xuanxiang[z].options + "' style='border:none;font-size: 20px' name='options' readonly='true'>" +
                                "   </span>" +
                                "   <div class='toupiaoNum' style='hight:50px;width: 100px'>"+
                                "       <input id='item" + c + "' type='text' name='option"+i+"' value='" +"该选项总投票数:"+ res.data.timus[i].xuanxiang[z].totalNum + "' class='radio_' style='border:none;width: 250px;color: red' name='options' readonly='true'>" +
                                "   </div>"+
                                "</div>"
                        } else {
                            rule +=
                                "<div class='male'>" +
                                "   <input id='item" + c + "' type='checkbox' name='option"+i+"' value='" + res.data.timus[i].option + "' class='checkbox_' disabled>" +
                                "   <label for='item" + c + "'></label>" +
                                "   <span style='margin-left: 10px'>" +
                                "       <input type='text' class='layui-input options' value='" + res.data.timus[i].xuanxiang[z].options + "' style='border:none;font-size: 20px' name='options' readonly='true'>" +
                                "   </span>" +
                                "   <div class='toupiaoNum' style='hight:50px; width: 100px'>"+
                                "      <input id='item" + c + "' type='text' name='option' value='" + "该选项总投票数:" + res.data.timus[i].xuanxiang[z].totalNum + "' class='checkbox_' style='border:none;width: 250px;color: red' name='options' readonly='true'>" +
                                "   </div>"+
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
                "               <span class='--mb--rich-text' style='font-family:SourceHanSansSC; font-weight:400; font-size:25px; color:rgb(16, 16, 16);line-height:27px;'>"+
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
            form.render();//重新绘制表单，让修改生效
        });
    }

    init();
});