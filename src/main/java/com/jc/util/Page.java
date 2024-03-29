package com.jc.util;

public class Page {
    /**
     * 页序
     * */
    private int page;

    /**
     * 分页大小
     * */
    private int limit;

    public Page(int page, int limit){
        this.page = page;
        this.limit = limit;
    }

    public Page(String page, String limit){
        this.page = Integer.parseInt(page);
        this.limit = Integer.parseInt(limit);
    }

    /**
     * 获取开始序号
     * */
    public int getStart(){
        int start = (page - 1) * limit;
        return start;
    }

    /**
     * 获取结束序号
     * */
    public int getEnd(){
        int end = limit * page + 1;
        return end;
    }
}
