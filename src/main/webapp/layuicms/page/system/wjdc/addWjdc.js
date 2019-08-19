layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention:'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool:'tool',
    $api:'api'
}).use(['form', 'layer', 'jquery','ajaxExtention','$tool','$api'], function () {
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
     * 表单提交
     * */
    form.on("submit(addRole)", function (data) {
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
        var ac = JSON.stringify(ac);//在js中把对象转为JSON字符串的语法
        window.sessionStorage.setItem("ac", ac);//传给account.js
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
                    content: "account.html",
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
                //刷新父页面
                // parent.location.reload();
            });
        });
        return false;
    })

    //存为模板
    form.on("submit(templateAdd_btn)", function (data) {
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
        var ss = JSON.stringify(req);//在js中把对象转为JSON字符串的语法
        window.sessionStorage.setItem("ss", ss);
        var index = layui.layer.open({
            title: "预览",
            type: 2,
            content: "previewAdd.html",
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

});


