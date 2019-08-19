package com.jc.entity;

public class Student {
    private int sid;
    private String sname;
    private String sex;
    private String clazz;
    private String password;

    public Student(String sname, String sex, String clazz, String password) {
        this.sname = sname;
        this.sex = sex;
        this.clazz = clazz;
        this.password = password;
    }

    public Student(int sid, String sname, String sex, String clazz, String password) {
        this.sid = sid;
        this.sname = sname;
        this.sex = sex;
        this.clazz = clazz;
        this.password = password;
    }

    public Student() {
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Student{" +
                "sid=" + sid +
                ", sname='" + sname + '\'' +
                ", sex='" + sex + '\'' +
                ", clazz='" + clazz + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
