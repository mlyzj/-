layui.config({
    base: $config.resUrl+'layuicms/common/js/'//定义基目录
}).extend({
    ajaxExtention: 'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool: 'tool',
    $api:'api'
}).use(['form', 'layer','$api', 'jquery', 'table', 'laypage','laytpl', 'ajaxExtention', '$tool'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        laypage = layui.laypage,
        $tool = layui.$tool,
        table = layui.table,
        $api = layui.$api;

    var tableIns;//表格实例
    /**
     * 定义表格
     * */
    function defineTable() {
        tableIns = table.render({
            elem: '#role-data'
            , height: 415
            , url: $tool.getContext()+'wjdc/findAll2List.do' //数据接口
            , method: 'post'
            , page:true
            , limit:5
            , limits:[5,6,7,8,9,10]
            , cols: [[ //表头
                  {type:'numbers',title:'序号',fixed: 'left'},
                  {field: 'history', title: '历史记录', width: '25%'}
                , {field: 'startTime', title: '发布时间', width: '25%'}
                , {field: 'status', title: '状态', width: '25%' ,toolbar:'#wordsColor'}
                , {fixed: 'right', title: '操作', width: 180, align: 'left',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            //, done: function () {
            //    qid = $("[data-field='qid']").val();
           // }
            , done: function (res, curr) {//请求完毕后的回调
                //如果是异步请求数据方式，res即为你接口返回的信息.curr：当前页码
            }
        });
        var qid;
        //为toolbar添加事件响应
        table.on('tool(roleFilter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var row = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象

            //区分事件
            if (layEvent === 'del') { //删除
                delRole(row.qid);
            } else if (layEvent === 'edit') { //编辑
                editRole(row.qid);
            }else if (layEvent === 'look') { //预览
                preview(row.qid,row.status);
            }else if (layEvent === 'total') { //预览
                total(row.qid);
            }
        });
    }
    defineTable();


    //添加角色
    $(".usersAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "创建空白问卷调查",
            type: 2,
            content: "addWjdc.html",
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
    });
    //删除
    function delRole(qid){
        layer.confirm('确认删除吗？', function (confirmIndex) {
            layer.close(confirmIndex);//关闭confirm
            //向服务端发送删除指令
            var req = {
                qid: qid
            };
            $api.DeleteWJDC(req,function (data) {
                layer.msg("删除成功",{time:1000},function(){
                    //obj.del(); //删除对应行（tr）的DOM结构
                    //重新加载表格
                    tableIns.reload();
                });
            });
        });
    }

    //编辑
    function editRole(qid){
        layer.confirm('确认取消投票吗？', function (confirmIndex) {
           layer.close(confirmIndex);//关闭confirm
            //向服务端发送删除指令
            var req = {
                qid: qid
            };
            $api.UpdateWJDC(req,function (data) {
                layer.msg("取消成功",{time:1000},function(){
                    //obj.del(); //删除对应行（tr）的DOM结构
                    //重新加载表格
                    tableIns.reload();
                });
            });
        });
    }
    //查看
    function preview(qid,status){
        var x = layer.prompt({title: '请输入账号',formType: 0}, function(content, index) {

            //将账号存入域传给previewLook页面，根据content对提交过的账号进行删除
            var con = JSON.stringify(content);//在js中把对象转为JSON字符串的语法
            window.sessionStorage.setItem("con", con);//js中用sessionStorage.setItem("ss", ss)把JSON对象字符串存入域中
            var req = {
                content:content,
                recordId:qid
            }
            //将输入的账号进行数据库查询
            $api.findAccount(JSON.stringify(req),{contentType:"application/json;charset=UTF-8"},function (data) {
                if (data.data==false){
                    layer.msg("账号错误或非本次投票账号！", {time: 1000}, function () {
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    });
                }else{
                    var s = encodeURI(status);//将中文数据进行编码，否则传过去会乱码
                    var index = layui.layer.open({
                        title: "预览",
                        type: 2,
                        content: "previewLook.html?qid="+qid+"&status="+s,
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
                    layer.close(x);//关闭 var = x 的弹出层框
                }
            });
        });
    }
    //统计
    function total(qid){
        var index = layui.layer.open({
            title: "统计",
            type: 2,
            content: "total.html?qid="+qid,
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
    }
});