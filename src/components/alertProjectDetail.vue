<template>
  <div id="alertProjectDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <el-dialog :visible="dialogVisiblePro"  :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <!--弹窗上半部分-->
      <div class="up-floor item-lists item-lists-top clearfix" style="background: white;">
        <div class="item-lists-inner-left">
          <div class="item height" style="vertical-align: middle;">
            <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
            <el-tag type="primary" v-else>私密</el-tag>
            <span class="projectIntro">{{project.pro_intro}}</span>
          </div>
          <div class="item height" style="margin-top:18px;">
            <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
          </div>
          <div class="item height" style="margin-top:18px;">
            <span class="big-tag">{{project.pro_scale.scale_money}}</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_area.area_title}}</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_finance_stock_after}}%</span><span class="split">｜</span>
            <span class="big-tag">{{project.pro_stage.stage_name}}</span>
          </div>
          <div class="item height" style="background:#f9fafc;margin-top:18px">
            <span class="projectProcess">
              <div class="item progress height">
                <div class="txt begin">项目线索</div>
                <div class="progress-bar">
                  <div class="circle circle-s"></div>
                  <div class="line1"></div>
                  <div class="txt1">签约</div>
                  <div class="line2"></div>
                  <div  class="txt state">{{status_name}}</div>
                  <div class="circle circle-e">&nbsp;</div>
                </div>
                <div class="txt end">佣金收讫</div>
             </div>
            </span>
          </div>
          <div class="onlyone">
            <img v-if="project.is_exclusive==0" src="../assets/images/onlyonedark.png"/>
            <img v-if="project.is_exclusive==1" src="../assets/images/onlyonedark.png"/>
            <img v-else-if="project.is_exclusive==2" src="../assets/images/onlyonelight.png"/>
          </div>
        </div>
      </div>
      <!--弹窗中间部分-->
      <div class="mid-floor" style="opacity:0.5;background:#000000;height: 16px;"></div>
      <!--弹窗下半部分-->
      <div class="down-floor">
        <!--项目资料-->
        <div class="ul-lists" style="background:#f9fafc;padding:20px;">
          <div class="item">
            <span class="title"><img class="img" src="../assets/images/projectIntroduce.png">项目资料</span>
            <div class="person-info" v-if="project.contact.user_name!=''">
              <span>联系人 : </span>
              <span>{{project.contact.user_name}}</span>
              <span>{{project.contact.user_mobile}}</span>
            </div>
          </div>
          <div class="item" style="margin-top:33px;">
            <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
          </div>
          <div class="item" style="margin-top:24px;background:#ffffff;height: 49px;line-height: 49px;">
            <!--<div class="paper" v-if="project.pro_BP.length!=0">-->
              <img class="img" style="padding-left: 16px;" src="../assets/images/paper.png">
              <span class="pt">{{project.pro_BP.file_title}}</span>
              <el-button type="text" size="mini" @click="download(project.pro_BP.file_id)" style="float: right;line-height:3;margin-right: 10px">下载</el-button>
              <el-button type="text" size="mini" style="float: right;line-height: 3;margin-right: 10px">查看</el-button>
            <!--</div>-->
          </div>
          <div class="item" style="margin-top:24px;height: 49px;">
            <div class="bot-det" v-if="project.pro_status!=''">
              <span class="det-title">运营状态：</span>
              <span class="del-info">{{project.pro_status.status_name}}</span>
            </div>
            <!--<div class="bot-det" style="margin-left:170px;" v-if="project.pro_website!=''">-->
            <div class="bot-det" style="margin-left:170px;">
              <span class="det-title">产品链接：</span>
              <span class="del-info"><a :href="project.pro_website"  target=_blank>{{project.pro_website}}www.weitianshi.cn</a></span>
            </div>
            <!--<div class="bot-det" style="float:right;" v-if="project.pro_company_scale!=''">-->
            <div class="bot-det" style="float:right;">
              <span class="det-title">公司规模：</span>
              <span class="del-info">{{project.pro_company_scale.comp_scale_value}} 7人</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="ul-lists" style="margin-top:16px;padding: 0">
            <div class="item">
              <span class="title" style="font-size: 16px;">项目亮点</span>
              <div class="prod-doc" style="font-size: 13px;">{{project.pro_goodness}}</div>
            </div>
          </div>
        </div>
        <!--核心团队-->
        <div class="ul-lists" style="margin-top: 16px;background: rgb(249, 250, 252); padding: 20px;" v-if="project.core_users!=''">
          <div class="item">
            <span class="title"><img class="img" src="../assets/images/team.png">核心团队</span>
          </div>
          <div class="item" style="margin-top:33px;">
            <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
          </div>
          <div class="item" style="margin-top:33px;">
            <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==1">{{tag.tag_name}}</span>
          </div>
          <div style="margin-top:32px;"></div>
          <div class="item" v-for="user in project.core_users" style="margin-top:10px;">
            <span class="p-name">{{user.ct_member_name}}</span>
            <span class="p-mg">{{user.ct_member_career}}</span>
            <div class="p-gf">股权占比 : <span>{{user.stock_scale}}%</span></div>
            <div class="p-doc">{{user.ct_member_intro}}</div>
            <div class="line"></div>
          </div>

        </div>
        <!--融资信息-->
        <div class="ul-lists" style="margin-top:16px;background: rgb(249, 250, 252); padding: 20px;">
          <div class="item">
            <span class="title"><img class="img" src="../assets/images/money.png">融资信息</span>
            <div class="rz-details">
              <div class="rz-detail">
                <p class="det-title">期望融资</p>
                <p class="det-info">{{project.pro_scale.scale_money}}</p>
              </div>
              <div class="rz-detail">
                <p class="det-title">投后股份</p>
                <p class="det-info">{{project.pro_finance_stock_after}}%</p>
              </div>
              <div class="rz-detail">
                <p class="det-title">估值</p>
                <p class="det-info">{{project.pro_finance_value}}万</p>
              </div>
            </div>
          </div>
          <div class="item" style="margin-top:35px;" >
            <span class="sec-title" v-if="project.pro_finance_use!=''">资金用途</span>
            <div class="yt-doc">
              {{project.pro_finance_use}}
            </div>
          </div>
          <div class="item" style="margin-top:6px;" v-if="project.pro_history_finance.length!=0">
            <div>

              <!--                <div class="v-progress" style="height: 121px;">
                                <span class="circle circle-s">&nbsp;</span>
                                <span class="v-line v-line-1">&nbsp;</span>
                                <span class="circle circle-e">&nbsp;</span>
                              </div>-->
              <div class="v-progress-table">
                <div class="v-progress-txt" v-for="finance in project.pro_history_finance">
                  <span class="radio_line"><span class="radio"></span></span>
                  <span class="pro-txt-1">{{finance.finance_time}}</span>
                  <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                  <span class="pro-txt-3">{{finance.belongs_to_stage.stage_name}}</span>
                  <span class="pro-txt-4">{{finance.pro_finance_investor}}</span>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--里程碑-->
        <div class="ul-lists" style="margin-top:16px;background: rgb(249, 250, 252); padding: 20px;" v-if="project.pro_develop!=''">
          <div class="item">
            <span class="title"><img class="img" src="../assets/images/Milepost.png">里程碑</span>
          </div>
          <div class="item" style="margin-top:6px;">
            <div>
              <!--                <div class="v-progress" style="height: 182px;">
                                <span class="circle circle-s">&nbsp;</span>

                                <span class="v-line v-line-1">&nbsp;</span>
                                <span class="circle circle-c">&nbsp;</span>
                                <span class="v-line v-line-2">&nbsp;</span>

                                <span class="circle circle-e">&nbsp;</span>
                              </div>-->
              <div class="v-progress-table">
                <div class="v-progress-txt" v-for="develop in project.pro_develop">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="pro-txt-1">
                      {{develop.dh_start_time}}
                    </span>
                  <span class="pro-txt-2"  style="color:#5e6d82;">
                      {{develop.dh_event}}
                    </span>
                  <div class="line"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <!--FA签约协议-->
        <div class="ul-lists" style="margin-top:16px;margin-bottom: 100px;background: rgb(249, 250, 252); padding: 20px;" v-if="project.pro_FA!=''">
          <div class="item">
            <span class="title"><img class="img" src="../assets/images/money.png">FA签约协议</span>
            <div class="rz-details" >
              <div class="rz-detail" style="width: 25%">
                <p class="det-title">签约佣金</p>
                <p class="det-info">{{project.pro_FA.commission}}%</p>
              </div>
              <div class="rz-detail" style="width: 25%">
                <p class="det-title">股权赠与</p>
                <p class="det-info">{{project.pro_FA.stock_right}}%</p>
              </div>
              <div class="rz-detail" style="width: 25%">
                <p class="det-title">其他权益</p>
                <p class="det-info">{{project.pro_FA.stock_other}}%</p>
              </div>
              <div class="rz-detail" style="width: 25%">
                <p class="det-title">跟投权</p>
                <p class="det-info">{{project.pro_FA.stock_follow}}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["dialogVisiblePro","proid"],
    data () {
      return {
        loading:false,//加载动画
        pro_id:"",
        project: {
          project_id: "",//项目id59W2a0GE
          pro_name: "",//项目名称HoopEASY商业计划PPT+for+pitch
          pro_company_name: "",//HoopEASY
          pro_company_scale: {
            comp_scale_id: 1,
            comp_scale_value: "1-20"
          },//公司规模
          pro_source: "",//项目来源微天使项目
          pro_intro: "",//项目简介一款最酷的篮球社交软件
          pro_total_score: "",//98.00
          pro_finance_value: "",//项目估值10.00
          is_exclusive: 0,//0其他 1独家 2非独家
          open_status: 1,//0私密  1公开
          pro_goodness: "",//项目介绍专注于篮球项目的移动端社交平台。在基于用户所处的地理位置基础上，将用户个人，球队，比赛，场馆等资源有机整合，形成一个以用户为核心的垂直网络社区，带给篮球爱好者全新的社交方式和运动体验。
          pro_website: "",//官方网址www.baidu.com
          contact: {
            user_name: "",//赵工佐
            user_mobile: ""//18551711000
          },//项目联系人

          pro_schedule: {
            "schedule_id": 3,
            "schedule_name": "",//考察
            "created_at": null,
            "updated_at": "2017-06-06 11:00:21",
            "user_id": 0
          },//项目进度

          pro_status: {
            "status_id": 3,
            "status_name": "",//上线
            "created_at": null,
            "updated_at": null
          },//运营状态

          pro_area: {
            "area_id": 2,
            "area_title": "北京市",
            "pid": 1,
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "area_id": 2,
              "created_at": "2017-06-01 16:27:35",
              "updated_at": "2017-06-01 16:27:35",
              "priority": 1
            }
          },//区域
          pro_stage: {
            "stage_id": 2,
            "stage_name": "天使轮",
            "sort": 2,
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "stage_id": 2,
              "created_at": "2017-06-01 16:23:04",
              "updated_at": "2017-06-13 18:33:31",
              "priority": 1
            }
          },//轮次

          pro_scale: {
            "scale_id": 1,
            "scale_money": "100W以下",
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "scale_id": 1,
              "created_at": null,
              "updated_at": null,
              "priority": 1
            }
          },//规模

          pro_industry: [
            {
              "industry_id": 12,
              "industry_name": "社交网络",
              "parent_id": 0,
              "created_at": null,
              "updated_at": null,
              "pivot": {
                "item_id": 37,
                "industry_id": 12,
                "created_at": "2017-06-01 16:21:46",
                "updated_at": "2017-06-01 16:21:46",
                "priority": 1
              }
            }
          ],//领域标签

          /*核心团队人员*/
          core_users: [
            {
              project_ct_id: 30,
              ct_index: "9bd0c8d7d615832340340aab0c0625b7",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              ct_member_name: "",//赵工佐
              ct_member_career: "",
              ct_member_intro: "",
              created_at: null,
              updated_at: null,
              stock_scale: null
            }
          ],
          /*//历史融资信息*/
          pro_history_finance: [{
            project_id: 37,
            pro_finance_stage: 1,//轮次
            pro_finance_scale: "100.00",//金额
            pro_finance_investor: "周杰伦",//投资人
            created_time: null,
            updated_time: null,
            belongs_to_stage: {}
          }],
          /*自定义标签*/
          tag: [
            {
              tag_id: 1,
              tag_name: "海贼王",
              user_id: 0,
              project_id: 37,
              created_time: null,
              updated_time: null,
              type: 0//项目标签
            }
          ],
          /*文件列表*/
          pro_file: [
            {
              file_id: 1,
              project_id: 37,
              file_title: "项目文件1",
              file_ext: "doc",
              file_url: "/data/url",
              created_at: null,
              updated_at: null,
              deleted_at: null
            }],
          /*里程碑*/
          pro_develop: [
            {
              project_dh_id: 6,
              dh_index: "24c2886c937e9a3eea25c7d0ffe7f713",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              dh_start_time: "1436112000",//时间
              dh_end_time: "1443542400",
              dh_event: "组建团队和设立办公室",//事件
              created_at: null,
              updated_at: null
            }],
          /*FA签约*/
          pro_FA: {
            project_id: 37,
            commission: "63.00",//签约佣金
            stock_right: "13.00",//股权赠与
            stock_follow: "12.00",//跟投权
            stock_other: "55.00",//其他权益
            created_at: null,
            updeted_at: null
          },
          /*BP文件*/
          pro_BP: {
            file_id: 34,
            project_id: 37,
            user_id: 181391,
            file_title: "",
            bp_ext: "pptx",
            bp_url: "20161201/e6b499c3e94ed4247147cdbfd50ca319.pptx",
            created_at: "2017-06-01 18:14:38",
            updated_at: "2017-06-01 18:14:38",
            deleted_at: null
          }
        },
        status_name:'',//一键尽调边上那个按钮线里的字
      }
    },
    methods: {
      //关闭弹窗
      handleClose(){
        this.$emit('changeCon2', false);
      },
      //获取项目详情数据
      getProjectDetail () {
        this.$http.post(this.URL.getProjectDetail,{user_id:localStorage.user_id,project_id:this.pro_id})
        .then(res=>{
          this.loading=false;
          let data = res.data.data;
          if(data.pro_scale=="") {data.pro_scale={};data.pro_scale.scale_money="-";}
          if(data.pro_area=="") {data.pro_area={};data.pro_area.area_title="-";}
          if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="-"}
          if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
          this.getLocalTime(data.pro_develop);
          this.getLocalTime2(data.pro_history_finance);
          this.project=data;
          this.project.pro_source=this.getProjectTag(data.tag);
          this.project.pro_BP.file_title=data.pro_BP.file_title+'.'+data.pro_BP.file_ext;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
      },
      //设置时间1(获取项目详情数据的辅助函数)
      getLocalTime(data) {
        for(let i=0; i<data.length; i++){
          data[i].dh_start_time=new Date(parseInt(data[i].dh_start_time) * 1000).toLocaleString().substr(0, 9)
        }
      },
      //设置时间2(获取项目详情数据的辅助函数)
      getLocalTime2(data) {
        for(let i=0; i<data.length; i++){
          data[i].finance_time=new Date(parseInt(data[i].finance_time) * 1000).toLocaleString().substr(0, 9)
        }
      },
      //项目来源编辑(获取项目详情数据的辅助函数)
      getProjectTag(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          if(arr[i].type==2){
            str+=arr[i].tag_name+'.'
          }
        }
        return str
      },
    },
    created(){


    },
    watch : {
      dialogVisiblePro : function (e) {
          if(e){
            this.pro_id =this.proid
            this.getProjectDetail();
          }

      }
    }
  }
</script>

<style lang="less">
  #alertProjectDetail{
    /*组件自带格式修改*/
    .el-dialog__body{
      padding: 0 !important;;
    }
    .el-dialog__header{
      padding-top: 0;
      .el-dialog__headerbtn{
        width: 30px;
        height: 30px;
        margin-right: -60px;
        i{
          width: 100%;
          height: 100%;
          font-size: 20px;
        }
      }
    }
    .el-dialog--small{
      width: 881px;
      margin: 0 auto;
      .item-lists{
        .item-lists-inner-left{
          position: relative;
          width: 100%;
        }
        .item-lists-inner-right{
          position: relative;
          .text{
            width: 88px;
            height: 108px;
            margin: 36px 0px 0 55px;
            img{
              width: 100%;
            }
          }
          .icon2{
            position: absolute;
            right: -30px;
            bottom: 12px;
            width: 16px;
            height: 16px;
            img{
              width: 100%;
            }
          }
          .button-float{
            float:right;
            background:#40587a;
            border-radius:2px;
            width:88px;
            height:36px;
            line-height: 36px;
            box-sizing: border-box;
            font-size:14px;
            color:#ffffff;
            text-align:center;
            margin-top: 45px;
          }
        }
        .onlyone{
          width:64px;
          height: 64px;
          position: absolute;
          right: -34px;
          top: -25px;
        }
        .height{
          //height: 26px;
        }
      }
    }
    /*上层弹框*/
    .up-floor{
      padding: 20px 30px;
      background: white;
      .projectIntro{
        font-size:18px;
        color:#4e4563;
        line-height:18px;
        display: inline-block;
        margin-left: 6px;
        overflow: hidden;
        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        width: 700px;
      }
      .projectProcess{
        width: 100%;
        height: 36px;
        margin-top:18px;
        line-height: 36px;
        .progress{
          position: relative;
          .begin,.end{
            display: inline-block;
            padding-left: 8px;
            padding-right:8px;
          }
          .txt{
            font-size:13px;
            color:#99a9bf;
            letter-spacing:0;
            line-height:12px;
            position: relative;
          }
          .end{
            color:#99a9bf;
          }
          .img{
            width: 36px;
            height: 36px;
            display: inline-block;
            cursor: pointer;
            img{
              width: 50%;
              vertical-align: middle;
              line-height: 36px;
            }
          }
          .progress-bar{
            position: relative;
            display: inline-block;
            .line1{
              width: 660px;
              height: 1px;
              background: #c0ccda;
              display: inline-block;
              vertical-align: middle;

            }
            .txt1{
              font-family:MicrosoftYaHei;
              font-size:14px;
              color:#20a0ff;
              letter-spacing:0;
              line-height:14px;
              text-align:center;
              position: absolute;
              left:18%;
              top:11px;
              background:#f9fafc;
              padding:0 10px;
            }
            // margin:0 5px;
            .circle{
              position: absolute;
              background:#ffffff;
              border:1px solid #c0ccda;
              border-radius:20px;
              width:8px;
              height:8px;
              top:15px;
              z-index: 3;
            }
            .circle-s{
              left:0;
            }
            .circle-c{
              left:30px
            }
            .circle-e{
              left:calc(~"100% - 5px");
            }
            .bar-bg1{
              width:630px;
              height: 2px;
              background: #c0ccda;
            }
            .bar-bg2{
              width:80px;
              height: 2px;
              background: #c0ccda;
            }
            .bar-fg{
              position: absolute;
              z-index: 2;
              width: 30px;
              height: 2px;
              background: #20a0ff;
              left: 0px;
              top: 11px;
            }
            .state{
              position: absolute;
              z-index: 3;
              top:12px;
              left:40px;
              font-size:14px;
              color:#20a0ff;
              letter-spacing:0;
              line-height:14px;
            }
          }
        }
      }
    }
    /*中层弹框*/
    .mid-floor{
      height: 16px;
      opacity:0.5;
    }
    /*下层弹框*/
    .down-floor{
      padding: 27px 24px;
      background: white;
      .title{
        font-size:20px;
        color:#4e4563;
        line-height:20px;
        text-align:left;
        padding-right: 5px;
        vertical-align: bottom;
        .img{
          padding-right: 16px;
          vertical-align: bottom;
        }
      }
      .person-info{
        float:right;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#475669;
        line-height:16px;
        text-align:right;
        margin-top: 8px;
      }
      .paper{
        height:54px;
        line-height: 54px;
        text-align: left;
        background: #ffffff;
        margin: 5px;
        .pt{
          width: 626px;
          font-size:16px;
          color:#333333;
          line-height:16px;
          text-align:left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .bot-det{
        float:left;
        .det-title{
          font-size:14px;
          color:#475669;
          line-height:14px;
        }
        .del-info{
          font-size:14px;
          color:#4756669;
          line-height:16px;
          a{
            color:#009eff;
          }
        }
      }
      .item{
        margin:0;
        span{
          display: inline-block;
          vertical-align: middle;
        }

        .icon{
          padding-right: 5px;
          cursor: pointer;
          width: 16px;
          height: 16px;
          img{
            width: 100%;
          }

        }
        .sec-title{
          font-family:MicrosoftYaHei;
          font-size:18px;
          color:#475669;
          line-height:16px;
          text-align:left;
          margin-left: 5px;
        }
        .small-tag{
          background:rgba(32,160,255,0.10);
          border:1px solid rgba(32,160,255,0.20);
          border-radius:4px;
          width:40px;
          line-height: 18px;
          box-sizing: border-box;
          font-size:12px;
          color:#20a0ff;
          text-align: center;
          margin:0 6px 0 2px;
        }
        .company{
          font-size:16px;
          color:#475669;
          line-height:18px;
          text-align:left;
          vertical-align:bottom;
        }
        .resource{
          float: right;
          font-size:16px;
          color:#475669;
          text-align:right;
          margin-top: 3px;
        }

        .flower{
          float: right;
          font-size:14px;
          color:#8492a6;
          text-align:right;
          padding-right: 15px;
        }
        .flower2{
          float: left;
          font-size:14px;
          color:#8492a6;
          text-align:right;
          padding-right: 15px;
        }
        .mid-tag{
          border:1px solid #e6e0ed;
          border-radius:20px;
          height:24px;
          line-height: 22px;
          box-sizing: border-box;
          margin-right:11px;
          text-align: center;
          padding:0 10px;
          font-size: 12px;
          color: #8492a6;
        }
        .big-tag{
          font-size:14px;
          color:#8492a6;
          text-align:left;
        }
        .split{
          height: 14px;
          line-height: 14px;
          color:#e0e6ed;
          //margin:0 10px;
        }

        .person-tag{
          background:rgba(32,160,255,0.10);
          border-radius:4px;
          height:34px;
          font-size:14px;
          color:#20a0ff;
          line-height: 34px;
          box-sizing: border-box;
          padding:0 12px;
          margin-right: 15px;
        }




        .p-name{
          font-size:18px;
          color:#1f2d3d;
        }
        .p-mg{
          font-size:16px;
          color:#475669;
          margin-left:18px;
        }
        .p-gf{
          float: right;
          color:#5e6d82;
          span{
            vertical-align: top;
            font-size:16px;
          }
        }
        .p-doc{
          font-size:13px;
          color:#8492a6;
          margin-top: 5px;
          margin-bottom: 11px;
          line-height:28px;
        }
        .prod-doc{
          margin-top: 16px;
          font-size:14px;
          color:#5e6d82;
          line-height:28px;
        }
        .rz-details{
          margin-top: 36px;
          background: #fff;
          border: 1px solid #e0e6ed;
          border-radius:3px;
          height:112px;
          .rz-detail{
            float:left;
            width:33.3%;
            text-align: center;
            padding-top:30px;
          }

          .det-title{
            font-size:16px;
            color:#475669;
            line-height:16px;
          }
          .det-info{
            font-size:22px;
            margin-top: 12px;
            color:#1f2d3d;
            line-height:22px;
          }
        }
        .yt-doc{
          margin-top: 12px;
          font-size:13px;
          color:#5e6d82;
          line-height:28px;
          margin-left: 5px;
        }
        .v-progress{
          display: inline-block;
          position: relative;
          width: 12px;
          span{
            position: absolute;
          }
          .circle{
            border:1px solid #c0ccda;
            border-radius:20px;
            width:12px;
            z-index: 2;
            background: #f9fafc;
            height:12px;
          }
          .circle-s{
            top:25px;
            left:0;
          }
          .circle-c{
            top:89px;
          }
          .circle-e{
            bottom: 19px;
            left:0;
          }
          .v-line{
            height: 54px;
            z-index: 1;
            width:1px;
            background: #e0e6ed;
            left:5.5px;
          }
          .v-line-1{
            top:37px;
          }
          .v-line-2{
            top:101px;
          }
        }
        .v-progress-table{
          display: inline-block;
          width: 732px;
          vertical-align: top;
          /*        margin-left:30px;*/
          line-height: 60px;
          .v-progress-txt{
            font-size:14px;
          }
          .pro-txt-1{
            color:#99a9bf;
            margin-left: 12px;
          }
          .pro-txt-2{
            color:#1f2d3d;
            margin-left: 53px;
            width: 150px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
          .pro-txt-3{
            color:#1f2d3d;
            margin-left: 24px;
          }
          .pro-txt-4{
            color:#5e6d82;
            margin-left: 140px;
          }
        }
      }
    }
  }
</style>

