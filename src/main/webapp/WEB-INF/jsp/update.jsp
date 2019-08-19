<%--
  Created by IntelliJ IDEA.
  User: yzj
  Date: 2019/7/7
  Time: 17:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="update" method="post">
    学号:<input type="text" name="sid" value="${student.sid}" readonly="readonly"><br>
    用户名：<input type="text" name="sname" value="${student.sname}"><br>
    性别：<input type="text" name="sex" value="${student.sex}"><br>
    班级：<input type="text" name="clazz" value="${student.clazz}"><br>
    密码：<input type="text" name="password" value="${student.password}"><br>
    操作：<input type="submit" value="确定修改"><br>
</form>
</body>
</html>
