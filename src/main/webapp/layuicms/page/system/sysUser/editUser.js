layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention: 'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool: 'tool',
    $api:'api'
}).use(['form', 'layer','$api', 'tree', 'jquery', 'ajaxExtention', '$tool'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        $tool = layui.$tool,
        $api = layui.$api;


    function init() {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var sid = queryArgs['sid'];

        var req = {
            sid:sid
        };

        $api.Getstudent(req,function (res) {
            var data = res.data;
            $("[name='sname']").val(data.sname);
            $("[name='sex']").val(data.sex);
            $("[name='clazz']").val(data.clazz);
            $("[name='password']").val(data.password);

            form.render();//重新绘制表单，让修改生效
        });
    }
    init();
    /**
     * 表单提交
     * */
    form.on("submit(editUser)", function (data) {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var sid = queryArgs['sid'];
        var sname = data.field.sname;
        var sex = data.field.sex;
        var clazz = data.field.clazz;
        var password = data.field.password;




        //请求
        var req = {
            sid:sid,
            sname: sname,
            sex: sex,
            clazz: clazz,
            password: password
        };

        $api.Updatestudent(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("用户更新成功！", {time: 1000}, function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });

        return false;
    })

});


