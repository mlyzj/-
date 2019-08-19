package com.jc.controller;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;
import com.jc.beans.response.IResult;
import com.jc.beans.response.PageResultBean;
import com.jc.beans.response.ResultBean;
import com.jc.entity.Student;
import com.jc.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;
@Slf4j
@Controller
@RequestMapping("/list")
public class StudentController {
    @Autowired
    StudentService studentService;
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public IResult add(@RequestBody Student student){
        return  new ResultBean<Integer>(studentService.add(student));
    }
    //查询
    @RequestMapping(value = "/list.do",method = RequestMethod.POST)
    @ResponseBody
    public IResult findAll(String page, String limit){
        return new PageResultBean<Collection<Student>>(studentService.findAll(page, limit),studentService.cout());
    }
//删除
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    @ResponseBody
    public IResult delete(int sid){
        return  new ResultBean<Integer>(studentService.delete(sid));
    }
//查询
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    @ResponseBody
    public IResult findById(int sid){

     return new ResultBean<Student>(studentService.findById(sid));
    }
//修改
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    @ResponseBody
    public IResult update(Student student){
        return new ResultBean<Integer>(studentService.update(student));
    }
}
