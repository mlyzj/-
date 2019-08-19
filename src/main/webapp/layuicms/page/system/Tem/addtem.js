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




    /**
     * 表单提交
     * */
    form.on("submit(addtem)", function (data) {
        var bigTitle = data.field.bigTitle;
        var explain = data.field.explain;
        var number = data.field.number;
        //实体类中无templateTitleId所以需要添加
        layer.prompt({title: '请输入模板标题',value:bigTitle,formType: 0}, function(templateTitleId, index){
            var templateTitleId=templateTitleId;


            //弹出loading(遮罩层已经统一放在了ajaxExtention里面了)
            //var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

            // //请求
            // var req = {
            //     recordId:recordId,
            //     bigTitleId:bigTitleId,
            //     releaseDate:releaseDate,
            //     id:id
            // };

            var a = $("#zbt_coll").children();
            var zbt_coll = [];
            for (var i = 0; i < a.length; i++) {
                //子标题
                var subtitleContent = $($($($(a[i]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
                var e = $($(a[i]).children("#bz_collection")).children();

                var t = $($(a[i]).children("#beice")).children();//获取uid
                var beice = [];//获取uid数组
                for(var g = 0;g<t.length;g++){
                    var uid = $($($(t[g]).children(".layui-input-block")[0]).children("input")[1]).val();
                    beice.push({uid:uid});

                }

                var bz_coll = [];//标准数组
                for (var j = 0; j < e.length; j++) {
                    //标准
                    var standardName = $($($($(e[j]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
                    //选项
                    var id = $($($($(e[j]).children(".layui-form-item")[1]).children(".layui-input-block")[0]).children("input")[0]).is(":checked");
                    var only;
                    if (id) {
                        only = 78;
                    } else {
                        only = 79;
                    }
                    //子标准
                    var f = $(e[j]).children("#zbz").children();
                    var zbz_coll = [];//子标准数组
                    for (var k = 0; k < f.length; k++) {
                        var substandardName = $($($(f[k]).children(".layui-input-block")[0]).children("input")[0]).val();
                        zbz_coll.push({substandardName:substandardName});//获取子标准数据推入子标准数组中，由内到外
                    }
                    //获取标准底下数据放入bz_coll下
                    var bz_obj = {standardName: standardName, id: only, zbz_coll: zbz_coll};//对象
                    bz_coll.push(bz_obj);
                }
                //获取子标题底下数据放入zbt_coll下
                var zbt_obj = {subtitleContent: subtitleContent, bz_coll: bz_coll, beice:beice,};
                zbt_coll.push(zbt_obj);
            }
            var data = {templateTitleId:templateTitleId, bigTitle:bigTitle, explain: explain, number: number, list:zbt_coll};



            $api.Addtemp(JSON.stringify(data),{contentType:"application/json;charset=UTF-8"},function (data) {
                //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
                layer.msg("保存成功！",{time:1000},function () {
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                });
            });

        });


        return false;
    })
    /**
     * 表单提交
     * */
    form.on("submit(yulan)", function (data) {
        var bigTitle = data.field.bigTitle;
        var explain = data.field.explain;
        var number = data.field.number;
        //实体类中无templateTitleId所以需要添加
        // layer.prompt({title: '请输入模板标题',value:bigTitle,formType: 0}, function(templateTitleId, index){
        //     var templateTitleId=templateTitleId;


            //弹出loading(遮罩层已经统一放在了ajaxExtention里面了)
            //var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});

            // //请求
            // var req = {
            //     recordId:recordId,
            //     bigTitleId:bigTitleId,
            //     releaseDate:releaseDate,
            //     id:id
            // };

            var a = $("#zbt_coll").children();
            var zbt_coll = [];
            for (var i = 0; i < a.length; i++) {
                //子标题
                var subtitleContent = $($($($(a[i]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
                var e = $($(a[i]).children("#bz_collection")).children();

                var t = $($(a[i]).children("#beice")).children();//获取uid
                var beice = [];//获取uid数组

                for(var g = 0;g<t.length;g++){
                    var uname = $($($(t[g]).children(".layui-input-block")[0]).children("input")[0]).val();
                    var yuland = [];
                    yuland = uname.split(",")

                    beice.push({yuland:yuland});
                    alert(yuland);
                }

                var bz_coll = [];//标准数组
                for (var j = 0; j < e.length; j++) {
                    //标准
                    var standardName = $($($($(e[j]).children(".layui-form-item")[0]).children(".layui-input-block")[0]).children("input")[0]).val();
                    //选项
                    var id = $($($($(e[j]).children(".layui-form-item")[1]).children(".layui-input-block")[0]).children("input")[0]).is(":checked");
                    var only;
                    if (id) {
                        only = 78;
                    } else {
                        only = 79;
                    }
                    //子标准
                    var f = $(e[j]).children("#zbz").children();
                    var zbz_coll = [];//子标准数组
                    for (var k = 0; k < f.length; k++) {
                        var substandardName = $($($(f[k]).children(".layui-input-block")[0]).children("input")[0]).val();
                        zbz_coll.push({substandardName:substandardName});//获取子标准数据推入子标准数组中，由内到外
                    }
                    //获取标准底下数据放入bz_coll下
                    var bz_obj = {standardName: standardName, id: only, zbz_coll: zbz_coll};//对象
                    bz_coll.push(bz_obj);
                }
                //获取子标题底下数据放入zbt_coll下
                var zbt_obj = {subtitleContent: subtitleContent, bz_coll: bz_coll, beice:beice,};
                zbt_coll.push(zbt_obj);
            }
            var data = { bigTitle:bigTitle, explain: explain, number: number, list:zbt_coll};
            alert(JSON.stringify(data));//转成json对象

        var yulan = JSON.stringify(data);

        window.sessionStorage.setItem("yulan", yulan);
        // layer.msg('您输入模板标题为：'+ templateTitle );

        var index = layui.layer.open({
            title: "预览",
            type: 2,
            content: "mzbcyl.html",
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
        // });
        return false;
    })

});



function  openAdduser(target) {
    console.log(target.next().attr('id'));
    layer.open({
        type: 2,
        title:"添加被测人员",
        id:"link",
        area: ['75%', '80%'],
        fixed: false, //不固定
        maxmin: true,
        content: 'addUnametem.html?uidname='+target.attr('id')

    })
}


