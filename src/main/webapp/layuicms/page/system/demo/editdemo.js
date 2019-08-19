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
        var recordId = queryArgs['recordId'];
        var bigTitleId = queryArgs['bigTitleId'];
        var releaseDate = queryArgs['releaseDate'];
        var id = queryArgs['id']

        var req = {
            recordId:recordId,
            bigTitleId:bigTitleId,
            releaseDate:releaseDate,
            id:id
        };

        $api.Getdemo(req,function (res) {
            var data = res.data;
            $("[name='recordId']").val(data.recordId);
            $("[name='bigTitleId']").val(data.bigTitleId);
            $("[name='releaseDate']").val(data.releaseDate);
            $("[name='id']").val(data.id);

            if('1' === data.recordId){
                var c=document.editdemoForm.recordId;
                c.checked = true;
            }
            form.render();//重新绘制表单，让修改生效
        });
    }
    init();


    /**
     * 表单提交
     * */
    form.on("submit(editdemo)", function (data) {
        var recordId = data.field.recordId;
        var bigTitleId = data.field.bigTitleId;
        var releaseDate = data.field.releaseDate;
        var id = data.field.id


        var queryArgs = $tool.getQueryParam();//获取查询参数

        //请求
        var req = {
            recordId:queryArgs['recordId'],
            bigTitleId:bigTitleId,
            releaseDate:releaseDate,
            id:id
        };

        $api.Updatedemo(req,function (data) {
            layer.msg("修改成功！",{time:1000},function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });

        return false;
    })

});


