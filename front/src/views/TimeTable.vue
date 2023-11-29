<template>
    <v-card>
        <v-card-title>시간표 안내</v-card-title>
        <v-card-subtitle>📣집회시간은 성령님의 인도하심에 따라  조금씩 변동될 수 있는 점 양해 부탁드립니다.📣</v-card-subtitle>
        <table class="rtable">
            <thead>

                <tr>
                    <th>시간/날짜</th>
                    <th>만남의시간 1/18(목)</th>
                    <th>은혜의시간 1/19(금)</th>
                    <th>사명의시간 1/20(토)</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td class="ftd">7:30~9:00</td>
                    <td rowspan="3">유튜브 '유스비전TV' <br/>구독과 좋아요</td>
                    <td>기상 및 아침식사</td>
                    <td>기상 및 아침식사</td>
                </tr>
                <tr>
                    <td class="ftd">9:00~10:00</td>
                    <td>듀나미스 찬양</td>
                    <td>듀나미스 찬양</td>
                </tr>
                <tr>
                    <td class="ftd">10:00~11:00</td>
                    <td rowspan="2">최새롬목사 <br/>'학원캠퍼스복음화'</td>
                    <td rowspan="2">파송예배 <br/>장용성 목사 <br/>'가서 제자 삼으라'</td>
                </tr>
                <tr>
                    <td class="ftd">11:00~12:00</td>
                    <td rowspan="2">등록 및 접수</td>
                </tr>
                <tr>
                    <td class="ftd">12:00~13:00</td>
                    <td rowspan="2">점심식사 및 휴식</td>
                    <td rowspan="12">2024 여름 <br/>유스비전캠프에서 <br/>만나요!</td>
                </tr>
                <tr>
                    <td class="ftd">13:00~13:30</td>
                    <td rowspan="2">오프닝예배 <br/>듀나미스찬양</td>
                </tr>
                <tr>
                    <td class="ftd">13:30~14:00</td>
                    <td rowspan="3">은혜의콜센타 <br/>'찬양 TALK'</td>
                </tr>
                <tr>
                    <td class="ftd">14:00~15:00</td>
                    <td rowspan="3">박윤호 목사 <br/>'처음사랑을 회복하라'</td>
                </tr>
                <tr>
                    <td class="ftd">15:00~15:20</td>
                </tr>
                <tr>
                    <td class="ftd">15:20~15:45</td>
                    <td rowspan="3">김신근 목사 <br/>'천국은 마치'</td>
                </tr>
                <tr>
                    <td class="ftd">15:45~16:00</td>
                    <td>O.T</td>
                </tr>
                <tr>
                    <td class="ftd">16:00~16:50</td>
                    <td rowspan="2">찬양콘서트 <br/>'러빔'</td>
                </tr>
                <tr>
                    <td class="ftd">16:50~17:00</td>
                    <td rowspan=2>저녁식사 및 휴식</td>
                </tr>
                <tr>
                    <td class="ftd">17:00~19:00</td>
                    <td>저녁식사 및 휴식</td>
                </tr>
                <tr>
                    <td class="ftd" rowspan="2">19:00~</td>
                    <td>듀나미스 찬양</td>
                    <td>듀나미스 찬양</td>
                </tr>
                <tr>
                    <td>장용성 목사 <br/>'주님 나를 부르시니'</td>
                    <td>장용성 목사 <br/>'12, 120, 3000 <br/>세계 열방을 품으라'</td>
                </tr>
            </tbody>
        </table>
        <p></p>
    </v-card>
</template>
<style scoped>
.rtable {
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    
    overflow-x: auto;
  
  white-space: nowrap;

  border-collapse: collapse;
  border-spacing: 0;
}

.rtable,
.rtable--flip tbody {
  -webkit-overflow-scrolling: touch;
  
  background: radial-gradient(left, ellipse, rgba(0,0,0, .2) 0%, rgba(0,0,0, 0) 75%) 0 center,
              radial-gradient(right, ellipse, rgba(0,0,0, .2) 0%, rgba(0,0,0, 0) 75%) 100% center;
  background-size: 10px 100%, 10px 100%;
  background-attachment: scroll, scroll;
  background-repeat: no-repeat;
}

.rtable td:first-child,
.rtable--flip tbody tr:first-child {
  background-image: linear-gradient(to right, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
  background-repeat: no-repeat;
  background-size: 20px 100%;
}

.rtable td:last-child,
.rtable--flip tbody tr:last-child {
  background-image: linear-gradient(to left, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
  background-repeat: no-repeat;
  background-position: 100% 0;
  background-size: 20px 100%;
}

.rtable th {
  font-size: 11px;
  text-align: left;
  text-transform: uppercase;
  background: #f2f0e6;
}

.rtable th,
.rtable td {
  padding: 6px 12px;
  border: 1px solid #d9d7ce;
  text-align: center;
}
.rtable .ftd {
  text-align: left;
  font-weight: 800;
}
.rtable--flip {
  display: flex;
  overflow: hidden;
  background: none;
}

.rtable--flip thead {
  display: flex;
  flex-shrink: 0;
  min-width: min-content;
}

.rtable--flip tbody {
  display: flex;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
}

.rtable--flip tr {
  display: flex;
  flex-direction: column;
  min-width: min-content;
  flex-shrink: 0;
}

.rtable--flip td,
.rtable--flip th {
  display: block;
}

.rtable--flip td {
  background-image: none !important;
  border-left: 0;
}

.rtable--flip th:not(:last-child),
.rtable--flip td:not(:last-child) {
  border-bottom: 0;
}

/*!
// CodePen house keeping
*/
body {
  margin: 0;
  padding: 25px;
  color: #494b4d;
  font-size: 14px;
  line-height: 20px;
}
h1, h2, h3 {
  margin: 0 0 10px 0;
  color: #1d97bf;
}

h1 {
  font-size: 25px;
  line-height: 30px;
}

h2 {
  font-size: 20px;
  line-height: 25px;
}

h3 {
  font-size: 16px;
  line-height: 20px;
}

table {
  margin-bottom: 30px;
}

a {
  color: #ff6680;
}

code {
  background: #fffbcc;
  font-size: 12px;
}

</style>
<script>
/*!
 * iOS doesn't respect the meta viewport tag inside a frame
 * add a link to the debug view (for demo purposes only)
 */
 if (/(iPhone|iPad|iPod)/gi.test(navigator.userAgent) && window.location.pathname.indexOf('/full') > -1) {
  var p = document.createElement('p');
  p.innerHTML = '<a target="_blank" href="https://s.codepen.io/dbushell/debug/wGaamR"><b>Click here to view this demo properly on iOS devices (remove the top frame)</b></a>';
  document.body.insertBefore(p, document.body.querySelector('h1'));
}
</script>