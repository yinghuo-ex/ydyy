<template>
    <div>
        <el-container>
        <el-main>
            <div class="block">
                <el-carousel height="500px">
                <el-carousel-item v-for="item in items" :key="item">
                    <img :src="item" class="imgSize"/>
                </el-carousel-item>
                </el-carousel>
            </div>
        </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'FirstPage',
  data () {
    return {
      items: ['https://img-blog.csdnimg.cn/20200828150734825.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjYwMTEzNg==,size_16,color_FFFFFF,t_70#pic_center',
        'https://img-blog.csdnimg.cn/20200828150734958.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjYwMTEzNg==,size_16,color_FFFFFF,t_70#pic_center',
        'https://img-blog.csdnimg.cn/20200828150810950.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjYwMTEzNg==,size_16,color_FFFFFF,t_70#pic_center',
        'https://img-blog.csdnimg.cn/2020082815084381.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjYwMTEzNg==,size_16,color_FFFFFF,t_70#pic_center'
      ]
    }
  }
}
</script>

<style>
 .imgSize{
     height: 545px;
     width: 1500;
 }

/* 轮播图 */
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
