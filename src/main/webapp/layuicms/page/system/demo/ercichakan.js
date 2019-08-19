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
    var Content = [];
    function init() {
        //获取发布的值
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var recordId = queryArgs['recordId'];


        // var req = {
        //     recordId:recordId,
        //
        // };

        $api.Getercichakan({'recordId':recordId}, function (data) {
            Content = data.data;

            for (var j = 0; j < data.data.length; j++) {
                var aa = ' <div class="zhanghao">\n' +
                    '        <input type="text"  class="dx" value="' + data.data[j].content + '">\n' +
                    '\n' +
                    '    </div>'
                $(".coll").append(aa);
            }

            form.render();//重新绘制表单，让修改生效
            // });
        })
    }

    init();
    //导出
    form.on("submit(daochu)", function (data) {
        const content = [];
        //遍历生成的账号
        for (var i = 0; i < Content.length; i++) {
            const json =
                {
                    num:''+(i+1)+'',
                    content:''+Content[i].content+''
                }
            content.push(json);
        }

        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = `序号,账号\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        for(let i = 0 ; i < content.length ; i++ ){
            for(let item in content[i]){
                str+=`${content[i][item] + '\t'},`;
            }
            str+='\n';
        }
        //encodeURIComponent解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download =  "账号表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return false;
    })

});






