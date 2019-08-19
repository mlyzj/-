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
        var ss = window.sessionStorage.getItem("x");
        var nn = JSON.parse(ss);//将域中取出的JSON字符串转化为对象
        $("[name='title']").val(nn.title);
        $("[name='explain']").val(nn.explain);
        var b = 1;//定义变量=1，让变量进入一下循环后自增
        for (var i = 0 ; i < nn.timus.length ; i++){
            var rule = '';
                for (var z = 0 ; z < nn.timus[i].xuanxiang.length ; z++) {
                    var c = b++;//定义自增变量，让radio或checkbox的id不重复
                    if (nn.timus[i].option == "单选") {
                        rule +=
                            "<div class='male'>" +
                            "   <input id='item" + c + "' type='radio' name='option"+i+"' value='" + nn.timus[i].option + "' class='radio_'>" +
                            "   <label for='item" + c + "'></label>" +
                            "   <span style='margin-left: 10px'>" +
                            "       <input type='text' class='layui-input options' value='" + nn.timus[i].xuanxiang[z].options + "' style='border:none;' name='options' readonly='true'>" +
                            "   </span>" +
                            "</div>"
                    } else {
                        rule +=
                            "<div class='male'>" +
                            "   <input id='item" + c + "' type='checkbox' name='option' value='" + nn.timus[i].option + "' class='checkbox_'>" +
                            "   <label for='item" + c + "'></label>" +
                            "   <span style='margin-left: 10px'>" +
                            "       <input type='text' class='layui-input options' value='" + nn.timus[i].xuanxiang[z].options + "' style='border:none;' name='options' readonly='true'>" +
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
            "                   <input type='text' class='layui-input question' value='"+nn.timus[i].question+"' style='border:none;' name='question' readonly='true'>"+
            "               </span>"+
            "           </p>"+
            "       </div>"+
            "       <div class='aa'>"+
            rule +
            "       </div>\n"+
            "  </div>\n";
            $('.timu').append(timu);
        }
        var uu =
            "<div class='uu' style='height: 50px;background-color:#ffffff'>" +
            "</div>"
        $(".title2").after(uu);//所有题目最后结尾预留一个空白区域
        layui.form.render("radio");
        form.render();//重新绘制表单，让修改生效
    }
    init();

});