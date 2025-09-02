### 代码规范
- 每个代码文件（js、ts、vue、jsx、css、scss、less等）最前端放该文件功能的注释；
- 如果一个功能在实现时注明使用新语法、新方法，则在相关源代码文件顶部描述一下该功能及其新语法、新方法；
- 每个函数顶部都添加必要的注释；
### Vue代码规范
- Vue代码文件最前端放该文件功能的注释；
- 新建vue文件时使用&lt;script setup&gt;写法，先放script标签，再放template标签，最后放style标签；
- 每个ref或shallowRef变量都要加注释，说明用途；
- 每个函数顶部都添加必要的注释；

### README.md文件相关
- 每个任务开始时都先阅读/README.md文件；
- 每次新增、删除文件，都需要修改/README.md文件的项目结构。注意，/src/assets目录内容变更不需要/README.md；

### CESIUM_CHANGELOG.md
- 当前使用的Cesium版本是1.132.0
- 每个任务开始时都先阅读/CESIUM_CHANGELOG.md文件；
- 调用Cesium的功能时，注意使用新版写法；
- Cesium库的对象在Vue环境中都用shallowRef来引用，而不用ref，除非特殊说明。