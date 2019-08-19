package com.jc.service.impl;

import com.jc.entity.Student;
import com.jc.mapper.StudentMapper;
import com.jc.service.StudentService;
import com.jc.util.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
@Transactional
public class StudentServiceImpl implements StudentService{
    @Resource
    private StudentMapper studentMapper;
    @Override
    public List<Student> findAll(String page, String limit) {
        Page page1 = new Page(page,limit);
        return studentMapper.findAll(page1.getStart(),page1.getEnd());
    }

    @Override
    public int add(Student student) {

       return studentMapper.add(student);
    }

    @Override
    public int delete(int sid) {

        return studentMapper.delete(sid);
    }

    @Override
    public int update(Student student)
    {
       return studentMapper.update(student);
    }

    @Override
    public Student findById(int sid) {

        return studentMapper.findById(sid);
    }

    @Override
    public int cout() {
        return studentMapper.cout();
    }
}
