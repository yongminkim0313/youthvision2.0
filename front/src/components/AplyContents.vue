<template>
    <div>
      <!--PC-->
        <v-card class="d-none d-sm-block d-print-none" flat>
          <v-card-title class="text-h5 grey lighten-2" >
            캠프 신청 정보
          </v-card-title>
            <v-card-text class="pa-1">
              <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <th>신청자이름:</th> <td>{{aplyContents.aplyName}}</td>
                    <th>직분:</th> <td>{{aplyContents.jikbunSe}}</td>
                  </tr>
                  <tr>
                    <th>교회명:</th> <td>{{aplyContents.church}}</td>
                    <th>교단:</th> <td>{{aplyContents.churchSe}}</td>
                  </tr>
                  <tr>
                    <th>목사님성함:</th> <td>{{aplyContents.churchAdtr}}</td>
                    <th>교회주소:</th> <td>{{aplyContents.churchAddr}} {{aplyContents.churchDtlAddr}}</td>
                  </tr>
                  <tr>
                    <!-- <th>캠프참여기간:</th> <td>{{aplyContents.schdlSe}}</td> -->
                    <th>연락처:</th> <td colspan="3">{{aplyContents.phone}}</td>
                  </tr>
                  <tr>
                    <th>e-mail:</th> <td>{{aplyContents.email}}</td>
                    <th>우편물주소:</th> <td>{{aplyContents.fullAddress}} {{aplyContents.detailAddress}}</td>
                  </tr>
                  <tr>
                    <th>유스비전캠프 <br/>참여여부:</th> <td>{{aplyContents.joinHisSe}}</td>
                    <th>유스비전캠프 <br/>알게된 경로:</th> <td> <v-chip-group column> <v-chip small color="warning" v-for="path in aplyContents.joinPathSe" :key="path" :value="path"> {{path}} </v-chip> </v-chip-group> </td>
                  </tr>
                  <tr>
                    <th>참여인원:</th>
                    <td colspan="3" class="text-left">
                      <v-chip-group column >
                        <v-chip color="primary" small v-if="aplyContents.campCnt.chodeung">
                            {{ '초등:'+aplyContents.campCnt.chodeung}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.cheongsonyeon">
                            {{ '청소년:'+aplyContents.campCnt.cheongsonyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.cheongnyeon">
                            {{ '청년:'+aplyContents.campCnt.cheongnyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.jangnyeon">
                            {{ '장년:'+aplyContents.campCnt.jangnyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.sayeogja">
                            {{ '사역자:'+aplyContents.campCnt.sayeogja}}
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  <tr>
                    <th>결제은행:</th> <td> {{aplyContents.bankNm}}</td>
                    <th>입금자명:</th> <td> {{aplyContents.pyrNm}}</td>
                  </tr>
                  <tr>
                    <th colspan="4">신청후 선입금 3일내 확인되지 않을 시 자동취소(동의 체크): 
                      <span v-if="aplyContents.checkbox == '동의'">동의</span>
                      <span v-else class="error--text">미동의</span>
                    </th>
                  </tr>
                  <tr>
                    <th colspan="4">2인1실, 인원이 맞지 않을시 다른교회와 같이 쓰실 수 있습니다: 
                      <span v-if="aplyContents.checkboxUseRoom == '동의'">동의</span>
                      <span v-else class="error--text">미동의</span>
                    </th>
                  </tr>
                  <tr>
                    <th>기타메모:</th> <td colspan="3"> {{aplyContents.memo}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card-text>
          <v-card-actions class="d-print-none">
            <v-btn color="primary" text @click="submitAply('close');">
              닫기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submitAply('aply');">
              신청하기
            </v-btn>
          </v-card-actions>
        </v-card>

        <!--모바일-->
        <v-card class="d-sm-none d-block d-print-none" flat>
          <v-card-title dense class="grey lighten-2 pa-1 text-center" style="display:block !important;">
            캠프 신청 정보
          </v-card-title>
            <v-card-text class="pa-1">
              <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <th>신청자이름:</th> <td>{{aplyContents.aplyName}}</td>
                  </tr>
                  <tr>
                    <th>직분:</th> <td>{{aplyContents.jikbunSe}}</td>
                  </tr>
                  <tr>
                    <th>교회명:</th> <td>{{aplyContents.church}}</td>
                  </tr>
                  <tr>
                    <th>교단:</th> <td>{{aplyContents.churchSe}}</td>
                  </tr>
                  <tr>
                    <th>목사님성함:</th> <td>{{aplyContents.churchAdtr}}</td>
                  </tr>
                  <tr>
                    <th>교회주소:</th> <td>{{aplyContents.churchAddr}} {{aplyContents.churchDtlAddr}}</td>
                  </tr>
                  <tr>
                    <th>캠프참여기간:</th> <td>{{aplyContents.schdlSe}}</td>
                  </tr>
                  <tr>
                    <th>연락처:</th> <td>{{aplyContents.phone}}</td>
                  </tr>
                  <tr>
                    <th>e-mail:</th> <td>{{aplyContents.email}}</td>
                  </tr>
                  <tr>
                    <th>우편물주소:</th> <td>{{aplyContents.fullAddress}} {{aplyContents.detailAddress}}</td>
                  </tr>
                  <tr>
                    <th>유스비전캠프 참여여부:</th> <td>{{aplyContents.joinHisSe}}</td>
                  </tr>
                  <tr>
                    <th>유스비전캠프 알게된 경로:</th> <td> <v-chip-group column multiple > <v-chip x-small color="warning" v-for="path in aplyContents.joinPathSe" :key="path" :value="path"> {{path}} </v-chip> </v-chip-group> </td>
                  </tr>
                  <tr>
                    <th>참여인원:</th>
                    <td> <v-chip-group column >
                        <v-chip color="primary" small v-if="aplyContents.campCnt.chodeung">
                            {{ '초등:'+aplyContents.campCnt.chodeung}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.cheongsonyeon">
                            {{ '청소년:'+aplyContents.campCnt.cheongsonyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.cheongnyeon">
                            {{ '청년:'+aplyContents.campCnt.cheongnyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.jangnyeon">
                            {{ '장년:'+aplyContents.campCnt.jangnyeon}}
                        </v-chip>
                        <v-chip color="primary" small v-if="aplyContents.campCnt.sayeogja">
                            {{ '사역자:'+aplyContents.campCnt.sayeogja}}
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  <tr>
                    <th>결제은행:</th> <td> {{aplyContents.bankNm}}</td>
                  </tr>
                  <tr>
                    <th>입금자명:</th> <td> {{aplyContents.pyrNm}}</td>
                  </tr>
                  <tr>
                    <th colspan="2">신청후 선입금 3일내 확인되지 않을 시 자동취소(동의 체크): 
                      <span v-if="aplyContents.checkbox == '동의'">동의</span>
                      <span v-else class="error--text">미동의</span>
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">2인1실, 인원이 맞지 않을시 다른교회와 같이 쓰실 수 있습니다: 
                      <span v-if="aplyContents.checkboxUseRoom == '동의'">동의</span>
                      <span v-else class="error--text">미동의</span>
                    </th>
                  </tr>
                  <tr>
                    <th>기타메모:</th> <td> {{aplyContents.memo}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="submitAply('close');">
              닫기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submitAply('aply');">
              신청하기
            </v-btn>
          </v-card-actions>
        </v-card>
    </div>
  </template>
<script>
export default {
  data () {
    return {
      //dialog: false,
    }
  },
  props: ["aplyContents"],
  methods:{
    submitAply: function(msg){
        this.$emit("submitAply", msg);
        
    },
    print: function(){
      window.print();
    }
  }
}
</script>
<style scoped>
th{
  min-width: 100px;
}
td{
  text-align: left;
}
</style>