
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
   <table border="1">
       <tr>
           <td>学号</td>
           <td>姓名</td>
           <td>性别</td>
           <td>班级</td>
           <td>密码</td>
           <td>操作</td>
       </tr>
       <c:forEach var="stu" items="${list}">
           <tr>
               <td>${stu.sid}</td>
               <td>${stu.sname}</td>
               <td>${stu.sex}</td>
               <td>${stu.clazz}</td>
               <td>${stu.password}</td>
               <td>
                   <a href="delete?sid=${stu.sid}">删除</a>
                   <a href="findById?sid=${stu.sid}">修改</a>
               </td>
           </tr>
       </c:forEach>
   </table>
</body>
</html>
