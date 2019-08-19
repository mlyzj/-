package com.jc.service;

import com.jc.entity.Student;

import java.util.List;


public interface StudentService {
     List<Student> findAll(String page, String limit);
     int add(Student student);
     int delete(int sid);
     int update(Student student);
     Student findById(int sid);
    int cout();
}
