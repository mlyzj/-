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

    //校验人数
    manNum();
    function manNum(){
        form.verify({
            manNum:[
                /^[0-9]*[1-9][0-9]*$/
                ,'请输入正整数'
            ]
        });
    }

    /**
     * 初始化页面
     * */
    var tid;
    function init() {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        tid = queryArgs['tid'];
        var req = {
            tid:tid
        };
        $api.GetForm(req,function (res) {
            var data = res.data;
            $("[name='title']").val(data.title);
            $("[name='explain']").val(data.explain);
            $("[name='manNum']").val(data.manNum);
            for (var i = 0 ; i < res.data.timus.length ; i++){
                var xx = '';
                for (var z = 0 ; z < res.data.timus[i].xuanxiang.length ; z++) {
                    xx +=
                        "            <div class=\"layui-form-item cc\">\n" +
                        "               <label class=\"layui-form-label\">选项"+(z+1)+"：</label>\n" +
                        "               <div class=\"layui-input-block\">\n" +
                        "                   <input type=\"text\" style=\"width: 70%;\" class=\"layui-input options\" value='" + res.data.timus[i].xuanxiang[z].options + "' name=\"options\" lay-verify=\"required\" placeholder=\"请输入\">\n" +
                        "               </div>\n" +
                        "           </div>\n"
                }
                var rule = '';
                if(res.data.timus[i].option=="单选"){
                    rule =
                    "<div class=\"layui-form-item\">\n" +
                    "<label class=\"layui-form-label\">选项规则：</label>\n" +
                    "<div class=\"layui-input-block\">\n" +
                    '    <input type="radio" class="layui-input option" name="option'+ i +'"'+ 'value="单选" title="单选" checked="checked">' +
                    "    <div class=\"layui-unselect layui-form-radio\">\n" +
                    "        <i class=\"layui-anim layui-icon\"></i>\n" +
                    "        <span>单选</span>\n" +
                    "    </div>\n" +
                    '    <input type="radio" class="layui-input option" name="option'+ i +'"'+ 'value="多选" title="多选">' +
                    "    <div class=\"layui-unselect layui-form-radio layui-form-radioed\">\n" +
                    "        <i class=\"layui-anim layui-icon\"></i>\n" +
                    "        <span>多选</span>\n" +
                    "    </div>\n"+
                    "</div>\n"+
                    "</div>\n"
                }else {
                    rule =
                        "<div class=\"layui-form-item\">\n" +
                        "<label class=\"layui-form-label\">选项规则：</label>\n" +
                        "<div class=\"layui-input-block\">\n" +
                        '    <input type="radio" class="layui-input option" name="option'+ i +'"'+ 'value="单选" title="单选">' +
                        "    <div class=\"layui-unselect layui-form-radio\">\n" +
                        "        <i class=\"layui-anim layui-icon\"></i>\n" +
                        "        <span>单选</span>\n" +
                        "    </div>\n" +
                        '    <input type="radio" class="layui-input option" name="option'+ i +'"'+ 'value="多选" title="多选" checked="checked">' +
                        "    <div class=\"layui-unselect layui-form-radio layui-form-radioed\">\n" +
                        "        <i class=\"layui-anim layui-icon\"></i>\n" +
                        "        <span>多选</span>\n" +
                        "    </div>\n"+
                        "</div>\n"+
                        "</div>\n"
                }
                var timu=
                "   <div class=\"title2\">" +
                "       <div class=\"layui-form-item\">\n" +
                "            <label class=\"layui-form-label\">题目"+(i+1)+"：</label>\n" +
                "            <div class=\"layui-input-block\">\n" +
                "                <input type='text' class='layui-input question' name='question' value='"+res.data.timus[i].question+"' lay-verify='required' placeholder='请输入题目'>\n" +
                "            </div>\n" +
                "       </div>\n" +
                 rule +
                "       <div class='gg'>"+
                xx +
                "  </div>\n"+
                "  <button type=\"button\" style=\"float: right\" onclick=\"on1($(this))\" class=\"layui-btn layui-btn-primary\">新增选项</button>"+
                "  </div>\n";
                $('.title1').append(timu);
            }
            layui.form.render("radio");
            form.render();//重新绘制表单，让修改生效
        });
    }
    init();

    /**
     * 更新(保存)模板
     * */
    form.on("submit(templateUpdate)", function (data) {
        var title = data.field.title;
        layer.prompt({title: '请输入模板标题',value:title,formType: 0}, function(templateTitle, index){
            var templateTitle = templateTitle;
            var explain = data.field.explain;
            var manNum = data.field.manNum;
            var timus = [];
            //题目
            var aa = $(".question").length;
            for (var num = 0 ; num < aa ; num++ ) {
                var question = $($(".question")[num]).val();
                var option = $($('input:radio:checked')[num]).val();
                //选项
                var xuanxiang = [];
                var cc = $($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc").length;
                for (var num2 = 0 ; num2 < cc ; num2++) {
                    var options = {
                        options: $($($($($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc")).children(".layui-input-block")).children(".options")[num2]).val()
                    };
                    xuanxiang.push(options);
                }
                var timu = {
                    question: question,
                    option: option,
                    xuanxiang: xuanxiang
                };
                timus.push(timu);

            }
            var req = {
                title:title,
                explain:explain,
                manNum:manNum,
                timus:timus,
                templateTitle:templateTitle
            };
            //存为模板
            $api.templateUpdate(req,function (data) {
                layer.msg("保存成功！",{time:1000},function () {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });
            });
        });
        return false;
    })
    var tid;
    //发布模板
    form.on("submit(wjdcAdd_btn)", function (data) {
        var title = data.field.title;
        var explain = data.field.explain;
        var manNum = data.field.manNum;
        var timus = [];
        //题目
        var aa = $(".question").length;
        for (var num = 0 ; num < aa ; num++ ) {
            var question = $($(".question")[num]).val();
            var option = $($('input:radio:checked')[num]).val();
            //选项
            var xuanxiang = [];
            var cc = $($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc").length;
            for (var num2 = 0 ; num2 < cc ; num2++) {
                var options = {
                    options: $($($($($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc")).children(".layui-input-block")).children(".options")[num2]).val()
                };
                xuanxiang.push(options);
            }
            var timu = {
                question: question,
                option: option,
                xuanxiang: xuanxiang
            };
            timus.push(timu);
        }
        //生成8位随机序列号
        var accounts = [];
        for (var z = 0; z < manNum; z++){
            var account = "";
            var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            for (var i = 0; i < 8; i++) {
                var r = parseInt(Math.random() * 61);
                account += data[r];
            }
            accounts.push(account);
        }
        var ac = {
            accounts:accounts
        };
        var acc = JSON.stringify(ac);//在js中把对象转为JSON字符串的语法
        window.sessionStorage.setItem("acc", acc);//存入域，把序列号传给显示序列号的页面
        var req = {
            title:title,
            explain:explain,
            manNum:manNum,
            timus:timus,
            accounts:accounts
        };
        //弹出loading(遮罩层已经统一放在了ajaxExtention里面了)
        //var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        $api.AddWjdc(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("发布成功！", {time: 1000}, function () {
                var index = layui.layer.open({
                    title: "发布成功",
                    type: 2,
                    content: "accountTem.html",
                    success: function (layero, index) {
                        setTimeout(function () {
                            layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                                tips: 3
                            });
                        }, 500)
                    }
                });
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function () {
                    layui.layer.full(index);
                });
                layui.layer.full(index);
                // layer.closeAll("iframe");
                // //刷新父页面
                // parent.location.reload();
            });
        });
        return false;
    })
    //预览
    form.on("submit(preview)", function (data) {
        var title = data.field.title;
        var explain = data.field.explain;
        var manNum = data.field.manNum;
        var timus = [];
        //题目
        var aa = $(".question").length;
        for (var num = 0 ; num < aa ; num++ ) {
            var question = $($(".question")[num]).val();
            var option = $($('input:radio:checked')[num]).val();
            //选项
            var xuanxiang = [];
            var cc = $($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc").length;
            for (var num2 = 0 ; num2 < cc ; num2++) {
                var options = {
                    options: $($($($($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc")).children(".layui-input-block")).children(".options")[num2]).val()
                };
                xuanxiang.push(options);
            }
            var timu = {
                question: question,
                option: option,
                xuanxiang: xuanxiang
            };
            timus.push(timu);
        }
        var req = {
            title:title,
            explain:explain,
            manNum:manNum,
            timus:timus
        };
        var x = JSON.stringify(req);//在js中把对象转为JSON字符串的语法
        window.sessionStorage.setItem("x", x);
        var index = layui.layer.open({
            title: "预览",
            type: 2,
            content: "preview.html",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        });
        layui.layer.full(index);//这个必须有，否则页面会缩小，且无数据
        return false;
    })

    //存为模板
    form.on("submit(templateAdd)", function (data) {
        var title = data.field.title;
        layer.prompt({title: '请输入模板标题',value:title,formType: 0}, function(templateTitle, index){
            var templateTitle = templateTitle;
            var explain = data.field.explain;
            var manNum = data.field.manNum;
            var timus = [];
            //题目
            var aa = $(".question").length;
            for (var num = 0 ; num < aa ; num++ ) {
                var question = $($(".question")[num]).val();
                var option = $($('input:radio:checked')[num]).val();
                //选项
                var xuanxiang = [];
                var cc = $($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc").length;
                for (var num2 = 0 ; num2 < cc ; num2++) {
                    var options = {
                        options: $($($($($($($($(".question")[num]).parent(".layui-input-block")).parent(".layui-form-item")).siblings(".gg")).children(".cc")).children(".layui-input-block")).children(".options")[num2]).val()
                    };
                    xuanxiang.push(options);
                }
                var timu = {
                    question: question,
                    option: option,
                    xuanxiang: xuanxiang
                };
                timus.push(timu);

            }
            var req = {
                title:title,
                explain:explain,
                manNum:manNum,
                timus:timus,
                templateTitle:templateTitle
            };
            //存为模板
            $api.AddTemplateTitle(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
                //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
                layer.msg("成功存为模板！", {time: 1000}, function () {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });
            });
        });
        return false;
    })
});


