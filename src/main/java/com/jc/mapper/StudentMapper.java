package com.jc.mapper;


import com.jc.entity.Student;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentMapper {
    public List<Student> findAll(@Param("start") int start, @Param("end") int end);
    public int add(Student student);
    public int delete(int sid);
    public int update(Student student);
    public Student findById(int sid);
    int cout();
}
