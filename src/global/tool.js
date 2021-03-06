/**
 * Created by WengHaoping on 2017/5/18.
 */
/**
 * 总的工具类
 */
import { Notification } from 'element-ui';
const tool={
/*数据封装类*/
  getToObject (data) {
    let object={};
    for(let key in data){
      object[key]=data[key]
    }
    return object;
  }, //对象封装 将对象中无用的参数去除
  getToArrObject(data) {
    let newArr = new Array;
    for(let i=0;i<data.length; i++){
      newArr[i]=tool.getToObject(data[i])
    }
    return newArr;
  },//*数组封装将对象中无用的参数去除
  fileChange(target) {
  let isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  let fileSize = 0;
  const filetypes =[".jpg","why.png",".rar",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"];
  const filepath = target.value;
  const filemaxsize = 1024*2;//2M
  if(filepath){
    var isnext = false;
    var fileend = filepath.substring(filepath.indexOf("."));
    if(filetypes && filetypes.length>0){
      for(var i =0; i<filetypes.length;i++){
        if(filetypes[i]==fileend){
          isnext = true;
          break;
        }
      }
    }
    if(!isnext){
      alert("不接受此文件类型！");
      target.value ="";
      return false;
    }
  }else{
    return false;
  }
  if (isIE && !target.files) {
    var filePath = target.value;
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    if(!fileSystem.FileExists(filePath)){
      alert("附件不存在，请重新输入！");
      return false;
    }
    var file = fileSystem.GetFile (filePath);
    fileSize = file.Size;
  } else {
    fileSize = target.files[0].size;
  }

  var size = fileSize / 1024;
  if(size>filemaxsize){
    alert("附件大小不能大于"+filemaxsize/1024+"M！");
    target.value ="";
    return false;
  }
  if(size<=0){
    alert("附件大小不能为0M！");
    target.value ="";
    return false;
  }
},/*设置上传文件大小以及类型fileChange(this)*/
  getTitleSift(data){
    let arr = [];
    for(let key in data){
      let obj=new Object;
      obj.text=data[key];
      obj.value=key;
      arr.push(obj);
    }
    return arr
  },//设置表格表头的筛选内容======表格页都用的到
  checkArr(arr, arr2){
    let newArr = [];
    let data = arr[arr.length - 1];
    for (let i = 0; i < arr2.length; i++) {
      newArr.push(arr2[i].value);
    }
    if (newArr.indexOf(data) == -1) return data;


  },//判断是否重复.在动态添加标签的地方使用
  setTag(arr,pro){
    for(let i=0; i<pro.length; i++){
      for(let j=0; j<arr.length; j++){
        if(arr[j]==pro[i].label){
          arr[j]=pro[i].value;
        }
      }
    }
  },//标签取数据arr//放值的地方,pro总值/标签最后保存的时候,把文字标签替换成id
/*验证类*/
  getNull(data) {
    let reg=/\S/;
    if (!reg.test(data))
    {
      return true;//是空
    }else{
      return false;//不是空
    }

  },//判断是不是空(空字符串也算是空)
  checkNumber(data) {
    let reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(data)) {
      return true;
    }else{
      return false;
    }

  },//判断是不是数字
  checkEmail(data){
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (reg.test(data)) {
      return true;
    }else{
      return false;
    }
  },//邮箱验证
  checkPhoneNubmer(data){
    let reg = /^1(3|4|5|7|8)\d{9}$/;
    if (reg.test(data)) {
      return true;
    }else{
      return false;
    }
  },//电话号码验证
  checkPhoneNumber(value){
    let check=false;
    if (!this.$tool.getNull(value)) {
      setTimeout(() => {
        if (!this.$tool.checkNumber(value)) {
          this.$tool.error('请输入数字值');
          check=false;
        } else {
          if (!this.$tool.checkPhoneNubmer(value)) {
            this.$tool.error('请输入正确的手机号');
            check=false;
          }else{
            check=true;
          }
        }
      }, 100);
    }else{
      check=true;
    }
    return check;
  },//验证手机号高级版
  checkPassword(data){
    if (data.length>20 || data.length<6){
      return true
    }else{
      return false;
    }
  },//密码长度认证(6-20)
  checkLength20(data){
    if(typeof data ==='array'){
      data.forEach(x=>{
        if(x.length>20){
          return true
        }
      })
      return false
    }else{
      if(data.length>20){
        return true
      }else{
        return false
      }
    }
  },//input框长度验证(超出20字就返回true)
  checkLength40(data){
    if(typeof data ==='array'){
      data.forEach(x=>{
        if(x.length>40){
          return true
        }
      })
      return false
    }else{
      if(data.length>40){
        return true
      }else{
        return false
      }
    }
  },//input框长度验证(超出40字就返回true)
  isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
},//是否为数组
  isOwnEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;//返回false，不为空对象
    }
  }
  return true;//返回true，为空对象
},//判断是否为空对象
  cloneObj(myObj){
  if(typeof(myObj) != 'object') return myObj;
  if(myObj == null) return myObj;

  let myNewObj = new Object();

  for(var i in myObj)
    myNewObj[i] = myObj[i];

    return myNewObj;
},//对象深拷贝
/*弹框类*/
  error(text) {
    Notification.error({
      message: text,
      offset: 300,
      duration:1000
    })
  },//错误弹窗(所有的错误调用,红色叉)
  success(text) {
    Notification.success({
      message: text,
      offset: 300,
      duration:1000
    })
  },//成功弹窗(绿钩)
  warning(text) {
    Notification.warning({
      message: text,
      offset: 300,
      duration:1000
    })
  },//警告弹窗,(黄色叹号)

/*请求类*/
  getCity(data){
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].area_title;
      obj.value = data[i].area_id;
      arr.push(obj);
    }
    return arr
  },//获取城市列表
  getScale(data){
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].scale_money;
      obj.value = data[i].scale_id;
      arr.push(obj)
    }
    return arr
  },//获取期望融资
  getStage(data){
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].stage_name;
      obj.value = data[i].stage_id;
      arr.push(obj)
    }
    return arr
  },//获取轮次信息
  getIndustry(data){
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.label = data[i].industry_name;
        obj.value = data[i].industry_id;
        arr.push(obj)
      }
      return arr

  },//获取领域
  getTags_pro(data){
    let arr = [];
    for(let i=0; i<data.length; i++){
      let obj = {};
      obj.label = data[i].tag_name;
      obj.value = data[i].tag_id;
      arr.push(obj);
    }
    return arr
  },//设置标签






  console(text) {
    let type=true;//true代表开发环境,false代表上线环境
    if(type) console.log(text);
  },//console控制

}

export default{
  install(Vue){
    Vue.prototype.$tool = tool;
  }
}
