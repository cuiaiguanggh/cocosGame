webpackJsonp([9],{714:function(e,r,t){t(876);var o=t(155)(t(773),t(944),null,null);e.exports=o.exports},743:function(e,r,t){e.exports={default:t(744),__esModule:!0}},744:function(e,r,t){t(746),e.exports=t(61).Number.isInteger},745:function(e,r,t){var o=t(73),n=Math.floor;e.exports=function(e){return!o(e)&&isFinite(e)&&n(e)===e}},746:function(e,r,t){var o=t(156);o(o.S,"Number",{isInteger:t(745)})},773:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t(743),n=t.n(o);r.default={data:function(){return{ruleForm2:[{age1:""}],age:[{validator:function(e,r,t){if(console.log(r,1),console.log(e,2),!r)return t(new Error("年龄不能为空"));setTimeout(function(){console.log("判断啦"),n()(r)?r<18?t(new Error("必须年满18岁")):t():t(new Error("请输入数字值"))},100)},trigger:"blur"}]}},methods:{submitForm:function(e){this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")})},resetForm:function(e){this.$refs[e].resetFields()},add:function(){this.ruleForm2.push({age1:""})}}}},841:function(e,r,t){r=e.exports=t(712)(!0),r.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"checkArray.vue",sourceRoot:""}])},876:function(e,r,t){var o=t(841);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t(713)("d809ad9a",o,!0)},944:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"check"}},[t("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{"label-width":"100px"}},[e._l(e.ruleForm2,function(r,o){return t("el-form-item",{key:r.key,attrs:{label:"年龄",rules:e.age,prop:"ruleForm."+o+".age1"}},[t("el-input",{model:{value:r.age1,callback:function(t){r.age1=e._n(t)},expression:"ruleForm.age1"}})],1)}),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.submitForm("ruleForm2")}}},[e._v("提交")]),e._v(" "),t("el-button",{on:{click:function(r){e.resetForm("ruleForm2")}}},[e._v("重置")]),e._v(" "),t("el-button",{on:{click:e.add}},[e._v("添加")])],1)],2)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=9.js.map