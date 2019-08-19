layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention: 'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool: 'tool',
    $api:'api'
}).use(['form', 'layer', 'tree','$api', 'jquery', 'ajaxExtention', '$tool'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        $tool = layui.$tool,
        $api = layui.$api;

    /**
     * 页面初始化
     * */


    /**
     * 绘制树
     * @param id dom id
     * @param nodes 树节点数据
     * */

    /**
     * 加载角色列表
     * */



    /**
     * 表单提交
     * */
    form.on("submit(addUser)", function (data) {
        var sname = data.field.sname;
        var sex = data.field.sex;
        var clazz = data.field.clazz;
        var password = data.field.password;



        //请求
        var req = {
            sname: sname,
            sex: sex,
            clazz: clazz,
            password: password,

        };

        $api.Addstudent(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("用户添加成功！", {time: 1000}, function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });

        return false;
    })

});


