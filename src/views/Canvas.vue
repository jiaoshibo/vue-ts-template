<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name:'canvas',
  setup() {
    onMounted(()=>{
      let canvas = <HTMLCanvasElement>document.getElementById('canvas')
      let context = <CanvasRenderingContext2D>canvas.getContext('2d')
      const canvasWidth=800
      const canvasHeight=800
      const cap=50
      const lineWidth = 2;
      canvas.width=800;
      canvas.height=800;
      let Grids: any[]= initGrid(cap,canvasWidth,canvasHeight,lineWidth);
      createGrid(context,Grids);

      context.strokeStyle="white";
      context.lineWidth=10;
      context.beginPath();
      context.moveTo(50,50);
      context.lineTo(450,450);
      context.lineTo(450,50);
      context.closePath();
      context.stroke();
      context.fill();
    })


    /**
     * 计算网格数据
     */
    function initGrid(cap: number,width: number,height: number,lineWidth: number):any[]{
      const colNum=Math.ceil(width/cap)-1
      const rowNum=Math.ceil(height/cap)-1;
      let arr:any[]=[]
      for(let i=1;i<=colNum;i++){
        arr.push([[cap*i-1, 0,lineWidth,colNum*cap],[i*cap,cap*i-1,colNum*cap+5,"top"]]) 
      }
      for(let i=1;i<=rowNum;i++){
        arr.push([[ 0,cap*i-1,rowNum*cap,lineWidth],[i*cap,rowNum*cap+5,cap*i-1,"middle"]])
      }
      return arr
    }

    /**
     * 网格绘制
     */
    function createGrid(context:CanvasRenderingContext2D,grids:any[]){
      context.fillStyle = 'green';
      context.font="24px Arial"
      grids.forEach((grid)=>{
        context.textAlign=grid[1][4]
        context.textBaseline=grid[1][3]
        context.fillRect( grid[0][0],grid[0][1], grid[0][2], grid[0][3])
        context.fillText (grid[1][0],grid[1][1], grid[1][2]);   
      })
    }
   
  },
})
</script>



<style scoped>
#canvas{
  width:400px;
  height:400px;
  background: #000;
}
</style>