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
            , url: $tool.getContext() + 'list/list.do' //数据接口
            , method: 'post'
            , page:true //开启分页
            ,limit:5
            ,limits:[1,2,3,4,5]
            , cols: [[ //表头
                  {type:'numbers',title:'序号',fixed: 'left'},
                  {field: 'recordId', title: '记录id', width: '20%'}
                , {field: 'bigTitleId', title: '历史记录', width: '20%'}
                , {field: 'releaseDate', title: '发布日期', width: '20%'}
                , {field: 'id', title: '状态',templet:'#buttonTpl', width: '20%'}
                , {fixed: 'right', title: '操作', width: 300, align: 'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            , done: function (res, curr) {//请求完毕后的回调
                //如果是异步请求数据方式，res即为你接口返回的信息.curr：当前页码
            }
        });
        //为toolbar添加事件响应
        table.on('tool(demoFilter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
            var row = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的DOM对象

            //区分事件
            if (layEvent === 'del') { //删除
                deldemo(row.recordId);
            } else if (layEvent === 'edit') { //编辑
                //do something
                editdemo(row.recordId);
            }else if (layEvent === 'guanbi') { //关闭投票
                //do something
                guanbi(row.recordId);
            }else if (layEvent === 'chakan') { //查看
                //do something
                chakan(row.recordId);
            }else if (layEvent === 'tongji') { //统计
                //do something
                tongji(row.recordId);
            }
            else if (layEvent === 'guanbichakan') { //查看
                //do something
                guanbichakan(row.recordId);
            } else if (layEvent === 'ercichakan') { //二次查看
                //do something
                ercichakan(row.recordId);
            }
        });
    }
    defineTable();


    //查询
    form.on("submit(querydemo)", function (data) {
        var recordId = data.field.recordId;
        var bigTitleId = data.field.bigTitleId;

        //表格重新加载
        tableIns.reload({
            where:{
                recordId:recordId,
                bigTitleId:bigTitleId
            }
        });

        return false;
    });

    //添加角色
    $(".usersAdd_btn").click(function () {
        var index = layui.layer.open({
            title: "添加空白模板",
            type: 2,
            content: "adddemo.html",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
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
//关闭投票
    function guanbi(recordId){
        layer.confirm('确认取消吗？', function (confirmIndex) {
            layer.close(confirmIndex);//关闭confirm
            //向服务端发送删除指令
            var req = {
                recordId: recordId
            };
            $api.Guanbidemo(req,function (data) {
                layer.msg("取消成功",{time:1000},function(){
                    //obj.del(); //删除对应行（tr）的DOM结构
                    //重新加载表格
                    tableIns.reload();
                });
            });
        });
    }

    //删除
    function deldemo(recordId){
        layer.confirm('确认删除吗？', function (confirmIndex) {
            layer.close(confirmIndex);//关闭confirm
            //向服务端发送删除指令
            var req = {
                recordId: recordId
            };

            $api.Deletedemo(req,function (data) {
                layer.msg("删除成功",{time:1000},function(){
                    //obj.del(); //删除对应行（tr）的DOM结构
                    //重新加载表格
                    tableIns.reload();
                });
            });
        });
    }

    //编辑
    function editdemo(recordId){
        var index = layui.layer.open({
            title: "编辑角色",
            type: 2,
            content: "editdemo.html?recordId="+recordId,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
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
    function guanbichakan(recordId){
        var index = layui.layer.open({
            title: "查看",
            type: 2,
            content: "shimzbcyl.html?recordId="+recordId,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
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

    function ercichakan(recordId){
        var index = layui.layer.open({
            title: "二次查看",
            type: 2,
            content: "ercichakan.html?recordId="+recordId,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
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
    //查看
    function chakan(recordId){
            var a = layer.prompt({title: '请输入账号',formType: 0}, function(content) {
                var req = {
                    content: content,
                    recordId: recordId
                }
                var tijiaozhanghao = JSON.stringify(req);
                window.sessionStorage.setItem("tijiaozhanghao", tijiaozhanghao);
                $api.jioayan(JSON.stringify(req), {contentType: "application/json;charset=UTF-8"}, function (data) {
                    if(data.data==false){
                        layer.msg("账号不正确或该账号已经提交过！", {time: 1000}, function () {
                            layer.closeAll("iframe");
                            //刷新父页面
                            parent.location.reload();
                        });
                    }else{
                        var index = layui.layer.open({
                            title: "预览",
                            type: 2,
                            content: "chakan.html?recordId="+recordId,
                            success: function (layero, index) {
                                setTimeout(function () {
                                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
                                        tips: 3
                                    });
                                }, 500)
                            }
                        });

                    }
                    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                    $(window).resize(function () {
                        layui.layer.full(index);
                    });
                    layui.layer.full(index);
                    layer.close(a);
                });
            })
    }


    //统计
    function tongji(recordId){
        var index = layui.layer.open({
            title: "统计",
            type: 2,
            content: "tongji.html?recordId="+recordId,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回角色列表', '.layui-layer-setwin .layui-layer-close', {
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
