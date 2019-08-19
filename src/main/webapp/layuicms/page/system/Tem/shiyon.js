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
var index=0;
    function init() {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var templateId = queryArgs['templateId'];


        var req = {
            templateId:templateId,

        };
        $api.Gettemp(req,function (res) {
            var data = res.data;
            console.log(data);
            $("[name='bigTitle']").val(data.bigTitle);
            $("[name='explain']").val(data.explain);
            $("[name='number']").val(data.number);

            for(var i=0;i<data.list.length;i++){
                var zbt='';
                var bz='';
                var bc='';

                var renyuan =[];
                var renming = [];
                for(var g = 0;g<data.list[i].beice.length;g++){
                   var uid = res.data.list[i].beice[g].uid;
                    renyuan.push(uid);
                    var uname = res.data.list[i].beice[g].tpphotoUser.uname;
                    renming.push(uname)
                }
                bc+= '<div class="layui-form-item">'+
                    '<label class="layui-form-label">被评测人员</label>'+
                    '<div class="layui-input-block">'+
                    '<input type="text" class="layui-input" lay-verify="required" id="uidData1" name="uname" autocomplete="off"  value="'+renming+'" onclick="openAdduser($(this));" placeholder="选择添加">'+
                    '<input type="hidden" id="uidData1ex" lay-verify="required" name="uid" value="'+renyuan+'"/>'+
                    '</div>'+
                    '</div>'

                for(var j=0;j<data.list[i].bz_coll.length;j++){
                    var zbz = '';
                            for(var z=0;z<data.list[i].bz_coll[j].zbz_coll.length;z++){
                                var zbz_index=z+1;
                                zbz+=' <div class="layui-form-item ">\n' +
                                    '                <label class="layui-form-label">子标准'+zbz_index+'</label>\n' +
                                    '                <div class="layui-input-block">\n' +
                                    '                    <input type="text" class="layui-input" name="substandardName" value="'+res.data.list[i].bz_coll[j].zbz_coll[z].substandardName+'" lay-verify="required" placeholder="请输入角色名称">\n' +
                                    '                </div>'+
                                    '</div>'
                     }
                            var only;

                            if(res.data.list[i].bz_coll[j].id===78){
                                only=  '<div class="layui-form-item">'+
                                    "<div class=\"layui-input-block\">\n"+
                                    '<label class="layui-form-label">选项规则</label>\n'+
                                    '<input type="radio" class="layui-input" name="id'+ index+'"'+ 'value="'+res.data.list[i].bz_coll[j].id+'" title="单选" checked="checked">' +
                                    '<div class=\"layui-unselect layui-form-radio\"><i class=\"layui-anim layui-icon\"></i><span>单选</span></div>\n'+
                                    '<input type="radio" class="layui-input" name="id'+index+ '"'+ ' value="'+res.data.list[i].bz_coll[j].id+'" title="多选">' +
                                    '<div class=\"layui-unselect layui-form-radio layui-form-radioed\"><i class=\"layui-anim layui-icon\"></i><span>多选</span></div>\n'+
                                    "    </div>\n" +
                                    "   </div>"
                            }else{
                                only= '<div class="layui-form-item">'+
                                    "<div class=\"layui-input-block\">\n"+
                                    '<label class="layui-form-label">选项规则</label>\n'+
                                    '<input type="radio" class="layui-input" name="id'+ index+'"'+ 'value="'+res.data.list[i].bz_coll[j].id+'" title="单选" >' +
                                    '<div class=\"layui-unselect layui-form-radio\"><i class=\"layui-anim layui-icon\"></i><span>单选</span></div>\n'+
                                    '<input type="radio" class="layui-input" name="id'+index+ '"'+ ' value="'+res.data.list[i].bz_coll[j].id+'" title="多选" checked="checked">' +
                                    '<div class=\"layui-unselect layui-form-radio layui-form-radioed\"><i class=\"layui-anim layui-icon\"></i><span>多选</span></div>\n'+
                                    "    </div>\n" +
                                    "   </div>"
                            }
                    var bz_index=j+1;
                    bz+='<div id="bz">\n' +
                        '        <div class="layui-form-item ">\n' +
                        '            <label class="layui-form-label">标准'+bz_index+'</label>\n' +
                        '            <div class="layui-input-block">\n' +
                        '                <input type="text" class="layui-input" name="standardName" value="'+res.data.list[i].bz_coll[j].standardName+'" lay-verify="required" placeholder="请输入角色名称">\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        only+
                        '            <div id="zbz">\n' +
                        zbz+
                        '        </div>\n' +
                        '            <button type="button" class="layui-btn layui-btn-primary" onclick="tianjia($(this))">添加子标准</button>\n' +
                        '        </div>'
                    index++;
                    layui.form.render("radio");


                }
                var zbt_index=i+1;
                zbt+= ' <div id="zbt">\n' +
                    '    <div class="layui-form-item">\n' +
                    '        <label class="layui-form-label">子标题'+zbt_index+'</label>\n' +
                    '        <div class="layui-input-block">\n' +
                    '            <input type="text" class="layui-input" name="subtitleContent" value="'+res.data.list[i].subtitleContent+'" lay-verify="required" placeholder="请输入角色名称">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="bz_collection">\n' +
                    bz+
                    '    </div>\n' +
                    '    <button type="button" class="layui-btn layui-btn-normal" onclick="bz($(this))">新增标准</button>\n' +
                    '<div id="beice">'+
                    bc+
                    '</div>'+
                    '    </div>'
                layui.form.render("radio");
                index++;
                 $('#zbt_coll').append(zbt);
            }



            form.render();//重新绘制表单，让修改生效
        });
    }
    init();


    /**
     * 表单提交
     * */
    form.on("submit(addtem)", function (data) {
        var bigTitle = data.field.bigTitle;
        var explain = data.field.explain;
        var number = data.field.number;

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
            var e = $($(a[i]).children("#bz_collection")).children();//获取标准
            var t = $($(a[i]).children("#beice")).children();//获取uid
            var beice = [];
            for(var g = 0;g<t.length;g++){
                var uid = $($($(t[g]).children(".layui-input-block")[0]).children("input")[1]).val();
                beice.push({uid:uid});

            }
            //var uid = $($($($(a[i]).children(".layui-form-item")[1]).children(".layui-input-block")[0]).children("input")[1]).val();
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
            var zbt_obj = {subtitleContent: subtitleContent, bz_coll: bz_coll,beice:beice};
            zbt_coll.push(zbt_obj);
        }
        var coll = [];
        for (var h = 0; h <number ; h++) {
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var rens = "";
            for(var g = 0; g < 6 ; g ++) {
                var id = Math.ceil(Math.random()*35);
                rens += chars[id];
            }
            coll.push(rens);
        }
        var gg = {coll:coll};
        var zhang1 = JSON.stringify(gg);
        window.sessionStorage.setItem("zhang1", zhang1);//将值存入域，传到下个页面做准备


        var data = {bigTitle: bigTitle, explain: explain, number: number,list:zbt_coll,coll:coll};






        $api.AddDemo(JSON.stringify(data),{contentType:"application/json;charset=UTF-8"},function (data) {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("发布成功！",{time:1000},function () {
                var index = layui.layer.open({
                    title: "账号",
                    type: 2,
                    content: "zhanghao1.html",
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
    form.on("submit(cuntem)", function (data) {
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
                var zbt_obj = {subtitleContent: subtitleContent, bz_coll: bz_coll,beice:beice};
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
    form.on("submit(shiyulang)", function (data) {
        var bigTitle = data.field.bigTitle;
        var explain = data.field.explain;
        var number = data.field.number;

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

        var yulan = JSON.stringify(data);

        window.sessionStorage.setItem("yulan", yulan);//将值存入域，传到下个页面做准备
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






